"use client";
import React, { useEffect, useState } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import firebaseApp from "@/lib/firebase";
import useFcmToken from "@/hooks/FcmToken";
import { toast } from "sonner";
import { useSignIn } from "@/hooks/useSignIn";
import useSWRMutation from "swr/mutation";
import axios from "axios";

const poster = async (url: string, token: string, fcmToken: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/checknotification`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        FcmToken: fcmToken,
      }),
    }
  );
  return await response.json();
};

export default function Page() {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  const [noti, setMessage] = useState("");
  // Use the token as needed
  fcmToken && console.log("FCM token:", fcmToken);
  const { getToken } = useSignIn();

  const { trigger } = useSWRMutation(
    [
      `${process.env.NEXT_PUBLIC_API_URL}/checknotification`,
      getToken(),
      fcmToken,
    ],
    ([url, key, fcmToken]) => poster(url, key, fcmToken),
    {
      onSuccess: (data) => {
        console.log("data", data);
      },
    }
  );

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
    if (!fcmToken) {
      console.error("No token available to send notification.");
      return;
    }
    trigger();
  };

  return (
    <div className="h-96 break-all w-96">
      {" "}
      {fcmToken}
      <span></span>
      <button
        onClick={sendNotification}
        className="h-10 w-40 bg-gray-300 ml-10"
      >
        Send Notifications
      </button>
    </div>
  );
}
