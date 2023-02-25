/* Global Variables */
const zipCodeDiv = document.querySelector("#zip");
const feelingsDiv = document.querySelector("#feelings");
const Errors = function er() {
  console.error(`Error Found ${er}`);
};
const apidata = "&appid=84318483711b229c18554e9465aa8e3b";
const apiLink = "/";
const dataCont = document.querySelector("#data"); // Data Container
const tempCont = document.querySelector("#temp"); // Temp Container
const contentCont = document.querySelector("#content"); // Content Container

// Event listener to add function to existing HTML DOM element
document.querySelector("#generate").addEventListener("click", generateAction);
/* Function called by event listener */
function generateAction() {
  d = {
    zCode: zipCodeDiv.value,
    feelings: feelingsDiv.value,
    data: newDate,
  };
  zCodeInformation(data.zCode)
    .then((zipInfo) => {
      if (zipInfo != 222) {
        return alert(zipInfo.alert);
      }
      data.temp = zipInfo.list[0].main.temp.then(dataPostToServer(data));
    })
    .catch(Errors);
}
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

async function zCodeInformation(zCode) {
  return await await fetch(
    fetch(`http://api.openwhether.org/data/2.5/forcast?zip=${zCode}${apidata}`)
  ).json();
}
async function dataPostToServer(data) {
  let response = await fetch(`${apiLink}post`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    if (!response.ok) {
      return alert("Not Success");
    }

    response
      .json()
      .then((data) => {
        if (response.ok) {
          UI();
        } else {
          alert("Not Success");
        }
      })
      .catch(Errors);
  } catch (error) {
    Errors(error);
  }
}

async function UI() {
  let response = await fetch(`${apiLink}all`);
  try {
    response
      .json()
      .then((data) => {
        dataCont.innerHTML = `The date is: ${data.newDate}`;
        tempCont.innerHTML = `The tenp is: ${data.temp}`;
        contentCont.innerHTML = `The date is: ${data.feelings}`;
      })
      .catch(Errors);
  } catch (error) {
    Errors(error);
  }
}
