"use strict";
/**
 * 1. add event listeners to buttons.
 * 2. check state persistence with local storage
 */
window.onload = function () {
  document.querySelectorAll("button")[0].addEventListener("click", setLSitem);
  document.querySelectorAll("button")[1].addEventListener("click", getLSitem);
  document.querySelectorAll("button")[2].addEventListener("click", delLSitem);
  statepersistence();
};
/**
 * Check the local storage if there is a color item. If yes, it will use  the color to
 * set the page's backgound-color. Otherwise, it will ask for the color, save it into
 * localstorage and set the page's background color accordingly.
 */
function statepersistence() {
  if (window.localStorage) {
    let color = localStorage.getItem("color");
    if (color) {
      alert(`The text color is ${color}`);
    } else {
      color = prompt("what color do you like for the text?");
      if (color) {
        localStorage.setItem("color", color); // save the color item
      }
    }
    // at this point, color either has a good value or is undefined.
    document.body.style.color = color; // apply the color to text
  } else {
    document.querySelector("#output").innerHTML =
      "<h3>Local storage is not supported</h3>";
  }
}
/**
 * This function will ask the user for an item name and value then
 * to save them to the browser's local storage
 * */
function setLSitem() {
  if (window.localStorage) {
    // ask user for the item name
    let name = prompt("enter the item name please");
    //ask user for the item value
    let value = prompt("enter the item value please");
    localStorage.setItem(name, value);
    document.querySelector(
      "#output"
    ).innerHTML = `<h3>${name} = ${value}. Refresh the page to see any visual effect, if any.</h3>`;
  } else {
    document.querySelector("#output").innerHTML =
      "<h3>Local storage is not supported</h3>";
  }
}
/**
 * Retrieve and show the named local storage item.
 * If the item doesn't exist, show a message accordingly.
 * */
function getLSitem() {
  if (window.localStorage) {
    // ask user for the item name
    let name = prompt("enter the item name please");
    let value = localStorage.getItem(name);
    if (value) {
      document.querySelector(
        "#output"
      ).innerHTML = `<h3>${name} = ${value}</h3>`;
    } else {
      document.querySelector(
        "#output"
      ).innerHTML = `<h3>Item ${name} doesn't exist in the local storage.`;
    }
  } else {
    document.querySelector("#output").innerHTML =
      "<h3>Local storage is not supported</h3>";
  }
}
/**
 * Remove the named local storage item or clear all items
 * If the item doesn't exist, show a message accordingly.
 * */
function delLSitem() {
  if (window.localStorage) {
    let delAll = prompt("Do you want to clear all local storage items?");
    // if the 1st char in user's response is "y" or "Y", clear all items.
    if (delAll.trim().toLowerCase()[0] == "y") {
      localStorage.clear();
      document.querySelector("#output").innerHTML =
        "<h3>All localStorage Items are cleated. Refresh the page to see any visual effect, if any.</h3>";
    } else {
      // ask user for the item name
      let name = prompt("enter the item name to delete");
      localStorage.removeItem(name);
      document.querySelector(
        "#output"
      ).innerHTML = `<h3>Item ${name} is deleted. Refresh the page to see any visual effect, if any.</h3>`;
    }
  } else {
    document.querySelector("#output").innerHTML =
      "<h3>Local storage is not supported</h3>";
  }
}
