import { Component,ViewChild, ElementRef, Renderer2, ViewChildren } from '@angular/core';
import {  NavController, NavParams,Content, DomController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';  
import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';
import { RestlocationshowPage } from '../restlocationshow/restlocationshow';
import { ImgLoader,ImageLoaderConfig } from 'ionic-image-loader';


interface RestProShow {
  showMenuList: string;
}

//@IonicPage()   
@Component({
  selector: 'page-restshow',
  templateUrl: 'restshow.html',
})
export class RestshowPage {
public id:any;      
public restAllData:any;


constructor(private imageLoaderConfig: ImageLoaderConfig,private callNumber: CallNumber,private socialSharing: SocialSharing,public _form:FormBuilder,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public http: HttpClient,public loading: LoadingController,public toastCtrl: ToastController,public storage:Storage,public renderer: Renderer2,
    private domCtrl: DomController) {
this.id = navParams.get('param1');   
this.getData(); 

this.imageLoaderConfig.enableSpinner(true);
    this.imageLoaderConfig.setBackgroundSize('cover');
    this.imageLoaderConfig.setFallbackUrl('assets/download.png');       
}    



  
getData(){     
console.log(this.id);
let loader = this.loading.create({
content: 'Wating.........',
});                            
loader.present().then(() => {   
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {
id: this.id,                   
}    
this.http.post<RestProShow>('http://menuapphybrid.newapptec.com/AddMenu/getUserMenuListIdWise', JSON.stringify(data), {
    headers: headersNew
  })
  .subscribe(res =>  {
this.restAllData=res.showMenuList;
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
  
regular(restName,area,city,imagePath){   
if(imagePath=="http://menuapphybrid.newapptec.com/")    
this.socialSharing.share(restName +','+ area +',' + city +'\n','Menu App',null,'http://menuapphybrid.newapptec.com'); 
else
this.socialSharing.share(restName +','+ area +',' + city +'\n','Menu App',imagePath,'http://menuapphybrid.newapptec.com'); 
}        

locationPageShow(restName,area,sub,city,state){
this.navCtrl.push(RestlocationshowPage,{
"param1":restName,"param2":area,"param3":sub,"param4":city,"param5":state  
});
  }  
  
  
  callingMenu(n:string){
console.log(n);
this.callNumber.callNumber(n, true)
.then(() => console.log('Launched dialer!'))
.catch(() => console.log('Error launching dialer'));
}   


}
