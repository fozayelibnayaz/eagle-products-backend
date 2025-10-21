import admin from "firebase-admin";
import path from "path";

const serviceAccountPath = path.resolve(process.cwd(), "firebase-service-account.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath as any)
  });
}

export const firestore = admin.firestore();
export default admin;
