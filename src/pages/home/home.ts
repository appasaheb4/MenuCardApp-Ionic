import { Component,ViewChild } from '@angular/core';
import { HomeproProvider } from '../../providers/homepro/homepro';
import { NavController,Slides } from 'ionic-angular';
import {  MenuController } from 'ionic-angular/index';
import { CallNumber } from '@ionic-native/call-number';
import { SocialSharing } from '@ionic-native/social-sharing';
import {Storage} from '@ionic/storage';
import { ImgLoader,ImageLoaderConfig } from 'ionic-image-loader';

import { AddmenuPage } from '../addmenu/addmenu';
import { MenushowPage } from '../menushow/menushow';
import { RestshowPage } from '../restshow/restshow';
import { RestlocationshowPage } from '../restlocationshow/restlocationshow';


@Component({    
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[HomeproProvider]
})
export class HomePage {
@ViewChild('pageSlider') pageSlider: Slides;
tabs: any = '0';
toggled: boolean;
searchTerm: String = '';
public getSeletedTabMode:string="Menu";
public getAllRest:any;
public getFullData:any;
public items: any;
public userId:any;  
constructor(private imageLoaderConfig: ImageLoaderConfig,public storage:Storage,private socialSharing: SocialSharing,private callNumber: CallNumber,private menu: MenuController,public navCtrl: NavController,public  personservice:HomeproProvider) {
this.toggled = false;  
this.storage.get('userId').then((val) => {
this.getRestUserWiseData(val);     
this.getMenuListDataLoad(val);
this.getRestAllData();
this.userId=val;
});
       
    this.imageLoaderConfig.enableSpinner(true);
    this.imageLoaderConfig.setBackgroundSize('cover');
    this.imageLoaderConfig.setFallbackUrl('assets/download.png');   
}
ionViewDidEnter() {
this.menu.enable(true, 'menu1');
}

onImageLoad(imgLoader: ImgLoader) {
  // do something with the loader
}

getMenuListDataLoad(val){
this.personservice.getUserData(val)
.then(data =>{
this.items=data;
});     
}

getRestUserWiseData(val){
this.personservice.getAdminData(val)
.then(data =>{  
this.getAllRest=data;
});
}

toggleSearch() {

this.toggled = this.toggled ? false : true;
 

}
setFilteredItems() {
if(this.getSeletedTabMode=="Menu"){
 this.items = this.personservice.filterItems(this.searchTerm);
 }
 else
 {
    this.getFullData = this.personservice.filterItemsRest(this.searchTerm);
  }
    }


getRestAllData(){
this.personservice.getAllRestMethod(this.userId)
.then(data =>{
this.getFullData=data;
});
}


selectTab(index) {
if(index==0){
this.getSeletedTabMode = "Menu";
}
else
{
this.getSeletedTabMode = "Rest";
}
this.pageSlider.slideTo(index);
this.toggled=false;
this.searchTerm=null;
}
changeWillSlide($event) {
this.tabs = $event._snapIndex.toString();
if(this.tabs==0){
this.getSeletedTabMode = "Menu";
}
else
{
this.getSeletedTabMode = "Rest";
}
this.searchTerm=null;
this.toggled=false;
this.searchTerm=null;
}

addMenu(){
this.navCtrl.push(AddmenuPage);
}

openMyMenuPage(value){
this.navCtrl.push(MenushowPage,{
"param1":value
});
}

openRestMenuPage(value){
this.navCtrl.push(RestshowPage,{
"param1":value
});
}
  locationPageShow(restName,area,sub,city,state){  
this.navCtrl.push(RestlocationshowPage,{
"param1":restName,"param2":area,"param3":sub,"param4":city,"param5":state
});
  }

regularShareMenu(restName,area,city,imagePath){
if(imagePath=="http://menuapphybrid.newapptec.com/")
this.socialSharing.share(restName +','+ area +',' + city +'\n','Menu App',null,'http://menuapphybrid.newapptec.com');
else
this.socialSharing.share(restName +','+ area +',' + city +'\n','Menu App',imagePath,'http://menuapphybrid.newapptec.com');
}



launchDialer(n:string){
this.callNumber.callNumber(n, true)
.then(() => console.log('Launched dialer!'))
.catch(() => console.log('Error launching dialer'));
}



}
