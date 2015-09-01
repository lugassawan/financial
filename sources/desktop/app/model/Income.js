Ext.define('Financial.model.Income', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id', type: 'int'},
        {name: 'sum', type: 'float', defaultValue: ''},
        {name: 'description', type: 'string'},
        {
            name: 'created_at',
            type: 'date',
            convert: function (date) {
                return Ext.Date.parse(date, 'Y-m-d H:i:s') || date;
            }
        },
        {name: 'user_id', type: 'int'}
    ]
});