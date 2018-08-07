export interface API_ERROR extends Error {
  status: Number
}

export interface API_RESPONSE {
  status: Number,
  statusText: String,
  headers: any,
  config: any,
  request: any,
  data: String
}