import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {AuthenticationService} from "../../service/authentication.service";
import {NotificationService} from "../../service/notification.service";
import {TranslateService} from '@ngx-translate/core';
import {Util} from "../../service/util";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

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
  modalRef!: BsModalRef;
  loginForm: any;
  selectedTab: number = 1;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private util: Util,
              private authenticationService: AuthenticationService,
              private notifyService: NotificationService,
              private ngxLoader: NgxUiLoaderService,
              public translate: TranslateService,
              private modalService: BsModalService) {
    if (this.authenticationService.currentUserValue) {
      this.util.dnHref(['home']);
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  selectTab(tabId: number): void {
    this.selectedTab = tabId;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      lang: ['', Validators.nullValidator],
      accept: ['', Validators.requiredTrue]
    });
    if (this.util.getItem('lang') == null) {
      this.setValue('lang', 'ru');
    } else {
      this.setValue('lang', this.util.getItem('lang'));
    }
    this.onChange();
  }

  setValue(controlName: string, value: any) {
    this.loginForm.controls[controlName].setValue(value);
    this.loginForm.controls[controlName].updateValueAndValidity();
  }

  get f() {
    return this.loginForm.controls;
  }

  onChange() {
    this.util.setItem('lang', this.loginForm.value.lang);
    this.translate.use(this.loginForm.value.lang);
  }


  login() {
    this.ngxLoader.startBackground()
    this.submitted = true;

    this.authenticationService.login(this.loginForm, 1);

    this.ngxLoader.stopBackground()
  }
}
