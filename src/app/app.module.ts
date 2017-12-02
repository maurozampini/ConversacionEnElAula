import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RegisterPage } from '../pages/register/register';
import { MenuAulaPage } from '../pages/menu-aula/menu-aula';
import { ChatPage } from '../pages/chat/chat';

import { Vibration } from '@ionic-native/vibration';

export const firebaseConfig = {
  apiKey: "AIzaSyChdnIEsytQLpkrv2U_wpTXqdvOqSpb6SA",
  authDomain: "conversandoenelaula-mauro.firebaseapp.com",
  databaseURL: "https://conversandoenelaula-mauro.firebaseio.com",
  projectId: "conversandoenelaula-mauro",
  storageBucket: "conversandoenelaula-mauro.appspot.com",
  messagingSenderId: "463229150514"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    MenuAulaPage,
    ChatPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, 
    AngularFireAuthModule, 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    MenuAulaPage,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Vibration
  ]
})
export class AppModule {}
