import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, PopoverController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { WarningResetComponent } from '../../popovers/warning-reset/warning-reset.component';
@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {

  selectedLanguage: string

  constructor
  (
    private modal: ModalController,
    private storage: NativeStorage,
    private platform: Platform,
    private popover: PopoverController,
  ) { }

  async ngOnInit()
  {
    if (this.platform.is("desktop"))
      this.selectedLanguage = localStorage.getItem("Language")
    else
      this.selectedLanguage = await this.storage.getItem("Language")
  }

  close()
  {
    this.modal.dismiss(
    {
      'dismissed': true
    })
  } 

  changeLanguage(language: string)
  {
    if (language == 'en')
    {
      if (this.platform.is("desktop"))
      {
        localStorage.setItem("Language", "en")
      }else
      {
        this.storage.setItem("Language", "en")
      }
      this.selectedLanguage = "en"
    }
    else
    {
      if (this.platform.is("desktop"))
      {
        localStorage.setItem("Language", "?format=wookiee")
      }else
      {
        this.storage.setItem("Language", "?format=wookiee")
      }
      this.selectedLanguage = "?format=wookiee"
    }
    console.log(this.selectedLanguage);
  }

  async modalClearData()
  {
    console.log("click");
    const popover = await this.popover.create(
    {
      component: WarningResetComponent,
      translucent: true
    }
    )
    return await popover.present();
  }
}
