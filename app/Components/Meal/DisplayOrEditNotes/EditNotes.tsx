import * as React from 'react';

interface IEditNotesProps {
    value?: string,
    onChange: (e: React.FormEvent) => void
}

class EditNotes extends React.Component<IEditNotesProps, {}> {
    private input = React.createRef<HTMLTextAreaElement>();

    componentDidmount = () => {
        //this.input.focus()
    }

    render() {
        const { value, onChange } = this.props;

        return <textarea ref={this.input} className="form-control d-block mb-2" onChange={onChange} value={value} />
    }
}

export { IEditNotesProps };
export default EditNotes;