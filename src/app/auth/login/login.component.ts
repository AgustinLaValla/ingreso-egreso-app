import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login(user:User) { 
    this.auth.login(user)
  }

}
