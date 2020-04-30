import React from 'react';
import { Link } from 'react-router-dom';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';

const ExpenseDashboardPage = () => (
    <div>
        <div className="content-container">
            <div className="page-header__action">
                <Link className="button" to="/create">ADD EXPENSE</Link>
            </div>
        </div>
        <ExpenseListFilters></ExpenseListFilters>
        <ExpenseList></ExpenseList>
    </div>
);

export default ExpenseDashboardPage;

