import {Component, OnInit, TemplateRef} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {AlertService} from '../../../../shared/services/_alert';
import {Router} from '@angular/router';
import {ApiService} from '../../../../shared/services/api.service';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../../../environments/environment';
import {Endpoints} from '../../../../shared/endpoints';
import {DialogService} from '../../../../shared/services/_modal/dialog.service';

@Component({
  selector: 'app-manage-classes',
  templateUrl: './manage-classes.component.html',
  styleUrls: ['./manage-classes.component.css']
})
export class ManageClassesComponent implements OnInit {

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
              private apiService: ApiService,
              private alertService: AlertService,
              private router: Router,
              public translate: TranslateService,
              private dialogService: DialogService,
              private endpoints: Endpoints) {
    translate.addLangs(['us', 'de']);
    translate.setDefaultLang(localStorage.getItem('selected_lang'));
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
    this.apiService.get('', '').subscribe((response: any) => {
        this.spinner.hide();
        console.log(response);
        this.questionSets = response;
      },
      error => {
        this.spinner.hide();
      }
    );
  }


  createQuestion() {
    this.spinner.show();
    this.submitted = true;

    if (this.questionSetData.invalid) {
      this.spinner.hide();
      return;
    }

    this.apiService.post(this.questionSetData.value, this.endpoints.create_class).subscribe((response: any) => {
        this.spinner.hide();
        console.log(response);
        this.dialogService.open(response.message, environment.info_message, 'success', environment.info);
        this.questionSetData.reset({name: ''});
        this.submitted = false;
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  editQuestionSet(questionSetId: number, updateContent: TemplateRef<any>) {
    this.spinner.show();
    this.apiService.get(questionSetId, '').subscribe((response: any) => {
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

    this.apiService.put(this.questionSetDataUpdate.value, quesId).subscribe((response: any) => {
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
    this.apiService.delete(quesId, '').subscribe((response: any) => {
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
