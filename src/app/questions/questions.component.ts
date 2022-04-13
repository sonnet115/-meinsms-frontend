import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormArray, FormBuilder, Validators} from '@angular/forms';
import {QsApiManagerService} from '../question-sets/qs-api-manager.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AlertService} from '../dashboards/_alert';
import {QApiManagerService} from './q-api-manager.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, AfterViewInit {
  qType: any;
  showMultipleOptions: boolean;
  showYNOptions: boolean;
  showBooleanOptions: boolean;
  questionForm: FormGroup;
  qOptionForm: FormGroup;
  optionLabelArray: Array<any>;
  questionSets: any;
  optionsArray: Array<any>;
  ansArray: Array<any>;
  submitted = false;

  constructor(private fb: FormBuilder,
              private qSApiManager: QsApiManagerService,
              private spinner: NgxSpinnerService,
              private alertService: AlertService,
              private apiService: QApiManagerService) {

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

  newOption(): FormGroup {
    return this.qOptionForm = this.fb.group({
      optionLabel: new FormControl(false, [Validators.required]),
      optionText: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getQuestionSet();
    this.showMultipleOptions = false;
    this.showYNOptions = false;
    this.showBooleanOptions = false;
  }

  get qOptions() {
    return this.questionForm.controls['qOptions'] as FormArray;
  }

  addOption() {
    if (this.qOptions.length < 5) {
      this.qOptions.push(this.newOption());
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
      'queSetID': this.questionForm.controls['queSetID'].value,
      'questionOptions': this.optionsArray,
      'answers': this.ansArray,
    };

    console.log(data);

    this.apiService.create(data).subscribe((response: any) => {
        this.spinner.hide();
        console.log(response);
        this.alertService.success(response.message, {autoClose: true});
        this.submitted = false;
        this.questionForm = this.fb.group({
          question_text: ['', [Validators.required]],
          qType: new FormControl('multiple', [Validators.required]),
          booleanAns: new FormControl('FALSE', [Validators.required]),
          YNAns: new FormControl('NO', [Validators.required]),
          qOptions: this.fb.array([]),
          queSetID: new FormControl('', [Validators.required])
        });
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
      this.addOption();
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
    this.showMultipleOptions = true;
  }
}
