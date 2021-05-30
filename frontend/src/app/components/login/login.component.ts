import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {AuthenticationService} from "../../service/authentication.service";
import {NotificationService} from "../../service/notification.service";
import {Util} from "../../service/util";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  mySelect: any = [
    {code: "ru", value: 'Рус'},
    {code: "kz", value: 'Қаз'}
  ];
  modalRef!: BsModalRef;
  loginForm: any;
  selectedTab: number = 1;
  submitted = false;
  selectedFile!: File;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private util: Util,
              private translate: TranslateService,
              private authenticationService: AuthenticationService,
              private notifyService: NotificationService,
              private ngxLoader: NgxUiLoaderService,
              private modalService: BsModalService) {
    if (this.authenticationService.currentUserValue) {
      this.util.dnHref('/home')
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  selectTab(tabId: number): void {
    this.selectedTab = tabId;
    this.ngControl();
  }

  ngOnInit(): void {
    this.mySelect - this.util.getLang();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.nullValidator],
      password: ['', Validators.nullValidator],
      ecp: ['', Validators.nullValidator],
      lang: ['', Validators.nullValidator],
      accept: ['', Validators.requiredTrue]
    });
    if (this.util.getItem('lang') == null) {
      this.setValue('lang', 'ru');
      this.util.setItem('lang', 'ru');
    } else {
      this.setValue('lang', this.util.getItem('lang'));
    }
    this.ngControl();
    this.translate.use(<string>localStorage.getItem('lang'));
  }

  setValue(controlName: string, value: any) {
    this.loginForm.controls[controlName].setValue(value);
    this.loginForm.controls[controlName].updateValueAndValidity();
  }

  ngControl() {
    this.setValidator('username', this.selectedTab == 1 ? Validators.required : Validators.nullValidator);
    this.setValidator('password', this.selectedTab == 1 ? Validators.required : Validators.nullValidator);
    this.setValidator('ecp', this.selectedTab == 2 ? Validators.required : Validators.nullValidator);
  }

  setValidator(code: string, validator: any) {
    this.loginForm.controls[code].setValidators([validator]);
    this.loginForm.controls[code].updateValueAndValidity();
  }

  get f() {
    return this.loginForm.controls;
  }

  changeLang() {
    this.util.setItem('lang', this.loginForm.value.lang);
    this.translate.use(this.loginForm.value.lang);
  }

  login() {
    this.ngxLoader.startBackground()
    this.submitted = true;

    this.authenticationService.login(this.loginForm);

    this.ngxLoader.stopBackground()
  }

  onUpload(event: any) {
    this.ngxLoader.startBackground()

    if (event.target.files && event.target.files[0]) {
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.selectedFile = event.target.files[i];
        console.log(this.selectedFile)
        // this.subscriptions.add(this.uploader.uploadData(this.selectedFile)
        //   .subscribe(data => {
        //     if (data && data.uuid) {
        //       if (id == 1) {
        //         this.contract = data
        //       }
        //       if (id == 2) {
        //         this.deposit = data
        //       }
        //     }
        //   }));
      }
    }
  }
}
