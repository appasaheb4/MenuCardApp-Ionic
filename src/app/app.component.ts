import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,ModalController,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Storage} from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SplashscreenPage } from '../pages/splashscreen/splashscreen';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

   

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { AddmenuPage } from '../pages/addmenu/addmenu';
import { MyprofilePage } from '../pages/myprofile/myprofile';


     
@Component({
selector: 'app-page',  
templateUrl: 'app.html'  
})  
export class MyApp {
@ViewChild(Nav) nav: Nav; 
public rootPage:any;  
pages: Array<{title: string, component: any,icon: any}>;
constructor(public alertCtrl: AlertController,private modalCtrl:ModalController,private socialSharing: SocialSharing,private storage:Storage,private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen) {
this.initializeApp();
// used for an example of ngFor and navigation
this.pages = [       
{ title: 'Home', component: HomePage,icon:'http://menuapphybrid.newapptec.com/Content/Images/Icon/homeMenuIcon/sliderHome.png' },
{ title: 'Add Menu', component: AddmenuPage,icon:'http://menuapphybrid.newapptec.com/Content/Images/Icon/homeMenuIcon/addMenu.png' },
{ title: 'My Profile', component: MyprofilePage,icon:'http://menuapphybrid.newapptec.com/Content/Images/Icon/homeMenuIcon/myProfile.png' },
{ title: 'Share', component: ListPage ,icon:'http://menuapphybrid.newapptec.com/Content/Images/Icon/homeMenuIcon/share.png' },
{ title: 'Logout', component: LoginPage,icon:'http://menuapphybrid.newapptec.com/Content/Images/Icon/homeMenuIcon/logout.png' },
];   
}
             
initializeApp() {             
this.platform.ready().then(() => {
this.splashScreen.hide();
this.statusBar.backgroundColorByHexString('#339966');
//let splash = this.modalCtrl.create(SplashscreenPage);   
//splash.present();
this.showPage();
});    
}

hideSplashScreen() {
    if (this.splashScreen) {
        setTimeout(() => {
            this.splashScreen.hide();
        }, 100);
    }
}


showPage(){
this.storage.get('userId').then((val) => {
this.storage.get('mobileNo').then((val2) => {
if(val!=null && val2!=null)     
{
this.rootPage=HomePage;
}
else{
this.rootPage=LoginPage;
}
});
});
}


openPage(page) {
if(page.component==HomePage)
{
this.nav.setRoot(page.component);
}else if(page.component==LoginPage)
{
let confirm = this.alertCtrl.create({
      title: '',
      message: 'Are you sure you want to Sign out?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
         this.storage.remove('userId');
this.storage.remove('mobileNo');
this.storage.remove('password'); 
this.nav.setRoot(LoginPage);   

          }
        }
      ]
    });
    confirm.present();
}else if(page.component==ListPage)   
{
this.socialSharing.share('Menu App'+'\n',null,'http://menuapphybrid.newapptec.com/Content/Images/Icon/icon.png','http://menuapphybrid.newapptec.com'); 
}    
else
{
this.nav.push(page.component);
}    
}


}
