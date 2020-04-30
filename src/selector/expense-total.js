import ExpenseListItem from "../components/ExpenseListItem"

export default () => {
    if(ExpenseListItem.length === 0) {
        return 0;

    } else {
        return
            expenses
                .map((expense) => expense.amount)
                .reduce((sum, value) => sum + value, 0)
    }
}