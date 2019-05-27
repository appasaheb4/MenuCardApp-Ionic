import { Component,ViewChild, ElementRef, Renderer2, ViewChildren } from '@angular/core';
import {  NavController, NavParams,Content, DomController,ModalController,ViewController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';
import { ImgLoader,ImageLoaderConfig } from 'ionic-image-loader';


import { HomePage } from '../home/home';
import { RestlocationshowPage } from '../restlocationshow/restlocationshow';
import { MenudataupdatePage } from '../menudataupdate/menudataupdate';
import { ZoomingeffectnewPage } from '../zoomingeffectnew/zoomingeffectnew';

interface MenuProShow {
  showMenuList: string;
}

//@IonicPage()   
@Component({
  selector: 'page-menushow',
  templateUrl: 'menushow.html',    
})
export class MenushowPage {  
public id:any;   
public menuAllData:any;
public zoomMin:any =1;


constructor(private imageLoaderConfig: ImageLoaderConfig,private callNumber: CallNumber,private socialSharing: SocialSharing,public _form:FormBuilder,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public http: HttpClient,public loading: LoadingController,public toastCtrl: ToastController,public storage:Storage,public renderer: Renderer2,
    private domCtrl: DomController,public modalCtrl:ModalController,public viewCtrl:ViewController) {
this.id = navParams.get('param1'); 
this.getData();

this.imageLoaderConfig.enableSpinner(true);
    this.imageLoaderConfig.setBackgroundSize('cover');
    this.imageLoaderConfig.setFallbackUrl('assets/download.png');
//  this.initData(); 
}  
     

reschedule(){
    let profileModal = this.modalCtrl.create(ZoomingeffectnewPage);
    profileModal.present();
     }

 
getData(){     
let loader = this.loading.create({
content: 'Wating.........',
});                            
loader.present().then(() => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {
id: this.id,                   
}           
  
this.http.post<MenuProShow>('http://menuapphybrid.newapptec.com/AddRestaurants/getUserMenuListIdWise', JSON.stringify(data), {
    headers: headersNew   
  })
  .subscribe(res =>  {
this.menuAllData=res.showMenuList;
loader.dismiss();
}, (err) => {     
loader.dismiss();
let toast = this.toastCtrl.create({
message: 'Data not found.',       
duration: 2000
});
toast.present();
});
});
}


callingMenu(n:string){
this.callNumber.callNumber(n, true)
.then(() => console.log('Launched dialer!'))
.catch(() => console.log('Error launching dialer'));
}
  

regularShareMenu(restName,area,city,imagePath){   
if(imagePath=="http://menuapphybrid.newapptec.com/")
this.socialSharing.share(restName +','+ area +',' + city +'\n','Menu App',null,'http://menuapphybrid.newapptec.com'); 
else
this.socialSharing.share(restName +','+ area +',' + city +'\n','Menu App',imagePath,'http://menuapphybrid.newapptec.com'); 
}   

openEditMenu(restName,phoneNo1,phoneNo2){
this.navCtrl.push(MenudataupdatePage,{
"param1":restName,"param2":phoneNo1,"param3":phoneNo2,"param4":this.id      
});
}


deleteData(){
let confirm = this.alertCtrl.create({
title: 'Are You Sure',
message: 'Menu Deleted & remove from users list of menus',
buttons: [
{
text: 'Cancel',
handler: () => {
console.log('Disagree clicked');
}
},
{
text: 'Delete',
handler: () => {


let loader = this.loading.create({
content: 'Wating.........',
});

loader.present().then(() => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {
id:this.id
}

this.http.post('http://menuapphybrid.newapptec.com/AddRestaurants/deleteMobileMenuList', JSON.stringify(data), {
    headers: headersNew
  })
  .subscribe(res =>  {
	 if(res.toString()=="yes")   
{
loader.dismiss();
let toast = this.toastCtrl.create({
message: 'Delete Data.',
duration: 2000
});
toast.present();
this.navCtrl.setRoot(HomePage);
}
}, (err) => {
loader.dismiss();
let toast = this.toastCtrl.create({
message: 'Not Delete Data.',
duration: 2000
});
toast.present();
});
});




}
}
]
});
confirm.present();
}   

 locationPageShow(restName,area,sub,city,state){
this.navCtrl.push(RestlocationshowPage,{
"param1":restName,"param2":area,"param3":sub,"param4":city,"param5":state  
});
  }     


}
