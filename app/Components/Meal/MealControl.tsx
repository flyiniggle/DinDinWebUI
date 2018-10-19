import * as React from 'react';
import editableFields from "Components/Meal/editableFields";
import IMealControlProps from 'Components/Meal/Types/IMealControlProps';
import IMealProps from 'Components/Meal/Types/IMealProps';

interface IState {
    activeField?: editableFields
    activeFieldValue?: any
}

function MealControl(MealComponent) {
    return class MealControlWrapper extends React.Component<IMealControlProps, IState> {
        readonly state: IState = {
            activeField: null,
            activeFieldValue: null
        }
    
        componentWillMount = function () {
            document.addEventListener('keydown', this.props.handleKeydown, false);
        }
    
        componentWillUnmount = function () {
            document.removeEventListener('keydown', this.props.handleKeydown, false);
        }
    
        cancelEditing = (e: Event): void => {
            e.preventDefault();
            e.stopPropagation();
            this.setState({ activeField: null, activeFieldValue: null });
        }
    
        updateCurrentValue = (e: any) => {
            let val;
            
            if (typeof e === 'object' && !('target' in  e)) {
                val = e.target.value;
            } else {
                val = e;
            }

            this.setState({ activeFieldValue: val });
        }
    
        updateCurrentListValue = (a: Array<any>): void => {
            this.setState({ activeFieldValue: a });
        }
    
        doSave = async () => {
            const result = await this.props.save(this.state.activeField, this.state.activeFieldValue);
    
            if (result.isOk()) {
                this.setState({
                    activeField: null,
                    activeFieldValue: null
                });
            }
        }

        activateEditor = (field: editableFields, value: any) => {
            this.setState({ activeField: field, activeFieldValue: value });
        }
    
        render() {
            const childProps: IMealProps = {
                saveFieldHandler: this.doSave,
                updateFieldHandler: this.updateCurrentValue,
                updateListFieldHandler: this.updateCurrentListValue,
                cancelEditingHandler: this.cancelEditing,
                activeField: this.state.activeField,
                activeFieldValue: this.state.activeFieldValue,
                activateEditor: this.activateEditor,
                ...this.props
            }

            return <MealComponent {...childProps}/>;
        }
    }
}


export default MealControl;