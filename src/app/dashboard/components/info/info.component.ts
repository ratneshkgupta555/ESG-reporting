import { Component, OnInit } from '@angular/core';
import { INPUT } from '../../shared/constant';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
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
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  minYear = INPUT.MIN_YEAR;
  maxYear = INPUT.MAX_YEAR;
  loading = false;
  yearOfReport = null;
  displayedColumns = ['documentName', 'documentType', 'referenceLink', 'generatedBy', 'reportYear'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(
    private snackBar: MatSnackBar,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  onRetriveClick() {
    this.loading = true;
    this.apiService.postAPI(
      API_URL.RETRIEVE_ALL_REPORTS, 
      {reportYear: this.yearOfReport}).subscribe({
      next: (response: any) => {
        if (response?.documents) {
          this.dataSource.data = this.formatResponse(response.documents);// || dummyResponse;
          this.snackBar.open('Reports upload successfully !', 'success', {
            duration: 3000
          });
        }
        this.loading = false;
      }, error: (err: any) => {
        this.loading = false;
        this.snackBar.open('Something went wrong !', 'error', {
          duration: 3000
        });
      }
    })
  }

  formatResponse(response: any): any[] {
    let tableData: any[] = [];
    response.forEach((doc: any) => {
      tableData.push({
        'documentName': doc.documentName,
        'documentType': doc.metadata.documentType || null,
        'referenceLink': doc.metadata.referenceLink || null,
        'generatedBy': doc.metadata.generatedBy || null,
        'reportYear': doc.metadata.reportYear || null,
      })
    });
    return tableData;
  }
}


