import { CartItem } from '../redux/cart/types';

export const getCartFromLocalStorage = () => {
  const data = localStorage.getItem('cart');
  const items = data ? (JSON.parse(data) as CartItem[]) : [];
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.count, 0);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);
  return { items, totalPrice, totalCount };
};
