import React from 'react';
import {connect} from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selector/expenses';

const ExpenseList = (props) =>(
    <div>
        <h1>Expense list</h1>
        {props.expenses.map((expense) => {
            return <ExpenseListItem key = {expense.id} {...expense}></ExpenseListItem>
        })}
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
};

const connectedExpenseList = connect(mapStateToProps)(ExpenseList);

export default connectedExpenseList;