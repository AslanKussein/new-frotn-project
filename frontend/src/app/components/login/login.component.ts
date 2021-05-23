import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {AuthenticationService} from "../../service/authentication.service";
import {NotificationService} from "../../service/notification.service";
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  mySelect: any = [
    {code: "ru", value: 'Рус'},
    {code: "kz", value: 'Каз'}
  ];

  loginForm: any;
  lang!: string;
  selectedTab: number = 1;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService,
              private notifyService: NotificationService,
              private ngxLoader: NgxUiLoaderService,
              public translate: TranslateService) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['home']);
    }
  }

  selectTab(tabId: number): void {
    this.selectedTab = tabId;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.lang = <string>localStorage.getItem('lang');
    if (this.lang == null) {
      this.lang = 'ru';
    }
    this.onChange(this.lang);
  }

  get f() {
    return this.loginForm.controls;
  }

  onChange(code: any) {
    this.lang = code.target.value;
    localStorage.setItem('lang', this.lang);
    this.translate.use(this.lang);
  }

  login() {
    this.ngxLoader.startBackground()
    this.submitted = true;

    if (this.loginForm.value.username.toLocaleUpperCase() == 'ADMIN') {
      this.notifyService.showError('Ошибка', 'Не корректные данные для входа учетка admin не доступен');

      this.ngxLoader.stopBackground()
      return;
    }
    this.authenticationService.login(this.loginForm, 1);

    this.ngxLoader.stopBackground()
  }
}
