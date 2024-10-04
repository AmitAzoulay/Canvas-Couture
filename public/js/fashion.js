// Use the embedded API key from the EJS template
const fashionURL = `https://newsapi.org/v2/everything?q=fashion&sortBy=publishedAt&apiKey=${apiKey}`;

// Fetch the latest fashion trends
fetchFashionTrends();

function fetchFashionTrends() {
    fetch(fashionURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const trends = data.articles;
            const trendsContainer = document.getElementById('trends');
            trendsContainer.innerHTML = '';

            trends.forEach(article => {
                const trendItem = document.createElement('div');
                trendItem.className = 'trend-item';

                const title = document.createElement('h3');
                title.textContent = article.title;

                const description = document.createElement('p');
                description.textContent = article.description;

                const link = document.createElement('a');
                link.href = article.url;
                link.textContent = 'Read more';
                link.target = '_blank';

                trendItem.appendChild(title);
                trendItem.appendChild(description);
                trendItem.appendChild(link);

                trendsContainer.appendChild(trendItem);
            });
        })
        .catch(error => {
            console.error('Error fetching the fashion trends:', error);
        });
}
