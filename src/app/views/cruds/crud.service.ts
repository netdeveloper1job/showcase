import { Injectable } from '@angular/core';
import { UserDB } from '../../shared/fake-db/users';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthGuard } from '../../shared/services/auth/auth.guard';

@Injectable()
export class CrudService {
  items: any[];
  userdata: any;
  constructor(private authguardservice:AuthGuard) {
    let userDB = new UserDB();
    this.items = userDB.users;
  }

  //******* Implement your APIs ********
  getItems(url): Observable<any> {
	  this.authguardservice.getallusers(url)
	  .subscribe(data => {
			this.userdata = JSON.parse(data);
			// console.log(data);
			// if(this.userData.status == 0){
				// this.snackBar.open(this.loginData.message, 'close', { duration: 2000 });
			// }
		});
    return  of(this.userdata.slice())
  }
  addItem(item): Observable<any> {
    item._id = Math.round(Math.random() * 10000000000).toString();
    this.items.unshift(item);
    return of(this.items.slice()).pipe(delay(1000));
  }
  updateItem(id, item) {
    this.items = this.items.map(i => {
      if(i._id === id) {
        return Object.assign({}, i, item);
      }
      return i;
    })
    return of(this.items.slice()).pipe(delay(1000));
  }
  removeItem(row) {
    let i = this.items.indexOf(row);
    this.items.splice(i, 1);
    return of(this.items.slice()).pipe(delay(1000));
  }
}