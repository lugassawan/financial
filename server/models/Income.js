const { standardDate } = require('../helpers');

module.exports = (sequelize, types) =>
    sequelize.define(
        'incomes',
        {
            id: {
                type: types.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            currency_id: types.INTEGER,
            description: types.STRING,
            money_location_id: types.INTEGER,
            repeat: types.STRING,
            status: types.STRING,
            sum: types.FLOAT,
            user_id: types.INTEGER,
        },
        {
            underscored: true,
            instanceMethods: {
                toJSON() {
                    const values = Object.assign({}, this.dataValues);

                    // FIXME TEMP WORKAROUND sources/desktop/app/model/IncomeModel.js:15
                    values.created_at = standardDate(values.created_at);
                    values.updated_at = standardDate(values.updated_at);

                    return values;
                },
            },
        },
    );
