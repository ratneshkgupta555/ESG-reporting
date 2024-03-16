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
  displayedColumns = ['taskId', 'status', 'createdAt'];
  dataSource = new MatTableDataSource<any>([]);
  fileToUpload = null;
  yearOfReport = null;
  userId = null;
  constructor(
    private snackBar: MatSnackBar,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  onSubmitReports() {
    const payload = {
      files: this.fileToUpload,
      yearOfReport: this.yearOfReport,
      userId: this.userId
    };
    this.apiService.postAPI(API_URL.GET_UPLOAD_SURVEY_QUESTIONNAIRE, payload, null).subscribe({
      next: (response: any) => {
        this.dataSource.data = response || dummyResponse;
        this.snackBar.open('Document generated successfully !', 'success', {
          duration: 3000
        });
      }, error: (err: any) => {

      }
    })

   
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
