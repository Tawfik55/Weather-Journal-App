/* Global Variables */
const apiKey = "b6d6dfa73a0fa3d4c0c941fa4027c7aa&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Creat function to get weather data from API
const getWeatherData = async () => {
  // Get the zip value
  const zip = document.getElementById("zip").value;

  const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`;
  // Making the API call
  const response = await fetch(url);
  try {
    const data = await response.json();
    console.log(data);

    // Call back function to send data to server
    sendDataToServer(data);
  } catch (error) {
    console.log("Error getting weather data: ", error);
  }
};

// Creat function to send data to the server
const sendDataToServer = async (data) => {
  // Get the feelings value to send it to server
  const feelings = document.getElementById("feelings").value;

  const postData = {
    date: newDate,
    temp: data.main.temp,
    feelings: feelings,
  };
  // Send the data to the server
  await fetch("/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
};

// Function to retrieve data from the server
const retrieveDataFromServer = async () => {
  // Make a GET request to the server
  const response = await fetch("/weather");
  try {
    const data = await response.json();
    // Call back function to update the UI
    updateUI(data);
  } catch (error) {
    console.log("Error retrieving data from server: ", error);
  }
};

// Function to update UI with data
const updateUI = (data) => {
  document.getElementById("date").innerHTML = `Date: ${data.date}`;
  document.getElementById(
    "temp"
  ).innerHTML = `Temperature: ${data.temp} &#8457;`;
  document.getElementById("content").innerHTML = `Feelings: ${data.feelings}`;
};

// Add event listener to the generate button
document.getElementById("generate").addEventListener("click", async () => {
  // Call the get weather function
  await getWeatherData();
  // Call the retrieve data function
  await retrieveDataFromServer();
});
