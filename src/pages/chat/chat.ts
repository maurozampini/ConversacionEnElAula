import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage implements OnInit {
  user = this.authAf.auth.currentUser;
  name;
  email;
  photoUrl;
  uid;
  emailVerified;

  list: FirebaseListObservable<any>;
  chatBox:string;
  username:string;
  curso:string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              db:AngularFireDatabase,
              public authAf: AngularFireAuth) 
    {
        this.curso=navParams.get("curso");
        this.username=navParams.get("usuario");
        if(this.curso=="A")
        {
          this.list=db.list('/Mensaje4A');
        }
        else
        {
        this.list=db.list('/Mensaje4B');
        }
        console.log(this.list);
    }


    ngOnInit(): void {
      this.datosUsuario();
    }

  datosUsuario(){
    if (this.user != null) {
      this.name = this.user.displayName;
      this.email = this.user.email;
      this.photoUrl = this.user.photoURL;
      this.emailVerified = this.user.emailVerified;
      this.uid = this.user.uid;  
    }
  }

  Push()
  {
    this.list.push({
    usuario:this.username,
    mensaje:this.chatBox});
    
    this.chatBox="";
  }

}
