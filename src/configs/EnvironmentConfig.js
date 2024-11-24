const dev = {
  //API_IDENTITY_ENDPOINT_URL: 'https://localhost:7138/api/'
  API_IDENTITY_ENDPOINT_URL: 'http://getnetsof-001-site3.mysitepanel.net/api/',
  API_ENDPOINT_URL:'http://getnetsof-001-site2.mysitepanel.net/api/'
// API_IDENTITY_ENDPOINT_URL: '/api'
};

const prod = {
 // API_IDENTITY_ENDPOINT_URL: 'https://localhost:7138/api/'
  API_IDENTITY_ENDPOINT_URL: 'http://getnetsof-001-site3.mysitepanel.net/api/',
  API_ENDPOINT_URL:'http://getnetsof-001-site2.mysitepanel.net/api/'
// API_IDENTITY_ENDPOINT_URL: '/api'
};

const test = {
  //API_IDENTITY_ENDPOINT_URL: 'https://localhost:7138/api/'
  API_IDENTITY_ENDPOINT_URL: 'http://getnetsof-001-site3.mysitepanel.net/api/',
  API_ENDPOINT_URL:'http://getnetsof-001-site2.mysitepanel.net/api/'
// API_IDENTITY_ENDPOINT_URL: '/api'

};

const getEnv = () => {
	switch (process.env.NODE_ENV) {
		case 'development':
			return dev
		case 'production':
			return prod
		case 'test':
			return test
		default:
			break;
	}
}

export const env = getEnv()
