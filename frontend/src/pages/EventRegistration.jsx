import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import axios from "axios";

import { db } from "../firebase"; // Adjust path based on your structure
import { collection, query, where, getDocs } from "firebase/firestore";
const EventRegistration = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const [eventData, setEventData] = useState(null);
 
  useEffect(() => {
    const fetchEvent = async () => {
      try {
      const eventsRef = collection(db, "events");
const q = query(eventsRef, where("id", "==", eventId));
const querySnapshot = await getDocs(q);

if (!querySnapshot.empty) {
  const eventData = querySnapshot.docs[0].data();
  setEventData(eventData);
} else {
  console.warn("⚠️ Event not found in Firestore.");
}

      } catch (err) {
        console.error("❌ Error fetching event:", err);
      }
    };

    fetchEvent();
  }, [eventId]);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidIndianPhone = (phone) => {
    const parsed = parsePhoneNumberFromString(phone, "IN");
    return parsed?.isValid() && parsed?.country === "IN";
  };

  const onSubmit = async (data) => {
    const trimmedEmail = data.email.trim().toLowerCase();
    const trimmedPhone = data.phone.trim();

    if (!isValidEmail(trimmedEmail)) {
      alert("❌ Please enter a valid email address.");
      return;
    }

    if (!isValidIndianPhone(trimmedPhone)) {
      alert("❌ Please enter a valid Indian phone number.");
      return;
    }

    try {
      await axios.post("${import.meta.env.VITE_BASE_URL}/send-confirmation", {
        name: data.name,
        to: trimmedEmail,
        phone: data.phone,
        college: data.college,
        scholarNo: data.scholarNo,
        event: eventData?.Title || "Event",
           ...(eventId && { eventId }),
        eventDate: eventData?.Date,
        eventLink: eventData?.Link,
      });

      alert("✅ Registered successfully! Confirmation email sent.");
      reset();
      navigate("/");
    } catch (error) {
      console.error("❌ Registration Error:", error);
      alert("❌ Registration failed. Try again.");
    }
  };

  if (!eventData) {
    return (
      <div className="text-center mt-20 text-lg text-gray-700">
        Loading event details...
      </div>
    );
  }

  return (
    <div className="flex mt-20 flex-col items-center pt-10 px-4">
      <div className="flex flex-col bg-blue-200 border border-amber-600 rounded-xl w-full max-w-xl p-6 gap-4 shadow-lg">
        <h2 className="text-2xl font-bold text-center">
          Register for {eventData.Title}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <label>
            <p>Name<sup className="text-red-600">*</sup></p>
            <input type="text" {...register("name", { required: true })} className="w-full px-3 py-2 border rounded" />
          </label>

          <label>
            <p>College Email ID<sup className="text-red-600">*</sup></p>
            <input type="email" {...register("email", { required: true })} className="w-full px-3 py-2 border rounded" />
          </label>

          <label>
            <p>Password<sup className="text-red-600">*</sup></p>
            <input type="password" {...register("password", { required: true })} className="w-full px-3 py-2 border rounded" />
          </label>

          <label>
            <p>Contact Number<sup className="text-red-600">*</sup></p>
            <input type="tel" {...register("phone", { required: true })} className="w-full px-3 py-2 border rounded" />
          </label>

          <label>
            <p>College Name<sup className="text-red-600">*</sup></p>
            <input type="text" {...register("college", { required: true })} className="w-full px-3 py-2 border rounded" />
          </label>

          <label>
            <p>Scholar No.<sup className="text-red-600">*</sup></p>
            <input type="text" {...register("scholarNo", { required: true })} className="w-full px-3 py-2 border rounded" />
          </label>

          <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventRegistration;
