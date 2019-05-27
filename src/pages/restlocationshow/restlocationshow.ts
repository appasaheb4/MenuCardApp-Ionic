import { Component,ViewChild, ElementRef  } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {  MenuController } from 'ionic-angular/index';
import { AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;  

//@IonicPage()
@Component({
  selector: 'page-restlocationshow',
  templateUrl: 'restlocationshow.html',
})
export class RestlocationshowPage {
@ViewChild('map') mapElement: ElementRef;
    data={restName:"",area:"",sub:"",city:"",state:"",country:"India",fullAddress:""};
constructor(private geolocation: Geolocation,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public http: HttpClient,public loading: LoadingController,public toastCtrl: ToastController) {
this.data.restName = navParams.get('param1');
this.data.area = navParams.get('param2');
this.data.sub = navParams.get('param3');
this.data.city = navParams.get('param4');
this.data.state = navParams.get('param5');
this.data.fullAddress=this.data.restName+","+this.data.area+","+this.data.sub+","+this.data.city+","+this.data.country;
}

back(){
this.navCtrl.pop();    
}

ionViewDidEnter(){
this.getLangLat(this.data.fullAddress);
}

getLangLat(val){         
let loader = this.loading.create({    
content: 'Wating.........',         
});
loader.present().then(() => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {  
locationName:val,                      
}
//this.http.post('http://menuapphybrid.newapptec.com/GoogleMapLagLatNew/getLanLat', JSON.stringify(data), {
  //  headers: headersNew  
  //})

this.http.post('http://www.myapparelhub.com/get_data.php', JSON.stringify(data), {  
    headers: headersNew      
  })
.subscribe(res => {      
var newArry= res.toString();;
var array =  newArry.split('=');   
 console.log(array[0]);
console.log(array[1]);   
this.loadMap(array[0],array[1]);
loader.dismiss(); 
}, (err) => {
loader.dismiss();
let toast = this.toastCtrl.create({
message: 'Google map error.',
duration: 2000
});
toast.present();
});
});

}

  
  loadMap(lat,lag){  
    const location = new google.maps.LatLng(lat, lag);
    const mapOptions = {
      center: location,
      zoom: 15,
      mapTypeId:'hybrid'    ///google.maps.MapTypeId.ROADMAP
    }
    const map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  this.addMarker(location,map);
 }

currentLocation(){
  this.geolocation.getCurrentPosition().then((position) => {
      let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: location,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      const map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
     
    }, (err) => {
      console.log(err);
    });
  }  
 
addMarker(possition,map){
  let marker = new google.maps.Marker({
    map: map,
    animation: google.maps.Animation.DROP,
    position: map.getCenter()
  });
 
  let content = "<h4>Menu Card</h4>";         
  this.addInfoWindow(marker, content,map);
}


addInfoWindow(marker, content,map){
 let infoWindow = new google.maps.InfoWindow({
    content: content
  });
 google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(map, marker);
  });
 
}




}
