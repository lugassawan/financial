// @flow
import React from 'react';
import DescriptionDisplay from 'common/components/BaseTable/cells/DescriptionDisplay';
import FromDisplay from 'mobile/ui/internal/incomes/cells/FromDisplay';
import CurrencyColumn from 'common/components/BaseTable/columns/CurrencyColumn';
import AmountColumn from 'common/components/BaseTable/columns/AmountColumn';
import DateTimeColumn from 'common/components/BaseTable/columns/DateTimeColumn';
import AccountColumn from 'common/components/BaseTable/columns/AccountColumn';
import RepeatColumn from 'common/components/BaseTable/columns/RepeatColumn';

export default [
    CurrencyColumn,
    AmountColumn,
    {
        Header: 'Description',
        accessor: (item) => <DescriptionDisplay entity="income" item={item} />,
        id: 'description',
    },
    DateTimeColumn,
    AccountColumn,
    {
        Header: 'Person',
        accessor: (item) => <FromDisplay item={item} />,
        id: 'from',
        //
        width: 100,
        headerStyle: { textAlign: 'center' },
        style: { textAlign: 'center' },
    },
    RepeatColumn,
];
