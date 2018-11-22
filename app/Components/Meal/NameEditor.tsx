import * as React from 'react';
import InlineEditor from 'Components/Meal/InlineEditor';
import TextInput from 'UI/Forms/TextInput/TextInput';


interface INameEditorProps {
    value: string,
    onChange: (e: React.FormEvent) => void
}

const nameDisplay = ({value}) => value ? <h1>{value}</h1> : <h1 className='font-italic font-weight-light'>add a name</h1>;
    
class NameEditorThingy extends React.Component<INameEditorProps, {}> {
    private input = React.createRef<TextInput>();

    componentDidmount = () => {
        //this.input.focus()
    }

    render() {
        const { value, onChange } = this.props;

        return <TextInput ref={this.input} value={value} className="form-control-lg" onChange={onChange} />;
    }
}

const NameEditor = InlineEditor(nameDisplay, NameEditorThingy)

export default NameEditor