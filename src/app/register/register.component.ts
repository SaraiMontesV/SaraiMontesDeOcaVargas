import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpServiceService } from '@app/@shared/services/http-service.service';
// import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  showPassword = false;
  typeInput: string = 'password';
  registerData: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpServiceService,
    public loadingController: LoadingController,
    public alertCtrl: AlertController,
    // private localNotifications: LocalNotifications,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.registerData.unsubscribe();
  }

  register() {
    const userData = this.registerForm.value;
    localStorage.setItem('activeUser', JSON.stringify(userData));
    // this.localNotifications.schedule({
    //   id: 1,
    //   text: 'Registro creado exitosamente',
    // });
    this.presentAlert().then(() => {
      this.router.navigate([this.route.snapshot.queryParams['redirect'] || '/'], { replaceUrl: true });
    });
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      message: 'Registro creado exitosamente',
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async getFormRegister() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
    });
    await loading.present();

    this.registerData = (await this.httpService.getFormRegisterData()).subscribe(async (data: any) => {
      const resultsData = data.results[0];
      this.registerForm.controls['fullname'].setValue(
        `${resultsData.name.title + ' ' + resultsData.name.first + ' ' + resultsData.name.last}`
      );
      this.registerForm.controls['username'].setValue(`${resultsData.login.username}`);
      this.registerForm.controls['password'].setValue(`${resultsData.login.password}`);
      await loading.dismiss();
    });
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
    this.typeInput = this.showPassword ? 'text' : 'password';
  }

  private createForm() {
    const currentDate = new Date();
    console.log('currentDate', currentDate.toDateString());
    this.registerForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      registrationDate: [currentDate.toDateString(), Validators.required],
    });
  }
}
