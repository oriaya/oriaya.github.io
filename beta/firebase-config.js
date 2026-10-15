/* Oriaya web beta — Firebase configuration.
 *
 * HOW TO USE: follow SETUP.md. Create your own Firebase project under YOUR
 * Google account, enable Email/Password auth, create a Firestore database,
 * then paste your project's values below (Firebase console → Project
 * settings → "Your apps" → Web app). Replace every "PASTE_..." placeholder.
 *
 * Until real values are pasted, the app runs in anonymous mode: the full
 * coaching experience works, but nothing is saved and account features show
 * a "setup needed" message. No data ever leaves the browser in that mode.
 *
 * NEVER commit real keys for a production project to a public repo. These
 * Firebase web keys are not secret by design (security lives in Firestore
 * rules), but keep this file out of public repos anyway — it identifies
 * your project.
 */
window.ORIAYA_FIREBASE_CONFIG = {
  apiKey: "AIzaSyDRvrHykWkQm3cs51DiiatBsQdBQzQUNzw",
  authDomain: "oriaya-beta.firebaseapp.com",
  projectId: "oriaya-beta",
  storageBucket: "oriaya-beta.firebasestorage.app",
  messagingSenderId: "853723330659",
  appId: "1:853723330659:web:54b8eb523cd7461025e056"
};
