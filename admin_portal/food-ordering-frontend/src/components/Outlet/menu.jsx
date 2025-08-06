import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Beverages', count: 49 },
  { name: 'Desserts', count: 5 },
  { name: 'Disposable', count: 1 },
  { name: 'Food', count: 2 },
  { name: 'Grocery', count: 33 },
  { name: 'Hot beverage', count: 7 }
];

const Menu = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    const route = `/menu/${categoryName.toLowerCase().replace(/\s+/g, '-')}`;
    navigate(route);
  };

  return (
    <div className="p-4 min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <div className="space-y-3">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => handleCategoryClick(cat.name)}
            className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <span>{cat.name}</span>
            <span className="text-sm text-gray-500">({cat.count})</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/collections')}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-red-500 text-white font-semibold rounded-full shadow-lg hover:bg-red-600 transition"
      >
        View Collections
      </button>
    </div>
  );
};

export default Menu;
