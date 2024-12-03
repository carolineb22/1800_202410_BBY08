// Check if the user is logged in
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is logged in
        console.log("User is logged in:", user);
        // You can access user details like user.uid, user.displayName, user.email here
    } else {
        // No user is logged in
        console.log("No user is logged in");
    }
});
