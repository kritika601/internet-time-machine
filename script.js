
const yearSlider = document.getElementById("year");
const selectedYear = document.getElementById("selected-year");
const websiteInput = document.getElementById("website");
const travelButton = document.getElementById("travel-button");
const snapshotContainer = document.getElementById("snapshot-container");
const snapshotFrame = document.getElementById("snapshot-frame");
const snapshotDate = document.getElementById("snapshot-date");
const openSnapshot = document.getElementById("open-snapshot");
const loadingMessage = document.getElementById("loading-message");
const searchBox = document.querySelector(".search-box");
const orbitYear = document.getElementById("orbit-year");
const destinationYear = document.getElementById("destination-year");
const orbitCore = document.querySelector(".orbit-core");

snapshotFrame.addEventListener("load", function() {
    loadingMessage.style.display = "none";
});



yearSlider.addEventListener("input", function() {

    selectedYear.textContent = yearSlider.value;
    destinationYear.textContent = yearSlider.value;
    orbitYear.textContent = yearSlider.value;

    // Trigger the time machine pulse
    orbitCore.classList.remove("pulse");

    // Restart the animation
    void orbitCore.offsetWidth;

    orbitCore.classList.add("pulse");


});



const resultMessage = document.getElementById("result-message");

async function travelToPast() {
    const website = websiteInput.value.trim();
    const year = yearSlider.value;

    if (website === "") {
        resultMessage.textContent = "Please enter a website URL.";
        return;
    }

    resultMessage.textContent = "Searching the Internet Archive...";
    travelButton.textContent = "TRAVELLING...";
    travelButton.disabled = true;

    const apiUrl = `https://archive.org/wayback/available?url=${encodeURIComponent(website)}&timestamp=${year}0101`;

    try {

        const snapshots = await getSnapshots(website, year);

        console.log("Snapshots retrieved:", snapshots);
        console.log("Total snapshots:", snapshots.length);

        if (snapshots.length === 0) {
            resultMessage.textContent = "No archived versions found for this year.";
            snapshotContainer.style.display = "none";
            return;
        }
        
        resultMessage.textContent = `${snapshots.length} archived versions found!`;

        snapshotContainer.style.display = "block";
        loadingMessage.style.display = "none";

        // Create the timeline container if it doesn't exist
        let timeline = document.getElementById("snapshot-timeline");

        if (!timeline) {
            timeline = document.createElement("div");
            timeline.id = "snapshot-timeline";
            snapshotDate.insertAdjacentElement("afterend", timeline);
        }

        timeline.innerHTML = `
            <div class="timeline-header">
                <div>
                    <span class="section-index">04 / ARCHIVE TIMELINE</span>
                    <h3>Explore the past</h3>
                </div>
                <span class="snapshot-count">${snapshots.length} CAPTURES</span>
            </div>

            <div class="timeline-scroll">
                <div class="snapshot-track"></div>
                <div class="timeline-markers"></div>
            </div>
        `;

        // Create one button for every archived snapshot
        snapshots.forEach((snapshot, index) => {

            const timestamp = snapshot.timestamp;

            const formattedDate =
                timestamp.substring(0, 4) + "-" +
                timestamp.substring(4, 6) + "-" +
                timestamp.substring(6, 8);

            const button = document.createElement("button");

            const monthNames = [
                "JAN", "FEB", "MAR", "APR",
                "MAY", "JUN", "JUL", "AUG",
                "SEP", "OCT", "NOV", "DEC"
            ];

            const month = Number(timestamp.substring(4, 6));
            button.textContent = monthNames[month - 1];

            button.addEventListener("click", function() {

            timeline.querySelectorAll("button").forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

                const snapshotUrl =
                    `https://web.archive.org/web/${timestamp}/${snapshot.original}`;

                snapshotDate.textContent = "Archived on: " + formattedDate;

                loadingMessage.style.display = "block";
                snapshotFrame.src = snapshotUrl;

                openSnapshot.href = snapshotUrl;

            });

            timeline.querySelector(".timeline-markers").appendChild(button);

            // Automatically load the first snapshot
            if (index === 0) {
                button.click();
            }

        });


    } catch (error) {

    resultMessage.textContent = "Something went wrong. Please try again.";
    console.log("Error:", error);

    } finally {

        travelButton.textContent = "TRAVEL BACK IN TIME →";
        travelButton.disabled = false;

    }

}

travelButton.addEventListener("click", travelToPast);

searchBox.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        event.preventDefault();
        travelToPast();
    }

});

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function getSnapshots(website, year) {

    const apiUrl = `https://internet-time-machine-api.xxxxxxxx.workers.dev/?url=${encodeURIComponent(website)}&year=${year}`;

    try {

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("Could not retrieve archived snapshots.");
        }

        const data = await response.json();

        // The first row contains column names, not a snapshot.
        const snapshots = data.slice(1);

        return snapshots.map(snapshot => {

            return {
                timestamp: snapshot[0],
                original: snapshot[1],
                status: snapshot[2]
            };

        });

    } catch (error) {

        console.error("Snapshot retrieval error:", error);
        throw error;

    }

}



