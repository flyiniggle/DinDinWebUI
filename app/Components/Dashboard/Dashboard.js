import { compose, pipe } from 'ramda';
import { connect } from 'react-redux';
import { useMeal } from 'Data/ActionCreators/dashboardActionCreators';
import { meals, isLoading as isMealsLoading, isWorking as isMealsWorking } from 'Data/Selectors/mealsSelectors';
import { isLoading as isDashbordLoading, messages as dashboardMessages } from 'Data/Selectors/dashboardSelectors';

import DashboardView from './DashboardView';
import DashboardControl from './DashboardControl';


const mapStateToProps = function(state) {
    return {
        meals: meals(state),
        mealsAreLoading: isMealsLoading(state),
        mealIsUpdating: isMealsWorking(state),
        dashboardIsLoading: isDashbordLoading(state)
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        useMeal: pipe(useMeal, dispatch)
    };
};

const Dashboard = compose(
    connect(mapStateToProps, mapDispatchToProps),
    DashboardControl
)(DashboardView);


export default Dashboard;