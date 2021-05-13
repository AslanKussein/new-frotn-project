import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private configService: ConfigService, private http: HttpClient) {
  }

  public getSystemList(): Observable<any> {
    return this.http.get(`${this.configService.serverUrl.concat(this.configService.openApiUrl)}/app/getSystemList`, {})
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError)
      );
  }

  public getAll(): Observable<any> {
    return this.http.get(`${this.configService.serverUrl.concat(this.configService.openApiUrl)}/app/all`, {})
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error instanceof ErrorEvent) {
      console.error('An error occurred:', error);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.message}`);
    }
    return throwError(
      error);
  }
}
