import { Component } from '@angular/core';
import { ActionSheetController,Platform, NavController, NavParams,Loading} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Validators,FormBuilder } from '@angular/forms';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {Storage} from '@ionic/storage';  
import { HttpClient,HttpHeaders } from '@angular/common/http';


import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';


import { HomePage } from '../home/home';
declare var cordova: any;
      


//@IonicPage()
@Component({
selector: 'page-addmenu',
templateUrl: 'addmenu.html',
})
export class AddmenuPage {
public addUserMenuForm:any;
loadingCtrl: Loading;
public date:any;
public restName:any;
public  type : any;
public phoneNo1:any;
public phoneNo2:any;
public address:any;
public area:any;
public road:any;
public city:any;
public pincode:any;
public state:any;
public userId:any;
public base64Image:any;
//private base64textString : any;

imagePath1: string = null;
imagePath2: string = null;
imagePath3: string = null;
imagePath4: string = null;
imagePath5: string = null;
imagePath6: string = null;
imagePath7: string = null;
imagePath8: string = null;
imagePath9: string = null;
imagePath10: string = null;
public typeNewValuelocal : string;
selBol :boolean =true;
cucumber: boolean;
selVal:any;   
public getTypeValue: any[];       
public typeValue=[{name:"Veg",value:"Veg"},{name:"Non-Veg",value:"Non-Veg"}];              

locations = [{location_id:1,location_name:'name11'},{location_id:2,location_name:'name22'},{location_id:3,location_name:'name33'}]
   //private localNotifications: LocalNotifications,
constructor(public platform: Platform,public actionSheetCtrl: ActionSheetController,private camera: Camera, private file: File, private filePath: FilePath,public _form:FormBuilder,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public http: HttpClient,public loading: LoadingController,public toastCtrl: ToastController,public storage:Storage,private transfer: Transfer) {
this.date=new Date().toISOString();
this.addUserMenuForm=this._form.group({         
'date': [null,  Validators.required],
'restName': [null,  Validators.required],
'phoneNo1': [null, Validators.compose([Validators.maxLength(10), Validators.required])],
'address': [null],
'area': [null,  Validators.required],
'city': [null,  Validators.required],
'type' : [null],
});
this.storage.get('userId').then((val) => {
this.userId=val;
});
this.base64Image="http://menuapphybrid.newapptec.com/Content/Images/Icon/selectImage.png";

this.getTypeValue=[];
}


public presentActionSheet(val) {
let actionSheet = this.actionSheetCtrl.create({
title: 'Select Image Source',
buttons: [
{
text: 'Load from Library',
handler: () => {
this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY,val);
}
},
{
text: 'Use Camera',
handler: () => {
this.takePicture(this.camera.PictureSourceType.CAMERA,val);
}
},
{
text: 'Cancel',
role: 'cancel'
}
]
});
actionSheet.present();
}

public takePicture(sourceType,val) {
// Create options for the Camera Dialog
var options = {
quality: 100,
sourceType: sourceType,
saveToPhotoAlbum: false,
correctOrientation: true
};

// Get the data of an image
this.camera.getPicture(options).then((imagePath) => {
// Special handling for Android library
if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
this.filePath.resolveNativePath(imagePath)
.then(filePath => {
let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
this.copyFileToLocalDir(correctPath, currentName, this.createFileName(),val);
});
} else {
var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
this.copyFileToLocalDir(correctPath, currentName, this.createFileName(),val);
}
}, (err) => {
this.presentToast('Error while selecting image.');
});
}


//Create a new name for the image
private createFileName() {
var d = new Date(),
n = d.getTime(),
newFileName =  n + ".jpg";
return newFileName;
}

// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName,val) {
if(val==1){
this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
this.uploadImage(newFileName);
this.imagePath1 = newFileName;
//this.platform.ready()
//.then(() => {
//console.log(this.platform.is('android'))
//this.localNotifications.schedule({
//id: 1,
//text: 'I image upload.',
//sound: 'res://platform_default',  
//data: { secret: 'Image Upload' },
//icon: 'file://img/icon.png'
//});
//})
}, error => {
this.presentToast('Error while storing file.');
});
}
else if(val==2){
this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
this.uploadImage(newFileName);
this.imagePath2 = newFileName;

}, error => {
this.presentToast('Error while storing file.');
});
}
else if(val==3){
this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
this.uploadImage(newFileName);
this.imagePath3 = newFileName;

}, error => {
this.presentToast('Error while storing file.');
});
}
else if(val==4){
this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
this.uploadImage(newFileName);
this.imagePath4 = newFileName;
}, error => {
this.presentToast('Error while storing file.');
});
}
else if(val==5){
this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
this.uploadImage(newFileName);
this.imagePath5 = newFileName;
}, error => {
this.presentToast('Error while storing file.');
});
}
else if(val==6){
this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
this.uploadImage(newFileName);
this.imagePath6 = newFileName;
}, error => {
this.presentToast('Error while storing file.');
});
}
else if(val==7){
this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
this.uploadImage(newFileName);
this.imagePath7 = newFileName;
}, error => {
this.presentToast('Error while storing file.');
});
}
else if(val==8){
this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
this.uploadImage(newFileName);
this.imagePath8 = newFileName;
}, error => {
this.presentToast('Error while storing file.');
});
}
else if(val==9){
this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
this.uploadImage(newFileName);
this.imagePath9 = newFileName;
}, error => {
this.presentToast('Error while storing file.');
});
}
else if(val==10){
this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
this.uploadImage(newFileName);
this.imagePath10 = newFileName;
}, error => {
this.presentToast('Error while storing file.');
});
}
else{
alert('Plz try again.');
}
}

private presentToast(text) {
let toast = this.toastCtrl.create({
message: text,
duration: 3000,
position: 'top'
});
toast.present();
}

// Always get the accurate path to your apps folder
public pathForImage(img) {
if (img === null) {
return '';
} else {
return cordova.file.dataDirectory + img;
}
}


public uploadImage(val) {
this.presentLoadingDefault();
var url = "http://menuapphybrid.newapptec.com/AddRestaurants/mobileUploadImage";
var targetPath = this.pathForImage(val);
var options = {
chunkedMode: false,
fileKey: "file",
fileName: val,
mimeType: "multipart/form-data",
params : {
'imageName': val
}
};
const fileTransfer: TransferObject = this.transfer.create();
fileTransfer.upload(targetPath,url, options).then(data => {
}, err => {
alert('Error while uploading file.');
});
}


presentLoadingDefault() {
  let load = this.loading.create({
    content: 'wait...'
  });
  load.present();
  setTimeout(() => {
    load.dismiss();
  }, 3000);
}


saveData(){
let loader = this.loading.create({
content: 'Wating.........',
});
loader.present().then(() => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {
date: this.date,
restName: this.restName,
typeValue : this.typeNewValuelocal,
phoneNo1:this.phoneNo1,
phoneNo2:this.phoneNo2,
address:this.address,
area:this.area,
suburb:this.road,
city:this.city,
pincode:this.pincode,
state:this.state,
userId:this.userId,
image1:this.imagePath1,
image2:this.imagePath2,
image3:this.imagePath3,
image4:this.imagePath4,
image5:this.imagePath5,
image6:this.imagePath6,
image7:this.imagePath7,
image8:this.imagePath8,
image9:this.imagePath9,
image10:this.imagePath10,
}
this.http.post('http://menuapphybrid.newapptec.com/AddRestaurants/addUserMenuList', JSON.stringify(data), {
    headers: headersNew,
})
.subscribe(res =>  {
if(res.toString()=="yes")
{
loader.dismiss();
let toast = this.toastCtrl.create({
message: 'Data saved.',
duration: 2000
});
toast.present();
this.navCtrl.setRoot(HomePage);
}
}, (err) => {
loader.dismiss();
let toast = this.toastCtrl.create({
message: 'Data  saved.',
duration: 2000
});
toast.present();
this.navCtrl.setRoot(HomePage);
});
});
}    

updateCucumber(val) {
this.getTypeValue.push(val);   
 this.typeNewValuelocal = this.getTypeValue.join(",");                

  }
}
