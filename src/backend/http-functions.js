// In http-functions.js

import {created} from 'wix-http-functions';

// URL looks like:
// https://www.mysite.com/_functions/myFunction/
// or:
// https://user.wixsite.com/mysite/_functions/myFunction/
export function post_myFunction(request) {

  return request.body.text()
    .then( (body) => {

      // insert the info from the body somewhere

      return created();
    } );
}
// In http-functions.js

import {created, serverError} from 'wix-http-functions';
import wixData from 'wix-data';

// URL looks like:
// https://www.mysite.com/_functions/myFunction/
// or:
// https://user.wixsite.com/mysite/_functions/myFunction/
export function post_myFunction(request) {
  let options = {
    "headers": {
      "Content-Type": "application/json"
    }
  };
  // get the request body
  return request.body.json()
  .then( (body) => {
      // insert the item in a collection
      return wixData.insert("myCollection", body);
    } )
    .then( (results) => {
      options.body = {
        "inserted": results
      };
      return created(options);
    } )
    // something went wrong
    .catch( (error) => {
      options.body = {
        "error": error
      };
      return serverError(options);
    } );
}
