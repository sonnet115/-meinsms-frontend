import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {EndPointsQ} from './EndPointsQ';


@Injectable({
  providedIn: 'root'
})
export class QApiManagerService {
  constructor(private http: HttpClient, private endpoints: EndPointsQ) {
  }

  public create(body): any {
    return this.http.post(this.endpoints.createQ, body).pipe(
      catchError(this.handleError),
    );
  }

  public getQuestionByQS(id, body): any {
    return this.http.post(this.endpoints.getQ + '/' + id, body).pipe(
      catchError(this.handleError),
    );
  }

  public updateQuestion(id, body): any {
    return this.http.put(this.endpoints.updateQ + '/' + id, body).pipe(
      catchError(this.handleError),
    );
  }

  public getQuestionById(id): any {
    return this.http.get(this.endpoints.getQId + '/' + id).pipe(
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse): any {
    return throwError(error);
  }
}
