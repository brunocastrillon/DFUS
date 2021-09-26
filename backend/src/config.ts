/**
 * JWT config.
 */

require('dotenv/config');

const port = process.env.SERVERPORT;

 export const config = {
	// algorithms: ['HS256' as const],
	secret: process.env.SECRET
};