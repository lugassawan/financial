Ext.define('Financial.model.UserModel', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'first_name',
            type: 'string'
        },
        {
            name: 'last_name',
            type: 'string'
        },
        {
            name: 'full_name',
            type: 'string'
        },
        {
            name: 'avatar',
            type: 'string'
        }
    ]
});