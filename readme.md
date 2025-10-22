Real-Time Product Management Dashboard — Backend



This is the Express + Firebase Admin backend API that powers analytics, authentication, and product data aggregation for the dashboard frontend.



1\. Prerequisites



You’ll need:



Node.js 18+



npm



Firebase project (same one used by the frontend)



A service account JSON file



2\. Setup

1\. Clone the repo

git clone https://github.com/fozayelibnayaz/real-time-product-management-dashboard-backend.git

cd real-time-product-management-dashboard-backend



2\. Install dependencies

npm install



3\. Add your Firebase service account



In the Firebase Console → Project Settings → Service Accounts → Generate new private key.



Download the JSON and place it at the project root as:



firebase-service-account.json





Do not commit this file to GitHub.



4\. Environment variables



Create a .env file in the root directory:



PORT=4000

CORS\_ORIGIN=http://localhost:3000





If deploying online, change CORS\_ORIGIN to match your frontend URL.



3\. Run locally

npm run dev





API runs on http://localhost:4000



4\. API overview

Method	Endpoint	Description

GET	/api/analytics	Returns product counts by status

POST	/api/products	Adds a new product

GET	/api/products	Lists all products

GET	/api/debug/product-count	(Debug) Shows Firestore read data

5\. Folder structure

Folder	Description

/src/routes	Express routes (products, analytics, etc.)

/src/firebase	Firebase Admin setup

/src/middleware	Auth and CORS middlewares

/src/index.ts	Main server entry point

6\. Common issues

Problem	Fix

Analytics shows blank {}	Make sure backend and frontend use the same Firebase project ID

CORS error	Update CORS\_ORIGIN in .env

“Permission denied” from Firestore	Check service account permissions and project match

7\. Deployment



You can deploy the backend to:



Render, Railway, Fly.io, or Google Cloud Run.



Make sure to:



Add .env values to your host’s environment settings.



Upload firebase-service-account.json securely through environment variables or storage secrets.



Set the correct CORS\_ORIGIN.



8\. Commands

Command	Description

npm run dev	Run with nodemon (development)

npm start	Run compiled build

npm run build	Compile TypeScript

9\. Final check



Both frontend and backend should use the same Firebase project.



You should see projectId: logs on both when starting each project.



Add a product → reload Analytics page → see real counts.

