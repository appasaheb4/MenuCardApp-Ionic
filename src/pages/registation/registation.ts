import { Component } from '@angular/core';
import {  NavController, NavParams,Platform,ModalController} from 'ionic-angular';
import {  MenuController } from 'ionic-angular/index';
import { AlertController } from 'ionic-angular';
import {  Validators,ValidatorFn,AbstractControl,FormBuilder } from '@angular/forms';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LoginagianPage } from '../loginagian/loginagian';  
import * as $ from 'jquery';


//@IonicPage()
@Component({
selector: 'page-registation',
templateUrl: 'registation.html',   
})
export class RegistationPage {
public registationForm:any;
data={name:"",mobileNo:"",email:"",address:"",area:"",suburb:"",city:"",pin:"",state:"",cuntry:"",oldPass:"",newPass:"",tokenNo:""};
public btnSubmit: boolean = false;      
public teapCheack: boolean;        
constructor(private modalCtrl: ModalController,public platform: Platform,public _form:FormBuilder,public alertCtrl: AlertController,private menu: MenuController,public navCtrl: NavController, public navParams: NavParams,public http: HttpClient,public loading: LoadingController,public toastCtrl: ToastController,public storage:Storage) {
this.registationForm=this._form.group({  
'data.name': [null,  Validators.required],
'data.mobileNo': [null, Validators.compose([Validators.maxLength(10), Validators.required])],
'data.email' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50),Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)])],
'data.city': [null,  Validators.required],
'data.area': [null,  Validators.required],
'data.suburb': [null,  Validators.required],
'data.address' : [null],     
'data.pin' : [null],
'data.tokenNo' : [null],
'teapCheack' : [null],
'data.state' : [null],
'data.cuntry' : [null],         
'data.oldPass' : ['',  Validators.required],
'data.newPass' : ['', [Validators.required,this.equalto('data.oldPass')]],
});
}    

ionViewDidEnter() {
this.menu.enable(false, 'menu1');    
}




equalto(field_name): ValidatorFn {
return (control: AbstractControl): {[key: string]: any} => {
let input = control.value;
let isValid=control.root.value[field_name]==input
if(!isValid){
return { 'equalTo': {isValid} }
}
else{
return null;
}
}    
}






showValue(val){
console.log(val);
}
 
back(){
this.navCtrl.pop();
}
  
saveData(){
let loader = this.loading.create({
content: 'Wating.........',
});

loader.present().then(() => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {
name: this.data.name,
mobileNo: this.data.mobileNo,
email:this.data.email,
address:this.data.address,
area:this.data.area,
suburb:this.data.suburb,
city:this.data.city,   
pin:this.data.pin,
state:this.data.state,        
country:this.data.cuntry, 
pass:this.data.newPass,  
tokenNo:'1234',
}  

this.http.post('http://menuapphybrid.newapptec.com/LoginPage/registationMobile', JSON.stringify(data), {
    headers: headersNew  
  })
  .subscribe(res =>  {
console.log(res);                     
if(res.toString()=="yes")        
{
loader.dismiss();
let toast = this.toastCtrl.create({
message: 'Registration completed',
duration: 2000
});  
toast.present();
this.storage.set('mobileNo',this.data.mobileNo);
this.storage.set('email',this.data.email);
this.navCtrl.setRoot(LoginagianPage);
}
else{
loader.dismiss();
let toast = this.toastCtrl.create({
message: 'Not Registration.',        
duration: 2000
});
toast.present();
}
}, (err) => {
loader.dismiss();
let toast = this.toastCtrl.create({
message: 'Not Registration.',
duration: 2000
});
toast.present();
});   
});
}
termAlert() {
   if(this.teapCheack==true){
    document.getElementById('light').style.display='block';
    document.getElementById('fade').style.display='block';
    //$('#registationPage').css("position", "fixed");
     this. btnSubmit=true;
  }
  else{
  this.btnSubmit=false;
  }   
}
}
