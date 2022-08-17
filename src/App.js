import { useEffect, useState } from "react";
import AddShoppingItem from "./AddShoppingItem";
import "./App.css";
import ShoppingList from "./ShoppingList";

function App() {
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    const getShoppingList = async () => {
      const response = await fetch("https://localhost:7010/ShoppingList");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log(data);
      setShoppingList(data);
    };

    getShoppingList();
  }, [shoppingList.count]);

  async function saveExpenseDataHandler(enteredItem) {
    const response = await fetch("https://localhost:7010/ShoppingList", {
      method: "POST",
      body: JSON.stringify(enteredItem),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="App">
      <AddShoppingItem onSubmitItem={saveExpenseDataHandler} />
      <ShoppingList items={shoppingList} />
    </div>
  );
}

export default App;
