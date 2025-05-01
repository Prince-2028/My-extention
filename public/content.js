chrome.storage.local.get("passengerList", (result) => {
  const passengers = result.passengerList || [];
  console.log(passengers);

  if (!passengers.length) return;

  function waitForElement(selector, callback) {
    const interval = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(interval);
        callback(element);
      }
    }, 300);
  }

  function clickAddPassengerButton() {
    const addBtn = Array.from(document.querySelectorAll("span.prenext")).find(
      (el) => el.textContent.includes("+ Add Passenger")
    );
    if (addBtn) addBtn.click();
  }

  function injectPassengerData(passenger, index) {
    try {
      const nameField = document.querySelectorAll(
        'p-autocomplete[formcontrolname="passengerName"] input'
      )[index];
      const ageField = document.querySelectorAll(
        'input[formcontrolname="passengerAge"]'
      )[index];
      const genderField = document.querySelectorAll(
        'select[formcontrolname="passengerGender"]'
      )[index];
      const berthField = document.querySelectorAll(
        'select[formcontrolname="passengerBerthChoice"]'
      )[index];

      if (!nameField || !ageField || !genderField || !berthField) return;

      // Name
      nameField.value = passenger.name;
      nameField.dispatchEvent(new Event("input", { bubbles: true }));

      // Age
      ageField.value = passenger.age;
      ageField.dispatchEvent(new Event("input", { bubbles: true }));

      // Gender
      const gender = passenger.gender?.toLowerCase();
      const genderCode =
        gender === "male" ? "M" : gender === "female" ? "F" : "T";
      genderField.value = genderCode;
      genderField.dispatchEvent(new Event("change", { bubbles: true }));
      genderField.dispatchEvent(new Event("blur", { bubbles: true }));

      // Berth
      const berthMap = {
        lower: "Lower Berth",
        middle: "Middle Berth",
        upper: "Upper Berth",
        "side lower": "Side Lower",
        "side upper": "Side Upper",
        "no preference": "No Preference",
      };

      const berthCode = berthMap[passenger.berth?.toLowerCase().trim()] || "";

      const options = Array.from(berthField.options);
      const match = options.find(
        (opt) =>
          opt.textContent.trim().toLowerCase() === berthCode.toLowerCase()
      );

      if (match) {
        berthField.value = match.value;
        berthField.dispatchEvent(new Event("change", { bubbles: true }));
        berthField.dispatchEvent(new Event("blur", { bubbles: true }));
      } else {
        console.warn("No matching berth option found for:", berthCode);
        console.log(
          "Available options:",
          options.map((o) => [o.value, o.textContent.trim()])
        );
      }
    } catch (error) {
      console.error("Error injecting passenger data:", error);
    }
  }

  waitForElement(
    'p-autocomplete[formcontrolname="passengerName"] input',
    () => {
      passengers.forEach((passenger, index) => {
        if (index > 0) clickAddPassengerButton();
        setTimeout(() => injectPassengerData(passenger, index), 500 * index);
      });
    }
  );
});
