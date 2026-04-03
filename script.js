const trackBtn = document.getElementById("trackBtn");
const coinSelect = document.getElementById("coinSelect");

const coinName = document.getElementById("coinName");
const price = document.getElementById("price");
const change = document.getElementById("change");
const marketCap = document.getElementById("marketCap");
const volume = document.getElementById("volume");
const sentiment = document.getElementById("sentiment");


trackBtn.addEventListener("click", async () => {
    const selectedCoin = coinSelect.value;
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${selectedCoin}`;

    coinName.textContent = "Loading...";
    price.textContent = "-";
    change.textContent = "-";
    marketCap.textContent = "-";
    volume.textContent = "-";
    sentiment.textContent = "-";
   

    change.className = "";
    sentiment.className = "";
    
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            throw new Error("No data returned");
        }

        const coin = data[0];
        const changeValue = coin.price_change_percentage_24h;

        coinName.textContent = coin.name;
        price.textContent = `$${coin.current_price.toLocaleString()}`;
        change.textContent = `${changeValue.toFixed(2)}%`;
        marketCap.textContent = `$${coin.market_cap.toLocaleString()}`;
        volume.textContent = `$${coin.total_volume.toLocaleString()}`;

        if (changeValue > 2) {
            change.classList.add("positive");
            sentiment.textContent = "Bullish";
            sentiment.classList.add("positive");
           
        } else if (changeValue < -2) {
            change.classList.add("negative");
            sentiment.textContent = "Bearish";
            sentiment.classList.add("negative");
            
        } else {
            change.classList.add("neutral");
            sentiment.textContent = "Neutral";
            sentiment.classList.add("neutral");
            
        }

    } catch (error) {
        coinName.textContent = "Error loading data";
        price.textContent = "-";
        change.textContent = "-";
        marketCap.textContent = "-";
        volume.textContent = "-";
        sentiment.textContent = "-";
        console.error("Fetch error:", error);
    }
});