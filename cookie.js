'use strict';

/**
 * The function below wil create a cookies based on the parameter values provided.
 * The function assumes that all parameters are encoded appropriately.
 * @param {string} name
 * @param {string} value
 * @param {integer} days
 * @param {string} path
 * @param {string} domain
 * @param {string} secure
 */
function createCookie(name, value, days, path, domain, secure) {
  let expires; // Think: why need to declare it here but not in the if block? The textbook code has a bug on this.
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Think: what the formula is about?
    expires = date.toGMTString();
  } else {
    expires = "";
  }
  let cookieString = name + "=" + value;
  if (expires) cookieString += "; expires=" + expires;
  if (path) cookieString += "; path=" + path;
  if (domain) cookieString += "; domain=" + domain;
  if (secure) cookieString += "; secure";
  cookieString += "; SameSite=Strict";
  document.cookie = cookieString;
}

/**
 * This function will retrieve and return the named cookie, if found.
 * Otherwise, it will return null
 * */
function getCookie(name) {
    let nameEquals = name + "=";
    let cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim(); //remove any leading and trailing spaces
      if (cookie.indexOf(nameEquals) == 0) {
        return cookie.substring(nameEquals.length, cookie.length);
      }
    } //end of for loop
    return null;
  }