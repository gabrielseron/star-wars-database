import { Component, Input, OnInit } from '@angular/core';
import { Characters } from '../../interfaces/characters';
import { LoadingController, Platform, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

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
    private loading: LoadingController,
    private storage: NativeStorage,
    private platform: Platform,
    private camera: Camera
  ) { }

  ngOnInit()
  {}

  close()
  {
    this.modal.dismiss(
    {
      'dismissed': true
    })
  }

  async changeImage()
  {
    const libraryImage = await this.openLibrary();
    this.character.image = 'data:image/jpg;base64,' + libraryImage;
  }

  async openLibrary()
  {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    return await this.camera.getPicture(options);
  }

  async save()
  {
    const load = await this.loading.create(
    {
      message: 'Saving Changes...',
    });
    await load.present();

    if (this.platform.is("desktop"))
      localStorage.setItem(this.character.name, JSON.stringify(this.character))
    else
      await this.storage.setItem(this.character.name, JSON.stringify(this.character))

    await this.loading.dismiss()
    this.close()
  }
}
