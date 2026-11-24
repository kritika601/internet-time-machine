
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

        const response = await fetch(apiUrl);

        const data = await response.json();

        console.log("API Response:", data);

        const snapshot = data.archived_snapshots.closest;

        
        if (snapshot) {

            resultMessage.textContent = "Great! An archived version was found.";

            console.log("Snapshot URL:", snapshot.url);
            console.log("Capture date:", snapshot.timestamp);
            const snapshotUrl = snapshot.url.replace(
                "http://web.archive.org",
                "https://web.archive.org"
            );

            // Display the archived website
            snapshotContainer.style.display = "block";

            loadingMessage.style.display = "block";
            snapshotFrame.src = snapshotUrl;

            // Display the actual capture date
            const timestamp = snapshot.timestamp;

            const formattedDate =
                timestamp.substring(0, 4) + "-" +
                timestamp.substring(4, 6) + "-" +
                timestamp.substring(6, 8);

            snapshotDate.textContent = "Archived on: " + formattedDate;

            // Add a link to open it separately
            openSnapshot.href = snapshotUrl;

        } else {

            resultMessage.textContent = "No archived version found near this year.";

            snapshotContainer.style.display = "none";

        }


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


