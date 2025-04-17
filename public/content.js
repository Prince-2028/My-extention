chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "fillForm") {
      const data = message.data;
  
      try {
        // Select form fields
        const nameField = document.querySelector('p-autocomplete[formcontrolname="passengerName"] input');
        const ageField = document.querySelector('input[placeholder="Age"]');
        const genderField = document.querySelector('select[formcontrolname="passengerGender"]');
        
        // Fill Name field
        if (nameField) {
          nameField.value = data.name;
          nameField.dispatchEvent(new Event("input", { bubbles: true }));
        }
        
        // Fill Age field
        if (ageField) {
          ageField.value = data.age;
          ageField.dispatchEvent(new Event("input", { bubbles: true }));
        }
        
        // Fill Gender field
        if (genderField) {
          genderField.value = data.gender;
          genderField.dispatchEvent(new Event("change", { bubbles: true }));
        }
  
        sendResponse({ status: "success" });
  
      } catch (err) {
        console.error("❌ Error in content.js:", err.message);
        sendResponse({ status: "error", message: err.message });
      }
    }
  
    // Important: Ensure the response is sent asynchronously
    return true; 
  });
  