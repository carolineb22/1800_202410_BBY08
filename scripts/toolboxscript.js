const translations = {
    'Hello': 'Í7áx̱a',
    'Goodbye': 'Huy chexw',
    'Thank you': 'Chen kw’enmantum',
    'Please': 'Chénkw\'en',
    'Yes': 'Áwat',
    'No': 'Nilh',
    'Friend': 'Sníchim',
    'Water': 'Stakw',
    'Food': 'Sha7áy',
    'House': 'Ch’á7elhay',
    'Earth': 'St’éx̱ts’em',
    'Mountain': 'Nexwlelexm',
};

// Show translation in a popup near clicked words
function showTranslation(element, word) {
    const popup = document.getElementById('translationPopup');
    const translation = translations[word] || "Translation not available";

    popup.textContent = translation;
    popup.style.display = 'block';

    // Position the popup near the clicked element
    const rect = element.getBoundingClientRect();
    const offsetX = window.scrollX || window.pageXOffset;
    const offsetY = window.scrollY || window.pageYOffset;

    popup.style.left = `${rect.right + offsetX + 10}px`;
    popup.style.top = `${rect.top + offsetY}px`;
}

// Hide the popup when clicking outside
document.addEventListener('click', (event) => {
    const popup = document.getElementById('translationPopup');
    if (!event.target.classList.contains('word')) {
        popup.style.display = 'none';
    }
});

// Dropdown functionality
const searchBox = document.getElementById("search-box");
const dropdown = document.getElementById("dropdown");

searchBox.addEventListener("input", () => {
    const query = searchBox.value.toLowerCase();
    dropdown.innerHTML = ""; // Clear previous results

    if (query) {
        // Find matching words
        const matches = Object.keys(translations).filter(word =>
            word.toLowerCase().startsWith(query)
        );

        if (matches.length > 0) {
            dropdown.style.display = "block";

            // Center the dropdown beneath the search box
            const rect = searchBox.getBoundingClientRect();
            const offsetX = window.scrollX || window.pageXOffset;
            const offsetY = window.scrollY || window.pageYOffset;

            dropdown.style.left = `${rect.left + offsetX + (rect.width / 2) - (dropdown.offsetWidth / 2)}px`;
            dropdown.style.top = `${rect.bottom + offsetY}px`;

            matches.forEach(word => {
                const li = document.createElement("li");
                li.textContent = `${word} - ${translations[word]}`;
                li.addEventListener("click", () => {
                    searchBox.value = word; // Set clicked word in search box
                    dropdown.style.display = "none"; // Hide dropdown
                });
                dropdown.appendChild(li);
            });
        } else {
            dropdown.style.display = "none";
        }
    } else {
        dropdown.style.display = "none";
    }
});

// Hide dropdown if clicking outside
document.addEventListener("click", (event) => {
    if (!event.target.closest(".center-container")) {
        dropdown.style.display = "none";
    }
});
