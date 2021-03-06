Ext.define('Financial.store.IncomeStore', {
    extend: 'Financial.store.BaseRepeatStore',

    model: 'Financial.model.IncomeModel',

    autoDestroy: false,
    storeId: 'income',

    sorters: [
        {
            property: 'created_at',
            direction: 'DESC'
        },
        {
            property: 'id',
            direction: 'DESC'
        }
    ]
});