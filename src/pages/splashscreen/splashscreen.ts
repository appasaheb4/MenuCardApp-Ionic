import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ViewController } from 'ionic-angular';  

//@IonicPage()
@Component({    
  selector: 'page-splashscreen',
  templateUrl: 'splashscreen.html',
})
export class SplashscreenPage {

  constructor(public viewCtrl: ViewController,public splashScreen: SplashScreen,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidEnter() {
    this.splashScreen.hide();    
    setTimeout(() => {
      this.viewCtrl.dismiss();
    }, 3000);
 
  }  

}
