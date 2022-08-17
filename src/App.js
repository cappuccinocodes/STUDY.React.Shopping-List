import { useEffect, useState } from "react";
import "./App.css";

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
    <div>Hello</div>
  </div>;
}

export default App;
