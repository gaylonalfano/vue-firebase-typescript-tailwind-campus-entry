import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// On sign up.
export const processSignUp = functions.auth.user().onCreate((user) => {
  if (user.email && user.emailVerified) {
    const customClaims = {
      admin: true,
    };
    return admin
      .auth()
      .getUserByEmail("mario@email.com")
      .then((user) => {
        // Confirm user is verified.
        if (user.emailVerified) {
          // Add custom claims for additional privileges.
          // This will be picked up by the user on token refresh or next sign in on new device.
          return admin.auth().setCustomUserClaims(user.uid, customClaims);
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    return null;
  }
});
