import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private authServ: AuthService
  ) { }

  ngOnInit() {
  }

  handleSubmit(form) {
    console.log(form.value);
    this.authServ.signup(form.value)
    .subscribe((data) => {
      console.log(data)
    })
  }

}
