import { useEffect, useState } from "react";
import "./App.css";
import ShoppingList from "./ShoppingList";

function App() {
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    const getShoppingList = async () => {
      const response =  await fetch("https://localhost:7010/ShoppingList");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log(data);
      setShoppingList(data);
    }; 

    getShoppingList();
  }, [shoppingList.count]);

  return <div className="App">
    <ShoppingList items = {shoppingList}/>
  </div>;
}

export default App;
