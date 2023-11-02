"use client"

import css from './TopFilter.module.scss'
import Categories from '../Categories/Categories';
import Sort from '../Sort/Sort';
import PizzaBlock from '../PizzaBlock/PizzaBlock';
import pizzasMock from './pizza.mockData.js'
import PizzaPage from '../PizzaPage/PizzaPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import axConf from "@/axios"

const TopFilter = () => {
	return (
		<div className={css.topFilter}>
			<div className={css.topFilter__top}>
				<Categories />
				<Sort />
			</div>
			<h2 className={css.topFilter__title}>Все пиццы</h2>
            <PizzaPage pizzasMock={pizzasMock} pagination={true}/>
			{/* <div className={css.topFilter__items}>
				{pizzas.map((pizzas) => (<PizzaBlock key={pizzas.id}  {...pizzas} />))}
			</div> */}
		</div>
	);
};

export default TopFilter;