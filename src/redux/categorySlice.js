const { createSlice } = require("@reduxjs/toolkit");

const defaultValue = {id: 0, title: "Все", value: "all", active: true}

const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: []
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
            if(newActives[0].id !== 0){
                newActives.unshift(defaultValue)
            }
            else{
                let activeIsExist = false
                if(action.payload !== 0){
                    state.categories.map((cat)=>{
                        if(cat.id !== 0){
                            cat.active == true ? activeIsExist = true : null
                        }
                    })
                    if(activeIsExist == true){
                        newActives[0].active = false
                    }
                }
                else if(action.payload == 0){
                    newActives = newActives.map((el)=>{
                        if(el.id !== 0){
                            el.active = false
                        }
                        else{
                            el.action = true
                        }
                        return el
                    })
                }
            }
            state.categories = newActives//.find(item => item.active == true)//.find(item => item.id == -1)
        },
        set(state, action){
            let newActives = [...action.payload]
            newActives.unshift(defaultValue)
            state.categories = newActives
        }
    }
})

export default categorySlice.reducer
export const { change, set } = categorySlice.actions