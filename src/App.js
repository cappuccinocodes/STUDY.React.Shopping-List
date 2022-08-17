import { useEffect, useState } from "react";
import AddShoppingItem from "./AddShoppingItem";
import "./App.css";
import ShoppingList from "./ShoppingList";

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [formKey, setFormKey] = useState(Math.random());
  const [itemToEdit, setItemToEdit] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

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
  }, [shoppingList.count, formKey ]);

  async function saveExpenseDataHandler(enteredItem) {
    const response = await fetch("https://localhost:7010/ShoppingList", {
      method: "POST",
      body: JSON.stringify(enteredItem),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    setIsEditing(false);
    setFormKey(Math.random());
    setItemToEdit([])
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

  const populateFormHandler = (item) => {
    setItemToEdit(item);
    setIsEditing(true);
    console.log('is editing dad = ' + isEditing + item.id)
    setFormKey(Math.random());
  }

  const cancelEditingHandler = () => {
    console.log('cancelling')
    setIsEditing(false);
  }

  return (
    <div className="App">
      <AddShoppingItem
        key={formKey}
        onSubmitItem={saveExpenseDataHandler}
        isEditing={isEditing}
        itemToEdit={itemToEdit}
        onCancelEditing={cancelEditingHandler}

      />
      <ShoppingList
        items={shoppingList}
        onDelete={deleteExpenseHandler}
        onUpdate={populateFormHandler}
      />
    </div>
  );
}

export default App;
