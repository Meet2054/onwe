"use client";
import React, { useEffect, useState } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import firebaseApp from "@/lib/firebase";
import useFcmToken from "@/hooks/FcmToken";
import { toast } from "sonner";
import { useSignIn } from "@/hooks/useSignIn";

export default function Page() {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  const [noti, setMessage] = useState("");
  // Use the token as needed
  fcmToken && console.log("FCM token:", fcmToken);
  const { getToken } = useSignIn();

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

  const sendNotification = async () => {
    const token = getToken();
    console.log(token);
    
    if (!fcmToken) {
      console.error('No token available to send notification.');
      return;
    }
  
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checknotification`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        FcmToken: fcmToken,
      }),
    });
  
    if (!response.ok) {
      console.error('Failed to send notification:', response.statusText);
      return;
    }
  
    const result = await response.json();
    console.log(result);
  };

  return (
    <div className="h-96 break-all w-96">
      {" "}
      {fcmToken}
      <span></span>
      <button onClick={sendNotification} className="h-10 w-40 bg-gray-300 ml-10">Send Notifications</button>
    </div>
  );
}
