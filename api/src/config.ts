/**
 * JWT config.
 */

require('dotenv/config');

export const config = {
	algorithms: ['HS256' as const],
	secret: 'shhh'//process.env.SECRET
};