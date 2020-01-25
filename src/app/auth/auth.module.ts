//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Firebase modules
import { AngularFireAuthModule } from '@angular/fire/auth';
//Components
//Router Module
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [ 
        LoginComponent,
        RegisterComponent
    ],
    imports: [ CommonModule, FormsModule, AngularFireAuthModule, RouterModule],
    exports: [],
    providers: [],
})
export class AuthModule {}