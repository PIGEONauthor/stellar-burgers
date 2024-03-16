import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';
import { useDispatch } from '../../services/store';

import { AppHeader, Modal, IngredientDetails, OrderInfo } from '@components';
import { ProtectedRoute } from '../ProtectedRoute/protectedRoute';
import {
  Feed,
  Login,
  ConstructorPage,
  Register,
  ForgotPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { getFeeds } from '../../services/slices/feedsSlice';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getFeeds());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      {/* <ConstructorPage /> */}
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title={''} onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингридиента'} onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title={''} onClose={() => navigate(-1)}>
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
