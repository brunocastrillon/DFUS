/**
 * JWT config.
 */

require('dotenv/config');

export const config = {
	algorithms: ['HS256' as const],
	secret: 'shhhh'//process.env.SECRET
};