import React from 'react';
import { useNavigate } from 'react-router-dom';

const CollectionPage = () => {
  const navigate = useNavigate();

  const outletIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // Add or remove based on your real outlet list

  return (
    <div className="p-4 min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-6">Select an Outlet</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {outletIds.map((id) => (
          <button
            key={id}
            onClick={() => navigate(`/outlet/${id}`)}
            className="p-4 bg-gray-100 dark:bg-gray-800 text-center rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            Outlet {id}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
