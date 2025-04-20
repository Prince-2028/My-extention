// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   if (message.action === "validate") {
//     // Log to check if the listener is triggered
//     console.log("Received validate action in background.js");

//     // Get the data from localStorage
//     const data = localStorage.getItem("passengerData");
//     console.log("Data from localStorage:", data);

//     const parsedData = data ? JSON.parse(data) : [];

//     // Send the data to the active tab (content script)
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       chrome.tabs.sendMessage(
//         tabs[0].id,
//         { data: parsedData },
//         function (response) {
//           console.log("Response from content.js:", response);
//         }
//       );
//     });

//     // Send a response back to the popup
//     sendResponse({ status: "Validation initiated" });
//   }
//   return true; // Keep the message channel open for asynchronous response
// });
   

// Get data from localStorage and send it to the content script
let data = localStorage.getItem("passengerData");
console.log(data); // Logs the data from localStorage

// Send the data to the content script of the active tab
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { data: data }, function (response) {
        console.log("Response from content script:", response);
    });
});
