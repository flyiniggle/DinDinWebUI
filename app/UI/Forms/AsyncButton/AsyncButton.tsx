import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const initialState = {
    working: false
}
type State = Readonly<typeof initialState>
//type Props = IntrinsicAttributes & IntrinsicClassAttributes<AsyncButton> & React.HTMLAttributes<HTMLDivElement> & Readonly<{ children?: React.ReactNode; }> & object

class AsyncButton extends React.Component<any, State> {
    readonly state: State = initialState;

    readonly clickHandler = async (e) => {
        if (this.props.onClick) {
            this.setState({ working: true });
            await this.props.onClick(e);
            this.setState({ working: false });
        }
    }

    render() {
        return (
            <button type="button" {...this.props} onClick={this.clickHandler} >{
                this.state.working
                    ? <FontAwesomeIcon icon={faCircleNotch} spin />
                    : this.props.children
            }</button>
        );
    }
}

export default AsyncButton;