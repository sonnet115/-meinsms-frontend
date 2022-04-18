import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {AlertService} from '../../../../shared/services/_alert';
import {Router} from '@angular/router';

import {RegistrationRequestBody} from '../../_models/RegistrationRequestBody';
import {TranslateService} from '@ngx-translate/core';
import {LoggerService} from 'src/app/shared/services/logger.service';
import {ApiService} from '../../../../shared/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit, AfterViewInit {
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  registerForm: FormGroup;
  submitted = false;

  signupFormShow = false;
  allCustomers: any;

  constructor(private apiManagerService: ApiService,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService,
              private alertService: AlertService,
              private router: Router,
              private registrationRequestBody: RegistrationRequestBody,
              public translate: TranslateService,
              private loggerService: LoggerService) {
    translate.addLangs(['us', 'de']);
    translate.setDefaultLang(localStorage.getItem('selected_lang'));
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      con_password: ['', Validators.required]
    });

    /*if (localStorage.getItem('user_token')) {
      this.router.navigate(['dashboard/home']);
    }*/
  }

  ngAfterViewInit() {
  }

  get fields() {
    return this.registerForm.controls;
  }

  public doRegistration(): void {
    this.spinner.show();
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.spinner.hide();
      this.loggerService.log('registerForm', this.registerForm);
      return;
    }

    this.registrationRequestBody = this.registerForm.getRawValue();
    this.registrationRequestBody.role = ['user'];
    console.log('registrationRequestBody', this.registrationRequestBody);

    /*this.apiManagerService.registration(this.registrationRequestBody).subscribe((response: any) => {
        this.spinner.hide();
        this.loggerService.log('response', response);
        this.router.navigate(['authentication/login']);
      },
      error => {
        this.spinner.hide();
        this.loggerService.log('error', error);
        this.alertService.error(error.error.message, {autoClose: true});
      });*/
  }
}
