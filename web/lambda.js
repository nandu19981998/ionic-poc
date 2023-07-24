import serverlessExpress from '@vendia/serverless-express'
import app from './index.js'
import newrelic from 'newrelic';


let serverlessExpressInstance

async function setup (event, context) {
	serverlessExpressInstance = serverlessExpress({ app })
	return serverlessExpressInstance(event, context)
}

export const handler = (event, context) => {
	
	console.log('Initialized handler')
	if (serverlessExpressInstance) {
		console.log('Server express instance exist');
		console.log("Wrapping new relic......");
		return newrelic.setLambdaHandler(serverlessExpressInstance(event, context))
	}
	console.log("Wrapping new relic......");
	return newrelic.setLambdaHandler(setup(event, context)); 
}