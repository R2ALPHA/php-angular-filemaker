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
  styleUrls: ['./calender.component.css']
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

  public taskDetails;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  constructor(
    private modal: NgbModal,
    private _taskService: TaskService,
    public datepipe: DatePipe,
    private dialogService: ConfirmDialogService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this._taskService.getAllTaskOfAParticularPlayer()
      .subscribe(data => {
        this.taskDetails = data,
          this.events = data,
          this.convertDataForCalender(this.events)
      });
    // this.viewTask();liste

    /** TODO - Call the methods that will initialise the event litener */
  }

  // first wrong here
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

  activeDayIsOpen: boolean = true

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
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
  deleteEvent(eventToDelete: CalendarEvent) {

    this.dialogService.openConfirmDialog('Are You Sure want to delete this record')
      .afterClosed().subscribe(res => {
        if (res == true) {

          this.events = this.events.filter(
            event => event !== eventToDelete);
          this._taskService.deleteTask(eventToDelete.id)
            .subscribe(data => data);
        }
      })
  }

  /** It will set the view to weeks, months or days */
  setView(view: CalendarView) {
    this.view = view;
    this.filterTask();
  }

  /** It will check for the next day or previous day  */
  closeOpenMonthViewDay() {
   alert(this.viewDate);
    this.activeDayIsOpen = false;
  }


  /** Will Conver to get into appropriate Format */
  convertDataForCalender(data) {

    data.forEach(element => {

      element.id = element.activity_id;
      element.start_date = this.datepipe.transform(element.start_date);
      element.stop_date = this.datepipe.transform(element.stop_date);

      element.start_date = new Date(element.start_date);
      element.stop_date = new Date(element.stop_date);
      element.start = element.start_date;
      element.end = element.stop_date;
      element.title = element.activity_name;
    });
  }

  /** Open the model for displaying the calender data */
  viewTask(task) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(
      ActivityDetailModalComponent,
      {
        width: '500px',
        disableClose: false,
        data: {
          message: task
        },
      }
    );
  }

  /** This.view will always give you the time period */
  filterTask()
  {
    switch(this.view)
    {
      case 'month':
          this.filterMonthwise();
        break;
      case 'week':
          this.filterMonthwise();
          this.filterWeekWise();
        break;
      case 'day':
          this.filterMonthwise();
          this.filterWeekWise();
          this.filterMonthwise();
        break;
    }  
  }
  
  filterMonthwise(){

    this.events = this.events.filter(
      event => {
        event.start.getMonth() == this.viewDate.getMonth()
      });
      alert(this.events);
  }

  filterWeekWise(){
    alert(this.view);
  }
  filterDayWise(){
    alert(this.view);
  }

}
