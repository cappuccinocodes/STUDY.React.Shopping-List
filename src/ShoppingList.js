const ShoppingList = (props) => {
  const shoppingList = props.items.map((item) => (
    <p key={item.id}>{item.name}</p>
  ));

  return <div>{shoppingList}</div>;
};

export default ShoppingList;
