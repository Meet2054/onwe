"use client";
import React, { useEffect, useState } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import firebaseApp from "@/lib/firebase";
import useFcmToken from "@/hooks/FcmToken";
import { toast } from "sonner";

export default function Page() {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  const [noti, setMessage] = useState("");
  // Use the token as needed
  fcmToken && console.log("FCM token:", fcmToken);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log("Foreground push notification received:", payload);
        setMessage(payload?.notification?.body as string);
        toast(payload?.notification?.body as string);
        // Handle the received push notification while the app is in the foreground
        // You can display a notification or update the UI based on the payload
      });
      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    }
  }, []);

  return (
    <div className="h-96 break-all w-96">
      {" "}
      {fcmToken}
      <span></span>
    </div>
  );
}
