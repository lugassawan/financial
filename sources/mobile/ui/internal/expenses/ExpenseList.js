import React, {PureComponent} from 'react';

import routes from 'common/defs/routes';

import ExpenseListItem from './ExpenseListItem';
import MainScreenList from '../common/MainScreenList';

const ExpenseList = (props) => {
    return (
        <MainScreenList
            {...props}
            api={routes.expense}
            listItemComponent={ExpenseListItem}
        />
    )
};

export default ExpenseList;