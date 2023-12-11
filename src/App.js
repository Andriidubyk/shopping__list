import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  function onHandleItems(item) {
    setItems((items) => [...items, item]);
  }

  function onHandleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function onHandleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="container">
      <div className="title">Shopping items</div>
      <ItemInput items={items} onHandleItems={onHandleItems} />
      <Items
        items={items}
        onHandleDelete={onHandleDelete}
        onHandleToggleItem={onHandleToggleItem}
      />
    </div>
  );
}

function ItemInput({ items, onHandleItems }) {
  const [value, setValue] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!value) return;
    const id = crypto.randomUUID();

    const newItem = { value, id, packed: false };
    onHandleItems(newItem);
    setValue("");
  }

  return (
    <form className="input-container" onSubmit={handleSubmit}>
      <div className="item-input">
        <input
          type="text"
          value={value}
          maxLength="26"
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add an item"
        />
      </div>
      <div className="add-button" onClick={handleSubmit}>
        Add
      </div>
    </form>
  );
}

function Items({ items, onHandleDelete, onHandleToggleItem }) {
  return (
    <ul className="item-list">
      {items.map((val) => (
        <div className="item" key={val.value}>
          <span style={val.packed ? { textDecoration: "line-through" } : {}}>
            {val.value}
          </span>

          <div className="actions">
            <input
              type="checkbox"
              onChange={() => onHandleToggleItem(val.id)}
            />
            <div
              className="delete-button"
              onClick={() => onHandleDelete(val.id)}
            >
              Delete
            </div>
          </div>
        </div>
      ))}
    </ul>
  );
}
