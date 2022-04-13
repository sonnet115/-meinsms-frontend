import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';
import {QsApiManagerService} from './qs-api-manager.service';
import {number} from 'ngx-custom-validators/src/app/number/validator';
import {AlertService} from '../dashboards/_alert';
import {Router} from '@angular/router';

@Component({
  selector: 'app-question-sets',
  templateUrl: './question-sets.component.html',
  styleUrls: ['./question-sets.component.css']
})
export class QuestionSetsComponent implements OnInit {
  closeResult = '';
  questionSets: any;
  questionSetName: any;
  questionSetId: any;
  questionSetsById: any;
  showMsg = false;
  questionSetData: FormGroup;
  submitted = false;
  questionSetDataUpdate: FormGroup;

  constructor(private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService,
              private apiService: QsApiManagerService,
              private alertService: AlertService,
              private router: Router) {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  confirmDelete(content, questionSetName, questionSetId) {
    this.questionSetName = questionSetName;
    this.questionSetId = questionSetId;

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

  ngOnInit(): void {
    this.getQuestionSet();
    this.questionSetsById = null;

    this.questionSetData = this.formBuilder.group({
      name: ['', [Validators.required]],
    });

    this.questionSetDataUpdate = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  get fields() {
    return this.questionSetData.controls;
  }

  getQuestionSet() {
    this.spinner.show();
    this.apiService.getQuestionSet().subscribe((response: any) => {
        this.spinner.hide();
        console.log(response);
        this.questionSets = response;
      },
      error => {
        this.spinner.hide();
      }
    );
  }


  saveQuestionSet() {
    this.spinner.show();
    this.submitted = true;

    if (this.questionSetData.invalid) {
      this.spinner.hide();
      return;
    }

    this.apiService.create(this.questionSetData.value).subscribe((response: any) => {
        this.spinner.hide();
        console.log(response);
        this.alertService.success(response.message, {autoClose: true});
        this.questionSetData.reset({name: ''});
        this.getQuestionSet();
        this.submitted = false;
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  editQuestionSet(questionSetId: number, updateContent: TemplateRef<any>) {
    this.spinner.show();
    this.apiService.getQuSetById(questionSetId).subscribe((response: any) => {
        this.spinner.hide();
        console.log(response);
        this.questionSetsById = response;

      },
      error => {
        this.spinner.hide();
      }
    );
  }

  updateQuestionSet(quesId: string) {
    this.spinner.show();
    this.submitted = true;

    if (this.questionSetDataUpdate.invalid) {
      this.spinner.hide();
      return;
    }

    this.apiService.updateQuestionSet(this.questionSetDataUpdate.value, quesId).subscribe((response: any) => {
        this.spinner.hide();
        this.alertService.success(response.message, {autoClose: true});
        console.log(response);
        this.getQuestionSet();
        this.questionSetDataUpdate.reset({name: ''});
        this.submitted = false;
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  deleteQuestionSet(quesId: string) {
    this.spinner.show();
    this.apiService.deleteQuestionSet(quesId).subscribe((response: any) => {
        this.spinner.hide();
        console.log(response);
        this.alertService.success('Question set deleted ');
        this.getQuestionSet();
        setTimeout(() => {
          this.modalService.dismissAll();
        }, 5000);
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  gotQList(id) {
    localStorage.removeItem('qs_id');
    this.router.navigate(['questions-list/' + id]);
    localStorage.setItem('qs_id', id);
  }
}
