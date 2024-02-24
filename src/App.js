import logo from "./logo.svg";
import "./App.css";
import CurrencyConverter from "./components/CurrencyConversion";
import CurrenciesList from "./components/CurrenciesList";

function App() {
  return (
    <div className="App">
      <CurrencyConverter />
      <CurrenciesList />
    </div>
  );
}

export default App;
