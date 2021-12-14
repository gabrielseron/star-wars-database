import { Component, Input, OnInit } from '@angular/core';
import { Characters } from '../../interfaces/characters';
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  @Input() character: Characters
  characterImage: string = "assets/img/icon.png"
  constructor
  (
    private modal: ModalController,
  ) { }

  ngOnInit() {}

  close()
  {
    this.modal.dismiss(
    {
      'dismissed': true
    })
  }
}
