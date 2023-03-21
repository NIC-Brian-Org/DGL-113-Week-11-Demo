"use strict";

/**
 * When the page is loaded, get hold of the buttons and
 * attach an event listener to each
 * */
window.onload = function () {
  let btnSimpleCookie = document.querySelectorAll("button")[0];
  let btnMoreCookie = document.querySelectorAll("button")[1];
  let btnMVCookie = document.querySelectorAll("button")[2];
  let btnDelCookie = document.querySelectorAll("button")[3];
  btnSimpleCookie.addEventListener("click", simpleCookie);
  btnMoreCookie.addEventListener("click", moreCookie);
  btnMVCookie.addEventListener("click", mvCookie);
  btnDelCookie.addEventListener("click", deleteCookie);
};

/**
 * Create a simple cookie. For the purpose of illustration it asks the user for
 * the cookie info. In a real application, it would be done by the code based its need.
 */
function simpleCookie() {
  // ask user for a cookie name
  let cookieName = encodeURIComponent(prompt("enter a cookie name please"));
  // ask user for a cookie value
  let cookieValue = encodeURIComponent(prompt("enter the cookie value please"));
  // simple way for creating a cookie
  document.cookie = `${cookieName}=${cookieValue}; SameSite=Strict`;
  // show the cookie created - assumed.
  document.querySelector(
    "#output"
  ).innerHTML = `<p>Cookie: ${cookieName}=${cookieValue}</p>`;
}

/**
 * This function will call another function to create several cookies with
 * different parameter values
 */
function moreCookie() {
  createCookie("username", "Sam Jones", 5);
  createCookie("location", "USA", 5, "/");
  createCookie("status", "fullmember", 5, null, "imgd.ca", "secure");
  document.querySelector("#output").innerHTML =
    "<p>3 predefined cookies are created</p>";
}

/**
 * The function below wil create a cookies based on the parameter values provided.
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
  } else expires = "";
  let cookieString = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  if (expires) cookieString += "; expires=" + expires;
  if (path) cookieString += "; path=" + encodeURIComponent(path);
  if (domain) cookieString += "; domain=" + encodeURIComponent(domain);
  if (secure) cookieString += "; secure";
  cookieString += "; SameSite=Strict";
  document.cookie = cookieString;
}

/**
 * Create a multi-valued cookie. For the purpose of illustration it asks the user for
 * the cookie info. In a real application, it would be done by the code based its need.
 */
function mvCookie() {
  // ask the user for the cookie's name
  let userName = encodeURIComponent(prompt("enter your name please:"));
  // ask user for the 1st value
  let userAge = encodeURIComponent(prompt("enter your age please:"));
  //ask user for the 2nd value
  let userMemNum = encodeURIComponent(prompt("enter your membershiop number please:"));
  // create a m-valued cookie; each name-value pair is separated by a |
  document.cookie = `user=${userName}|${userAge}|${userMemNum}; SameSite=Strict`;
  // show the cookie created - assumed.
  document.querySelector(
    "#output"
  ).innerHTML = `<p>Multi-valued Cookie: user=${userName}|${userAge}|${userMemNum};</p>`;
}

/**
 * this function will delete the named cookie by creating
 * the same named cookies, with an empty string value and expired date
 * @param {string} name
 */
function deleteCookie() {
  let name = prompt("cookie name to delete please:");
  createCookie(name, "", -1);
  document.getElementById(
    "output"
  ).innerHTML = `<p>Cookie ${name} deleted.</p>`;
}