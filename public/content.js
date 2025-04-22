chrome.storage.local.get("passengerList", (result) => {
  const passenger = result.passengerList?.[0];

  if (!passenger) return;

  function waitForElement(selector, callback) {
    const interval = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(interval);
        callback(element);
      }
    }, 300);
  }

  function injectPassengerData() {
    try {
      const nameField = document.querySelector('p-autocomplete[formcontrolname="passengerName"] input');
      const ageField = document.querySelector('input[formcontrolname="passengerAge"]');
      const genderField = document.querySelector('select[formcontrolname="passengerGender"]');
      const berthField = document.querySelector('select[formcontrolname="passengerBerthChoice"]');

      if (!nameField || !ageField || !genderField || !berthField) return;

      nameField.value = passenger.name;
      nameField.dispatchEvent(new Event("input", { bubbles: true }));

      ageField.value = passenger.age;
      ageField.dispatchEvent(new Event("input", { bubbles: true }));

      const gender = passenger.gender?.toLowerCase();
      let genderCode = gender === "male" ? "M" : gender === "female" ? "F" : "T";
      genderField.value = genderCode;
      genderField.dispatchEvent(new Event("change", { bubbles: true }));
      genderField.dispatchEvent(new Event("blur", { bubbles: true }));

      const berthMap = {
        lower: "LB",
        middle: "MB",
        upper: "UB",
        "side lower": "SL",
        "side upper": "SU",
        "no preference": "",
      };
      const berthCode = berthMap[passenger.berth?.toLowerCase().trim()] || "";
      berthField.value = berthCode;
      berthField.dispatchEvent(new Event("change", { bubbles: true }));
      berthField.dispatchEvent(new Event("blur", { bubbles: true }));

      const continueButton = document.querySelector("button.train_Search.btnDefault");
      if (continueButton) {
        continueButton.click();
      }
    } catch (error) {
      console.error(error);
    }
  }

  waitForElement('p-autocomplete[formcontrolname="passengerName"] input', injectPassengerData);
});
