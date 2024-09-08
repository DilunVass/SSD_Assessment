import { combineReducers } from 'redux'
import theme from './slices/themeSlice'
import auth from './slices/authSlice'

const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        theme,
        auth,
        ...asyncReducers,
    })
    return combinedReducer(state, action)
}
  
export default rootReducer
