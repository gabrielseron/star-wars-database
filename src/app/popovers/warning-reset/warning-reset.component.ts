import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-warning-reset',
  templateUrl: './warning-reset.component.html',
  styleUrls: ['./warning-reset.component.scss'],
})
export class WarningResetComponent implements OnInit {

  constructor
  (
    private storage: NativeStorage,
    private platform: Platform,
    private popover: PopoverController,
  ) { }

  ngOnInit() {}

  async clearData()
  {
    if (this.platform.is("desktop"))
    {
      await localStorage.clear()
    } else
    {
      await this.storage.clear()
    }

    this.popover.dismiss()
  }
}
