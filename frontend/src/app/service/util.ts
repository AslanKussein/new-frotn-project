import {Injectable} from '@angular/core';
import {language} from "../../environments/language";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigService} from "./config.service";


@Injectable({
  providedIn: 'root'
})
export class Util {
  _language = language;

  constructor(private router: Router,
              protected route: ActivatedRoute,
              private configService: ConfigService) {
  }

  dnHref(href: any) {
    this.setItem('url', href);
    this.router.navigate([href]);
  }

  dnHrefParam(href: any, param: any) {
    this.router.navigate([href], {queryParams: {activeTab: param, fromBoard: true}});
  }

  navigateByUrl(href: any) {
    this.router.navigateByUrl(href, {replaceUrl: true});
  }

  isNullOrEmpty(e: any) {
    return e == null || e == '' || e == undefined;
  }

  getCurrentUser() {
    return JSON.parse(<string>localStorage.getItem('currentUser'))
  }

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  getError() {
    let fieldName;
    switch (this._language.language) {
      case "kz":
        fieldName = 'kk';
        break;
      case "en":
        fieldName = 'en';
        break;
      default:
        fieldName = 'ru';
        break;
    }
    return fieldName;
  }
}
