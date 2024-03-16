import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { InfoComponent } from './components/info/info.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidenavWrapperComponent } from './components/sidenav-wrapper/sidenav-wrapper.component';
import { UploadComponent } from './components/Upload/upload.component';
import { QuestionnaireStatusComponent } from './components/questionnaire-status/questionnaire-status.component';
import { DownloadreportComponent } from './components/downloadreport/downloadreport.component';
import { GenerateAnswerComponent } from './components/generate-answer/generate-answer.component';
import { UploadQuestionnaireComponent } from './components/upload-questionnaire/upload-questionnaire.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { ChatService } from '../services/chat.service';

@NgModule({
  declarations: [
    SidenavWrapperComponent,
    UploadComponent,
    InfoComponent,
    UploadQuestionnaireComponent,
    QuestionnaireStatusComponent,
    DownloadreportComponent,
    GenerateAnswerComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // NG Material Modules
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    HttpClientModule,
  ],
  providers:[ApiService, ChatService]
})
export class DashboardModule { }
