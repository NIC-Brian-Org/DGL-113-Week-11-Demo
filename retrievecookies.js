"use strict";

// prepare for the button click eventlisteners
window.onload = function () {
  document
    .getElementById("allcookies")
    .addEventListener("click", showAllCookies);
  document.getElementById("namedcookie").addEventListener("click", namedCookie);
  document
    .getElementById("mvaluecookie")
    .addEventListener("click", mvaluedCookie);
};

/**
 * Retrieve the m-valued cookie, user, then separate and show the multiple values
 * if the cookie doesn't exist, a message will be displayed accordingly.
 */
function mvaluedCookie() {
  // for this one, we assume only specific cookie, i.e., user, has the multi-values
  // let user = prompt("multi-vlued cookie name please:");
  let userData = getCookie("user");
  if (userData) {
    let [name, age, memNo] = userData.split("|");
    document.getElementById("output").innerHTML = `Cookie user has these values:
          name:${name}; age: ${age}; Member#: ${memNo}`;
  } else {
    document.getElementById("output").innerHTML =
      "<p>The multi-valued cookie doesn't exist. Create it on Create Cookies page, then try it again here.</p>";
  }
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
      return unescape(cookie.substring(nameEquals.length, cookie.length));
    }
  } //end of for loop
  return null;
}

/*
  Get the name=value array of all cookies.
  Then make a table string using the names and values.
  Finally show the table on the page
*/
function showAllCookies() {
  let cookies = unescape(document.cookie).split(";");
  let htmlstr = "<table><tr><th>Cookie Name</th><th>Cookie Value</th></tr>";
  for (let cookie of cookies) {
    const [name, value] = cookie.split("=");
    htmlstr += `<tr><td>${name}:</td><td>${unescape(value)}</td></tr>`;
  }
  htmlstr += "</table>";
  document.getElementById("output").innerHTML = htmlstr;
}

/**
 * The function below will create a cookies based on the parameter values provided.
 * @param {string} name
 * @param {string} value
 * @param {integer} days
 * @param {string} path
 * @param {string} domain
 * @param {string} secure
 */
function createCookie(name, value, days, path, domain, secure) {
  let expires; //why need to declare it here but not in the if block? The textbook code has a bug on this.
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = date.toGMTString();
  } else expires = "";
  let cookieString = name + "=" + escape(value);
  if (expires) cookieString += "; expires=" + expires;
  if (path) cookieString += "; path=" + escape(path);
  if (domain) cookieString += "; domain=" + escape(domain);
  if (secure) cookieString += "; secure";
  document.cookie = cookieString;
}

/**
 * Retrieve the cookie named by the user. If it doesn't exist, show a message accordingly.
 */
function namedCookie() {
  let name = prompt("Cookie name please:");
  let cookie = getCookie(name);
  if (cookie) {
    document.getElementById(
      "output"
    ).innerHTML = `Cookie ${name} value is: ${getCookie(name)}`;
  } else {
    document.getElementById(
      "output"
    ).innerHTML = `The cookie named ${name} doesn't exist.`;
  }
}
