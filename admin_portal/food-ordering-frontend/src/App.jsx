import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams
} from 'react-router-dom';

// Public pages
import Login from './components/Login';
import Signup from './components/Signup';

// Shared layout & main pages
import Layout from './components/Layout';
import OutletList from './components/OutletList';

// Static menu-related pages
import Menu from './components/outlet/Menu';
import CategoryItems from './components/outlet/CategoryItems';
import CollectionPage from './components/outlet/CollectionPage';
import OrderUpdates from './components/OrderUpdates';
import Profile from './components/Profile'; // ✅ Import actual Profile component

// Dynamically import all JSX files from OutletMenu folder
const menuModules = import.meta.glob('./components/OutletMenu/*.jsx');

// ✅ Wrapper for Private Routes
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("access");
  return token ? children : <Navigate to="/login" replace />;
};

// 🔁 Wrapper to dynamically load outlet-specific component
const DynamicMenu = () => {
  const { outletId } = useParams();
  const filePath = `./components/OutletMenu/${outletId}.jsx`;

  const LazyComponent = React.lazy(
    menuModules[filePath]
      ? menuModules[filePath]
      : () => import('./components/OutletMenu/NotFound.jsx')
  );

  return (
    <Suspense fallback={<div className="text-center mt-20 text-white">Loading menu...</div>}>
      <LazyComponent />
    </Suspense>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ Private Layout Routes */}
        <Route
          path="/"
          element={
            <Layout>
              <OutletList />
            </Layout>
          }
        />

        <Route
          path="/menu/:outletId"
          element={
            <Layout>
              <Menu />
            </Layout>
          }
        />

        <Route
          path="/category/:category"
          element={
            <Layout>
              <CategoryItems />
            </Layout>
          }
        />

        <Route
          path="/collections"
          element={
            <Layout>
              <CollectionPage />
            </Layout>
          }
        />

        {/* 🆕 Protected Orders Page */}
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Layout>
                <OrderUpdates />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* 🆕 Protected Profile Page */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Layout>
                <Profile />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* ✅ Dynamic Outlet Component */}
        <Route
          path="/outlet/:outletId"
          element={
            <Layout>
              <DynamicMenu />
            </Layout>
          }
        />

        {/* ✅ Catch-All Route */}
        <Route
          path="*"
          element={
            <Layout>
              <div className="text-center text-xl text-red-600 mt-20">
                404 - Page Not Found
              </div>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
