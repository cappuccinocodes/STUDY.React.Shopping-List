import { useRef } from "react";
import {useRecoilValue, useRecoilState, useResetRecoilState} from 'recoil';
import { isEditingState, itemToEditState } from "./App";

const AddShoppingItem = (props) => {
  const [isEditing, setIsEditing] = useRecoilState(isEditingState)
  const isEditingValue = useRecoilValue(isEditingState);
  const itemToEdit = useRecoilValue(itemToEditState);
  const resetItemToEdit = useResetRecoilState(itemToEditState);
  const nameRef = useRef("");
  const idRef = useRef(0);

  console.log('recoil ' + isEditing)

  const submitHandler = (event) => {
    event.preventDefault();

    console.log('testing id = ' + idRef.current.value);
    const item = {
      id: idRef.current.value === "" ? 0 : idRef.current.value ,
      name: nameRef.current.value,
      isCollected: false,
    };

    props.onSubmitItem(item);
    resetItemToEdit();
  };

  const cancelUpdateHandler = () => {
    setIsEditing(false);
    resetItemToEdit();
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <div>
            <label>Name</label>
            <input
              type="text"
              defaultValue={itemToEdit['name']}
              ref={nameRef}
            />
            <input
              type="hidden"
              defaultValue={itemToEdit['id']}
              ref={idRef}
            />
          </div>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

      {isEditingValue && (
        <button type="submit" onClick={() => cancelUpdateHandler()}>
          Cancel Update
        </button>
      )}
    </div>
  );
};

export default AddShoppingItem;
