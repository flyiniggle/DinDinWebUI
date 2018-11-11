import { ReactNode } from 'react';
import editableFields from 'Components/Meal/editableFields';
import IMeal from 'Business/Meals/Types/Meal';
import INewMeal from 'Business/Meals/Types/NewMeal';
import Message from 'Business/Validation/Message';
import { Result } from 'true-myth';


interface IMealProps  {
    meal: IMeal | INewMeal
    message?: Message
    useMeal?: (IMeal) => Promise<void>
    save?: (string: editableFields, val: any) => Promise<Result<IMeal, Message[]>> | Result<INewMeal, Message[]>
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