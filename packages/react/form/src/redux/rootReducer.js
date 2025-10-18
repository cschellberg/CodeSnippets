import { combineReducers } from '@reduxjs/toolkit'
import memberReducer from './member/memberSlice' // Assuming you have a userSlice


const rootReducer = combineReducers({
    member: memberReducer,
    // Add other slices here
})

export default rootReducer