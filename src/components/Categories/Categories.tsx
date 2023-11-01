'use client'
import React, { SetStateAction, useEffect, useState } from 'react';
import css from './Categories.module.scss'
import { change } from '@/redux/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
const Categories = () => {
	const [indexActive, setIndexActive] = useState([1]);
    const categories = useSelector((state : any) => {return state.toolkit.categories})

    useEffect(()=>{console.log(categories)}, [indexActive])

    const dispatch = useDispatch()
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
        let newActives = [...indexActive]
        if(newActives.includes(i)){
            if(newActives.length > 1){
                newActives.splice(newActives.indexOf(i), 1)
            }
        }
        else{
            newActives.push(i)
        }
        setIndexActive(newActives)
        
        dispatch(change(i))
    } 

	return (
		<div className={css.categories}>
            {/* {typeof(categories) == "number" ? <p>{categories}</p>: */}
            {/* categories.map((value) => (<li key={value.id} onClick={() => onChange(value.id)} className={indexActive.includes(value.id) ? css.active : ''}>{value.title}</li>)) */}
            {/* } */}
			<ul>
				{categoriesMock.map((value) => (<li key={value.id} onClick={() => onChange(value.id)} className={indexActive.includes(value.id) ? css.active : ''}>{value.title}</li>))}
			</ul>
		</div>
	);
};
export default Categories;