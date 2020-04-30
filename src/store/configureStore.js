import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import expensesReducer from '../reducers/expenses'
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth.js';


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSEION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer,
            auth: authReducer
        }),
        applyMiddleware(thunk)
    );

    return store;
}
