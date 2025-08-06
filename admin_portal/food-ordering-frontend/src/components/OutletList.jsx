import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OutletList = () => {
  const [outlets, setOutlets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const names = [
      'Baskin Robin',
      'Sip Stop',
      'Speedy Chow',
      'South Circle',
      'Chaap and Grills',
      'Venkys',
      'Bev Cafe',
      'Barista',
      'Dohful',
      'Lapinoz',
      'Healthy Wave',
      'China Box',
      'Chai Vyanjan',
      'Indian Chat Bhandaar',
      'Chai Nagari'
    ];

    const dummyOutlets = names.map((name, i) => ({
      id: name.replace(/\s/g, ''), // Match your OutletMenu file names
      name,
      description: `Delicious food served at ${name}`,
      image: `/images/${i + 1}.jpg`,
      is_trending: i % 3 === 0,
      is_new: i % 5 === 0
    }));

    setOutlets(dummyOutlets);
  }, []);

  const openMenu = (outletId) => {
    navigate(`/outlet/${outletId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-6 py-12 max-w-7xl mx-auto h-screen">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            Welcome To <span className="text-orange-500">Chitkara</span> FOOD COURT.
          </h1>
          <h4 className="text-gray-600 dark:text-gray-300 mb-6">
            “Because lectures are hard... and food makes it better.”
          </h4>
        </div>
        <div className="lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
            alt="Food Banner"
            className="rounded-full w-96 h-96 object-cover shadow-lg mx-auto"
          />
        </div>
      </section>

      {/* Outlet Cards */}
      <section className="px-6 pb-16 pt-12 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Featured Outlets</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {outlets.map((outlet) => (
            <div
              key={outlet.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg p-5 transition duration-300 flex flex-col cursor-pointer"
              onClick={() => openMenu(outlet.id)}
            >
              <img
                src={outlet.image}
                alt={outlet.name}
                onError={(e) => (e.target.src = '/images/placeholder.jpg')}
                className="w-full h-40 object-contain rounded-lg mb-4 bg-white p-2 transition-transform duration-300 hover:scale-105"
              />
              <div className="text-left flex-1">
                <h3 className="text-xl font-bold mb-1">{outlet.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300 mb-3">{outlet.description}</p>
                <div className="flex gap-2 mb-3">
                  {outlet.is_trending && (
                    <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
                      🔥 Trending
                    </span>
                  )}
                  {outlet.is_new && (
                    <span className="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded-full">
                      🆕 New
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openMenu(outlet.id);
                }}
                className="mt-auto bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 px-4 rounded-md transition"
              >
                View Menu
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OutletList;
