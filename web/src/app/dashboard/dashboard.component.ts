import { Component, OnInit } from '@angular/core';
import { HealthMonitService } from './../services/health/health-monit.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { ServiceSchema } from './../types/';



@Component({
  selector: 'app-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  protected datacenterLst: Observable<Any>;
  protected serviceInfo;

  constructor(private apiService: HealthMonitService) { }

  ngOnInit() {
    this.getDataCenterStats();
  }

  getDataCenterStats() {
    this.apiService.getDataCenterStat().subscribe((res) => {
      const dclst = {};
      if (res.data.length > 0) {
        res.data.forEach(service => {
          if (service.length) {
            if (!dclst[service[0].dataCenter]) {
              dclst[service[0].dataCenter] = service;
            }
          }
        });
      }
      this.datacenterLst = Object.keys(dclst);
      this.serviceInfo = dclst;
    });
  }
}
