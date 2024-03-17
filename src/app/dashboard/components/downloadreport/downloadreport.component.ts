import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { INPUT } from '../../shared/constant';
import { API_URL } from 'src/app/services/serviceconstant';
import { ApiService } from 'src/app/services/api.service';

const dummyResponse = [
  {
    documentName: 'TestDoc', documentType: 'PDF',
    referenceLink: 'test link', generatedBy: 'userid1', reportYear: 2011
  },
  {
    documentName: 'DummyDoc', documentType: 'PDF',
    referenceLink: 'test link', generatedBy: 'userid11', reportYear: 2011
  },
  {
    documentName: 'XYXDOC', documentType: 'PDF',
    referenceLink: 'test link', generatedBy: 'userid21', reportYear: 2012
  },
  {
    documentName: 'TestDoc2', documentType: 'PDF',
    referenceLink: 'test link', generatedBy: 'userid10', reportYear: 2023
  }
]
@Component({
  selector: 'app-downloadreport',
  templateUrl: './downloadreport.component.html',
  styleUrls: ['./downloadreport.component.scss']
})
export class DownloadreportComponent implements OnInit {

  minYear = INPUT.MIN_YEAR;
  maxYear = INPUT.MAX_YEAR;
  loading = false;
  yearOfReport = null

  displayedColumns = ['documentName', 'documentType', 'referenceLink', 'generatedBy', 'reportYear'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(
    private snackBar: MatSnackBar,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  downloadFirstDraft() {
    const URL = `${API_URL.GET_FIRST_DRAFT}/${this.yearOfReport}`;
    this.loading = true;
    this.apiService.getAPI(URL).subscribe({
      next: (response: any) => {
        this.dataSource.data = response || dummyResponse;
        this.loading = false;
        this.snackBar.open('Document Generated Successfully !', 'success', {
          duration: 3000
        });
        
      }, error: (err: any) => {
        this.loading = false;
        this.snackBar.open('Something went wrong !', 'error', {
          duration: 3000
        });
      }
    });
  }

  checkValidity() {
    return !!this.yearOfReport && (this.yearOfReport && this.yearOfReport <= 2024 && this.yearOfReport >= 1900);
  }

}
