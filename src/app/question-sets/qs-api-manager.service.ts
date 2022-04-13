import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {EndPointsQS} from './EndPointsQS';

@Injectable({
  providedIn: 'root'
})
export class QsApiManagerService {
  constructor(private http: HttpClient, private endpoints: EndPointsQS) {
  }

  public create(body): any {
    return this.http.post(this.endpoints.createQS, body).pipe(
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse): any {
    return throwError(error);
  }

  public getQuestionSet() {
    return this.http.get(this.endpoints.getQS).pipe(
      catchError(this.handleError),
    );
  }

  public getQuSetById(questionSetId: number) {
    return this.http.get(this.endpoints.getQSetById + questionSetId).pipe(
      catchError(this.handleError),
    );
  }

  public updateQuestionSet(body, quesId) {
    return this.http.put(this.endpoints.updateQSet + quesId, body).pipe(
      catchError(this.handleError),
    );
  }

  public deleteQuestionSet(quesId) {
    return this.http.delete(this.endpoints.deleteQSet + quesId).pipe(
      catchError(this.handleError),
    );
  }
}
