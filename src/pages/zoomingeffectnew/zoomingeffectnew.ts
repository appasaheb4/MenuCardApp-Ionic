import { Component } from '@angular/core';
import {  NavController, NavParams,ViewController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import * as JQuery from 'jquery';
/**
 * Generated class for the ZoomingeffectnewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-zoomingeffectnew',
  templateUrl: 'zoomingeffectnew.html',
})
export class ZoomingeffectnewPage {
scheduleitems:any=['http://skillshare.web44.net/Content/MyProject/MobileApplication/IonicFramework/HotelSliverOak/HotelSliverOakMobileApp.png'];
  constructor(private statusBar: StatusBar,public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
    this.statusBar.hide();
  }  

   back(){
    this.viewCtrl.dismiss();
  }









}
