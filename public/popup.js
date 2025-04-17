document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let nameInput = document.getElementById("PassengerName").value;
    let ageInput = document.getElementById("PassengerAge").value;
    let genderInput = document.getElementById("PassengerGender").value;

    const formData = {
      name: nameInput,
      age: ageInput,
      gender: genderInput,
    };

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0]) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            action: "fillForm",
            data: formData,
          },
          (response) => {
            if (chrome.runtime.lastError) {
              console.error("❌ Error sending message:", chrome.runtime.lastError.message);
              alert("❌ Failed to connect with the IRCTC page. Open that tab first.");
              return;
            }
            console.log("✅ Response from content script:", response);
            alert("✅ Form filled successfully!");
          }
        );
      } else {
        alert("❌ No active tab found.");
      }
    });
  });
});
