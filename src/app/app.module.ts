import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LanguageComponent } from './modal/language/language.component';
import { CharacterComponent } from './modal/character/character.component';
import { WarningResetComponent } from './popovers/warning-reset/warning-reset.component';
import { EditComponent } from './modal/edit/edit.component';
import { HttpClientModule } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, LanguageComponent, CharacterComponent, WarningResetComponent, EditComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule],
  providers:
  [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NativeStorage,
    Camera
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}