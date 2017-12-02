import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule,AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {firebase}  from 'firebase/database';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { AlertController, LoadingController ,Loading } from 'ionic-angular';

import { User } from '../../models/user';
import { Vibration } from '@ionic-native/vibration';
import { ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;
  passRepetida: string;
  public loading: Loading;
  
  constructor(private authAf: AngularFireAuth,
     public navCtrl: NavController, 
     public navParams: NavParams,
     private alertCtrl: AlertController,
     private vibration: Vibration,
     private toastCtrl: ToastController,
     public loadingCtrl: LoadingController) {
  }

  async register(user: User){
    try {
      if(this.passRepetida != user.password){
        this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Las contraseñas no coinciden',
          buttons: ['Ok']
        }).present();
      }
      else{
          const result = await this.authAf.auth.createUserWithEmailAndPassword(user.email, user.password);
          if (result != null) {
            this.registroExitoso();
  
            this.loading = this.loadingCtrl.create({
              //spinner: 'hide',
              content: '<ion-spinner name="bubbles">Cargando...</ion-spinner>',
              duration: 3000,
              dismissOnPageChange: true,
            });
            this.loading.present();
  
            this.navCtrl.setRoot(LoginPage);
          }
        }
    } catch (error) {
      console.error(error);
      if (error.code == "auth/argument-error") {
        this.camposIncompletosError();
        this.vibration.vibrate(500);
      }
      if (error.code == "auth/invalid-email") {
        this.usuarioInvalidoError();
        //this.vibration.vibrate(500);
      }
      if (error.code == "auth/weak-password") {
        this.contraseñaInvalidaError();
        this.vibration.vibrate(500);
      }
      if (error.code == "auth/email-already-in-use") {
        this.usuarioRepetidoError();
        this.vibration.vibrate(500);
      }
    }
  }

camposIncompletosError() {
  this.vibration.vibrate(500);
  //let alert = this.alertCtrl.create({
  let toast = this.toastCtrl.create({
    message: 'Por favor, complete todos los campos',
    showCloseButton: true,
    closeButtonText: 'Cerrar',
    position: 'bottom',
    //title: 'Campos incompletos',
    //subTitle: 'Por favor, complete todos los campos',
    //buttons: ['Cerrar']
  });
  toast.present();
  //alert.present();
}

usuarioInvalidoError() {
  this.vibration.vibrate(500);
  let alert = this.alertCtrl.create({
    title: 'Usuario inválido',
    subTitle: 'Por favor, ingrese un usuario válido',
    buttons: ['Cerrar']
  });
  alert.present();
}

contraseñaInvalidaError() {
  this.vibration.vibrate(500);
  //let alert = this.alertCtrl.create({
    let toast = this.toastCtrl.create({
      message: 'La contraseña debe tener al menos 6 caracteres',
      showCloseButton: true,
      closeButtonText: 'Cerrar',
      position: 'middle',
    //title: 'Contraseña inválida',
    //subTitle: 'La contraseña debe tener al menos 6 caracteres',
    //buttons: ['Cerrar']
  });
  toast.present();
  //alert.present();
}

usuarioRepetidoError() {
  this.vibration.vibrate(500);
  //let alert = this.alertCtrl.create({
    let toast = this.toastCtrl.create({
    message: 'El usuario que desea ingresar ya existe',
    showCloseButton: true,
    closeButtonText: 'Cerrar',
    position: 'top',
    //title: 'Usuario existente',
    //subTitle: 'El usuario que desea ingresar ya existe',
    //buttons: ['Cerrar']
  });
  toast.present();
  //alert.present();
}
/*
registroExitoso() {
  let alert = this.alertCtrl.create({
    title: '¡Registro exitoso!',
    subTitle: 'Su cuenta ha sido creada exitosamente',
    buttons: ['Cerrar']
  });
  alert.present();
}*/

//presentToast
registroExitoso() {
  let toast = this.toastCtrl.create({
    message: 'Su cuenta ha sido creada exitosamente',
    duration: 1500,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}


}
