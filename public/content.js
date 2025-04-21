chrome.storage.local.get("passengerList", (result) => {
  const passenger = result.passengerList?.[0];
  console.log("📦 Passenger from local storage:", passenger);

  if (!passenger) {
    const msg = "⚠️ No passenger data found in chrome.storage.local";
    console.warn(msg);
    console.log(msg);
    return;
  }

  // Utility to wait until an element appears in the DOM
  function waitForElement(selector, callback) {
    const interval = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(interval);
        callback();
      }
    }, 300); // check every 300ms
  }

  // Inject data into the form fields
  function injectPassengerData() {
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
      const berthField = document.querySelector(
        'select[formcontrolname="passengerBerthChoice"]'
      );

      // Name
      if (nameField) {
        nameField.value = passenger.name;
        nameField.dispatchEvent(new Event("input", { bubbles: true }));
        console.log("✅ Name injected:", passenger.name);
      }

      // Age
      if (ageField) {
        ageField.value = passenger.age;
        ageField.dispatchEvent(new Event("input", { bubbles: true }));
        console.log("✅ Age injected:", passenger.age);
      }

      // Gender
      if (genderField) {
        let genderCode = "";
        const gender = passenger.gender?.toLowerCase();
        if (gender === "male") genderCode = "M";
        else if (gender === "female") genderCode = "F";
        else if (gender === "transgender") genderCode = "T";

        genderField.value = genderCode;
        genderField.dispatchEvent(new Event("change", { bubbles: true }));
        genderField.dispatchEvent(new Event("blur", { bubbles: true }));
        console.log("✅ Gender injected:", genderCode);
      }

      // Berth Preference
      if (berthField) {
        const berthMap = {
          lower: "LB",
          middle: "MB",
          upper: "UB",
          "side lower": "SL",
          "side upper": "SU",
          "no preference": "",
        };

        const berthInput = passenger.berth?.toLowerCase().trim() || "";
        const berthCode = berthMap[berthInput] ?? "";

        berthField.value = berthCode;
        berthField.dispatchEvent(new Event("change", { bubbles: true }));
        berthField.dispatchEvent(new Event("blur", { bubbles: true }));
        console.log(
          "✅ Berth preference injected:",
          berthCode || "No Preference"
        );
      }
    } catch (error) {
      console.error("❌ Error injecting data:", error);
    }
  }

  // Wait for passenger name field to appear before injecting
  waitForElement(
    'p-autocomplete[formcontrolname="passengerName"] input',
    injectPassengerData
  );
});
