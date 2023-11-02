'use client'

import css from './PizzaPage.module.scss'
import PizzaBlock from '../PizzaBlock/PizzaBlock'
import { useState, useEffect } from 'react'
import axConf from '@/axios'
import axios from 'axios'
import PizzaBlockSkeleton from '../PizzaBlock/PizzaBlockSkeleton'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { motion } from 'framer-motion'

const arrayFill = (n) => {
    let arr = []
    for(let i = 1; i <= n; i++){
        arr.push(i)
    }
    return arr
}

const PizzaPage = ({ pizzasMock, pagination }: { pizzasMock: any; pagination?: boolean }) => {
    const [pizzas, setPizzas] = useState([])
    const [page, setPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)
    const [itemsCount, setItemsCount] = useState(6)

    const categories = useSelector((state: any) => {
        return state.toolkit.categories
    })

    const responseValidation = (data) => {
        typeof data == 'object' ? setPizzas(data.products) : null
        typeof data == "object" ?
            setItemsCount(data.count)
        : null
    }

    useEffect(() => {
        let activeCategories = []
        let all = false
        categories.map(el => {
            if (el.active == true && el.id != 0) {
                activeCategories.push(el.id)
            } else if (el.id == 0 && el.active == true) {
                activeCategories = undefined
                all = true
            }
        })
        console.log(all)
        console.log(`product?get=${itemsPerPage}&page=${page}&tag=${JSON.stringify(activeCategories)}`)
        if (all) {
            axios.get(`product?get=${itemsPerPage}&page=${page}`, axConf).then(res => {
                responseValidation(res.data)
                // typeof res.data == 'object' ? 
                //     setPizzas(res.data.products)
                // : null
                // typeof res.data == "object" ?
                //     setItemsCount(res.data.count)
                // : null
                console.log(res.data)
            })
        } else if (activeCategories && activeCategories.length > 0) {
            axios
                .get(`product?get=${itemsPerPage}&page=${page}&tags=${JSON.stringify(activeCategories)}`, axConf)
                .then(res => {
                    responseValidation(res.data)
                    // typeof res.data == 'object' ? setPizzas(res.data.products) : null
                    // typeof res.data == "object" ?
                    //     setItemsCount(res.data.count)
                    // : null
                    console.log(res.data)
                })
        }
        console.log(categories)
    }, [categories, page])

    useEffect(()=>{
        setPage(0)
    }, [categories])

    return (
        <>
            <div className={css.Catalog}>
                {pizzas && pizzas.length > 0
                    ? pizzas.map(pizza => (
                            <PizzaBlock
                                key={pizza.id}
                                title={pizza.title}
                                price={pizza.volume[0].price}
                                image={pizza.image}
                                sizes={[]}
                                types={[]}
                            />
                        ))
                    : pizzasMock.map(pizza => (
                            <PizzaBlockSkeleton
                                key={pizza.id}
                                title={pizza.title}
                                price={pizza.price}
                                image={pizza.image}
                                sizes={[]}
                                types={[]}
                            />
                        ))}
            </div>
            {pagination == true ? <div className={css.PaginationWrapper}>
                <ul className={css.Pagination}>
                    {arrayFill(Math.ceil(itemsCount/itemsPerPage)).map((pageNumber)=>{
                        return <motion.li initial={{y: 10}} animate={{y: 0}} whileInView={page == pageNumber - 1 ? {backgroundColor: "#fe5f1e", color: "#f6f6f6"} : {backgroundColor: "#f6f6f6", color: "black"}} whileTap={{}} onClick={()=>{setPage(pageNumber - 1)}} className={classNames(css.Item, {[css.ItemActive]: page == pageNumber - 1})}>{pageNumber}</motion.li>
                    })}
                </ul>
            </div> : null}
        </>
    )
}

export default PizzaPage
