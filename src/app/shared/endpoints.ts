import {environment} from '../../environments/environment';

export class Endpoints {
  private baseUrl = environment.base_url;

  // Authentication
  public registration = this.baseUrl + '/api/auth/signup';
  public login = this.baseUrl + '/api/auth/signin';

  // Classes
  public create_class = this.baseUrl + '/api/classes/create';
  public get_class = this.baseUrl + '/api/classes/get';
  public update_class = this.baseUrl + '/api/classes/update';
  public delete_class = this.baseUrl + '/api/classes/delete';

  // RCs
  public create_rc = this.baseUrl + '/api/rating-category/create';
  public get_rc = this.baseUrl + '/api/rating-category/get';
  public update_rc = this.baseUrl + '/api/rating-category/update';
  public delete_rc = this.baseUrl + '/api/rating-category/delete';

  // Students
  public create_students = this.baseUrl + '/api/rating-category/create';
  public get_students = this.baseUrl + '/api/students/get/classes';
  public update_students = this.baseUrl + '/api/rating-category/update';
  public delete_students = this.baseUrl + '/api/rating-category/delete';

  // Rating
  public create_rating = this.baseUrl + '/api/rating/create';
  public get_rating = this.baseUrl + '/api/rating/get';
}
