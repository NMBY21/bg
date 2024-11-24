import { combineReducers } from 'redux'
import theme from './slices/themeSlice'
import auth from './slices/authSlice'
import UserReducer from './slices/UserSlice'
import ClientReducer from './slices/ClientSlice'
import ApiClaimReducer from './slices/ApiClaimSlice'
import RoleReducer from './slices/RoleSlice'
import BrandReducer from './slices/BrandSlice'
import ManufacturerReducer from './slices/ManufacturerSlice'
import MediaReducer from './slices/MediasSlice'
import LanguageReducer from './slices/LanguageSlice'
import LookupReducer from './slices/LookupSlice'
import TaxReducer from './slices/TaxSlice'
import AddressReducer from './slices/AddressSlice'
import CategoryReducer from './slices/CategorySlice'
import ProductReducer from './slices/ProductSlice'
const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        theme,
        auth,
        user:UserReducer,
        client:ClientReducer,
        apiclaim:ApiClaimReducer,
        role:RoleReducer,
        brand:BrandReducer,
        manufacturer:ManufacturerReducer,
        language:LanguageReducer,
        media:MediaReducer,
        lookup:LookupReducer,
        tax:TaxReducer,
        address:AddressReducer,
        category:CategoryReducer,
        product:ProductReducer,
        ...asyncReducers,
        
    })
    return combinedReducer(state, action)
}
  
export default rootReducer
