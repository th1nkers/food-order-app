import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import styles from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {

  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const sumbitOrderHandler = async(userData) => {
    setIsSubmitting(true);
    await fetch('https://f00deat-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderItems: cartCtx.items
      })
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  }

  const cartItems = (
    <ul className={styles['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setIsCheckout(true)
  }

  const modalActions = 
  <div className={styles.actions}>
    <button className={styles['button--alt']} onClick={props.onClose}>
      Close
    </button>
    {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
  </div>

  const cartModalContent = 
  <>
  {cartItems}
  <div className={styles.total}>
    <span>Total Amount</span>
    <span>{totalAmount}</span>
  </div>
  {isCheckout && <Checkout onConfirm={sumbitOrderHandler} onCancel={props.onClose} />}
  {!isCheckout && modalActions}
  </>

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = 
  <>
  <p>Successfully sent the order!</p>
  <div className={styles.actions}>
  <button className={styles['button--alt']} onClick={props.onClose}>
      Close
  </button>
  </div>
  </>

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {didSubmit &&!isSubmitting && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;