import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {ClassesRouting} from './classes.routing';
import { ManageClassesComponent } from './_components/manage-classes/manage-classes.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {httpTranslateLoader} from '../../app.module';
import {HttpClient} from '@angular/common/http';
import {AlertModule} from '../../shared/services/_alert';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import { ClassDetailsComponent } from './_components/class-details/class-details.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { StudentsComponent } from './_components/students/students.component';
import { ActivitiesComponent } from './_components/activities/activities.component';

@NgModule({
  declarations: [ManageClassesComponent, ClassDetailsComponent, StudentsComponent, ActivitiesComponent],
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
        NgbModule,
        FormsModule,
    ]
})
export class ClassesModule { }
