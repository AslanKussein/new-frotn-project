import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  serverUrl = 'http://localhost:8080';
  apiUrl = '/api';
  authUrl = ' ';


  constructor() {
  }
}
