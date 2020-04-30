import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouters';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import getVisibleExpense from './selector/expenses';
import 'normalize.css/normalize.css'; //all browsers start from same page
import './styles/styles.scss';
import { firebase } from './firebase/firebase.js';
import LoadingPage from './components/LoadingPage';
import LoginPage from './components/LoginPage';

const store = configureStore();
// store.dispatch(addExpense({ description: 'water bill', amount: '4200' }));
// store.dispatch(addExpense({ description: 'Gas bill', amount: '11110' }));
// store.dispatch(setTextFilter('bill'));

// const state = store.getState();
// const visibleExpense = getVisibleExpense(state.expenses, state.filters);
// console.log(visibleExpense);

//provider provides store to every compenent
const jsx = (
    <Provider store={store}>
        <AppRouter></AppRouter>
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    // if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
    // }
};

ReactDOM.render(<LoadingPage></LoadingPage>, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    console.log("in auth")
    if (user) {
        store.dispatch(login(user.uid));
        console.log('uid', user.uid);
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/create');

            }
        });
    } else {
        store.dispatch(logout());

        renderApp();
        history.push('/');
        ReactDOM.render(<Provider store={store}>
            <LoginPage></LoginPage>
        </Provider>, document.getElementById('app'));
    }
});


