/* Global Variables */
const zipCodeElement = document.querySelector("#zip");
const feelingsCodeElement = document.querySelector("#feelings");
const catchError = (error) => console.error("Errors Found", error);
const apikey = "&appid=84318483711b229c18554e9465aa8e3b";
const apiUrl = "http://localhost:3000";
const dataElement = document.querySelector("#date"); // Data Container
const tempElement = document.querySelector("#temp"); // Temp Container
const contentElement = document.querySelector("#content"); // Content Container

// Event listener to add function to existing HTML DOM element
document.querySelector("#generate").addEventListener("click", generateAction);
/* Function called by event listener */

function generateAction() {
  let data = {
    zipCode: zipCodeElement.value,
    content: feelingsCodeElement.value,
    date: new Date(),
  };

  zCodeInformation(data.zipCode)
    .then((res) => {
      if (res.cod !== 200) {
        return alert("error");
      }

      console.log(res);

      data.temp = res.main.temp;
      dataPostToServer(data);
    })
    .catch(catchError);
}
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

async function zCodeInformation(zipCode) {
  const data = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}${apikey}`
  );

  const res = await data.json();
  return res;
}

async function dataPostToServer(data) {
  try {
    let response = await fetch(`${apiUrl}/postData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    response
      .json()
      .then((data) => {
        console.log(data);
        updateUI();
      })
      .catch(catchError);
  } catch (error) {
    catchError(error);
  }
}

async function updateUI() {
  const response = await fetch(`${apiUrl}/getall`);
  const data = await response.json();
  dataElement.innerHTML = `The date is: ${data.date}`;
  tempElement.innerHTML = `The temp is: ${data.temp}`;
  contentElement.innerHTML = `The feelings is: ${data.content}`;
}
