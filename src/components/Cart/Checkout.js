import {useRef, useState} from 'react'
import styles from './Checkout.module.css'

const isEmpty = v => v.trim() === '';
const is6 = v => v.trim().length === 6;

const Checkout = (props) => {

    const [formValidity, setFormValidity] = useState({
        name: true,
        street: true,
        city: true,
        postal: true
    }) 

    const nameRef = useRef();
    const streetRef = useRef();
    const postalRef = useRef();
    const cityRef = useRef();

    const confirmHandler = (e) => {
        e.preventDefault();
        const enteredName = nameRef.current.value;
        const enteredStreet = streetRef.current.value;
        const enteredPostal = postalRef.current.value;
        const enteredCity = cityRef.current.value;

        const nameIsValid = !isEmpty(enteredName);
        const streetIsValid = !isEmpty(enteredStreet);
        const cityIsValid = !isEmpty(enteredCity);
        const postalIsValid = is6(enteredPostal);

        setFormValidity({
            name: nameIsValid,
            street: streetIsValid,
            city: cityIsValid,
            postal: postalIsValid
        });

        const formIsValid = nameIsValid && streetIsValid && cityIsValid && postalIsValid;

        if (!formIsValid){
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostal
        });
    };

    const nameStyles = `${styles.control} ${formValidity.name ? '': styles.invalid}`;
    const streetStyles = `${styles.control} ${formValidity.street ? '': styles.invalid}`;
    const cityStyles = `${styles.control} ${formValidity.city ? '': styles.invalid}`;
    const postalStyles = `${styles.control} ${formValidity.postal ? '': styles.invalid}`;

    return (
        <form onSubmit={confirmHandler} className={styles.form}>
            <div className={nameStyles}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" ref={nameRef} />
                {!formValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={streetStyles}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetRef} />
                {!formValidity.street && <p>Please enter a valid street!</p>}
            </div>
            <div className={postalStyles}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id="postal" ref={postalRef} />
                {!formValidity.postal && <p>Please enter a valid postal code!</p>}
            </div>
            <div className={cityStyles}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityRef} />
                {!formValidity.city && <p>Please enter a valid city!</p>}
            </div>
            <div className={styles.actions}>
            <button type='button' onClick={props.onCancel}>Cancel</button>
            <button className={styles.submit}>Confirm</button>
            </div>
        </form>
  )
}

export default Checkout