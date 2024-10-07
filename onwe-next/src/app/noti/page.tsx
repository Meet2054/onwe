"use client";
import { messaging, vapidKey } from "@/lib/firebase";
import { getToken } from "firebase/messaging";
import { getMessaging, onMessage } from "firebase/messaging";

import React, { useEffect } from "react";
const Page = () => {
  async function requestPermission() {
    const per = await Notification.requestPermission();
    if (per === "granted") {
      try {
        const token = await getToken(messaging, { vapidKey: vapidKey });
        console.log(token);
      } catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(() => {
    requestPermission();
    onMessage(messaging,(payload) => {
        console.log("Message received. ", payload);
    })
  }, []);

  return <div>page</div>;
};

export default Page;
