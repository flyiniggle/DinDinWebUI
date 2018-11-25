import * as React from 'react';

interface IDisplayNotesProps {
    value?: string
}

function DisplayNotes(props: IDisplayNotesProps) {
    const { value } = props;

    return <span className={`${value ? '' : 'display-notes-placeholder'}`}>{value || "add a note"}</span>;
}


export { IDisplayNotesProps };
export default DisplayNotes;