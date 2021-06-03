import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  // serverAddress = window.location.origin;
  apiUrl = '/sso/api';
  openApiUrl = '/sso/open-api';
  authUrl = '/sso/open-api/auth';

  constructor() {
  }
}
