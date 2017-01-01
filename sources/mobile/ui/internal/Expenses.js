import React from 'react';

import MainScreen from './common/MainScreen';

import Creator from './expenses/ExpenseCreator';
import List from './expenses/ExpenseList';

const Expenses = (props) => {
    return (
      <MainScreen {...props} listComponent={List} creatorComponent={Creator}/>
    );
};

export default Expenses;
