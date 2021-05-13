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
    submitted = false;
    logo2: string = '../../../assets/images/img.png';

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

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    get f() {
        return this.loginForm.controls;
    }

    onChange(code: any) {
        this.translate.use(code.target.value);
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
