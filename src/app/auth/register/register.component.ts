import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  onSubmit(data:User){
    this.auth.register(data);
  }

}
