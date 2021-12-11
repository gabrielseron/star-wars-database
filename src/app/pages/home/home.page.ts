import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { SwapiService } from '../../services/swapi.service';
import { Characters } from '../../interfaces/characters';
import { LanguageComponent } from '../../modal/language/language.component';
import { CharacterComponent } from '../../modal/character/character.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  characters: any

  constructor
  (
    private swapi: SwapiService,
    private modal: ModalController,
    private loading: LoadingController,
  ) { }

  async ngOnInit()
  {
    await this.getAllCharacters()
    SplashScreen.hide()
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
      console.log(data);
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


}