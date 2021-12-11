import { Component, OnInit, Input } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { Characters } from '../../interfaces/characters';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit {

  @Input() characterName: string;
  character: Characters
  characterImage: string = "assets/img/icon.png"
  constructor
  (
    private modal: ModalController,
    private storage: NativeStorage,
    private platform: Platform
  ) { }

  async ngOnInit()
  {
    if (this.platform.is("desktop"))
      this.character = JSON.parse(localStorage.getItem(this.characterName))
    else
      this.character = JSON.parse(await this.storage.getItem(this.characterName))

    if (this.character.image)
      this.characterImage = this.character.image
  }

  close()
  {
    this.modal.dismiss(
    {
      'dismissed': true
    })
  }

  log()
  {
    console.log("Hi-oh");
  }

}
