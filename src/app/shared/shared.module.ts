import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MatInputModule } from "@angular/material/input";
import {  MatSelectModule } from "@angular/material/select";
import {  MatCardModule } from "@angular/material/card";
import {  MatDialogModule } from "@angular/material/dialog";
import { NavComponent } from './components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { ProductService } from './services/product.service';
import { MessageService } from './services/message.service';
import { ToastrService } from 'ngx-toastr';
@NgModule({
  declarations: [
    NavComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatSidenavModule,
    RouterModule,
    MatDialogModule,
  ],exports: [
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatTableModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    NavComponent,
    MatDialogModule,
  ],
  providers: []
})
export class SharedModule { }
