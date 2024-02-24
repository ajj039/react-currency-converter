import React, { useState, useEffect } from "react";
import axios from "axios";

const CurrencyConverter = () => {
  const url = "http://localhost:3500/currencies";
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(url);
        console.log("res", response);
        setCurrencies(response?.data);

        const toCurrencyObject = response?.data.find(
          (currency) => currency.currencyCode === toCurrency
        );

        const newExchangeRate = toCurrencyObject?.exchangeRate;
        setExchangeRate(newExchangeRate);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, [fromCurrency, toCurrency]);
  console.log("exchange", exchangeRate);
  const handleConvert = (e) => {
    e.preventDefault();

    const convertedAmountValue = amount * exchangeRate;
    setConvertedAmount(convertedAmountValue);
  };

  return (
    <div className="container">
      <h2>Currency Converter</h2>
      <form onSubmit={handleConvert}>
        <label>
          Amount:
          <input
            type="number"
            required={true}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label>
          From Currency:
          <select
            value={fromCurrency}
            required={true}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencies?.map((item) => (
              <option value={item.currencyCode}>{item?.currencyCode}</option>
            ))}
          </select>
        </label>
        <label>
          To Currency:
          <select
            value={toCurrency}
            required={true}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies?.map((item) => (
              <option value={item.currencyCode}>{item?.currencyCode}</option>
            ))}
          </select>
        </label>
        <button type="submit">Convert</button>
      </form>

      {exchangeRate && (
        <p>
          Exchange Rate: 1 {fromCurrency} = {exchangeRate} {toCurrency}
        </p>
      )}
      {convertedAmount && (
        <p>
          {amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}
        </p>
      )}
    </div>
  );
};

export default CurrencyConverter;
