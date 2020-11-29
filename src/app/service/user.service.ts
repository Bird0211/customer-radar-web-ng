import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { env } from 'process';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageResult, Result, User } from '../interface';

@Injectable({
  providedIn: 'root'
})

/**
 * User Service
 */
export class UserService {

  searchUserUrl: string;
  addUserUrl: string;
  delUserUrl: string;
  updateUrl: string;
  getUsersUrl: string;


  constructor(private http: HttpClient,
              private modal: NzModalService
    ) {
    this.searchUserUrl = environment.searchUserUrl;
    this.addUserUrl = environment.addUserUrl;
    this.delUserUrl = environment.delUserUrl;
    this.updateUrl = environment.updateUrl;
    this.getUsersUrl = environment.getUsersUrl;
  }

  /**
   * Get Users
   * @param pageIndex page N0.
   * @param pageSize page size
   */
  allUsers(pageIndex: number, pageSize: number): Observable<PageResult> {
    const observeble = new Observable<PageResult>(
      (observer) => {
        this.getUsers(pageIndex, pageSize).subscribe((result: Result) => {
          if (result && result.statusCode === 0) {
            observer.next(result.data);
          } else {
            this.modal.error({
              nzTitle: result.description
            });
            observer.error();
          }
        });
      }
    );

    return observeble;
  }

  private getUsers(pageIndex: number, pageSize: number) {
    const url = this.getUsersUrl + '/' + pageIndex + '/' + pageSize;
    return this.http.get(url);
  }

  /**
   * Search User By Phone
   *
   * @param phone phone number
   */
  searchUser(phone: string): Observable<User> {
    const observeble = new Observable<User>(
      (observer) => {
        this.getUserByPhone(phone).subscribe((result: Result) => {
          if (result && result.statusCode === 0) {
            observer.next(result.data);
          } else {
            this.modal.error({
              nzTitle: result.description
            });
            observer.error();
          }
        });
      }
    );
    return observeble;
  }

  private getUserByPhone(phone: string) {
     const url = this.searchUserUrl + '/' + phone;
     return this.http.get(url);
  }

  /**
   * Delete User By Id
   * @param id 
   */
  removeUser(id: number): Observable<void> {
    const observeble = new Observable<void>(
      (observer) => {
        this.delUser(id).subscribe((result: Result) => {
          if (result && result.statusCode === 0) {
            observer.next();
          } else {
            this.modal.error({
              nzTitle: result.description
            });
            observer.error();
          }
        });
      }
    );
    return observeble;
  }

  private delUser(id: number) {
    const url = this.delUserUrl + '/' + id;
    return this.http.delete(url);
  }

  /**
   * Create user
   * @param user user
   */
  addUser(user: User): Observable<User> {
    const observeble = new Observable<User>(
      (observer) => {
        this.putUser(user).subscribe((result: Result) => {
          if (result && result.statusCode === 0) {
            observer.next(result.data);
          } else {
            this.modal.error({
              nzTitle: result.description
            });
            observer.error();
          }
        });
      }
    );
    return observeble;
  }

  private putUser(user: User) {
    const url = this.addUserUrl;
    return this.http.put(url, user);
  }

  updateUser(user: User): Observable<void> {
    const observeble = new Observable<void>(
      (observer) => {
        this.postUpdateUser(user).subscribe((result: Result) => {
          if (result && result.statusCode === 0) {
            observer.next();
          } else {
            this.modal.error({
              nzTitle: result.description
            });
            observer.error();
          }
        });
      }
    );
    return observeble;
  }

  private postUpdateUser(user: User) {
    const url = this.updateUrl;
    return this.http.post(url, user);
  }

}
