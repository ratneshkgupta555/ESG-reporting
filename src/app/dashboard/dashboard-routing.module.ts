import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './components/info/info.component';
import { UploadQuestionnaireComponent } from './components/upload-questionnaire/upload-questionnaire.component';
import { SidenavWrapperComponent } from './components/sidenav-wrapper/sidenav-wrapper.component';
import { UploadComponent } from './components/Upload/upload.component';
import { QuestionnaireStatusComponent } from './components/questionnaire-status/questionnaire-status.component';
import { DownloadreportComponent } from './components/downloadreport/downloadreport.component';
import { GenerateAnswerComponent } from './components/generate-answer/generate-answer.component';

const routes: Routes = [
  // Sidenavwrapper Component acts like a shell & the active child Component gets rendered into the <router-outlet>
  {
    path: '',
    component: SidenavWrapperComponent,
    children: [
      {
        path: 'upload',
        component: UploadComponent
      },
      {
        path: 'info',
        component: InfoComponent
      },
      {
        path: 'upload-questionnaire',
        component: UploadQuestionnaireComponent
      },
      {
        path: 'questionnaire-status',
        component: QuestionnaireStatusComponent
      },
      {
        path: 'download-report',
        component: DownloadreportComponent
      },
      {
        path: 'generate-answer',
        component: GenerateAnswerComponent
      },
      
    ]
  },
  {
    path: '**',
    redirectTo: '/upload',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
