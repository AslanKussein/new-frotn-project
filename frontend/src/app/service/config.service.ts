import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  serverUrl = 'http://127.0.0.1:8080';
  apiUrl = '/api';
  authUrl = 'http://127.0.0.1:8080/open-api/auth';


  constructor() {
  }
}
