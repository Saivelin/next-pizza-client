'use client'
import React, { SetStateAction, useEffect, useState } from 'react';
import css from './Categories.module.scss'
import { change, set } from '@/redux/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from './Skeleton';
import axios from 'axios';
import axConfig from "../../axios"
const Categories = () => {
	const [indexActive, setIndexActive] = useState([1]);
    const categories = useSelector((state : any) => {return state.toolkit.categories})

    const dispatch = useDispatch()

    useEffect(()=>{
        const response = axios.get("tag", axConfig).then((res)=>{dispatch(set(res.data))})
    }, [])

	const categoriesMock = [
		{ title: 'Все', id: 1 },
		{ title: 'Мясные', id: 2 },
		{ title: 'Вегетарианская', id: 3 },
		{ title: 'Гриль', id: 4 },
		{ title: 'Острые', id: 5 },
		{ title: 'Сырная', id: 6 },
		{ title: 'Закрытые', id: 7 },
	]

    const onChange = (i:any) => {
        // let newActives = [...indexActive]
        // if(newActives.includes(i)){
        //     if(newActives.length > 1){
        //         newActives.splice(newActives.indexOf(i), 1)
        //     }
        // }
        // else{
        //     newActives.push(i)
        // }
        // setIndexActive(newActives)
        
        dispatch(change(i))
    } 

    useEffect(()=>{
        console.log(categories)
        const tags = []
        categories.map((cat)=>{
            cat.active == true ? tags.push(cat.id) : null
        })
        console.log(tags)
        if(tags.length > 0 && tags[0] !== 0){
            const response = axios.get(`product?get=999&page=0&tags=${JSON.stringify(tags)}`, axConfig).then((res)=>{console.log(res)})
        }
        else{
            const response = axios.get(`product?get=999&page=0`, axConfig).then((res)=>{console.log(res)})
        }
    }, [categories])

	return (
		<div className={css.categories}>
            {categories && categories.length > 0 ? 
                <ul>
                    {categories.map((item) => (<li key={item.id} onClick={() => onChange(item.id)} className={item.active == true ? css.active : ''}>{item.title}</li>))}
    			</ul>
            :
                <ul>
                    {categoriesMock.map((item) => {return <Skeleton title={item.title}/>})}
                </ul>
            }
		</div>
	);
};
export default Categories;