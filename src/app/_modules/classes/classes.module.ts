import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {ClassesRouting} from './classes.routing';
import { ManageClassesComponent } from './_components/manage-classes/manage-classes.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {httpTranslateLoader} from '../../app.module';
import {HttpClient} from '@angular/common/http';
import {AlertModule} from '../../shared/services/_alert';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
  declarations: [ManageClassesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ClassesRouting),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AlertModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ]
})
export class ClassesModule { }
