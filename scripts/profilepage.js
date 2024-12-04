// Function to fetch user data from Firestore as soon as the page loads
window.addEventListener('load', () => {
    loadProfileData();
});

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

// Function to fetch user data from Firestore
function loadProfileData() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // Get the user ID
            const userId = user.uid;

            // Reference to the user's document in Firestore (assuming the collection is called 'users')
            const userDocRef = firebase.firestore().collection('users').doc(userId);

            // Fetch the user data from Firestore
            userDocRef.get().then(doc => {
                if (doc.exists) {
                    const userData = doc.data();

                    // Set the profile fields with data from Firestore
                    document.getElementById('profileDisplayName').innerText = userData.name || 'Display Name';
                    document.getElementById('profileUsername').innerText = `@${userData.username || 'username'}`;
                    document.getElementById('profileEmail').innerText = userData.email || 'email@email.ca';
                    document.getElementById('profileJoined').innerText = userData.joined || 'N/A';
                    document.getElementById('profileScore').innerText = userData.score || 0;
                    document.getElementById('profileXp').innerText = userData.xp || 0;
                    document.getElementById('profilePoints').innerText = userData.points || 0;

                    // Set values in the Edit Profile modal fields
                    document.getElementById('displayName').value = userData.name || 'Display Name';
                    document.getElementById('username').value = userData.username || '@username';
                    document.getElementById('email').value = userData.email || 'hello@email.ca';
                    
                } else {
                    console.log('No such document!');
                }
            }).catch(error => {
                console.log('Error getting document:', error);
            });
        } else {
            console.log("No user is signed in.");
        }
    });
}

// Save profile changes to Firestore when the Save Changes button is clicked
function saveProfileChanges() {
    // Only gather the editable fields (displayName, username)
    const displayName = document.getElementById('displayName').value;
    const username = document.getElementById('username').value;

    // Save changes back to Firestore
    const userId = firebase.auth().currentUser.uid;
    firebase.firestore().collection('users').doc(userId).update({
        name: displayName,
        username: username
    }).then(() => {
        // Update the displayed profile info after saving
        document.getElementById('profileDisplayName').innerText = displayName;
        document.getElementById('profileUsername').innerText = `@${username}`;

        alert("Profile changes saved successfully!");
    }).catch(error => {
        console.log("Error updating profile:", error);
    });
}


