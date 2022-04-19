import {environment} from '../../environments/environment';

export class Endpoints {
  private baseUrl = environment.base_url;

  // Authentication
  public registration = this.baseUrl + '/api/auth/signup';
  public login = this.baseUrl + '/api/auth/signin';

  // Classes
  public create_class = this.baseUrl + '/api/classes/create';
}
