import { useRecoilState } from 'recoil'; 
import { isEditingState, itemToEditState } from './App';

const ShoppingList = (props) => {
  const [isEditing, setIsEditing] = useRecoilState(isEditingState)
  const [itemToEdit, setItemToEdit] = useRecoilState(itemToEditState)
  const deleteHandler = (id) => {
    props.onDelete(id);
  };

  const updateHandler = (item) => {
    setIsEditing(true);
    setItemToEdit(item);
  }

  const shoppingList = props.items.map((item) => (
    <div key={item.id}>
      <span>{item.name}</span>{" "}
      <button type="button" onClick={() => deleteHandler(item.id)}>
        Delete
      </button>
      <button type="button" onClick={() => updateHandler(item)}>
        Update
      </button>
    </div>
  ));

  return <div>{shoppingList}</div>;
};

export default ShoppingList;
