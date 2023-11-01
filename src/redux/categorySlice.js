const { createSlice } = require("@reduxjs/toolkit");

const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [
            { title: 'Все', active: true, id: 1 },
            { title: 'Мясные', active: false, id: 2 },
            { title: 'Вегетарианская', active: false, id: 3 },
            { title: 'Гриль', active: false, id: 4 },
            { title: 'Острые', active: false, id: 5 },
            { title: 'Сырная', active: false, id: 6 },
            { title: 'Закрытые', active: false, id: 7 },
        ]
    },
    reducers: {
        change(state, action) {
            let actives = []
            
            let newActives = [...state.categories]

            newActives.map((el)=>{
                if(el.active == true){
                    actives.push(el)
                }
            })

            if (newActives.find(item => item.id == action.payload).active) {
                if (actives.length > 1) {
                    newActives.find(item => item.id == action.payload).active = false
                }
            }
            else {
                newActives.find(item => item.id == action.payload).active = true
            }
            state.categories = newActives//.find(item => item.active == true)//.find(item => item.id == -1)
        }
    }
})

export default categorySlice.reducer
export const { change } = categorySlice.actions