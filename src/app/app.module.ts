import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { IonicImageLoader } from 'ionic-image-loader';
import { IonicStorageModule } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import {
 GoogleMaps
} from '@ionic-native/google-maps'; 
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { Geolocation } from '@ionic-native/geolocation';

  
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AddmenuPage } from '../pages/addmenu/addmenu';
import { MenushowPage } from '../pages/menushow/menushow';
import { RestshowPage } from '../pages/restshow/restshow';
import { RestlocationshowPage } from '../pages/restlocationshow/restlocationshow';
import { MenudataupdatePage } from '../pages/menudataupdate/menudataupdate';
import { LoginPage } from '../pages/login/login';
import { RegistationPage } from '../pages/registation/registation';
import { LoginagianPage } from '../pages/loginagian/loginagian';
import { MyprofilePage } from '../pages/myprofile/myprofile';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { SplashscreenPage } from '../pages/splashscreen/splashscreen';

import { ZoomingeffectnewPage } from '../pages/zoomingeffectnew/zoomingeffectnew';




import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({   
  declarations: [
    MyApp,
    HomePage,
    ListPage,
LoginPage,RegistationPage,LoginagianPage,SplashscreenPage,AddmenuPage,MenushowPage,RestshowPage,RestlocationshowPage,
MenudataupdatePage,MyprofilePage,ChangepasswordPage,ZoomingeffectnewPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
HttpClientModule,
IonicStorageModule.forRoot(),
	IonicImageViewerModule,
        IonicImageLoader.forRoot(),BootstrapModalModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
LoginPage,RegistationPage,LoginagianPage,SplashscreenPage,AddmenuPage,MenushowPage,RestshowPage,RestlocationshowPage,
MenudataupdatePage,MyprofilePage,ChangepasswordPage,ZoomingeffectnewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
 CallNumber,
    SocialSharing,
Geolocation,
 File,
    Transfer,
    Camera,
    FilePath,
GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
