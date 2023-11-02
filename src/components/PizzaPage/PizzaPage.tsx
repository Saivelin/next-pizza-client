"use client"

import css from "./PizzaPage.module.scss"
import PizzaBlock from "../PizzaBlock/PizzaBlock";
import { useState, useEffect } from "react";
import axConf from "@/axios"
import axios from "axios";
import PizzaBlockSkeleton from "../PizzaBlock/PizzaBlockSkeleton";
import { useSelector } from "react-redux";

const PizzaPage = ({pizzasMock, pagination} : {pizzasMock: any, pagination?: boolean}) => {

    const [pizzas, setPizzas] = useState([])
    const [page, setPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(6)

    const categories = useSelector((state : any) => {return state.toolkit.categories})

    useEffect(()=>{
        let activeCategories = []
        let all = false
        categories.map((el)=>{
            if(el.active == true && el.id != 0){
                activeCategories.push(el.id)
            }
            else if(el.id == 0 && el.active == true){
                activeCategories = undefined
                all = true
            }
        })
        console.log(all)
        console.log(`product?get=${itemsPerPage}&page=${page}&tag=${JSON.stringify(activeCategories)}`)
        if(all){
            axios.get(`product?get=${itemsPerPage}&page=${page}`, axConf).then((res)=>{typeof(res.data) == "object" ? setPizzas(res.data) : null; console.log(res.data)})
        }
        else if(activeCategories && activeCategories.length > 0){
            axios.get(`product?get=${itemsPerPage}&page=${page}&tags=${JSON.stringify(activeCategories)}`, axConf).then((res)=>{typeof(res.data) == "object" ? setPizzas(res.data) : null; console.log(res.data)})
        }
        console.log(categories)
    }, [categories])

    return (
        <div className={css.Catalog}>
            {pizzas && pizzas.length > 0 ? 
			    pizzas.map((pizza) => (<PizzaBlock key={pizza.id} title={pizza.title} price={pizza.volume[0].price} image={pizza.image} sizes={[]} types={[]} />))
            : 
                pizzasMock.map((pizza) => (<PizzaBlockSkeleton key={pizza.id} title={pizza.title} price={pizza.price} image={pizza.image} sizes={[]} types={[]} />))
            }
		</div>
    );
};

export default PizzaPage;