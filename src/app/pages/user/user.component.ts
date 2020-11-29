import { Component, OnInit } from '@angular/core';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { PageResult, User } from 'src/app/interface';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})

/**
 * User Component
 * Manage user
 */
export class UserComponent implements OnInit {

  keyError: string;   // search key word
  dataSource: User[] = [];  // User Data
  isVisible = false;  // Show Add and Edit modal

  // Table Columns
  displayedColumns: string[] = ['name', 'phone', 'address', 'option'];

  name = new FormControl('', [Validators.required]);  // User Name
  phone = new FormControl('', [Validators.required, this.numberOnly, Validators.maxLength(14)]);
  address = new FormControl('');
  key = new FormControl('', [Validators.required, this.numberOnly, Validators.maxLength(14)]);

  title: string;  // Model Title (add or edit)
  editId: number;   // Edit User Id

  pageIndex = 0;
  pageSize = 20;
  total = 0;

  constructor(private userService: UserService,
              private modal: NzModalService,
              private message: NzMessageService) { }

  ngOnInit(): void {
    this.allUser();
  }

  allUser() {
    this.userService.allUsers(this.pageIndex + 1, this.pageSize).subscribe((result: PageResult) => {
      this.total = result.total;
      this.dataSource = result.data;
      this.pageIndex = result.pageIndex - 1;
      this.pageSize = result.pageSize;
    });
  }

  /**
   * Search User By Key word
   */
  search() {
     if (this.key.value) {
        this.keyError = '';
        this.userService.searchUser(this.key.value).subscribe((user: User) => {
          this.dataSource = [user];
          this.pageIndex = 0;
          this.pageSize = 1;
          this.total = 1;
        });
     }
  }

  /**
   *  Add User
   *  Show the add modal
   */
  addUser() {
    this.title = 'Add User';
    this.isVisible = true;
    this.editId = null;
  }

  /**
   * Remove User By UserId
   * @param id UserId
   */
  remove(id: number) {
    this.userService.removeUser(id).subscribe(() => {
      this.modal.success({
        nzTitle: 'User has been successfully deleted !'
      });

      this.dataSource = this.dataSource.filter(item => item.id !== id);
    });
  }

  /**
   * Show Edit model
   * @param user UserInfo
   */
  update(user: User) {
    this.name.patchValue(user.name);
    this.phone.patchValue(user.phone);
    this.address.patchValue(user.address);
    this.editId = user.id;

    this.title = 'Edit User';
    this.isVisible = true;
  }

  /**
   * Hide Add or Edit Model
   */
  handleCancel() {
    this.isVisible = false;
    this.name.patchValue('');
    this.phone.patchValue('');
    this.address.patchValue('');
    this.name.clearValidators();
    this.phone.clearValidators();
    this.editId = null;
  }

  /**
   * Submit data to Create or Edit User
   */
  handleOk() {
    const user: User = {
      name: this.name.value,
      phone: this.phone.value,
      address: this.address.value,
      id: this.editId
    };

    if (!this.editId) {
      this.userService.addUser(user).subscribe((result: User) => {
        this.dataSource = [result, ...this.dataSource];
        this.isVisible = false;
        this.message.success('User created successfully!');
        this.total ++;
      });
    } else {
      this.userService.updateUser(user).subscribe(() => {
        const data = [];
        this.dataSource.forEach(item => {
          if (item.id === user.id) {
            data.push(user);
          } else {
            data.push(item);
          }
        });
        this.dataSource = data;
        this.isVisible = false;
        this.message.success('User edited successfully!');
      });
    }
  }

  /**
   * Get Name Error Message
   */
  getNameMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }

  /**
   * Get Phone Error Message
   */
  getPhoneMessage() {
    let errorMsg = '';
    if (this.phone.hasError('required')) {
      errorMsg = 'You must enter a value';
    } else if (this.phone.hasError('maxlength') || this.phone.hasError('number')) {
      errorMsg = 'Invalid Phone';
    }
    return  errorMsg;
  }

  /**
   * Get Search Word Error Message
   */
  getKeyMessage() {
    let errorMsg = '';
    if (this.key.hasError('required')) {
      errorMsg = 'You must enter a value';
    } else if (this.key.hasError('maxlength') || this.key.hasError('number')) {
      errorMsg = 'Invalid Phone';
    }
    return  errorMsg;
  }

  /**
   *  Check isNumber
   *  @param control FormControl
   */
  numberOnly(control: FormControl): ValidationErrors {
    const regex = /^[0-9]*$/;
    return regex.test(control.value) ? null : { number: false };
  }

  pageChange(value: PageEvent) {
    this.total = value.length;
    this.pageIndex = value.pageIndex;
    this.pageSize = value.pageSize;

    this.allUser();
  }

}
