import { useEffect, useState } from "react";
import { atom, RecoilRoot } from "recoil";
import AddShoppingItem from "./AddShoppingItem";
import "./App.css";
import ShoppingList from "./ShoppingList";

export const isEditingState = atom({
  key: "isEditing",
  default: false,
});

export const itemToEditState = atom({
  key: "itemToEdit",
  default: [{id: 0, name:""}],
});

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

      setShoppingList(data);
    };
    getShoppingList();
  }, [shoppingList.count, formKey]);

  async function saveExpenseDataHandler(enteredItem) {
    console.log(JSON.stringify(enteredItem));
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

  async function deleteExpenseHandler(id) {
    const response = await fetch(
      `https://localhost:7010/ShoppingList?id=${id}`,
      {
        method: "DELETE",
      }
    );

    console.log(await response.json());
    setFormKey(Math.random());
  }

  return (
    <RecoilRoot>
      <div className="App">
        <AddShoppingItem key={formKey} onSubmitItem={saveExpenseDataHandler} />
        <ShoppingList items={shoppingList} onDelete={deleteExpenseHandler} />
      </div>
    </RecoilRoot>
  );
}

export default App;
