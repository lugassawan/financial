Ext.define('Financial.store.Expense', {
    extend: 'Ext.data.Store',

    model: 'Financial.model.Expense',

    autoDestroy: true,

    proxy: {
        type: 'ajax',
        url: Financial.routes.expense.list,
        reader: {
            type: 'json'
        }
    },

    autoLoad: false
});