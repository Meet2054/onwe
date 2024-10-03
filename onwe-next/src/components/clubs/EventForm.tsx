import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { Camera, CircleX } from "lucide-react";
import axios from "axios";
import { useSignIn } from "@/hooks/useSignIn";

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  club: string;
}

const EventForm: React.FC<EventFormProps> = ({ club, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const {getToken} = useSignIn()
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    title: "",
    dateOfEvent: "",
    time: "",
    venue: "",
    description: "",
    subtitle: "",
    category: "",
    clubName: club,
    media: [] as File[]
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };


    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // removing the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const validateForm1 = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.title) newErrors.title = "Event title is required";
    if (!formData.dateOfEvent) newErrors.dateOfEvent = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.venue) newErrors.venue = "Venue is required";
    if (!formData.description) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Form is valid if no errors
  };

  const validateForm2 = () =>{
    const newErrors: { [key: string]: string } = {};
    if (!formData.subtitle) newErrors.subtitle = "Live Link is required";
    if (!formData.category) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleNext = () => {
    if(validateForm1()){
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
   if(validateForm2()){
    try {
      console.log("Form Submitted: ", formData);
      const form = new FormData();
      form.append("title", formData.title);
      form.append("dateOfEvent", formData.dateOfEvent);
      form.append("time", formData.time);
      form.append("venue", formData.venue);
      form.append("description", formData.description);
      form.append("subtitle", formData.subtitle);
      form.append("category", formData.category);
      form.append("clubName", formData.clubName);

      formData.media.forEach((image, index) => {
        form.append(`media`, image);
      });
      console.log(form) 
      const response =await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/Admin/events`, form, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${ getToken()}`,
          },
        }
      );
      console.log(response)
      if(response.status===201){
        onClose()
        console.log("Event Created")
      }
      else{
        console.log("Cannot post event")  
      }
      
    } catch (error) {
      console.log("Cannot post event")
    }
   }
  };

  const handleImageUpload = (files: FileList) => {
    const newImages = Array.from(files).filter(file => file.type.startsWith("image/"));
    setFormData(prevData => ({
      ...prevData,
      media: [...prevData.media, ...newImages].slice(0, 5)
    }));
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prevData => ({
      ...prevData,
      media: prevData.media.filter((_, i) => i !== index)
    }));
  };

  const ImageUploader: React.FC = () => {
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      handleImageUpload(e.dataTransfer.files);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        handleImageUpload(e.target.files);
      }
    };

    return (
      <div
        className="flex flex-col justify-center px-10 py-9 w-full text-sm tracking-tight text-black rounded-md bg-neutral-400 bg-opacity-10 min-h-[168px]"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="flex flex-col items-center w-full">
          <Camera className="w-10 h-10" />
          <p className="mt-2.5 font-medium">Choose Images or drag and drop here.</p>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileInput}
            id="file-upload"
          />
          <label htmlFor="file-upload" className="mt-4 cursor-pointer text-blue-500 hover:text-blue-600">
            Select Images
          </label>
        </div>
      </div>
    );
  };

  const ImagePreview: React.FC = () => {
    return (
      <div className="flex gap-3 items-center w-full">
        {formData.media.map((file, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(file)}
              className="object-contain shrink-0 self-stretch my-auto rounded-none aspect-square w-[60px]"
              alt={`Preview ${index + 1}`}
            />
            <button
              type="button"
              className="absolute top-0 right-0 text-red-600 rounded-full p-1"
              onClick={() => handleRemoveImage(index)}
            >
              <CircleX className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modalRef}  className="bg-white rounded-md w-full max-w-lg max-h-sm">
        {step === 1 && (
          <>
            <div className="bg-gray-900 text-white p-4 rounded-t-lg">
              <div className="text-xl font-bold">Create Events</div>
              <div className="text-sm">Exclusive events, discussions, and updates tailored just for you.</div>
            </div>
            <div className="p-6 space-y-4">
              {formData.media.length < 5 && <ImageUploader />}
              <ImagePreview />
              <div>
                <div className="text-sm font-medium text-gray-700 mb-1">Your Event name?</div>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                 {errors.title && <p className="text-red-600 text-xs">{errors.title}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Date</div>
                  <input
                    type="date"
                    name="dateOfEvent"
                    value={formData.dateOfEvent ? new Date(formData.dateOfEvent).toISOString().substr(0, 10) : ''}
                    onChange={(e) => {
                      const selectedDate = e.target.value; // 'YYYY-MM-DD'
                      const [year, month, day] = selectedDate.split('-');
                      const formattedDate = `${month}-${day}-${year}`; // Convert to 'MM-DD-YYYY'
                      handleChange({ target: { name: 'dateOfEvent', value: formattedDate } });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.dateOfEvent && <p className="text-red-600 text-xs">{errors.dateOfEvent}</p>}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Time</div>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                   {errors.time && <p className="text-red-600 text-xs">{errors.time}</p>}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700 mb-1">Write a Details on Event...(Description)</div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                />
               {errors.description && <p className="text-red-600 text-xs">{errors.description}</p>}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700 mb-1">Enter Your Venue</div>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                 {errors.venue && <p className="text-red-600 text-xs">{errors.venue}</p>}
              </div>
              <div onClick={handleNext} className="bg-black text-white rounded-lg py-2 text-center w-full cursor-pointer">Next</div>
            </div>
          </>
        )}
        {step === 2 && (
          <div className="p-6">
            <div className="text-xl font-bold mb-2">
              <span className="mr-2">✨</span>Create Events
            </div>
            <div className="text-sm text-gray-600 mb-6">
              Exclusive events, discussions, and updates tailored just for you.
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-700 mb-1">
                  Type of event
                </div>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select event type</option>
                  <option value="Booking-required">Booking Required</option>
                  <option value="Booking-free">Booking Free</option>
                  <option value="No-booking">Booking not required</option>
                </select>
                {errors.category && <p className="text-red-600 text-xs">{errors.category}</p>}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700 mb-1">
                  Live Link
                </div>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  placeholder="Enter live event link"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors && <p className="text-red-600 text-xs">{errors.subtitle}</p>}
              </div>
              <div className="flex justify-between">
                <div onClick={handleBack} className="bg-gray-200 text-gray-800 rounded-lg py-2 px-4 cursor-pointer">
                  Back
                </div>
                <div onClick={handleSubmit} className="bg-black text-white rounded-lg py-2 px-4 cursor-pointer">
                  Submit
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventForm;