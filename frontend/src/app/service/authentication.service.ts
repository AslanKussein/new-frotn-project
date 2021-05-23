import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {first, map, tap} from 'rxjs/operators';
import {ConfigService} from "./config.service";
import {User} from "../models/users";
import {Util} from "./util";
import {NotificationService} from "./notification.service";
import {TranslateService} from "@ngx-translate/core";

@Injectable({providedIn: 'root'})
export class AuthenticationService implements OnDestroy {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly CLIENT_ID = 'htc';
  subscriptions: Subscription = new Subscription();

  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  }

  constructor(private http: HttpClient,
              private configService: ConfigService,
              private util: Util,
              private notifyService: NotificationService,
              public translate: TranslateService) {
    this.currentUserSubject = new BehaviorSubject<User>(this.util.getCurrentUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  update() {
    this.currentUserSubject = new BehaviorSubject<User>(this.util.getCurrentUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(loginForm: any, id: number) {
    this.options.headers.set('lang', <string>this.util.getItem('lang'));

    this.subscriptions.add(this.loginIDP(loginForm?.value)
      .pipe(first())
      .subscribe(
        param_ => {
          // this.subscriptions.add(this.userService.findUserByLogin().subscribe(data => {
          //   if (data != null) {
          //     param_.name = data.name
          //     if (!this.util.isNullOrEmpty(data.photoUuid)) {
          //       param_.photoUuid = this.util.generatorPreviewUrl(data.photoUuid)
          //     } else {
          //       param_.photoUuid = 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png'
          //     }
          //     param_.surname = data.surname
          //     param_.login = data.login
          //     param_.roles = data.roles
          //     param_.group = data.group
          //     param_.id = data.id
          //     param_.organizationDto = data.organizationDto
          //     localStorage.setItem('currentUser', JSON.stringify(param_));
          //     localStorage.setItem('password', loginForm.value.password);
          //     this.notificationsUtil.webSocketConnect(this.currentUserValue)
          //   }
          // }));
          // if (id == 1) {
          //   this.util.dnHref('/')
          // }
        },
        () => {
          this.translate.get('error.notCorrectLogin', {value: 'world'}).subscribe((res: string) => {
            this.notifyService.showError('', res)
          });
        }));
  }

  loginIDP(loginForm: any) {

    this.options.headers.set('lang', <string>this.util.getItem('lang'));

    const body_ = new HttpParams()
      .set('username', loginForm.username)
      .set('password', loginForm.password)
      .set('grant_type', 'password')
      .set('client_id', this.CLIENT_ID);

    return this.http.post<any>(`${this.configService.authUrl}`, body_.toString(), this.options).pipe(map(user => {
      if (user && user.access_token) {
        this.storeTokens(user);
        this.util.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }

      return user;
    }));
  }

  refreshToken() {
    this.options.headers.set('lang', <string>this.util.getItem('lang'));
    const body_ = new HttpParams()
      .set('refresh_token', <string>this.getRefreshToken())
      .set('grant_type', 'refresh_token')
      .set('client_id', this.CLIENT_ID);
    return this.http.post<any>(`${this.configService.authUrl}`, body_.toString(), this.options)
      .pipe(tap((tokens: User) => {
        this.storeTokens(tokens);
      }));
  }

  logout() {
    localStorage.clear()
    // this.currentUserSubject.next(null);
    // if (!['login'].includes(this.activatedRoute.snapshot['_routerState'].url.split(";")[0].replace('/', ''))) {
    //   this.util.dnHref('login');
    //   this.notificationsUtil.webSocketDisconnect();
    //   // this.util.refresh();
    // }
    this.util.setItem('action', 'logout');
  }

  getJwtToken() {
    return this.util.getItem(this.JWT_TOKEN);
  }

  public storeTokens(tokens: User) {
    this.util.setItem(this.JWT_TOKEN, <string>tokens.access_token);
    this.util.setItem(this.REFRESH_TOKEN, <string>tokens.refresh_token);
  }

  private getRefreshToken() {
    return this.util.getItem(this.REFRESH_TOKEN);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
