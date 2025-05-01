import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";

function App() {
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      passengers: [{ name: "", age: "", gender: "", berth: "No Preference" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "passengers",
  });

  useEffect(() => {
    chrome.storage.local.get("passengerList", (result) => {
      const saved = result.passengerList;
      if (saved && Array.isArray(saved)) {
        saved.forEach((p) => append(p));
        remove(0);
      }
    });
  }, []);

  const onSubmit = (data) => {
    const passengerList = data.passengers;
    chrome.storage.local.set({ passengerList }, () => {
      alert("Passenger data saved to chrome.storage.local!");
    });
    reset();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Passenger Details
      </h2>

      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() =>
            append({
              name: "",
              age: "",
              gender: "",
              berth: "No Preference",
            })
          }
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
        >
          Add Passenger
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {fields.map((field, index) => (
          <div key={field.id} className="flex mb-5 items-center space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700 text-sm">Name:</label>
              <input
                {...register(`passengers.${index}.name`, { required: true })}
                placeholder="Enter name"
                className="w-full p-2 border rounded-md shadow-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 text-sm">Age:</label>
              <input
                type="number"
                {...register(`passengers.${index}.age`, { required: true })}
                placeholder="Enter age"
                className="w-full p-2 border rounded-md shadow-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 text-sm">Gender:</label>
              <select
                {...register(`passengers.${index}.gender`, { required: true })}
                className="w-full p-2 border rounded-md shadow-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 text-sm">
                Berth Preference:
              </label>
              <select
                {...register(`passengers.${index}.berth`, { required: true })}
                className="w-full p-2 border rounded-md shadow-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Upper">Upper</option>
                <option value="Middle">Middle</option>
                <option value="Lower">Lower</option>
                <option value="Side Upper">Side Upper</option>
                <option value="Side Lower">Side Lower</option>
                <option value="No Preference">No Preference</option>
              </select>
            </div>

            <div className="ml-2 mt-1">
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <FaTrashAlt size={18} />
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
          >
            Save All
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
