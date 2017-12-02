import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatPage } from '../chat/chat';


@IonicPage()
@Component({
  selector: 'page-menu-aula',
  templateUrl: 'menu-aula.html',
})
export class MenuAulaPage {
  tipoUser:string;
  usuario:string;
  usuarioIngresado:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
    this.usuarioIngresado = navParams.get("usuario");
    this. UsuarioIngresado();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuAulaPage');
  }

  EntrarChat()
  {

    if(this.tipoUser=="4A")
      {
        this.navCtrl.push(ChatPage,{curso:"A",usuario:this.usuario});
      }
    else if(this.tipoUser=="4B")
      {
        this.navCtrl.push(ChatPage,{curso:"B",usuario:this.usuario});
      }
      else
        {alert("debe seleccionar un aula");}
  }

  UsuarioIngresado()
  {
    switch(this.usuarioIngresado){
      case "admin@admin.com":{
        this.usuario="Administrador"
        break;}
      case "usuario@usuario.com":{
        this.usuario="Usuario";

        break;}
      case "invitado@invitado.com":{
        this.usuario="Invitado";
 
        break;}                
      case "j1@jugador.com":{
        this.usuario="Jugador1";

        break;}
      case "j2@jugador.com":{
        this.usuario="Jugador2";

        break;}  
  }}
  
}
