import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HelplineService} from './helpline.service';
import {finalize} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable, interval, Subscription, forkJoin } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular';
  stateList = [];
  cityList = [];
  liveData = [];
  summary = {};
  countryList = [];
  selectedValue;
  selectedCountryStatus = [];
  panelOpenState = false;
  globalPanelOpenState = false;
  indiaStats = {};
  loading = false;
  indiaSummary= null;

  displayedColumns: string[] = ['S. No.','Name of State','Total Confirmed cases','Discharged','Death','Date'];
  constructor(private helplineService: HelplineService, private _snackBar: MatSnackBar) {

  }

  showRefreshStatus(action='X') {
    this._snackBar.open('Auto Refresh Complete!', action, {
      duration: 2000,
    });
  }
  //https://jsonblob.com/8300a6c1-8ad0-11ea-a9b5-db8e6ba6201b
  // https://jsonblob.com/api/jsonBlob/5226571730043f8b22dadc20
  ngOnInit() {

    interval(5000).subscribe(
        (val) => { 
          if(this.globalPanelOpenState) {
            this.globalPanelOpened();
            //this.showRefreshStatus();
          }
          else if (this.panelOpenState) {
            this.panelOpened();
            //this.showRefreshStatus();
          }
          
      })
  
    
    // this.helplineService.getStates().subscribe((data) => {
    //   this.stateList = data;
    //   console.log(data);
    // });


    //  this.helplineService.getCities().subscribe((data) => {
    //    this.cityList = data;
    //    console.log(data);
    //  })

    //  this.helplineService.getLiveAll().subscribe((data) => {
    //    this.liveData = data;
    //    console.log(data);
    //  })

    //  this.helplineService.getSummary().subscribe((data) => {
    //    this.summary = data;
    //    //console.log(data);
    //  });

    //  this.helplineService.getCountries().subscribe((data) => {
    //    this.countryList = data;
    //    ////console.log(data);
    //  });
 
  }

  onCountrySelect(event): void {
    console.log(this.selectedValue);
    this.helplineService.getCountryStatus(this.selectedValue).subscribe((data) => {
       this.selectedCountryStatus = data;
       //console.log("sel country",data);
     });
  }

globalPanelOpened(): void {
  this.loading = true;
  this.globalPanelOpenState = true;
  this.helplineService.getSummary().pipe(finalize(() => {this.loading = false;})).subscribe((data) => {
       this.summary = data;
       //console.log(data);
     });
}

  panelOpened(): void {
    this.loading = true;
    this.panelOpenState = true;
    forkJoin(this.helplineService.getIndiaStats(), this.helplineService.getIndiaSummary())
    .pipe(finalize(() => {this.loading = false;})).subscribe((data) => {
      this.indiaStats = data[0];
      this.indiaSummary = data[1];
    });
  }

}
