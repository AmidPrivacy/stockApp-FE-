/**
 * Global application configuration variables
 * for development and production environments
 * @returns {{apiUrl: string, headers: {  Authorization: string  }}}
 */

function config() {
  const appConfig = {
    development: {
      apiUrl: 'https://stock-api.rahmanov.info', 
      // apiUrl: 'http://localhost:8000', 
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'), 
      },
    },

    production: {
      apiUrl: 'https://stock-api.rahmanov.info',  
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    },
  };

  return appConfig[process.env.NODE_ENV];
}

export default config;