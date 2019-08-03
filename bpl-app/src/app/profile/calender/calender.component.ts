import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  HostListener,
  OnDestroy
} from '@angular/core';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';

import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogService } from '../../../shared/services/confirm-dialog.service';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar'

import { TaskService } from '../../../shared/services/task.service';
import { DatePipe } from '@angular/common';
import { ITask } from 'src/shared/interfaces/task';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ActivityDetailModalComponent } from '../../activity/activity-detail-modal/activity-detail-modal.component';
import { AddActivityComponent } from '../../activity/add-activity/add-activity.component';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { ObservableService } from '../../../shared/services/observable.service';

/** For marking the future events and the past events */
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calender',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})

export class CalenderComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
 
  /** TODO --> To handle the scrollable event here , we need to do so  */
  @HostListener("window:scroll", [])

  /** On window scroll we will display the full detail of the player */
  onWindowScroll() {
    
  }

  /** Calender Variable */

  view: CalendarView = CalendarView.Month;    //by default , we will have month view enables 
 
  viewDate: Date = new Date();                 
  totalEvent: CalendarEvent[];
  loading:boolean = true;

  dataRefresher;                  //will refresh the data after a certain interval..

  public taskDetails:any="heloo";
  public CalendarView = CalendarView;

  /** 
   * Modal that will show all the task in a selected perios
   *  Used Bootstrap Modal for this.
  */
  modalData: {
    date: Date;
    eventsToShow: CalendarEvent[];
    // eventsToShow: string;
  };

  constructor(
    
    private modal: NgbModal,
    private _taskService: TaskService,
    public  datepipe: DatePipe,
    private dialogService: ConfirmDialogService,
    private dialog: MatDialog ,
    private _observableService:ObservableService

    ) {

    /** Get all the activity available of a particular user */
    this.getAllTask();
   
    // this._taskService.getAllActivity()
    // .subscribe(data=>
    //   {
    //     this._observableService.taskDetails.next(data);
    //   })  
  }

  ngOnInit() {

    /** refresh the activity for new addition of data..  */
    this.refreshData();
  }

  /**
   *  It refreshes the data and call the refresher after a set 
   *  interval of a time 
  */
  refreshData() {

    this.dataRefresher =
      setInterval(() => {
        this.getAllTask();           //Passing the false flag would prevent page reset to 1 and hinder user interaction
      }, 30000);  
  }

  // On clicing it will provide certain properties. like edit and delete
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[];

  activeDayIsOpen: boolean = false;
  activeDays: boolean = true;


  /** TODO : The Actice Day Variable and its referene is causing a problem */

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {

    if (isSameMonth(date, this.viewDate)) {
      if (isSameDay(this.viewDate, date) && this.activeDays === true || events.length === 0) {
        this.activeDays = false;
        this.viewDate=date;
        this.addTaskForm(2);
      }
      else {
        //Set the property  of the tooltip here
        this.activeDays = true;

        //open the modal and show the events od a particular day
        let eventsToShow = this.events.filter(
          event => event.start.getDate() === date.getDate());
          this.modalData = { date, eventsToShow };
          this.modal.open(this.modalContent, { size: 'lg' });
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  /** When user click the calender handle the event */
  /** Action TODO-- */
  handleEvent(action: string, event: CalendarEvent): void {

    this.viewTask(event);
  }
 
  /** TODO :: Currently Working on this */
  deleteEvent(eventToDelete) {

    // this._observableService.taskDetails
    // .subscribe(
    //   uname => {
    //     this.loading=false;
    //     alert("behavioural Subject Called here");
    //     this.totalEvent = uname;

    //     console.log(this.totalEvent);
        
    //     this.totalEvent = this.totalEvent.filter(
    //       eventer =>{
    //         //  console.log(eventer);
    //         //  console.log(eventer.id);
    //         (eventer.id !== eventToDelete)
    //       }
    //     )
  
        this.events = this.events.filter(
          event => (event.id !== eventToDelete) 
        );
        debugger;
    //     this.loading=true;
    //     // this.getAllTask();   //no need to call after calling the value
    //   }); 

    // this.refreshData();
    // this.events.splice(2)
    // this.getAllTask();
  }

  /** It will set the view to weeks, months or days */
  setView(view: CalendarView) {
    this.view = view
    this.filterTask();
  }

  /** It will check for the next day or previous day  */
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
    this.filterTask();
  }

  /** Will Conver to get into appropriate Format */
  convertDataForCalender(data) {

    data.forEach(element => {

      element.id = element.activity_id;

      element.start_date = new Date(element.start_date);
      element.stop_date = new Date(element.stop_date);

      let stime = element.start_time.split(':');
      let etime = element.end_time.split(':');

      element.start_date.setHours(stime[0]);

      element.stop_date.setHours(etime[0]);

      element.start = element.start_date;
      element.end = element.stop_date;
      element.title = element.activity_name;

    });

    /** Temporary Variable to assign the variable */
    this.totalEvent = this.events;
  
  }

  /** Open the model for displaying the calender data */
  viewTask(task) {

    this.modal.dismissAll();

    //close and open the dialog in succession
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;

    let dialogData = this.dialog.open(
      ActivityDetailModalComponent,
      {
        width: '500px',
        disableClose: false,
        data: {
          message: task,
          totalTask: this.totalEvent
        },
      }
    );

    dialogData.afterClosed().subscribe(data => {
      if (data) {
        this.deleteEvent(data);
      }
    });
  }

  /**  This.view will always give you the time period *
  /** Neccessity of filtering multiple rows here  */

  filterTask():void {

    switch (this.view) {

      case 'month':
        this.filterMonthwise();
        break;

      case 'week':
        this.filterMonthwise();
        this.filterWeekWise();
        break;

      case 'day':

        this.filterMonthwise();
        this.filterDayWise();
        break;
    }
  }

  /** Filter the data Month  Wise  */
  filterMonthwise():void {

    // Always take full list of the handler 
    this.events = this.totalEvent;
    this.events = this.events.filter(
      event => (event.start.getMonth() === this.viewDate.getMonth()) && (event.start.getFullYear() === this.viewDate.getFullYear())
    );
  }

  /** Filter the data week wise
   *  TODO  -- Currently it is filtering date wise.
   */
  filterWeekWise():void {

    /** It Will Convert it into individual date */
    let dayofWeek = this.viewDate.getDay();;

    let dayOfSun = new Date();
    let dayOfSat: Date = new Date();
    let endDate: Date = new Date();

    dayOfSun.setDate(this.viewDate.getDate() - dayofWeek);
    dayOfSun.setMonth(this.viewDate.getMonth());
    dayOfSun.setFullYear(this.viewDate.getFullYear());

    endDate.setDate(this.viewDate.getDate() - dayofWeek);
    endDate.setMonth(this.viewDate.getMonth());
    endDate.setFullYear(this.viewDate.getFullYear());

    /** TODO ::- Filtering on the baiss of a month is a problem */

    // this.events = this.events.filter(
    //   ((event),dayOfSun) => ((event.start.getDate()>=dayOfSun) && (event.start<= endDate))
    //   );
  }


  /** Filter the record date wise here */
  filterDayWise():void {

    this.events = this.events.filter(
      event => event.start.getDate() === this.viewDate.getDate()
    );
  }

  /** TODO -- Loading kind of functionality when the data is not loaded */

  /**  Task Form*/
  addTaskForm(populate):void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    
    let addDialog =this.dialog.open(AddActivityComponent, {
      data: {
        dataKey: this.viewDate,
      }
    });

    addDialog.afterClosed().subscribe(() => {
      this.getAllTask();
    });
 
    
    /** If yes then will fetch the data */
    // this.getAllTask();
  }

  closeTaskForm():void {
    this.dialog.closeAll();
  }

  /** Get all task of a player */
  getAllTask() {

    this._taskService.getAllTaskOfAParticularPlayer()
      .subscribe(data => {
        this.events = data;
        this.convertDataForCalender(this.events);
        this.filterTask();
        // this._observableService.taskDetails.next(this.events);
      
      });
    }
}