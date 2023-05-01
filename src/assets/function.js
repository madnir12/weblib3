import React from "react";
import $ from "jquery";
import axios from 'axios'
import { updateDocField } from "./config/firebase";
const basicUrl = !window.location.href.includes("localhost")
  ? process.env.REACT_APP_HOST_PATH
  : process.env.REACT_APP_LOCAL_PATH;
  // this function will get single doc and return it
  export const getSingleDoc = async (id) => {
    try {
      const response = await axios(`${basicUrl}/book/search/_id/${id}`);
      return response.data[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
// this function takes an array and return table which
export const createTable = (data)=>{
  // Create the table element and its header row
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const firstHeader = document.createElement('th');
  const secondHeader = document.createElement('th');

  // Set the text content of the header cells
  firstHeader.textContent = 'First';
  secondHeader.textContent = 'Second';

  // Append the header cells to the header row and the header row to the table header
  headerRow.appendChild(firstHeader);
  headerRow.appendChild(secondHeader);
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create the table body and populate it with the data
  const tbody = document.createElement('tbody');
  for (let i = 0; i < data.length; i++) {
    const dataRow = document.createElement('tr');
    const firstCell = document.createElement('td');
    const secondCell = document.createElement('td');

    // Set the text content of the data cells
    firstCell.textContent = data[i].first;
    secondCell.textContent = data[i].second;

    // Append the data cells to the data row and the data row to the table body
    dataRow.appendChild(firstCell);
    dataRow.appendChild(secondCell);
    tbody.appendChild(dataRow);
  }

  // Append the table body to the table
  table.appendChild(tbody);
  console.log(table)
  // Return the generated table
  return table;
} // ends createTable function
// this function will use to backup firebase book collection in a file
export const downloadFile = async (myData)=>{
  // Define the file content
const data = await myData;
// Convert the data to a JSON string
console.log(data);
const json = JSON.stringify(data);
console.log(json);

// Create a Blob object from the JSON string
const blob = new Blob([json], { type: 'application/json' });

// Create a URL object for the blob
const url = URL.createObjectURL(blob);

// Create a download link and simulate a click to trigger download
const downloadLink = document.createElement('a');
downloadLink.href = url;
downloadLink.download = `${data.name}.json`;
document.body.appendChild(downloadLink);
downloadLink.click();

// Release the URL object when done to free up memory
URL.revokeObjectURL(url);

} // ends backup function

// if we provide html to this function it will return text from that html
export const getText = (html)=>{
  const parser = new DOMParser(); // creating an dom object
  const doc = parser.parseFromString(html, "text/html"); // inserting html in dom
  return doc.body.textContent; // extracting text
} // ends getText function 
// this method will use to convert date into year and day and second
export function timeSince(date) {
  const now = new Date();
  console.log(date)
  const secondsPast = (now.getTime() - new Date(date).getTime()) / 1000;

  if (secondsPast < 60) {
    return `${parseInt(secondsPast)} second ago`;
  }
  else if (secondsPast < 3600) {
    return `${parseInt(secondsPast / 60)} minute ago`;
  }
  else if (secondsPast <= 86400) {
    return `${parseInt(secondsPast / 3600)} hour ago`;
  }
  else if (secondsPast > 86400 && secondsPast <= 31536000) {
    return `${parseInt(secondsPast / 86400)} day ago`;
  }
  else if (secondsPast > 31536000) {
    let yearsAgo = parseInt(secondsPast / 31536000);
    return `${yearsAgo} year`;
  }
} // ends timeSince function
// this method will use to wrap selected text and set the changes into given state in the last parameter
export function wrapTextbc(elementID, openTag, closeTag, setHtml) {
  var textArea = $("#" + elementID);
  var len = textArea.val().length;
  var start = textArea[0].selectionStart;
  var end = textArea[0].selectionEnd;
  var selectedText = textArea.val().substring(start, end);
  var replacement = openTag + selectedText + closeTag;
  if (end !== start) {
    textArea.val(
      textArea.val().substring(0, start) +
      replacement +
      textArea.val().substring(end, len)
    );
    setHtml(textArea.val());
  }
} // ends wraptext method
export function wrapText(className) {
  let selection = window.getSelection(); // get the selected text
  let range = selection.getRangeAt(0); // get the range of the selected text
  let parent = range.commonAncestorContainer.parentNode; // get the parent element
  let newText = selection.toString(); // text that we want to replace with
  let newSpan = document.createElement("span");
  if (parent.innerText === selection.toString()) {
    if (parent.id !== "myTa" && !parent.classList.contains("page-div-container")) {
      parent.classList.remove(...parent.classList) // this line will remove all class
      parent.classList.add(className) // this line will add new class
      let newTextNode = document.createTextNode(newText)
      parent.innerHTML = ""
      range.deleteContents()
      range.insertNode(newTextNode)
    } else if (parent.id === "myTa") {
      let selected = range.commonAncestorContainer;
      if (selected.nodeType === 3) {
        newSpan.classList.add(className)
        let newNode = document.createTextNode(newText); // create a new text node with the new text
        newSpan.appendChild(newNode); // this will add new text in new span
        range.deleteContents(); // this will clear all selected content
        range.insertNode(newSpan)
      } else if (selected.nodeType === 1) {
        selected.classList.remove(...selected.classList)
        selected.classList.add(className)
        selected.innerHTML = ""
        let newNode = document.createTextNode(newText); // create a new text node with the new text
        range.deleteContents(); // this will clear all selected content
        range.insertNode(newNode)
      }
    } else {
      newSpan.classList.add(className)
      let newNode = document.createTextNode(newText); // create a new text node with the new text
      newSpan.appendChild(newNode); // this will add new text in new span
      range.deleteContents(); // this will clear all selected content
      range.insertNode(newSpan)
    }
  } else {
    newSpan.classList.add(className)
    let newNode = document.createTextNode(newText); // create a new text node with the new text
    newSpan.appendChild(newNode); // this will add new text in new span
    range.deleteContents(); // this will clear all selected content
    range.insertNode(newSpan)
  }
} // ends wraptext method
// this function use to keep selection
export const keepSelection = (element) => {
  let textArea = element.current;
  let start = textArea.selectionStart;
  let end = textArea.selectionEnd;


  // Schedule the selection restoration for the next repaint
  requestAnimationFrame(() => {
    textArea.focus();
    textArea.setSelectionRange(start, end);
  });
  let len = textArea.value.length;
  let text = textArea[0].value.substring(start, end)

} // ends keepSelection function
// this function will controle onContextMenu action
export function handleOnContextMenu(event) {
  event.preventDefault();
  var menu = $(".context-menu-container");
  menu.css({
    display: "block",
    top: event.pageY + "px",
    left: (event.pageX - 100) + "px",
    padding: "20px",
  });
  menu.focus()
} // ends handleOncontextmenu method
export function onContextMenu(event) {
  event.preventDefault();
  var menu = $("#contextMenu");
  menu.css({
    top: event.pageY - 100 + "px",
    left: (event.pageXd - 400) + "px",
    height: "auto",
    width: "800px",
    padding: "20px",
  });
  menu.focus()
} // ends oncontextmenu method
// this function use to update last edit date
export const updateBookEditDate = async (docId, after) => {
  let obj = {
    lastEditAt: new Date()
  }
  updateDocField("books_array", docId, obj, after);
} // ends updatebookeditdate function
// this method use to parform edit actions 
export const handleChangeCommand = (event) => {
  const myEvent = event.currentTarget.getAttribute("data-command");

  document.execCommand(myEvent, true, null);
} // ends handle change command function
// this function use to change font size 
export function changeFontSize(fontSize) {
  let selection = window.getSelection(); // get the selected text
  let range = selection.getRangeAt(0); // get the range of the selected text
  let parent = range.commonAncestorContainer.parentNode; // get the parent element
  let newText = selection.toString(); // text that we want to replace with
  let newSpan = document.createElement("span");
  console.log(parent)
  console.log(range.commonAncestorContainer)
  if (parent.innerText === selection.toString()) {
    console.log("all text selected")
    if (parent.id !== "myTa") {
      console.log("parent id is not myta")
      parent.style.fontSize = `${fontSize}px`
    } else if (parent.id === "myTa") {
      console.log("parent id is myta")
      let selected = range.commonAncestorContainer;
      if (selected.nodeType === 1) {
        selected.innerHTML = newText;
        selected.style.fontSize = `${fontSize}px`
      } else if (selected.nodeType === 3) {
        console.log("selected node is a text node")
        let newTextNode = document.createTextNode(newText)
        newSpan.appendChild(newTextNode)
        newSpan.style.fontSize = `${fontSize}px`
        range.deleteContents()
        range.insertNode(newSpan)
      }
    }
  } else {
    console.log("a part of text selected")
    newSpan.style.fontSize = `${fontSize}px`;
    let newNode = document.createTextNode(newText); // create a new text node with the new text
    newSpan.appendChild(newNode); // this will add new text in new span
    range.deleteContents(); // this will clear all selected content
    range.insertNode(newSpan)
  }
} // ends changefontsize
// this method will use to hide context menu
export const hideContextMenu = () => {
  var menu = $("#contextMenu");
  menu.css({
    height: "0px",
    width: "0px",
    padding: "0px",
  });
  
} // ends hide context menu method