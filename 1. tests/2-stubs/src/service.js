const https = require('https');

/*  class to made request onl with node */

class service {
  async makeRequest(url){
    return new Promise((resolve,reject) => {
      https.get(url,response =>{
        response.on('data',data => resolve(JSON.parse(data)))
        response.on('error',reject)
      })
    })
  }
  
}

module.exports = service