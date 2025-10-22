import admin from "firebase-admin";
import path from "path";

// Check if service account is provided as environment variable (for Railway/production)
const serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!admin.apps.length) {
  if (serviceAccountEnv) {
    // Production: use environment variable (Railway)
    const serviceAccount = JSON.parse(serviceAccountEnv);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } else {
    // Local development: use JSON file
    const serviceAccountPath = path.resolve(process.cwd(), "firebase-service-account.json");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountPath as any)
    });
  }
}

export const firestore = admin.firestore();
export default admin;