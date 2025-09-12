import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import { addIngredient } from '../../services/slices/burgerConstructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const constructorItems = useSelector((state) => state.burgerConstructor);

    // считаем количество данного ингредиента в конструкторе
    const count = useMemo(() => {
      let calculatedCount = 0;

      // Для булки (2 раза)
      if (ingredient.type === 'bun') {
        if (
          constructorItems.bun &&
          constructorItems.bun._id === ingredient._id
        ) {
          return 2;
        }
        return 0;
      }

      // для начинок и соусов
      calculatedCount = constructorItems.ingredients.filter(
        (item) => item._id === ingredient._id
      ).length;

      return calculatedCount;
    }, [constructorItems, ingredient._id, ingredient.type]);

    const handleAdd = () => {
      dispatch(addIngredient(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
