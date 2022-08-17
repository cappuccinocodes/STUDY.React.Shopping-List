import { useEffect, useState } from "react";
import AddShoppingItem from "./AddShoppingItem";
import "./App.css";
import ShoppingList from "./ShoppingList";

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [formKey, setFormKey] = useState(Math.random());

  useEffect(() => {
    const getShoppingList = async () => {
      const response = await fetch("https://localhost:7010/ShoppingList");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log(formKey);
      setShoppingList(data);
    };

    getShoppingList();
  }, [shoppingList.count, formKey]);

  async function saveExpenseDataHandler(enteredItem) {
    const response = await fetch("https://localhost:7010/ShoppingList", {
      method: "POST",
      body: JSON.stringify(enteredItem),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    setFormKey(Math.random());
  }

  return (
    <div className="App">
      <AddShoppingItem key={formKey} onSubmitItem={saveExpenseDataHandler} />
      <ShoppingList items={shoppingList} />
    </div>
  );
}

export default App;
