import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {  MenuController } from 'ionic-angular/index';
import { AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {Storage} from '@ionic/storage';   
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { HomePage } from '../home/home';
//@IonicPage()  
@Component({
 selector: 'page-loginagian',
  templateUrl: 'loginagian.html',
})
export class LoginagianPage {
public loginForm:any;
public mobileNo:string;
public password:string;
public tokenNo:string;
constructor(public _form:FormBuilder,public alertCtrl: AlertController,private menu: MenuController,public navCtrl: NavController, public navParams: NavParams,public http: HttpClient,public loading: LoadingController,public toastCtrl: ToastController,public storage:Storage) {
this.loginForm=this._form.group({
'mobileNo': [null,  Validators.required],
'password': [null, Validators.required],
});
}

ionViewDidEnter() {
this.menu.enable(false, 'menu1');
}


login(){
let loader = this.loading.create({
content: 'Wating.........',
});

loader.present().then(() => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {
mobileNo: this.mobileNo,
password: this.password,
tokenNo:'1234',
}
this.http.post('http://menuapphybrid.newapptec.com/LoginPage/loginMobile', JSON.stringify(data), {
    headers: headersNew
  })
  .subscribe(res =>  {
var array = res.toString().split('=');
if(array[0]=="yes")
{
loader.dismiss();
this.storage.set('mobileNo',this.mobileNo);
this.storage.set('password',this.password);
//this.storage.set('userId', array[1]);
this.navCtrl.setRoot(HomePage);
}
else{
loader.dismiss();
let toast = this.toastCtrl.create({
message: 'Please enter correct mobile number and password.',
duration: 2000  
});
toast.present();
}   
}, (err) => {
loader.dismiss();
let toast = this.toastCtrl.create({
message: 'Please enter correct mobile number and password.',
duration: 2000
});
toast.present();
});
});

}

emailSent() {      
	  let alert = this.alertCtrl.create({
	    title: 'Forgot Password',
	    inputs: [
	      {
	        name: 'email',
                type:'email',
	        placeholder: 'Email'
	      },
	    ],
	    buttons: [
	      {
	        text: 'Cancel',
	      },
	      {
	        text: 'Sent',
	        handler: data12 => {
	        let loader = this.loading.create({
	        	    content: 'Wating.........',
	        	  });
	        	loader.present().then(() => {
	        	let headersNew = new HttpHeaders();
                        headersNew.append('Content-Type', 'application/json');
	        	  let data = {
	        	  email: data12.email   
	        	}
                        this.http.post('http://menuapphybrid.newapptec.com/LoginPage/forGetPassMobile', JSON.stringify(data), {
                             headers: headersNew  
                            })
                        .subscribe(res => { 
	        	  if(res.toString()=="yes")
	        	  {   
	        	    loader.dismiss();
	        	    let toast = this.toastCtrl.create({
	        	    message: 'Email sent.',
	        	    duration: 2000
	        	  });
	        	  toast.present();
	        	  }
	        	  else{
	        	    loader.dismiss();
	        	    let toast = this.toastCtrl.create({
	        	    message: 'Correct insert email Address.',
	        	    duration: 2000
	        	  });
	        	  toast.present();

	        	  }
	        	}, (err) => {
	        		 loader.dismiss();
	        		    let toast = this.toastCtrl.create({
	        		    message: 'Password not sent.',
	        		    duration: 2000
	        		  });
	        		  toast.present();
	        	});
	        	 });
 }
	      }
	    ]
	  });
	  alert.present();
	}

}

