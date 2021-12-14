import { Component, OnInit, Input } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { Characters } from '../../interfaces/characters';
import { EditComponent } from '../edit/edit.component';

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
    private editModal: ModalController,
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

    this.character.created = new Date(this.character.created).toLocaleDateString([], {day: '2-digit', month: '2-digit', year: '2-digit'}) + " : " + new Date(this.character.created).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    this.character.edited = new Date(this.character.edited).toLocaleDateString([], {day: '2-digit', month: '2-digit', year: '2-digit'}) + " : " + new Date(this.character.edited).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
  }

  close()
  {
    this.modal.dismiss(
    {
      'dismissed': true
    })
  }

  async editCharacter(character: Characters)
  {
    const modal = await this.editModal.create(
    {
      component: EditComponent,
      componentProps: {
        'character': character,
      }
    })
    modal.onDidDismiss().then(async()=>
    {
      this.ngOnInit()
    })
    return await modal.present()
  }
}
