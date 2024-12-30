import { initializeApp, getApps } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';

export const useFirebaseApp = (): FirebaseApp => {
  let app: FirebaseApp;
  if (!getApps().length) {
    app = initializeApp({
      apiKey: import.meta.env.VITE_FB_apiKey,
      authDomain: import.meta.env.VITE_FB_authDomain,
      databaseURL: import.meta.env.VITE_FB_databaseURL,
      projectId: import.meta.env.VITE_FB_projectId,
      storageBucket: import.meta.env.VITE_FB_storageBucket,
      appId: import.meta.env.VITE_FB_appId,
      measurementId: import.meta.env.VITE_FB_measurementId,
      messagingSenderId: import.meta.env.VITE_FB_messagingSenderId,
    });
  } else {
    app = getApps()[0];
  }
  return app;
};
