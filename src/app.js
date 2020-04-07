import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouters';
import configureStore from './store/configureStore';
import {addExpense} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpense from './selector/expenses';
import 'normalize.css/normalize.css'; //all browsers start from same page
import './styles/styles.scss';


const store = configureStore();
store.dispatch(addExpense({ description: 'water bill', amount: '4200' }));
store.dispatch(addExpense({ description: 'Gas bill', amount: '11110' }));
store.dispatch(setTextFilter('bill'));

const state = store.getState();
// const visibleExpense = getVisibleExpense(state.expenses, state.filters);
// console.log(visibleExpense);

const jsx = (
    <Provider store={store}>
        <AppRouter></AppRouter>
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));

 