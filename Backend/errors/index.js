const BadRequest = require('./bad-request');
const CustomAPIError = require('./custom-error');
const Forbidden = require('./forbidden');
const NotFound = require('./not-found');
const UnAuthenticated = require('./unauthenticated');

module.exports = {
    CustomAPIError,
    BadRequest,
    UnAuthenticated,
    NotFound,
    Forbidden
}