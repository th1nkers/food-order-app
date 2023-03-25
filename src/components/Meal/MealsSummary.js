import React from 'react'
import styles from './MealsSummary.module.css'

const MealsSummary = () => {
  return (
    <section className={styles.summary}>
      <h2>Your Favourite Food Is One Click Away</h2>
      <p>
        Choose your favorite meal from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home.
      </p>
    </section>
  )
}

export default MealsSummary
