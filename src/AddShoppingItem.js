import { useRef } from "react";

const AddShoppingItem = (props) => {
  console.log("props child" + props.isEditing);
  const nameRef = useRef("");
  const idRef = useRef(0);

  const submitHandler = (event) => {
    event.preventDefault();

    const item = {
      id: idRef.current.value,
      name: nameRef.current.value,
      isCollected: false,
    };
    nameRef.current.value="";
    idRef.current.value=0;
    props.onSubmitItem(item);
  };

  const cancelUpdateHandler = () => {
    props.onCancelEditing();
    nameRef.current.value="";
    idRef.current.value=0;
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <div>
            <label>Title</label>
            <input
              type="text"
              defaultValue={props.itemToEdit["name"]}
              ref={nameRef}
            />
            <input
              type="hidden"
              defaultValue={props.itemToEdit["id"]}
              ref={idRef}
            />
          </div>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

      {props.isEditing && (
        <button type="submit" onClick={() => cancelUpdateHandler()}>
          Cancel Update
        </button>
      )}
    </div>
  );
};

export default AddShoppingItem;
