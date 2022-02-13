import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';
import { AuthenticationService } from './authentication.service';
// import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';

const log = new Logger('Login');

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService // private localNotifications: LocalNotifications
  ) {
    this.createForm();
  }

  ngOnInit() {}

  login() {
    this.isLoading = true;
    const login$ = this.authenticationService.login(this.loginForm.value);
    if (login$) {
      this.router.navigate([this.route.snapshot.queryParams['redirect'] || '/'], { replaceUrl: true });
      // this.localNotifications.schedule({
      //   id: 2,
      //   text: `¡Bienvenido ${this.loginForm.value.username}!`,
      // });
    } else {
      log.debug(`Login error: Not authorized`);
      // this.localNotifications.schedule({
      //   id: 3,
      //   text: 'Parece que hubo un error, lo sentimos.',
      // });
      this.error = 'Not authorized';
      this.isLoading = false;
    }
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }
}
