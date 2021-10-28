import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  
  baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  updateDevice(id: number, value: any): Observable<any>{
     return this.http.patch<any>(`${this.baseUrl}device/${id}`, value).pipe(
          catchError(this.handleError)
     );
  }

  handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

}
