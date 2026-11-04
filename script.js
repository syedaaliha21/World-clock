
const countries = [
    { id: "pakistan", timezone: "Asia/Karachi" },
    { id: "usa", timezone: "America/New_York" },
    { id: "uk", timezone: "Europe/London" },
    { id: "uae", timezone: "Asia/Dubai" },
    { id: "japan", timezone: "Asia/Tokyo" },
    { id: "india", timezone: "Asia/Kolkata" },
    { id: "saudi", timezone: "Asia/Riyadh" },
    { id: "australia", timezone: "Australia/Sydney" }
];

function updateClocks() {

    const now = new Date();

    countries.forEach(country => {

        const time = new Intl.DateTimeFormat("en-GB", {
            timeZone: country.timezone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        });

        const date = new Intl.DateTimeFormat("en-GB", {
            timeZone: country.timezone,
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        document.getElementById(country.id).textContent =
            time.format(now);

        document.getElementById("date-" + country.id).textContent =
            date.format(now);
    });
}

updateClocks();

setInterval(updateClocks, 1000);

const searchInput = document.getElementById("countrySearch");
const clearButton = document.getElementById("clearSearch");
const clockCards = document.querySelectorAll(".clock-card");

const noResults = document.createElement("div");
noResults.className = "no-results";
noResults.textContent = "No country found!";
document.querySelector(".clock-container").appendChild(noResults);

searchInput.addEventListener("input", function () {

    const searchValue = searchInput.value.trim().toLowerCase();

    let visibleCards = 0;

    clockCards.forEach(card => {

        const country = card.querySelector(".country").textContent.toLowerCase();
        const city = card.querySelector(".city").textContent.toLowerCase();

        if (country.includes(searchValue) || city.includes(searchValue)) {
            card.style.display = "block";
            visibleCards++;
        } else {
            card.style.display = "none";
        }

    });

    noResults.style.display = visibleCards === 0 ? "block" : "none";

    clearButton.style.display = searchValue ? "block" : "none";

});

clearButton.addEventListener("click", function () {

    searchInput.value = "";

    clockCards.forEach(card => {
        card.style.display = "block";
    });

    noResults.style.display = "none";
    clearButton.style.display = "none";

    searchInput.focus();

});
