Ext.define('Financial.view.main.internal.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',

    requires: 'Financial.view.main.internal.ToolbarController',

    controller: 'app-main-internal-toolbar',

    xtype: 'app-main-internal-toolbar',

    dock: 'top',

    layout: 'hbox',

    listeners: {
        afterrender: 'onAfterRender'
    },

    items: [
        {
            text: 'Exchange rates',
            iconCls: 'x-fa fa-info-circle',
            menu: {
                xtype: 'menu',
                items: [
                    {
                        xtype: 'container',
                        padding: '10px 20px',
                        itemId: 'currenciesContainer'
                    }
                ]
            }
        },
        {
            xtype: 'tbfill',
        },
        {
            iconCls: 'x-fa fa-arrow-left',
            tooltip: 'Shift back 2 weeks',
            listeners: {
                click: 'onPreviousPeriodClick'
            }
        },
        {
            itemId: 'end-date-button',
            iconCls: 'x-fa fa-calendar',
            menu: {
                xtype: 'menu',
                listeners: {
                    hide: 'onDatePickerHide'
                },
                items: [
                    {
                        xtype: 'datepicker',
                        border: 0,
                        startDay: 1,
                        value: Financial.initialValues.getEndDate(),
                        listeners: {
                            select: 'onDateSelect'
                        }
                    }
                ]
            }
        },
        {
            iconCls: 'x-fa fa-arrow-right',
            tooltip: 'Shift forward 2 weeks',
            listeners: {
                click: 'onNextPeriodClick'
            }
        },
        {
            xtype: 'tbfill'
        },
        {
            iconCls: 'x-fa fa-refresh',
            listeners: {
                click: 'applyFilter'
            }
        },
        {
            listeners: {
                render: 'onUserMenuRender'
            },
            menu: {
                xtype: 'menu',
                items: [
                    {
                        text: 'Preferences',
                        iconCls: 'x-fa fa-cog',
                        handler: 'onPreferencesClick'
                    },
                    {
                        xtype: 'menuseparator'
                    },
                    {
                        text: 'Manage Categories',
                        iconCls: 'x-fa fa-pencil',
                        handler: 'onManageCategoriesClick'
                    },
                    {
                        text: 'Manage Money Locations',
                        iconCls: 'x-fa fa-pencil',
                        handler: 'onManageMLsClick'
                    },
                    {
                        text: 'Manage Money Location Types',
                        iconCls: 'x-fa fa-pencil',
                        handler: 'onManageMLTypesClick'
                    },
                    {
                        xtype: 'menuseparator'
                    },
                    {
                        iconCls: 'x-fa fa-sign-out',
                        text: 'Logout',
                        itemId: 'logout',
                        handler: 'onLogoutClick'
                    }
                ]
            }
        }
    ]
});