import {environment} from '../../environments/environment';

export class EndPointsQS {
  private baseUrl = environment.base_url;

  public readonly createQS = this.baseUrl + 'api/question-set/create';
  public readonly getQS = this.baseUrl + 'api/question-set/get';
  public readonly updateQSet = this.baseUrl + 'api/question-set/update/';
  public readonly getQSetById = this.baseUrl + 'api/question-set/get/';
  public readonly deleteQSet = this.baseUrl + 'api/question-set/delete/';

}
