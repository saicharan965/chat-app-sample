import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventsService } from '../../domain-logic/events.service';
import { User } from '../../domain-logic/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup

  constructor(public formBuilder: FormBuilder, private eventService: EventsService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      fullName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    const userDetails = localStorage.getItem('userDetails')
    if (userDetails) {
      const user = JSON.parse(userDetails) as User
      this.routeToHome(user)
    }
  }

  protected login() {
    const user: User = {
      userName: this.loginForm.controls['fullName'].value,
      phoneNumber: this.loginForm.controls['phoneNumber'].value
    }
    localStorage.setItem('userDetails', JSON.stringify(user))
    this.routeToHome(user)
  }

  private routeToHome(user: User) {
    this.eventService.user$.next(user)
    EventsService.IS_AUTHORIZED = true
    this.router.navigate(['home'])
  }
}
