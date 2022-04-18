import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {TranslateService} from '@ngx-translate/core';
import {AlertService} from '../../../../shared/services/_alert';
import {ActivatedRoute} from '@angular/router';
import {LoggerService} from 'src/app/shared/services/logger.service';

@Component({
  selector: 'app-pass-reset',
  templateUrl: './pass-reset.component.html',
  styleUrls: ['./pass-reset.component.css']
})
export class PassResetComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    public translate: TranslateService,
    private route: ActivatedRoute,
    private loggerService: LoggerService) {
  }

  ngOnInit(): void {
  }
}
