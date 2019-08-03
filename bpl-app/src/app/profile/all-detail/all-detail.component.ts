import { Component, OnInit, EventEmitter, HostListener } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StatusService } from '../../../shared/services/status.service';
import { ProfileService } from '../../../shared/services/profile.service';

@Component({
  selector: 'app-all-detail',
  templateUrl: './all-detail.component.html',
  styleUrls: ['./all-detail.component.scss']
})
export class AllDetailComponent implements OnInit {

  @HostListener("window:scroll", [])

  onWindowScroll() {
    alert("hello world");
  }

  private _url = 'http://localhost:8080/file';

  /** Variable Declaration */

  // File uploader Variable
  public  uploader: FileUploader;                       
  public  hasBaseDropZoneOver: boolean = false;             
  public  hasAnotherDropZoneOver: boolean = false;

  //response we will get after the file has been uploaded
  public  response:any ='';               
  
  //Scrollbar variables
  public  isSelected:boolean = false;
  public  displayProfile;
  public  selectedPlayerData;

  // Total number of status that has been uploaded till now
  public  totalStatus;

  public statusForm: FormGroup;

  constructor(

    private _http: HttpClient,
    private statusFB: FormBuilder,
    private _statusService: StatusService,
    private _profileService: ProfileService,

  ) {

    this.uploader = new FileUploader({

      url: this._url,
      disableMultipart: true,   // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,

      formatDataFunction: async (item) => {

        // To check whether we are getting the right variable or not..
        alert(item._file.name);
        alert(item._file.size);
        alert(item._file.type);

        /** Promise to hold the future value that will be obtained after the data is fetched */
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

    //Storing the response in the response variable
    this.uploader.response.subscribe(res => {
      this.response = res,
        alert("response   " + this.response);
    });
  }

  ngOnInit() {

    this.statusForm = this.statusFB.group({
      message: ['', [Validators.required]],
    });

    this._statusService.getAllStatus()
    .subscribe(data => {
      this.totalStatus = data;
  
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

  /** When the file being selecte d we will encode the transform
   *  into base 64.
   */
  public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];

    console.log(file);

    readBase64(file)
      .then(function (data) {
        console.log(data);
      })

  }

  /** Handling the  status data  submitted by the player */
  onSubmit():void {

    this.statusForm.value.player_id=localStorage.getItem('player_id');

    this._statusService.addStatus(this.statusForm.value)
    .subscribe(data =>{

      /** Will handle after the additon of data it will be showed 
       *  in the feed of player as it is.
       */
      alert("Successfull added");    //for now  
    })
  }

  display(data) {

    alert(data.message);
    let player_id = data.player_id;
  
    alert(player_id);

    //get the selected playerdata
    this.isSelected = false;
    this._profileService.getProfileById(player_id)
    .subscribe( data =>{
      this.selectedPlayerData = data;
      this.isSelected = true;
    })
    
  }
}

/**
 * Read the base 64 of the images being stored here.
 * 
 * @param file is the file may be image, documents, or pdf.. 
 */
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
