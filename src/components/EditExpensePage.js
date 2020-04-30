import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startUpdateExpenses } from '../actions/expenses';
import { startRemoveExpenses } from '../actions/expenses';

const EditExpensePage = (props) => {
    console.log(props);
    return (
        <div>
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Edit Expense</h1>
                </div>
            </div>
            <div className="content-container">
                <ExpenseForm
                    expense={props.expense}
                    onSubmit={(expense) => {
                        props.dispatch(startUpdateExpenses(props.expense.id, expense));
                        props.history.push('/') //redirect to home page
                    }}>

                </ExpenseForm>

                <button onClick={() => {
                    props.dispatch(startRemoveExpenses({ id: props.expense.id }));
                    props.history.push('/') //redirect to home page
                    }}
                    className="button button--secondary"
                >Remove Expense
                </button>
            </div>


        </div>
    );
};

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    }
};

export default connect(mapStateToProps)(EditExpensePage);