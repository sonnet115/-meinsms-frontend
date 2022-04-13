import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {QsApiManagerService} from '../question-sets/qs-api-manager.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AlertService} from '../dashboards/_alert';
import {QApiManagerService} from '../questions/q-api-manager.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit, AfterViewInit {
  qType: any;
  showMultipleOptions: boolean;
  showYNOptions: boolean;
  showBooleanOptions: boolean;
  questionForm: FormGroup;
  qOptionForm: FormGroup;
  optionLabelArray: Array<any>;
  questionSets: any;
  question: any;
  optionsArray: Array<any>;
  ansArray: Array<any>;
  submitted = false;

  constructor(private fb: FormBuilder,
              private qSApiManager: QsApiManagerService,
              private spinner: NgxSpinnerService,
              private alertService: AlertService,
              private apiService: QApiManagerService,
              private router: Router) {

    this.questionForm = this.fb.group({
      question_text: ['', [Validators.required]],
      qType: new FormControl('multiple', [Validators.required]),
      booleanAns: new FormControl('FALSE', [Validators.required]),
      YNAns: new FormControl('NO', [Validators.required]),
      qOptions: this.fb.array([]),
      queSetID: new FormControl('', [Validators.required])
    });
    this.optionLabelArray = ['A', 'B', 'C', 'D', 'E'];
    this.optionsArray = [];
    this.ansArray = [];
  }

  get fields() {
    return this.questionForm.controls;
  }

  getQuestion() {
    this.spinner.show();
    this.apiService.getQuestionById(localStorage.getItem('question_id')).subscribe((response: any) => {
        this.spinner.hide();
        console.log(response);
        this.question = response;
        this.questionForm.controls['queSetID'].setValue(this.question.questionSetID);
        this.questionForm.controls['qType'].setValue(this.question.questions.type);

        if (this.question.questions.type === 'multiple') {
          this.showBooleanOptions = false;
          this.showMultipleOptions = true;
          this.showYNOptions = false;
          for (let i = 0; i < this.question.questions.questionOptions.length; i++) {
            if (this.question.questions.questionAnswers.some(e => e.answer === this.question.questions.questionOptions[i].optionValue)) {
              this.addOption(true, this.question.questions.questionOptions[i].optionName);
            } else {
              this.addOption(false, this.question.questions.questionOptions[i].optionName);
            }
          }
        } else if (this.question.questions.type === 'boolean') {
          this.showBooleanOptions = true;
          this.showMultipleOptions = false;
          this.showYNOptions = false;

          for (let i = 0; i < this.question.questions.questionOptions.length; i++) {
            if (this.question.questions.questionAnswers.some(e => e.answer === 'TRUE')) {
              this.questionForm.controls['booleanAns'].setValue('TRUE');
            } else {
              this.questionForm.controls['booleanAns'].setValue('FALSE');
            }
          }

        } else {
          this.showBooleanOptions = false;
          this.showMultipleOptions = false;
          this.showYNOptions = true;
          for (let i = 0; i < this.question.questions.questionOptions.length; i++) {
            if (this.question.questions.questionAnswers.some(e => e.answer === 'YES')) {
              this.questionForm.controls['YNAns'].setValue('YES');
            } else {
              this.questionForm.controls['YNAns'].setValue('NO');
            }
          }
        }

      },
      error => {
        this.spinner.hide();
      }
    );
  }

  getQuestionSet() {
    this.spinner.show();
    this.qSApiManager.getQuestionSet().subscribe((response: any) => {
        this.spinner.hide();
        this.questionSets = response;
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  newOption(label: any, text: string): FormGroup {
    return this.qOptionForm = this.fb.group({
      optionLabel: new FormControl(label, [Validators.required]),
      optionText: new FormControl(text, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getQuestion();
    this.getQuestionSet();
    this.showMultipleOptions = false;
    this.showYNOptions = false;
    this.showBooleanOptions = false;

  }

  get qOptions() {
    return this.questionForm.controls['qOptions'] as FormArray;
  }

  addOption(label: any, text: string) {
    if (this.qOptions.length < 5) {
      this.qOptions.push(this.newOption(label, text));
    }
  }

  removeQuantity(i: number) {
    this.qOptions.removeAt(i);
  }

  submit() {
    this.spinner.show();
    this.submitted = true;

    if (this.questionForm.invalid) {
      this.spinner.hide();
      return;
    }

    if (this.questionForm.controls['qType'].value === 'multiple') {
      this.ansArray = [];
      this.optionsArray = [];

      const options = this.questionForm.controls['qOptions'].value;
      for (let i = 0; i < options.length; i++) {
        const op = {
          'optionName': options[i].optionText,
          'optionValue': this.optionLabelArray[i],
        };
        this.optionsArray.push(op);

        if (options[i].optionLabel) {
          this.ansArray.push(this.optionLabelArray[i]);
        }
      }
    } else if (this.questionForm.controls['qType'].value === 'boolean') {
      this.ansArray = [];
      this.optionsArray = [];

      const t = {
        'optionName': 'True',
        'optionValue': 'TRUE'
      };
      const f = {
        'optionName': 'False',
        'optionValue': 'FALSE'
      };
      this.optionsArray.push(t, f);
      this.ansArray.push(this.questionForm.controls['booleanAns'].value);

    } else {
      this.ansArray = [];
      this.optionsArray = [];
      const yes = {
        'optionName': 'Yes',
        'optionValue': 'YES'
      };
      const no = {
        'optionName': 'No',
        'optionValue': 'NO'
      };
      this.optionsArray.push(yes, no);
      this.ansArray.push(this.questionForm.controls['YNAns'].value);
    }

    const data = {
      'questionText': this.questionForm.controls['question_text'].value,
      'type': this.questionForm.controls['qType'].value,
      'queSetID': localStorage.getItem('qs_id'),
      'questionOptions': this.optionsArray,
      'answers': this.ansArray,
    };

    console.log(data);

    this.apiService.updateQuestion(localStorage.getItem('question_id'), data).subscribe((response: any) => {
        this.spinner.hide();
        console.log(response);
        this.alertService.success(response.message, {autoClose: true});
        this.submitted = false;
        setTimeout(() => {
          this.router.navigate(['questions-list/' + localStorage.getItem('qs_id')]);
        }, 2000);
      },
      error => {
        this.spinner.hide();
        this.alertService.error(error.message, {autoClose: true});
      }
    );
  }

  questionTypeChanged($event) {
    if ($event.target.value === 'multiple') {
      this.showBooleanOptions = false;
      this.showMultipleOptions = true;
      this.showYNOptions = false;
      this.qOptions.clear();
      this.addOption('', '');
    } else if ($event.target.value === 'boolean') {
      this.showBooleanOptions = true;
      this.showMultipleOptions = false;
      this.showYNOptions = false;
      this.qOptions.clear();
    } else {
      this.qOptions.clear();
      this.showBooleanOptions = false;
      this.showMultipleOptions = false;
      this.showYNOptions = true;
    }
  }

  ngAfterViewInit(): void {

  }

}
