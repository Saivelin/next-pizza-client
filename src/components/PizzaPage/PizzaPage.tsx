"use client"

import css from "./PizzaPage.module.scss"
import PizzaBlock from "../PizzaBlock/PizzaBlock";

const PizzaPage = ({pizzas, pagination} : {pizzas: any, pagination?: boolean}) => {
    return (
        <div className={css.Catalog}>
			{pizzas.map((pizza) => (<PizzaBlock key={pizza.id} title={pizza.title} price={pizza.volume[0].price} image={pizza.image} sizes={[]} types={[]} />))}
		</div>
    );
};

export default PizzaPage;