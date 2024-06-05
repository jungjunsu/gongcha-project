import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";
import { testStore } from '@/stores/testStore';
const {
  VITE_APP_VAPID_KEY,
  VITE_APP_API_KEY,
  VITE_APP_AUTH_DOMAIN,
  VITE_APP_PROJECT_ID,
  VITE_APP_STORAGE_BUCKET,
  VITE_APP_MESSAGING_SENDER_ID,
  VITE_APP_APP_ID,
  VITE_APP_MEASUREMENT_ID,
} = import.meta.env;

// Firebase Config values imported from .env file
const firebaseConfig = {
  apiKey: VITE_APP_API_KEY,
  authDomain: VITE_APP_AUTH_DOMAIN,
  projectId: VITE_APP_PROJECT_ID,
  storageBucket: VITE_APP_STORAGE_BUCKET,
  messagingSenderId: VITE_APP_MESSAGING_SENDER_ID,
  appId: VITE_APP_APP_ID,
  measurementId: VITE_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

async function initializeFirebaseMessaging() {
  const supported = await isSupported();
  if (supported) {
    const messaging = getMessaging(app);
    return messaging;
  } else {
    console.warn("This browser doesn't support Firebase Messaging.");
    return null;
  }
}

function FirebaseComponent() {
  const { createToken, createPayload } = testStore();

  useEffect(() => {
    async function requestPermission() {
      console.log("권한 요청 중...");

      const permission = await Notification.requestPermission();
      if (permission === "denied") {
        console.log("알림 권한 허용 안됨");
        return;
      }

      console.log("알림 권한이 허용됨");

      const messaging = await initializeFirebaseMessaging();
      if (!messaging) return;

      try {
        const token = await getToken(messaging, {
          vapidKey: VITE_APP_VAPID_KEY,
        });

        if (token) {
          console.log("token: ", token);
          createToken(token);
        } else {
          console.log("Can not get Token");
        }

        onMessage(messaging, (payload) => {
          console.log("메시지가 도착했습니다.", payload);
          createPayload(payload);
        });
      } catch (error) {
        console.error("An error occurred while retrieving token. ", error);
      }
    }

    requestPermission();
  }, [createToken, createPayload]);

  return null;
}

export default FirebaseComponent;
