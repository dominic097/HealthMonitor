export class ServiceHealth {
  status: String;
  fromTime: Date;
  tillTime: Date;
  isLatest: Boolean;
}

export class ServiceSchema {
  dataCenter: String;
  serviceName: String;
  lastUpdatedTime: Date;
  status: String;
  histroy: [ServiceHealth];
}

export class APIConfig {
  API_URL: String;
}
