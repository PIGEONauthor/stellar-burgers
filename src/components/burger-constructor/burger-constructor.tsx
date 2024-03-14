import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { newBurgerOrder, clearOrder } from '../../services/newOrderSlice';
import { clearConstructor } from '../../services/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  // const constructorItems = {
  //   bun: {
  //     price: 0
  //   },
  //   ingredients: []
  // };
  // const orderRequest = false;
  // const orderModalData = null;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userData.user);
  const { constructorItems } = useSelector((state) => state.burgerConstructor);
  const { orderRequest, order } = useSelector((state) => state.newOrder);
  const dataToOrder = useSelector(
    (state) => state.burgerConstructor.dataToOrder
  );

  const onOrderClick = () => {
    // if (!constructorItems.bun || orderRequest) {
    //   return;
    // } else
    if (!user.name) {
      navigate('/login');
    } else if (constructorItems.bun && constructorItems.ingredients) {
      dispatch(newBurgerOrder(dataToOrder));
    }
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearConstructor());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={order}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
