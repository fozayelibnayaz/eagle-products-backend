import admin from "firebase-admin";

const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

if (!admin.apps.length && serviceAccountJson) {
  try {
    const credentials = JSON.parse(serviceAccountJson);
    admin.initializeApp({
      credential: admin.credential.cert(credentials as any)
    });
  } catch (e) {
    console.error("Firebase Init Error: Could not parse service account JSON.", e);
  }
} else if (!serviceAccountJson) {
    console.warn("FIREBASE_SERVICE_ACCOUNT_JSON is missing in environment.");
}

export const firestore = admin.firestore();
export default admin;
