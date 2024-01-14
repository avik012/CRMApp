import { legacy_createStore, combineReducers,applyMiddleware } from "redux"
import {thunk} from "redux-thunk"
import { composeWithDevTools} from 'redux-devtools-extension'
import {  userDetailsReducer, userReducer} from './reducers/userReducer'
import { deleteProductReducer, newProductReducer, productDetailsReducer, productReducer } from "./reducers/productReducers";
import { dashboardReducer } from "./reducers/dashBoardReducer";

const reducer = combineReducers({
    user:userReducer,
    userDetails: userDetailsReducer,
    products:productReducer,
    newProduct: newProductReducer,
    delProduct: deleteProductReducer,
    productDetails: productDetailsReducer,
    dashboard: dashboardReducer
});

let initialState = {
    
};

const middleware = [thunk];

const store = legacy_createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;