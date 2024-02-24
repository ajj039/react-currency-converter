import React, { useEffect, useState } from "react";
import axios from "axios";

const CurrenciesList = () => {
  const url = "http://localhost:3500/currencies";
  const [exchangeRates, setExchangeRates] = useState([]);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(url);
        console.log("res", response);
        setExchangeRates(response?.data);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  const sortExchangeRates = (column) => {
    const newSortDirection =
      column === sortedColumn && sortDirection === "asc" ? "desc" : "asc";

    const sortedRates = [...exchangeRates].sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return newSortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      return newSortDirection === "asc"
        ? aValue.toString().localeCompare(bValue)
        : bValue.toString().localeCompare(aValue);
    });

    setExchangeRates(sortedRates);
    setSortedColumn(column);
    setSortDirection(newSortDirection);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = exchangeRates?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Exchange Rates</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => sortExchangeRates("currencyCode")}>
              Currency Code
            </th>
            <th onClick={() => sortExchangeRates("currencyName")}>
              Currency Name
            </th>
            <th onClick={() => sortExchangeRates("exchangeRate")}>
              Exchange Rate
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.length > 0 &&
            currentItems?.map(
              ({ currencyCode, currencyName, exchangeRate }) => (
                <tr key={currencyCode}>
                  <td>{currencyCode}</td>
                  <td>{currencyName}</td>
                  <td>{exchangeRate}</td>
                </tr>
              )
            )}
        </tbody>
      </table>

      <div>
        {Array.from({
          length: Math.ceil(exchangeRates.length / itemsPerPage),
        }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CurrenciesList;
