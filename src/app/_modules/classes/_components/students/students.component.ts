import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {ApiService} from '../../../../shared/services/api.service';
import {AlertService} from '../../../../shared/services/_alert';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from '../../../../shared/services/_modal/dialog.service';
import {LoggerService} from '../../../../shared/services/logger.service';
import {Endpoints} from '../../../../shared/endpoints';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit, AfterViewInit {

  studentList: any;
  avatarList: any;
  closeResult: any;
  ratingCategories: any;
  studentRatings: [];
  studentId: any;
  avatar: any;
  classes: any;
  classId: any;

  constructor(private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService,
              private apiService: ApiService,
              private alertService: AlertService,
              private router: Router,
              private translate: TranslateService,
              private dialogService: DialogService,
              private loggerService: LoggerService,
              private endpoints: Endpoints) {
    this.avatarList = ['kidm1', 'kidm2', 'kidm3', 'kidm4', 'kidf1', 'kidf2', 'kidf3', 'kidf4'];
    translate.addLangs(['us', 'de']);
    translate.setDefaultLang(localStorage.getItem('selected_lang'));
  }

  ngOnInit(): void {
    this.getStudentByClass();
    this.getRC();
    this.getClasses();
  }

  getClasses() {
    this.spinner.show();
    this.apiService.get('', this.endpoints.get_class).subscribe((response: any) => {
        this.spinner.hide();
        console.log(response);
        this.classes = response.data;
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  gotoDetails(id) {
    localStorage.removeItem('class_id');
    // this.router.navigate(['classes/details']);
    localStorage.setItem('class_id', id);
    this.classId = id;
    this.getStudentByClass();
    this.getRC();
  }

  getStudentByClass() {
    this.spinner.show();
    this.apiService.get(localStorage.getItem('class_id'), this.endpoints.get_students_by_class).subscribe((response: any) => {
        this.spinner.hide();
        this.studentList = response.data;
        this.loggerService.log(response);
      },
      error => {
        this.loggerService.log(error);
        this.spinner.hide();
      }
    );
  }

  getRandomAvatar(gender: any) {
    if (gender === 'MALE') {
      return 'assets/images/student_avatar/' + this.avatarList[this.randomInteger(0, 2)] + '.png';
    } else {
      return 'assets/images/student_avatar/' + this.avatarList[this.randomInteger(3, 5)] + '.png';

    }
  }

  getRC() {
    this.spinner.show();
    this.apiService.get('', this.endpoints.get_rc).subscribe((response: any) => {
        this.spinner.hide();
        this.loggerService.log(response);
        this.ratingCategories = response.data;
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  setStudentId(studentId) {
    this.studentId = studentId;
  }

  getStudentRatings(sId, content) {
    this.spinner.show();
    this.apiService.get('student/' + sId + '/classes/' + localStorage.getItem('class_id'), this.endpoints.get_rating)
      .subscribe((response: any) => {
          this.spinner.hide();
          this.studentRatings = response.data;
          this.open(content);
        },
        error => {
          this.spinner.hide();
        }
      );
  }

  negative(rcId) {
    const data = {
      'positive': 0,
      'negative': 1,
      'sid': this.studentId,
      'rcid': rcId,
      'cid': localStorage.getItem('class_id')
    };
    this.spinner.show();
    this.apiService.post(data, this.endpoints.create_rating).subscribe((response: any) => {
        this.spinner.hide();
        this.loggerService.log(response);
        this.studentRatings = response.data;
      },
      error => {
        this.spinner.hide();
      }
    );
    console.log(data);
  }

  positive(rcId) {
    const data = {
      'positive': 1,
      'negative': 0,
      'sid': this.studentId,
      'rcid': rcId,
      'cid': localStorage.getItem('class_id')
    };
    this.spinner.show();
    this.apiService.post(data, this.endpoints.create_rating).subscribe((response: any) => {
        this.spinner.hide();
        this.loggerService.log(response);
        this.studentRatings = response.data;
      },
      error => {
        this.spinner.hide();
      }
    );
    console.log(data);
  }

  disabledNeg(rcId) {
    for (let i = 0; i < this.studentRatings.length; i++) {
      console.log(this.studentRatings[i]);
      // @ts-ignore
      if (this.studentRatings[i].ratingCategory.id === rcId) {
        // @ts-ignore
        return this.studentRatings[i].negative === '1' ? 'disabled' : '';
      }
    }
    return '';
  }

  disabledPos(rcId) {
    for (let i = 0; i < this.studentRatings.length; i++) {
      console.log(this.studentRatings[i]);
      // @ts-ignore
      if (this.studentRatings[i].ratingCategory.id === rcId) {
        // @ts-ignore
        return this.studentRatings[i].positive === '1' ? 'disabled' : '';
      }
    }
    return '';
  }

  ngAfterViewInit(): void {
    this.classId = localStorage.getItem('class_id');
    console.log(this.classId);
  }

  getSickChild() {
    this.spinner.show();
    this.apiService.get(localStorage.getItem('class_id'), this.endpoints.get_sick).subscribe((response: any) => {
        this.spinner.hide();
        this.studentList = response.data;
        this.loggerService.log(response);
      },
      error => {
        this.loggerService.log(error);
        this.spinner.hide();
      }
    );
  }
}
