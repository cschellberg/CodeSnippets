import { combineReducers } from '@reduxjs/toolkit'
import itemReducer from './item/itemSlice.js' // Assuming you have a userSlice


const rootReducer = combineReducers({
    item: itemReducer,
    // Add other slices here
})

export default rootReducer