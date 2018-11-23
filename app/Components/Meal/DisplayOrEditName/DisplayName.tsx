import * as React from 'react';

interface INameDisplayProps {
    value: string
}

function NameDisplay(props: INameDisplayProps) {
    const { value } = props;

    return value ? <h1>{value}</h1> : <h1 className="font-italic font-weight-light">add a name</h1>;
}

export default NameDisplay;