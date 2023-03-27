import {useEffect, useState} from 'react'
import styles from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';


const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(()=>{
    const fetchMeals = async () => {
      const response = await fetch('https://f00deat-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');

      if(!response.ok){
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedMeals = [];
      for (const key in responseData){
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        })
      }
      setMeals(loadedMeals);
    };
    
      fetchMeals().catch(error => {
        setIsLoading(false);
        setHttpError(error.message);
      });
      setIsLoading(false);
  },[]);

  if (isLoading){
    return <section className={styles.mealsLoading}>
      <p>loading.. </p>
    </section>
  }

  if (httpError){
    return <section className={styles.mealsError}>
      <p>{httpError}</p>
    </section>
  }

  const mealsList = meals.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} price={meal.price} description={meal.description}/>)

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
