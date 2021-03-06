// @flow
import React from 'react';
import RepeatsDisplay from 'common/components/BaseTable/cells/RepeatsDisplay';

const style = { textAlign: 'center' };

export default {
    Header: 'Repeat',
    accessor: (item) => <RepeatsDisplay item={item} />,
    id: 'repeat',
    //
    headerStyle: style,
    style,
};
