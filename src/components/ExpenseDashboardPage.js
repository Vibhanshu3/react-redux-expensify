import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import ExpenseListItem from './ExpenseListItem';

const ExpenseDashboardPage = () => (
    <div>
        <ExpenseListFilters></ExpenseListFilters>
        <ExpenseList></ExpenseList>
    </div>
);

export default ExpenseDashboardPage;

