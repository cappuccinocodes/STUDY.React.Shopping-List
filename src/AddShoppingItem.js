import { useState } from "react";

const AddShoppingItem = (props) => {
  const [enteredName, setEnteredName] = useState("");

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      name: enteredName,
    };

    props.onSubmitItem(expenseData);

    setEnteredName("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <div>
          <label>Title</label>
          <input type="text" value={enteredName} onChange={nameChangeHandler} />
        </div>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default AddShoppingItem;
