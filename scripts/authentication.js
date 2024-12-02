// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // If the user is a "brand new" user, create a new "user" in your own database.
      var user = authResult.user; // Get the user object from the Firebase authentication database
      if (authResult.additionalUserInfo.isNewUser) { // If it's a new user
        db.collection("users").doc(user.uid).set({ // Write to Firestore. We are using the UID for the ID in the "users" collection
          name: user.displayName, // Store the user's display name
          email: user.email, // Store the user's email
          points: 0, // Users start with 0 points
          xp: 0, // Users start with 0 XP
          joined: currentDate // Date the user joined the app
        }).then(function () {
          console.log("New user added to Firestore");
          window.location.assign("main.html"); // Redirect to main.html after signup
        }).catch(function (error) {
          console.log("Error adding new user: " + error);
        });
      } else {
        return true; // If the user is not new, continue as normal
      }
      return false; // Prevent redirect if user is new
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: "main.html", // Redirect to main.html on successful sign-in
  signInOptions: [
    // Allow users to sign in with email/password
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Terms of service and privacy policy URLs
  tosUrl: '<your-tos-url>',
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

// Start the FirebaseUI widget
ui.start('#firebaseui-auth-container', uiConfig);

// Get current date
const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1; // JavaScript months are 0-based
let year = date.getFullYear();
let currentDate = `${day}-${month}-${year}`; // Date format: day-month-year
console.log(currentDate); // Example output: "17-6-2022"
