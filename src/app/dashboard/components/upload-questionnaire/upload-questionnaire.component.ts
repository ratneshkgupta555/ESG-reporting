import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { INPUT } from '../../shared/constant';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { API_URL } from 'src/app/services/serviceconstant';
const dummyResponse = [
  {
    taskId: '32131313',
    status: 'Test status',
    createdAt: '2023'
  }
]
@Component({
  selector: 'app-upload-questionnaire',
  templateUrl: './upload-questionnaire.component.html',
  styleUrls: ['./upload-questionnaire.component.scss']
})
export class UploadQuestionnaireComponent implements OnInit {
  minYear = INPUT.MIN_YEAR;
  maxYear = INPUT.MAX_YEAR;
  displayedColumns = ['taskid', 'status', 'createAt'];
  dataSource = new MatTableDataSource<any>([]);
  fileToUpload: Blob | any = null;
  yearOfReport = null;
  userId: string = "";
  loading = false;

  constructor(
    private snackBar: MatSnackBar,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  onSubmitReports() {
    const multipartPayload: FormData = this.createRequestPayload();

    // calling API 
    this.loading = true;

    this.apiService.postAPI(
      API_URL.GET_UPLOAD_SURVEY_QUESTIONNAIRE,
      multipartPayload,
    ).subscribe({
      next: (response: any) => {
        this.dataSource.data = [response]; 
        this.loading = false;
        
      }, error: (err: any) => {
        this.snackBar.open('Something went wrong !', 'error', {
          duration: 3000
        });
        this.loading = false;
      }
    })


  }

  private createRequestPayload() {
    const multipartPayload: FormData = new FormData();

    if (this.fileToUpload) {
      multipartPayload.append("SurveyQuestionnaireDocumentName", this.fileToUpload);
    }
    multipartPayload.append('metadata', JSON.stringify(
      {
        "generateReportforYear": this.yearOfReport,
        "userId": this.userId.trim()
      }
    ));
    multipartPayload.append("document Type", 'PDF');
    return multipartPayload;
  }

  changeFile(evt: any) {
    this.fileToUpload = evt.target.files[0];
  }

  checkValidity() {
    return !!this.fileToUpload
      && !!this.yearOfReport && (this.yearOfReport && this.yearOfReport <= 2024 && this.yearOfReport >= 1900)
      && !!this.userId;
  }

}
