import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  // serverAddress = window.location.origin;
  // apiUrl = '/sso/api';
  // openApiUrl = '/sso/open-api';
  // authUrl = '/sso/open-api/auth';
  apiUrl = 'http://localhost:8080/sso/api';
  openApiUrl = 'http://localhost:8080/sso/open-api';
  authUrl = 'http://localhost:8080/sso/open-api/auth';

  constructor() {
  }
}
