import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { NzGridModule, NzMessageModule, NzModalModule } from 'ng-zorro-antd';
import {MatDividerModule} from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatGridListModule,
    NzSpaceModule,
    NzGridModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDividerModule,
    NzModalModule,
    MatFormFieldModule,
    NzPopconfirmModule,
    NzMessageModule,
    MatPaginatorModule
  ]
})
export class UserModule { }
