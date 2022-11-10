import React, { useState, useEffect } from "react";
import "./App.css";
import { Grid } from "@mui/material";
import Coin from "./cryptodata/crypto";
import axios from "axios";
import { Routes,Route } from 'react-router';
import Randompage from "./cryptodata/Randompage";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    axios .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);
  return (
    <div className={`App ${theme}`}>
      <Grid className="btntoggles" container justify="flex-end">
        <button className="btntoggleee" onClick={toggleTheme}>
          Toggle Theme
        </button>
      </Grid>
      <div className="coin-app">
        <div className="coin-search">
          <h1 className="coin-text">Search a Crypto!</h1>
          <form>
            <input
              className="coin-input"
              type="text"
              onChange={handleChange}
              placeholder="Search"
            />
          </form>
        </div>
        {filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              marketcap={coin.total_volume}
              volume={coin.market_cap}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h}
            />
          );
        })}
      </div>
      <Routes>
        {/* Just to let you know the use of of routes and route */}
        <Route path="/Randompage" element={<Randompage />} />
      </Routes>
    </div>
  );
}
export default App;
