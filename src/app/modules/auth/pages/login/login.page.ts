import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@core/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ag-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      this.authService
        .login({
          email: this.form.get('email').value,
          password: this.form.get('password').value,
        })
        .subscribe((res: any) => {
          if (res?.token) {
            this.authService.saveToken(res.token);
            this.authService.saveUserName(res.username);
            this.router.navigate(['/dashboard/agah/vision']);
          }
        });
    }
  }
}
