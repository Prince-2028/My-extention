chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.data) {
    console.log("Received data in content.js:", message);

    const data = JSON.parse(message.data);
    console.log(data);

    try {
      const nameField = document.querySelector(
        'p-autocomplete[formcontrolname="passengerName"] input'
      );
      const ageField = document.querySelector(
        'input[formcontrolname="passengerAge"]'
      );
      const genderField = document.querySelector(
        'select[formcontrolname="passengerGender"]'
      );

      // Name
      if (nameField) {
        nameField.value = data.name;
        nameField.dispatchEvent(new Event("input", { bubbles: true }));
        console.log(" Name injected:", data.name);
      }

      // Age
      if (ageField) {
        ageField.value = data.age;
        ageField.dispatchEvent(new Event("input", { bubbles: true }));
        console.log("Age injected:", data.age);
      }

      if (genderField) {
        let genderCode = "";
        if (data.gender.toLowerCase() === "male") genderCode = "M";
        else if (data.gender.toLowerCase() === "female") genderCode = "F";
        else if (data.gender.toLowerCase() === "transgender") genderCode = "T";

        genderField.value = genderCode;
        genderField.dispatchEvent(new Event("change", { bubbles: true }));
        console.log(" Gender injected:", genderCode);
      }

      sendResponse({
        status: "success",
        message: "Data injected successfully",
      });
    } catch (error) {
      console.error(" Error injecting data into IRCTC form:", error);
      sendResponse({ status: "error", message: error.message });
    }
  } else {
    sendResponse({ status: "error", message: "No data received" });
  }
});
