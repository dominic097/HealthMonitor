class HealthController {

  constructor(config) {
    this.apiConfig = config;
  }

  collectHealthInfo() {
    if (this.apiConfig.length) {

    }
  }

  promisifyAll() {
    this.apiConfig.map((conf) => {
      return new Promise(() => {

      })
    })
  }
}

