import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {AlertService} from '../dashboards/_alert';
import {QApiManagerService} from '../questions/q-api-manager.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  questions: any;
  totalPage: any;
  totalRecords: any;
  limit: any;
  pageNumber: any;

  constructor(private spinner: NgxSpinnerService,
              private alertService: AlertService,
              private apiService: QApiManagerService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getQuestionSet(5, 0);
  }

  getQuestionSet(limit, pageNumber) {
    console.log('limit {}', limit);
    console.log('pageNumber {}', pageNumber);
    this.pageNumber = 0;
    const pagination = {
      'limit': limit,
      'pageNumber': pageNumber
    };
    this.spinner.show();
    this.apiService.getQuestionByQS(localStorage.getItem('qs_id'), pagination).subscribe((response: any) => {
        this.spinner.hide();
        this.questions = response.questions;
        this.totalPage = response.totalPages;
        this.totalRecords = response.totalRecords;
        this.limit = response.limit;
        this.pageNumber = response.pageNumber;
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  gotoPage(limit, currentPage) {
    console.log(currentPage);
    this.getQuestionSet(limit, currentPage);
  }

  updateQ(id) {
    localStorage.removeItem('question_id');
    this.router.navigate(['question-update']);
    localStorage.setItem('question_id', id);
  }
}
