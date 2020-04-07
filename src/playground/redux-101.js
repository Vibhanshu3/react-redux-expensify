import { createStore } from 'redux';

//ACTION GENERATOR
const incrementCount = ({incrementBy = 1} = {}) => ({ ///default is 1.
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({ ///default is 1.
    type: 'DECREMENT',
    decrementBy
});

const resetCount = () => ({ ///default is 1.
    type: 'RESET',
});

const set = ({count}) => ({ 
    type: 'SET',
    count
});

//REDUCERS
//1. Reducers r pure functions purely dependent on input.
//2. Never change state or action.

const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };

        case 'DECREMENT':
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return {
                count: state.count - decrementBy
            };

        case 'SET':
            return {
                count: action.count
            };

        case 'RESET':
            return {
                count: 0
            };

        default:
            return state;
    }
};

const store = createStore(countReducer);

//looking for state changes
const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// });
//          |
//          |
//          V
store.dispatch(incrementCount({incrementBy: 5}));

store.dispatch(incrementCount());

// unsubscribe();

store.dispatch(decrementCount());
store.dispatch(decrementCount({decrementBy: 10}));

// store.dispatch({
//     type: 'DECREMENT'
// });

store.dispatch(set({count: 101}));
store.dispatch(resetCount());


// store.dispatch({
//     type: 'SET',
//     count: 101
// });
