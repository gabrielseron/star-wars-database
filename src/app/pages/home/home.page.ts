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
        if (await !this.storage.getItem("Language"))
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
      await this.loading.dismiss()
      this.characters = data
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
    if ((this.platform.is("desktop") && localStorage.getItem(character.name)) || (!this.platform.is("desktop") && await this.storage.getItem(character.name)))
    {
      await this.loading.dismiss()
      const modal = await this.modal.create(
      {
        component: CharacterComponent,
        componentProps: {
          'characterName': character.name,
        }
      })
      return await modal.present()
    } else
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

  onClick()
  {
    console.log(this.languageParam);
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
    return await modal.present()
  }

  searchOnInput()
  {
    
  }

  searchOnCancel()
  {
    
  }
}
