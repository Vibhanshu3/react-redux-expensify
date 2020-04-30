import database from '../firebase/firebase.js';

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

//using react middleware thunk, now we return function for action which has dispatch and getstate as a parameter.
export const startAddExpense = (expenseData) => {
    return (dispatch, getState) => {
        const { description = '', note = '', amount = '', createdAt = '' } = expenseData;
        const uid = getState().auth.uid;

        const expense = {
            description,
            note,
            amount,
            createdAt
        };

        return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

//REMOVE_EXPENSE
export const removeExpense = ({ id }) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const startRemoveExpenses = ({id}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        return database.ref(`users/${uid}/expense/${id}`).remove().then(() => {
            dispatch(removeExpense({id}));
        });
    };
};

//EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const startUpdateExpenses = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        return database.ref(`users/${uid}/expense/${id}`).update(updates).then(() => {
            dispatch(editExpense(id, updates));
        });
    };
};

//SET_EXPENSES
const setExpenses = (expenses) => ({
    type: "SET_EXPENSES",
    expenses
})

export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
            const expenses = [];

            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(setExpenses(expenses));
        });
    };
};