import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, Platform } from '@ionic/angular';
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
    private platform: Platform
  ) { }

  async ngOnInit()
  {
    if (this.platform.is("desktop"))
      {
        if (!localStorage.getItem("Language"))
          localStorage.setItem("Language", "en")
        
        if (localStorage.getItem("Language") != "en")
          this.languageParam = "?format=wookiee"
      } else
      {
        if (await !this.storage.getItem("Language"))
          await this.storage.setItem("Language", "en")
        
        if (await this.storage.getItem("Language") != "en")
          this.languageParam = "?format=wookiee"
      }
    await this.getAllCharacters()
    await SplashScreen.hide()
    // this.openLanguageModal()
  }

  getAllCharacters()
  {
    this.swapi.getAllCharacters().then(async(data: any) =>
    {
      this.characters = data
    })
  }

  async getCharacter(url: string)
  {
    this.swapi.getCharacter(url).then(async(data: Characters) =>
    {
      console.log(JSON.stringify(data));
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
    })
  }

  onClick()
  {
    console.log("click");
  }

  async openLanguageModal()
  {
    const modal = await this.modal.create(
    {
      component: LanguageComponent
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
