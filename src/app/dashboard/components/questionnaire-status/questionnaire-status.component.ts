import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { INPUT } from '../../shared/constant';
import { MatSnackBar } from '@angular/material/snack-bar';
import { API_URL } from 'src/app/services/serviceconstant';
import { ApiService } from 'src/app/services/api.service';
const dummyResponse = [
  {
    taskId: '32131313',
    status: 'Test status',
    createdAt: '2023'
  }
]
@Component({
  selector: 'app-questionnaire-status',
  templateUrl: './questionnaire-status.component.html',
  styleUrls: ['./questionnaire-status.component.scss']
})
export class QuestionnaireStatusComponent implements OnInit {
  minYear = INPUT.MIN_YEAR;
  maxYear = INPUT.MAX_YEAR;
  displayedColumns = ['taskId', 'status', 'createdAt'];
  dataSource = new MatTableDataSource<any>([]);
  yearOfReport = null;
  taskId = null;

  constructor(
    private snackBar: MatSnackBar,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  onSubmitReports() {
    const URL = `${API_URL.GET_UPLOAD_SURVEY_QUESTIONNAIRE}/${this.yearOfReport}/${this.taskId}/status`;
    this.apiService.getAPI(URL).subscribe({
      next: (response: any) => {
        this.dataSource.data = response || dummyResponse;
        this.snackBar.open('Document Generated Successfully !', 'success', {
          duration: 3000
        });
      }, error: (err: any) => {
        
      }
    })
   
  }

  checkValidity() {
    return !!this.yearOfReport && (this.yearOfReport && this.yearOfReport <= 2024 && this.yearOfReport >= 1900)
      && !!this.taskId;
  }
}
