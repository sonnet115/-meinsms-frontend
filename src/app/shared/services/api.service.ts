import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {Endpoints} from '../endpoints';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient,
              private endpoints: Endpoints) {
  }

  private handleError(error: HttpErrorResponse): any {
    return throwError(error);
  }
}
