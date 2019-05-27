import { Component } from '@angular/core';
import {  NavController, NavParams} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FormBuilder,Validators } from '@angular/forms';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {Storage} from '@ionic/storage';     
import { HttpClient,HttpHeaders } from '@angular/common/http';  
  
//@IonicPage()
@Component({
  selector: 'page-menudataupdate',
  templateUrl: 'menudataupdate.html',
})
export class MenudataupdatePage {

 public editMenuForm:any;
public restName:string;
public phoneNo1:string;
public phoneNo2:string;
public id:string;
constructor(public _form:FormBuilder,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public http: HttpClient,public loading: LoadingController,public toastCtrl: ToastController,public storage:Storage) {
this.restName = navParams.get('param1'); 
this.phoneNo1 = navParams.get('param2'); 
this.phoneNo2 = navParams.get('param3'); 
this.id = navParams.get('param4'); 
this.editMenuForm=this._form.group({
'restName': [null,  Validators.required],
'phoneNo1': [null, Validators.compose([Validators.maxLength(10), Validators.required])],
'phoneNo2': [null,Validators.required],
});

}
back(){
this.navCtrl.pop();    
}
  
update(){
let loader = this.loading.create({
content: 'Wating.........',
});
loader.present().then(() => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {
restName: this.restName,
phoneNo1: this.phoneNo1,
phoneNo2:this.phoneNo2, 
id:this.id,
}    
this.http.post('http://menuapphybrid.newapptec.com/AddRestaurants/UpdateMobileMenuList', JSON.stringify(data), {
    headers: headersNew
  })
  .subscribe(res =>  {
if(res.toString()=="yes")             
{
loader.dismiss();     
let toast = this.toastCtrl.create({
message: 'Update Data',
duration: 2000
});
toast.present(); 
//this.navCtrl.pop(this.navCtrl.getActive().component);
this.navCtrl.pop();   
}
}, (err) => {
loader.dismiss();
let toast = this.toastCtrl.create({
message: 'Not Update Data.',
duration: 2000
});
toast.present();
});
});
}

}
