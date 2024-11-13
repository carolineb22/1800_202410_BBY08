        //------------------------------------------------------
        // Get data from a CSV file with ".fetch()"
        // Since this file is local, you must use "live serve"
        //------------------------------------------------------
        async function getCSVdata() {
            const response = await fetch('./squamvocab.csv'); //send get request
            const data = await response.text();      //get file response
            const list = data.split('\n').slice(1);  //get line
            list.forEach(row => {
                const columns = row.split(','); //get token 
                const groups = columns[0];     
                const word1 = columns[1];        
                const word2 = columns[2];
                const word3 = columns[3];
                const word4 = columns[4];
                const word5 = columns[5];
                const word6 = columns[6];
                const word7 = columns[7];
								let details = "Here are the groups of words for the game: ";
                details += groups + ": " + word1 + word2 + word3 + word4 + word5 + word6 + word7;
                if (groups.includes("U")) {
                    console.log(groups);
		                db.collection("words").add({   //write to firestore - uncomment 
		                name: groups,
		                details: details
		                })
                }
            })
        }
        getCSVdata();