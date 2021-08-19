import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentService } from './photo/content.service';
import { CoreModule } from './core/core.module';

import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';
import { PhotoModule } from './photo/photo.module';
import { Page404Component } from './page404/page404.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    CoreModule,
    UserModule,
    PhotoModule,
    AppRoutingModule
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
