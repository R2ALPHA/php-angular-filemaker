import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  HostListener
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
import { ConfirmDialogService } from '../confirm-dialog.service';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar'

import { TaskService } from '../task.service';
import { DatePipe } from '@angular/common';
import { ITask } from 'src/shared/task';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ActivityDetailModalComponent } from '../activity-detail-modal/activity-detail-modal.component';
import { AddActivityComponent } from '../add-activity/add-activity.component';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

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
  onWindowScroll() {
    // alert("hello World");
    // how to listen to a specific scroller here...
  }

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  totalEvent: CalendarEvent[];

  public taskDetails;

  /** Send the datato the modal from here */
  modalData: {
    date: Date;
    eventsToShow: CalendarEvent[];
    // eventsToShow: string;
  };

  constructor(
    private modal: NgbModal,
    private _taskService: TaskService,
    public datepipe: DatePipe,
    private dialogService: ConfirmDialogService,
    private dialog: MatDialog,
  ) {

    this.getAllTask();
  }

  ngOnInit() {
    this.getAllTask();
  }

  // Pencil and edit are not working here
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
        this.addTaskForm();
      }
      else {
        //Set the property  of the tooltip here

        this.activeDays = true;
 
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

  handleEvent(action: string, event: CalendarEvent): void {

    this.viewTask(event);
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  /** Need to have own Menu for this */
  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }

  /** Delete the event for the user 
   *  When  you will select the code then it will come
   */
  deleteEvent(eventToDelete) {

    this.getAllTask();
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

    // this.modal.close()

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
          message: task
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

  filterTask() {
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
  filterMonthwise() {

    // Always take full list of the handler 
    this.events = this.totalEvent;
    this.events = this.events.filter(
      event => (event.start.getMonth() === this.viewDate.getMonth()) && (event.start.getFullYear() === this.viewDate.getFullYear())
    );
  }


  /** Filter the data week wise */
  filterWeekWise() {

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
  filterDayWise() {
    this.events = this.events.filter(
      event => event.start.getDate() === this.viewDate.getDate()
    );
  }

  /** TODO -- Loading kind of functionality when the data is not loaded */

  /**  Task Form*/

  addTaskForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(AddActivityComponent, dialogConfig);
  }

  closeTaskForm() {
    this.dialog.closeAll();
  }


  /** Get all task of a player */
  getAllTask() {

    this._taskService.getAllTaskOfAParticularPlayer()
      .subscribe(data => {
        this.events = data,
          this.convertDataForCalender(this.events)
        this.filterTask();
      });
    }
}