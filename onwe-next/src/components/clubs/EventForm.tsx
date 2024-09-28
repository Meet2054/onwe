import React, { useState } from "react";

const EventForm = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventDescription: ""
  });

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Handle form submission logic here (e.g., API call)
    console.log("Form Submitted: ", formData);
    onClose(); // Close modal after submission
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-md w-full max-w-md">
          {step === 1 && (
            <>
              <h2 className="text-lg font-semibold mb-4">Event Details</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="eventName"
                  placeholder="Event Name"
                  value={formData.eventName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="date"
                  name="eventDate"
                  placeholder="Event Date"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-black"
                >
                  Next
                </button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="text-lg font-semibold mb-4">Event Description</h2>
              <textarea
                name="eventDescription"
                placeholder="Event Description"
                value={formData.eventDescription}
                onChange={handleChange}
                className="w-full p-2 border rounded h-32"
              ></textarea>
              <div className="flex justify-between space-x-2 mt-4">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  );
};

export default EventForm;
