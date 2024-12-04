// Assuming firebasebby08.js has already initialized Firebase
function loadLeaderboard() {
    const leaderboardTable = document.getElementById("leaderboardTable");

    // Access Firestore
    const db = firebase.firestore();

    db.collection("users")
        .orderBy("xp", "desc")
        .limit(10)
        .get()
        .then(snapshot => {
            let rank = 1;
            snapshot.forEach(doc => {
                const userData = doc.data();
                const { name, username, xp } = userData;

                // Create a new table row for each user
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${rank++}</td>
                    <td>${name || "N/A"}</td>
                    <td>${username || "N/A"}</td>
                    <td>${xp || 0}</td>
                `;
                leaderboardTable.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error fetching leaderboard data:", error);
        });
}

// Call the function when the page loads
window.addEventListener("load", loadLeaderboard);
