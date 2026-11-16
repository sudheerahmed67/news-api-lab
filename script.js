
const API_KEY = "378c00f7e8d9fcc6b1bb0b66547e934e";

const newsContainer = document.getElementById("newsContainer");
const statusText = document.getElementById("status");

// Fetch news from GNews API
async function fetchNews() {

    const query = document.getElementById("searchInput").value.trim();
    const category = document.getElementById("categorySelect").value;

    // Check if API key is missing
    if (API_KEY === "PASTE_YOUR_API_KEY_HERE") {
        statusText.textContent = "API key is missing!";
        return;
    }

    let url;

    // Search news using keyword
    if (query !== "") {

        url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=10&apikey=${API_KEY}`;

    } else {

        // Fetch news according to category
        url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&max=10&apikey=${API_KEY}`;

    }

    statusText.textContent = "Fetching news...";
    newsContainer.innerHTML = "";

    try {

        // Send API request
        const response = await fetch(url);

        // Convert response into JSON
        const data = await response.json();

        console.log("API Response:", data);

        // Check for API errors
        if (!response.ok) {
            throw new Error(
                data.errors ? JSON.stringify(data.errors) : "HTTP Error: " + response.status
            );
        }

        // Display received articles
        displayNews(data.articles || []);

    } catch (error) {

        statusText.textContent = "Error: " + error.message;

        console.error("API Error:", error);

    }
}


// Display news articles on webpage
function displayNews(articles) {

    newsContainer.innerHTML = "";

    if (articles.length === 0) {

        statusText.textContent = "No news articles found.";

        return;
    }

    statusText.textContent = "Successfully loaded " + articles.length + " articles.";

    articles.forEach(article => {

        const card = document.createElement("div");

        card.className = "news-card";

        const title = document.createElement("h2");

        title.textContent = article.title || "No title available";

        const description = document.createElement("p");

        description.textContent = article.description || "No description available.";

        const link = document.createElement("a");

        link.href = article.url || "#";

        link.textContent = "Read Full Article";

        link.target = "_blank";

        link.rel = "noopener noreferrer";

        card.appendChild(title);

        card.appendChild(description);

        card.appendChild(link);

        newsContainer.appendChild(card);

    });

}


// Search button event
document.getElementById("searchButton").addEventListener("click", fetchNews);


// Top headlines button event
document.getElementById("topButton").addEventListener("click", function() {

    document.getElementById("searchInput").value = "";

    fetchNews();

});

