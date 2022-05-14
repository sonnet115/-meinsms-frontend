import {environment} from '../../environments/environment';

export class Endpoints {
  private baseUrl = environment.base_url;

  // Authentication
  public registration = this.baseUrl + '/api/auth/signup';
  public login = this.baseUrl + '/api/auth/signin';

  // Classes
  public create_class = this.baseUrl + '/api/classes/create';
  public get_class = this.baseUrl + '/api/classes/get';
  public get_class_by_student = this.baseUrl + '/api/classes/get/student';
  public update_class = this.baseUrl + '/api/classes/update';
  public delete_class = this.baseUrl + '/api/classes/delete';

  // RCs
  public create_rc = this.baseUrl + '/api/rating-category/create';
  public get_rc = this.baseUrl + '/api/rating-category/get';
  public update_rc = this.baseUrl + '/api/rating-category/update';
  public delete_rc = this.baseUrl + '/api/rating-category/delete';

  // Students
  public create_students = this.baseUrl + '/api/students/create';
  public get_students_by_class = this.baseUrl + '/api/students/get/classes';
  public get_students_by_parent = this.baseUrl + '/api/students/get/by/parent';
  public add_student_to_class = this.baseUrl + '/api/students/add-to-class';
  public update_students = this.baseUrl + '/api/students/update';
  public delete_students = this.baseUrl + '/api/students/delete';
  public mark_sick = this.baseUrl + '/api/students/mark/sick';
  public get_sick = this.baseUrl + '/api/students/get/sick';

  // Rating
  public create_rating = this.baseUrl + '/api/rating/create';
  public get_rating = this.baseUrl + '/api/rating/get';
}
