import { Component, OnInit } from '@angular/core';
import { INPUT } from '../../shared/constant';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { API_URL } from 'src/app/services/serviceconstant';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  minYear = INPUT.MIN_YEAR;
  maxYear = INPUT.MAX_YEAR;
  filesCount = 0;
  fileToUpload: any = [];
  isYearInvalid = false;
  documentForm: FormGroup = new FormGroup({
    files: new FormArray([]),
    documentUrl: new FormControl(null),
    yearOfReport: new FormControl(null, Validators.required)
  });


  constructor(
    private snackBar: MatSnackBar,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
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
    const payload = this.generatePayload();
    this.apiService.postAPI(API_URL.UPLOAD_ALL_REPORTS, payload, null).subscribe({
      next: (response: any) => {
        this.snackBar.open('Reports upload successfully !', 'success', {
          duration: 3000
        });
      }, error: (err: any) => {

      }
    })

  }

  generatePayload() {
    let payload = null;
    if (this.fileToUpload.length > 0
      && this.documentForm.controls.yearOfReport.value) {
      payload = {
        files: this.fileToUpload,
        yearOfReport: this.documentForm.controls.yearOfReport.value,
        documentUrl: this.documentForm.controls.documentUrl.value
      };
    }
    return payload;
  }

  changeFile(evt: any, index: number) {
    this.fileToUpload[index] = evt.target.files[0];
  }

}
