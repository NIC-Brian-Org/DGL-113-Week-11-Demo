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
    name = decodeURIComponent( name );
    age = decodeURIComponent( age );
    memNo = decodeURIComponent( memNo );
    document.getElementById("output").innerHTML = `Cookie user has these values:
          name:${name}; age: ${age}; Member#: ${memNo}`;
  } else {
    document.getElementById("output").innerHTML =
      "<p>The multi-valued cookie doesn't exist. Create it on Create Cookies page, then try it again here.</p>";
  }
}

/*
  Get the name=value array of all cookies.
  Then make a table string using the names and values.
  Finally show the table on the page
*/
function showAllCookies() {
  let cookies = document.cookie.split(";");
  let htmlstr = "<table><tr><th>Cookie Name</th><th>Cookie Value</th></tr>";
  for (let cookie of cookies) {
    const [name, value] = cookie.split("=");
    htmlstr += `<tr><td>${name}:</td><td>${value}</td></tr>`;
  }
  htmlstr += "</table>";
  document.getElementById("output").innerHTML = htmlstr;
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
