import { Component, OnInit, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StatusService } from '../status.service';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-all-detail',
  templateUrl: './all-detail.component.html',
  styleUrls: ['./all-detail.component.scss']
})
export class AllDetailComponent implements OnInit {

  private _url = 'http://localhost:8080/file';

  public uploader: FileUploader;
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;
  public response;

  totalStatus;

  statusForm: FormGroup;

  constructor(
    private _http: HttpClient,
    private statusFB: FormBuilder,
    private _statusService: StatusService
  ) {

    //for uploading the data
    this.uploader = new FileUploader({
      url: this._url,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item) => {
        // alert("item ::-" +item.name +item.length + item.contentType +item.date);

        alert(item._file.name);
        alert(item._file.size);
        alert(item._file.type);

        return new Promise((resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date(),     //TODO - Handle date later...
          });
        });
      }

    });

    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.response = '';

    this.uploader.response.subscribe(res => {
      this.response = res,
        alert("response   " + this.response);
    });
  }

  ngOnInit() {

    this.statusForm = this.statusFB.group({
      message: ['', [Validators.required]],
    });

    //fetch the status data here...
    this._statusService.getAllStatus()
    .subscribe(data => {
      this.totalStatus = data;
      alert(this.totalStatus);
      alert(this.totalStatus[0].message);
      // alert(this.totalStatus)
    })
  }

  /** Once the file is dropped then it will contineoiusly
   *  call the below function to check whether one or more file are 
   *  available or not.  
   */
  public fileOverBase(event: boolean): void {
    this.hasBaseDropZoneOver = event;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];

    console.log(file);

    readBase64(file)
      .then(function (data) {
        console.log(data);
      })

  }

  onSubmit() {

    //post the data 
    this.statusForm.value.player_id=localStorage.getItem('player_id');
    alert(this.statusForm.value.player_id);
    this._statusService.addStatus(this.statusForm.value)
    .subscribe(data =>{
      alert("Successfull added");
    })
  }
}

function readBase64(file): Promise<any> {
  var reader = new FileReader();
  var future = new Promise((resolve, reject) => {
    reader.addEventListener("load", function () {
      resolve(reader.result);
    }, false);

    reader.addEventListener("error", function (event) {
      reject(event);
    }, false);

    reader.readAsDataURL(file);
  });
  return future;
}
