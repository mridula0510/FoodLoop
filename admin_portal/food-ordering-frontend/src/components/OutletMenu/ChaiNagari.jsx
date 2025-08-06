import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const OutletMenu = () => {
  const { outletId } = useParams();
  const [menu, setMenu] = useState({});
  const [outletName, setOutletName] = useState("");

  useEffect(() => {
    // Dummy outlet name map
    const outletNames = {
      1: "Spice Hub",
      2: "Momolicious",
      3: "Chai Junction"
      // Add more if needed
    };

    setOutletName(outletNames[outletId] || `Outlet ${outletId}`);

    // Dummy grouped menu
    setMenu({
      Cups: [
        {
          id: 1,
          name: "Dutch Chocolate (100ml)",
          price: 85,
          image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
          rating: 4
        },
        {
          id: 2,
          name: "Alphonso Mango (100ml)",
          price: 85,
          image: "https://images.unsplash.com/photo-1590080876219-d199b4f11ec8",
          rating: 4
        }
      ],
      Sticks: [
        {
          id: 3,
          name: "Hazelnut Rocher (65ml)",
          price: 90,
          image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
          rating: 5
        }
      ]
    });
  }, [outletId]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-purple-600 hover:underline">← Back to Outlets</Link>
        <h1 className="text-3xl font-bold mb-6 mt-2">{outletName} Menu</h1>

        {Object.entries(menu).map(([category, items]) => (
          <div key={category} className="mb-10">
            <h2 className="text-xl font-semibold border-b pb-1 mb-4">{category}</h2>
            <div className="space-y-4">
              {items.map(item => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    {item.rating && (
                      <div className="text-green-500 text-sm mt-1">⭐ {item.rating}</div>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-300">₹{item.price}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-contain rounded-md mb-2"
                    />
                    <button className="bg-purple-600 text-white px-3 py-1 text-sm rounded hover:bg-purple-700">
                      Add +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutletMenu;
