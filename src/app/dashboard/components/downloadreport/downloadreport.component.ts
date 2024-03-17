import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { INPUT } from '../../shared/constant';
import { API_URL, Root_URL } from 'src/app/services/serviceconstant';
import { ApiService } from 'src/app/services/api.service';

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
    const URL = `${Root_URL}${API_URL.GET_FIRST_DRAFT}/${this.yearOfReport}`;
    this.loading = true;
    window.open(URL, "_blank");
    // this.apiService.getAPI(URL).subscribe({
    //   next: (response: any) => {
    //     if(response) {
    //       this.dataSource.data = this.formatResponse(response);//response || dummyResponse;
    //     }
    //     this.loading = false;
    //     this.snackBar.open('Document Generated Successfully !', 'success', {
    //       duration: 3000
    //     });
        
    //   }, error: (err: any) => {
    //     this.loading = false;
    //     this.snackBar.open('Something went wrong !', 'error', {
    //       duration: 3000
    //     });
    //   }
    // });
  }

  checkValidity() {
    return !!this.yearOfReport && (this.yearOfReport && this.yearOfReport <= 2024 && this.yearOfReport >= 1900);
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
