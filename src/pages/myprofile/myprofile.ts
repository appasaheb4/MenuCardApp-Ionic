import { Component } from '@angular/core';
import { ActionSheetController,Platform, NavController, NavParams} from 'ionic-angular';
import { ChangepasswordPage } from '../changepassword/changepassword';
import {  Validators,FormBuilder } from '@angular/forms';
import {Storage} from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';  


interface myProfile {
  userAllInformation: string;
}

declare var cordova: any;
//@IonicPage()
@Component({   
selector: 'page-myprofile',
templateUrl: 'myprofile.html',
})
export class MyprofilePage {      
public updateStatus: boolean = false;
public disName: boolean = false;
public myprofileForm:any;
public name:any;
public mobileNo:any;
public email:any;
public address:any;
public area:any;
public city:any;
public pincode:any;
public state:any;
public country:any;
public base64Image:any;
public userId:any;
public allUserData:any;
profileIcon: string = null;   
constructor(public platform: Platform,public actionSheetCtrl: ActionSheetController,private transfer: Transfer,private camera: Camera, private file: File, private filePath: FilePath,public http: HttpClient,public loading: LoadingController,public toastCtrl: ToastController,public storage:Storage,public _form:FormBuilder,public navCtrl: NavController, public navParams: NavParams) {

this.myprofileForm=this._form.group({  
'name': [null,  Validators.required],
'mobileNo': [null, Validators.compose([Validators.maxLength(10), Validators.required])],
'email' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50),Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)])],
'city': [null,  Validators.required],
'address' : [null],
'area': [null,  Validators.required],  
'pincode'  : [null]
});
this.storage.get('userId').then((val) => {
this.userId=val;
});
this.loadData();

}      
 


public presentActionSheet() {
let actionSheet = this.actionSheetCtrl.create({
title: 'Select Image Source',
buttons: [
{
text: 'Load from Library',
handler: () => {
this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
}
},
{
text: 'Use Camera',
handler: () => {
this.takePicture(this.camera.PictureSourceType.CAMERA);
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

public takePicture(sourceType) {
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
this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
});
} else {
var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
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
private copyFileToLocalDir(namePath, currentName, newFileName) {
this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
this.profileIcon = newFileName;
this.uploadImage(newFileName);
}, error => {
this.presentToast('Error while storing file.');
});
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
var url = "http://menuapphybrid.newapptec.com/MyProfile/mobileUploadImage";
var targetPath = this.pathForImage(val);
var options = {
chunkedMode: false,
fileKey: "file",      
fileName: val,
mimeType: "multipart/form-data",
params : {
'imageName': val,'userId': this.userId }
};   
const fileTransfer: TransferObject = this.transfer.create();
let loader = this.loading.create({
content: 'Wait...',
});
loader.present();
fileTransfer.upload(targetPath,url, options).then(data => {
loader.dismissAll()

this.platform.ready()
.then(() => {
console.log(this.platform.is('android'))
}) 

console.log('Image succesful uploaded.');
}, err => {
loader.dismissAll()
alert('Error while uploading file.');
});
}

  

loadData(){  
let loader = this.loading.create({
content: 'Wating.........',   
});                            
loader.present().then(() => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {
id: this.userId,                   
}     

this.http.post<myProfile>('http://menuapphybrid.newapptec.com/MyProfile/getUserAllInformation', JSON.stringify(data), {
    headers: headersNew
  })   
  .subscribe(res =>  {
this.allUserData=res.userAllInformation;
this.name=this.allUserData[0].name;
this.mobileNo=this.allUserData[0].mobileNo;
this.email=this.allUserData[0].email;
this.address=this.allUserData[0].address;
this.area=this.allUserData[0].area;   
this.city=this.allUserData[0].city;
this.pincode=this.allUserData[0].pin;   
this.state=this.allUserData[0].state;
this.country=this.allUserData[0].country;
this.base64Image=this.allUserData[0].imagePath;  
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

updateData(){
let loader = this.loading.create({
content: 'Wating.........',
});
loader.present().then(() => {
let headers = new Headers();
headers.append('Content-Type', 'application/json');
let data = {
name: this.name,
mobileNo: this.mobileNo,
email:this.email, 
address:this.address,
area:this.area,
city:this.city,
pincode:this.pincode,
state:this.state,
country:this.country,
userId: this.userId,
}     


this.http.post('http://menuapphybrid.newapptec.com/MyProfile/updateDataMobile', JSON.stringify(data), {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  })
  .subscribe(res =>  {
if(res=="yes")             
{
loader.dismiss();     
let toast = this.toastCtrl.create({
message: 'Update Data',
duration: 2000    
});
toast.present(); 
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



editAction(){
this.updateStatus=true;
this.disName=true;
}
  
openChangePassword(){
this.navCtrl.push(ChangepasswordPage);
}

}
