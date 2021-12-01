import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DbConnectorService {

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };


  constructor(private http: HttpClient) { }

  public getHttp(route: string, params?: HttpParams, defaultValue?: any): Observable<object> {
    const options = {
      headers: this.httpOptions.headers,
      params: params
    }
    return this.http.get<object>(environment.backendUrl + route, options).pipe(
      catchError(this.handleError)
    );
  }

  public postHttp(route: string, params?: Object, defaultValue?: any): Observable<object> {
    return this.http.post<object>(environment.backendUrl + route, params, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public putHttp(route: string, params?: Object, defaultValue?: any): Observable<object> {
    return this.http.put<object>(environment.backendUrl + route, params, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public deleteHttp(route: string, params?: object, defaultValue?: any): Observable<object> {
    const options = {
      headers: this.httpOptions.headers,
      body: params,
    };
    return this.http.delete<object>(environment.backendUrl + route, options).pipe(
      catchError(this.handleError)
    );
  }

  public handleError(error: HttpErrorResponse) {
    let errorObj = {status: 0, message: 'Unknown error!'};
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorObj.message = `Erreur: ${error.error.message}`;
    } else {
      // Server-side errors
      errorObj.status = error.status
      errorObj.message = error.error;

    }
    return throwError(errorObj)
  }


}
