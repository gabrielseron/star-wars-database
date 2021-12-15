import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { SwapiService } from '../../services/swapi.service';
import { Characters } from '../../interfaces/characters';
import { LanguageComponent } from '../../modal/language/language.component';
import { CharacterComponent } from '../../modal/character/character.component';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  characters: any
  languageParam: string
  isSearchbarHidden : boolean
  searchbarValue : string
  constructor
  (
    private swapi: SwapiService,
    private modal: ModalController,
    private loading: LoadingController,
    private storage: NativeStorage,
    private platform: Platform,
    private toast: ToastController,
  ) { }

  async ngOnInit()
  {
    this.isSearchbarHidden = true
    if (this.platform.is("desktop"))
      {
        if (!localStorage.getItem("Language"))
          localStorage.setItem("Language", "en")
        if (localStorage.getItem("Language") == "en")
          this.languageParam = "en"
        else
          this.languageParam = "?format=wookiee"
      } else
      {
        if (!this.storage.getItem("Language"))
          await this.storage.setItem("Language", "en")
        if (await this.storage.getItem("Language") == "en")
          this.languageParam = "en"
        else
          this.languageParam = "?format=wookiee"
      }
    await this.getAllCharacters()
    await SplashScreen.hide()
    // this.openLanguageModal()
  }

  async getAllCharacters()
  {
    const load = await this.loading.create(
    {
      message: 'Retrieving Data...',
    });
    await load.present();
    this.swapi.getAllCharacters().then(async (data: any) =>
    {
      this.characters = data
      await this.loading.dismiss()
    }).catch(async() =>
      {
        await this.loading.dismiss()
        // open toast
        const toast = await this.toast.create(
        {
          message: 'Oops, Something went wrong !',
          duration: 20000
        });
        toast.present();
      })
  }

  async getCharacter(character: any)
  {
    const load = await this.loading.create(
    {
      message: 'Retrieving Data...',
    });
    await load.present();
    // can't do a if else because if no created, a typeError will be created whth no possibility of handling it
    try
    {
      if (JSON.parse(localStorage.getItem(character.name)) || JSON.parse(await this.storage.getItem(character.name)))
      {
        await this.loading.dismiss()
        const modal = await this.modal.create(
        {
          component: CharacterComponent,
          componentProps: {
            'characterName': character.name,
          }
        })
        this.isSearchbarHidden = true
        this.searchbarValue = ""
        return await modal.present()
      }
    } catch (error)
    {
      this.swapi.getCharacter(character.url).then(async(data: Characters) =>
      {
        await this.loading.dismiss()
        if (this.platform.is("desktop"))
        {
          if (!localStorage.getItem(data.name))
            localStorage.setItem(data.name, JSON.stringify(data))
        } else
        {
          if (!this.storage.getItem(data.name))
            await this.storage.setItem(data.name, JSON.stringify(data))
        }
        const modal = await this.modal.create(
        {
          component: CharacterComponent,
          componentProps: {
            'characterName': data.name,
          }
        })
        this.isSearchbarHidden = true
        this.searchbarValue = ""
        return await modal.present()
      }).catch(async() =>
      {
        await this.loading.dismiss()
        // open toast
        const toast = await this.toast.create(
        {
          message: 'Oops, Something went wrong !',
          duration: 20000
        });
        toast.present();
      })
    }
  }

  showSearchbar()
  {
    this.isSearchbarHidden = !this.isSearchbarHidden
    this.searchbarValue = ""
  }

  async openLanguageModal()
  {
    let currentLanguage = this.languageParam
    const modal = await this.modal.create(
    {
      component: LanguageComponent
    })
    modal.onDidDismiss().then(async(data)=>
    {
      if (data['data'].selectedLanguage != currentLanguage || data['data'].isDataReset)
        this.ngOnInit()
    })
    this.isSearchbarHidden = true
    this.searchbarValue = ""
    return await modal.present()
  }
}
