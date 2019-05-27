import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';



interface HomePro {
  UserAddmenulist: string;
  menulist: string;
  menulistAll: string;
}




@Injectable()
export class HomeproProvider {
data: any;
items: any;
getFullData : any;
 constructor(public http: HttpClient) {
 this.data = null;
}
   filterItems(searchTerm){
       return this.items.filter((item) => {             
            return (item.restName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || item.area.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || item.city.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        });    
    }
       
    filterItemsRest(searchTerm){
    
       return this.getFullData.filter((item) => {             
            return (item.restName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || item.area.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || item.city.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        });    
    }
       
getUserData(val){  
if (this.data) {
return Promise.resolve(this.data);
}    
return new Promise(resolve => {    
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {
userId: val,                               
}     
this.http.post<HomePro>('http://menuapphybrid.newapptec.com/AddRestaurants/getUserAddMenuMobile', JSON.stringify(data), {
    headers: headersNew
  })
  .subscribe(res =>  {
 this.data = res.UserAddmenulist;
this.items = res.UserAddmenulist; 
    resolve(this.data);
  }, (err) =>  {
    
  });

  });
}     

getAdminData(val){   
if (this.data) {
return Promise.resolve(this.data);    
}
return new Promise(resolve => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {
userId: val,                                       
}    
this.http.post<HomePro>('http://menuapphybrid.newapptec.com/AddMenu/getAddMenuMobile', JSON.stringify(data), {
    headers: headersNew     
  })
  .subscribe(res =>  {     
    this.data = res.menulist;  
    resolve(this.data);
  }, (err) =>  {    
  });   
});
}    
       
      
            
getAllRestMethod(userId) {       
if (this.data) {
    return Promise.resolve(this.data);
}    
return new Promise(resolve => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {
userId: userId,                                       
} 
    this.http.post<HomePro>('http://menuapphybrid.newapptec.com/AddMenu/getAddMenuMobileAll',JSON.stringify(data), {
    headers: headersNew     
  })
  .subscribe(res =>  { 
    this.data = res.menulistAll;
    this.getFullData = res.menulistAll; 
    resolve(this.data);
  }, (err) =>  {
    
  });

  
});
}      


}
