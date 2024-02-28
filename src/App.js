import logo from "./logo.svg";
import "./App.css";
import CurrencyConverter from "./components/CurrencyConversion";
import CurrenciesList from "./components/CurrenciesList";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [imageid, setImgId] = useState("33656210129093");
  const [selected, setSelected] = useState([]);
  const url = "http://localhost:3500/product";

  const fetchUsers = async () => {
    const res = await axios.get(url);
    console.log("res", res);

    setProducts(res?.data);
  };
  useEffect(() => {
    fetchUsers();
    const selectedImg = products?.images?.filter((item) => item.id == imageid);
    setSelected(selectedImg);
  }, [imageid]);

  console.log("Asdasdasdasdasd", products);

  // console.log("selected", selectedImg);
  return (
    <div className="App">
      <header>
        {selected?.length > 0 &&
          selected?.map((item) => {
            return (
              <>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <img
                    src={item?.src}
                    style={{
                      width: "4rem",
                    }}
                  />
                </div>
              </>
            );
          })}
      </header>
      <main>
        {products?.variants?.map((item) => {
          return (
            <button
              onClick={() => {
                setImgId(item?.image_id);
              }}
            >
              {item?.title}
            </button>
          );
        })}
      </main>
      {/* <CurrencyConverter />
      <CurrenciesList /> */}
    </div>
  );
}

export default App;
