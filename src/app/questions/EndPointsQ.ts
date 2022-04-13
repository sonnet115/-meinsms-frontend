import {environment} from '../../environments/environment';

export class EndPointsQ {
  private baseUrl = environment.base_url;

  public readonly createQ = this.baseUrl + 'api/question/create';
  public readonly getQ = this.baseUrl + 'api/question/get';
  public readonly getQId = this.baseUrl + 'api/question/get-by-id';
  public readonly updateQ = this.baseUrl + 'api/question/update';

}
