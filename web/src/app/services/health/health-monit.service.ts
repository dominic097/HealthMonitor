import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from './health-monit.config';
import { APIConfig } from '../../types/';

import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HealthMonitService {
  apiConf: APIConfig;
  constructor(private httpClient: HttpClient) {
    this.apiConf = config;
  }

  getDataCenterStat(): Observable<any> {
    return this.httpClient.get(`${this.apiConf.API_URL}`);
  }
}
