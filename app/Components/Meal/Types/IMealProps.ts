import IMealControlProps from 'Components/Meal/Types/IMealControlProps';
import { ReactNode } from 'react';
import editableFields from 'Components/Meal/editableFields';


interface IMealProps extends IMealControlProps {
    saveFieldHandler: () => Promise<void>
    updateFieldHandler: (any) => void
    updateListFieldHandler: (a: Array<any>) => void
    cancelEditingHandler: (e: Event) => void
    activeField?: string,
    activeFieldValue?: any,
    activateEditor?: (field: editableFields, value: any) => void
    children?: ReactNode
}

export default IMealProps