// @flow
import React from 'react';
import { BigLoader } from '../components/loaders';
import { Paper } from 'material-ui';
import * as colors from 'material-ui/styles/colors';
import routes from '../../../common/defs/routes';
import { stringify } from 'query-string';
import { fetch } from '../../../common/utils/fetch';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import { connect } from 'react-redux';
import IncludeDropdown from 'common/components/IncludeDropdown';
import { getStartDate, formatYMD } from 'common/utils/dates';
import { greyedOut } from 'common/defs/styles';
import { Sizes } from 'common/defs';
import SummaryCategory from 'mobile/ui/internal/summary/SummaryCategory';
import { updatePreferences } from 'common/state/actions';

type TypeProps = {
    screen: TypeScreenQueries,
};

class Summary extends React.PureComponent<TypeProps> {
    state = {
        firstLoad: true,
        results: null,
        refreshing: false,
    };

    componentDidMount() {
        this.load();
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps({ preferences, refreshWidgets }) {
        const { endDate } = preferences;

        if (endDate !== this.props.preferences.endDate) {
            this.load({ endDate });
        }

        if (refreshWidgets !== this.props.refreshWidgets) {
            this.load();
        }
    }

    load = async ({
        endDate = this.props.preferences.endDate,
        include = this.props.preferences.include,
    } = {}) => {
        this.setState({
            refreshing: true,
        });

        const response = await fetch(
            `${routes.report.summary}?${stringify({
                ...pickBy(
                    {
                        end_date: include === 'ut' ? formatYMD() : endDate,
                        start_date: getStartDate({
                            include,
                            endDate,
                        }),
                    },
                    identity,
                ),
                html: false,
            })}`,
        );
        const json = await response.json();

        this.setState({
            results: json,
            firstLoad: false,
            refreshing: false,
        });
    };

    renderCategory(props) {
        return React.createElement(SummaryCategory, props);
    }

    renderResults() {
        const { results } = this.state;

        return (
            <div style={{ margin: '0 0 20px' }}>
                {this.renderCategory({
                    backgroundColor: colors.green500,
                    title: 'Balance by location',
                    summaryObject: results.remainingData.byML,
                    entities: this.props.moneyLocationTypes,
                    expandedByDefault: true,
                })}

                {this.renderCategory({
                    backgroundColor: colors.green500,
                    title: 'Balance by user',
                    summaryObject: results.remainingData.byUser,
                    entities: this.props.user.get('list'),
                    entityNameField: 'full_name',
                })}

                {this.renderCategory({
                    backgroundColor: colors.purple500,
                    title: 'Expenses by category',
                    summaryObject: results.expensesByCategory,
                    entities: this.props.categories,
                    entityNameField: 'name',
                    showSumInHeader: false,
                })}

                {this.renderCategory({
                    backgroundColor: colors.red500,
                    title: 'Expenses by location',
                    summaryObject: results.expensesData.byML,
                    entities: this.props.moneyLocationTypes,
                    entityNameField: 'name',
                })}

                {this.renderCategory({
                    backgroundColor: colors.red500,
                    title: 'Expenses by user',
                    summaryObject: results.expensesData.byUser,
                    entities: this.props.user.get('list'),
                    entityNameField: 'full_name',
                })}

                {this.renderCategory({
                    backgroundColor: colors.lime900,
                    title: 'Income by location',
                    summaryObject: results.incomesData.byML,
                    entities: this.props.moneyLocationTypes,
                    entityNameField: 'name',
                })}

                {this.renderCategory({
                    backgroundColor: colors.lime900,
                    title: 'Income by user',
                    summaryObject: results.incomesData.byUser,
                    entities: this.props.user.get('list'),
                    entityNameField: 'full_name',
                })}
            </div>
        );
    }

    onIncludeChange = (include) => {
        this.props.updatePreferences({ include });
        this.load({ include });
    };

    render() {
        if (this.state.firstLoad) {
            return <BigLoader />;
        }

        return (
            <div
                style={{
                    padding: '0 5px',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    height: `calc(100vh - ${Sizes.HEADER_SIZE})`,
                }}
            >
                <div style={this.state.refreshing ? greyedOut : {}}>
                    <Paper
                        style={{
                            margin: '5px 0',
                            padding: '0 10px',
                        }}
                    >
                        <IncludeDropdown
                            value={this.props.preferences.include}
                            onChange={this.onIncludeChange}
                        />
                    </Paper>
                    {this.state.results && this.renderResults()}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = { updatePreferences };

export default connect(
    (state) => state,
    mapDispatchToProps,
)(Summary);
