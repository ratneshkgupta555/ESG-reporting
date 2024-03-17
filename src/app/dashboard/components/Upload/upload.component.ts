import { Component, OnInit } from '@angular/core';
import { INPUT } from '../../shared/constant';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { API_URL } from 'src/app/services/serviceconstant';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  minYear = INPUT.MIN_YEAR;
  maxYear = INPUT.MAX_YEAR;
  filesCount = 0;
  filesToUpload: Blob | any = [];
  isYearInvalid = false;
  documentForm: FormGroup = new FormGroup({
    files: new FormArray([]),
    documentUrl: new FormControl(null),
    yearOfReport: new FormControl(null, Validators.required)
  });

  displayedColumns = ['taskid', 'status', 'createAt'];
  dataSource = new MatTableDataSource<any>([]);
  loading = false;

  constructor(
    private snackBar: MatSnackBar,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.documentForm.controls.yearOfReport.valueChanges.subscribe((value: number) => {
      this.isYearInvalid = !(value && value <= 2024 && value >= 1900);
    })
  }

  addDocument() {
    this.documentForm.controls && (<FormArray>this.documentForm.controls.files).push(
      new FormGroup({
        [this.filesCount]: new FormControl(null)
      })
    );

    this.filesCount++;
  }

  getControls() {
    return (<FormArray>this.documentForm?.get('files')).controls;
  }
  removeDocument(index: number) {
    (<FormArray>this.documentForm?.controls?.files).removeAt(index);
    this.filesCount--;
  }

  func(index: any, val: any) {
    return index;
  }

  onUploadReports() {
    this.loading= true;
    this.apiService.postAPI(API_URL.UPLOAD_ALL_REPORTS, this.generatePayload()).subscribe({
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

  generatePayload() {
    const formdata: FormData = new FormData();
    this.filesToUpload.forEach((file: any) => {
      formdata.append('documentName', file);
    })

    if (this.filesToUpload.length > 0
      && this.documentForm.controls.yearOfReport.value) {
      formdata.append('yearOfReport', this.documentForm.controls.yearOfReport.value?.toString());
      formdata.append('DocumentURL', "");
    }
    return formdata;
  }

  changeFile(evt: any, index: number) {
    this.filesToUpload[index] = evt.target.files[0];
  }
}
