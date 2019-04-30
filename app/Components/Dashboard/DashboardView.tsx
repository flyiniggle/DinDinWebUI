import * as React from 'react';
import { Link } from 'react-router-dom';
import Ribbon from 'Components/Ribbon/Ribbon';
import OverviewBase from 'Components/Dashboard/Overview/Overview';
import renderMealCards from 'Components/Dashboard/renderMealCards';
import IDashboardViewProps from 'Components/Dashboard/Types/IDashboardViewProps';
import TextInput, { ITextInputProps } from 'UI/Forms/TextInput/TextInput';

import 'Styles/theme.sass';
import './DashboardView.sass';



function DashboardView(props: IDashboardViewProps) {
    const {
        meals,
        searchString,
        updateSearchString
    } = props;
    const inputProps: ITextInputProps = {
        placeholder: 'Search',
        value: searchString,
        onChange: (e) => { updateSearchString((e.target as HTMLInputElement).value) }
    }

    return (
        <div className="dashboard col-12">
            <div className="dashboard-ribbon row">
                <div className="col-12">
                    <Ribbon>
                        <Link to="meals/new" className="btn btn-sm btn-outline-accent">new meal</Link>
                        <TextInput {...inputProps} className={"form-control-sm search-meals"} />
                    </Ribbon>
                </div>
            </div>
            <div className="dashboard-main row">
                <div className="d-none d-md-block col-12 col-md-4">
                    <div className="position-fixed">
                        <OverviewBase meals={meals.unwrapOr([])} />
                    </div>
                </div>
                <div className="meal-card-container col-12 col-md-8 p-md-5">
                    {renderMealCards(props)}
                </div>
            </div>
        </div>
    );
}

export default DashboardView;