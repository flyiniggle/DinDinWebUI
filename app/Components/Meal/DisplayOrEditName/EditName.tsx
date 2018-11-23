import * as React from 'react';
import TextInput from 'UI/Forms/TextInput/TextInput';

interface IEditNameProps {
    value: string,
    onChange: (e: React.FormEvent) => void
}

class EditName extends React.Component<IEditNameProps, {}> {
    private input = React.createRef<TextInput>();

    componentDidmount = () => {
        //this.input.focus()
    }

    render() {
        const { value, onChange } = this.props;

        return <TextInput ref={this.input} value={value} className="form-control-lg" onChange={onChange} />;
    }
}

export default EditName;