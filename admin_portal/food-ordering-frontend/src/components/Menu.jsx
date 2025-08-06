// src/components/Menu.jsx
import { useParams } from "react-router-dom";

const menuData = {
  "baskin-robbins": [
    { id: 1, name: "Chocolate Ice Cream", price: 120 },
    { id: 2, name: "Strawberry Sundae", price: 150 },
  ],
  "dominos": [
    { id: 1, name: "Margherita Pizza", price: 250 },
    { id: 2, name: "Farmhouse Pizza", price: 300 },
  ],
  "subway": [
    { id: 1, name: "Veggie Delight Sub", price: 180 },
    { id: 2, name: "Chicken Teriyaki Sub", price: 220 },
  ],
};

export default function Menu() {
  const { outletId } = useParams(); // dynamic param from route

  const outletMenu = menuData[outletId?.toLowerCase()] || [];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 capitalize">{outletId} Menu</h2>
      {outletMenu.length === 0 ? (
        <p>No menu found for this outlet.</p>
      ) : (
        <ul className="space-y-3">
          {outletMenu.map((item) => (
            <li key={item.id} className="border p-3 rounded-lg shadow-md">
              <div className="text-lg font-medium">{item.name}</div>
              <div className="text-sm text-gray-600">₹{item.price}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
