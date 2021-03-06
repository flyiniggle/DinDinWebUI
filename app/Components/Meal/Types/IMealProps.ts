import { ReactNode } from 'react';
import editableFields from 'Components/Meal/Types/editableFields';
import Meal from 'Business/Meals/Types/Meal';
import INewMeal from 'Business/Meals/Types/NewMeal';
import IMessage from 'Business/Validation/Types/Message';
import { Maybe } from 'true-myth';


interface IMealProps {
    meal: Maybe<Meal | INewMeal>
    messages?: Maybe<IMessage[]>
    isWorking: boolean
    saveField?: () => void
    useMeal?: (meal: Meal) => void
    saveNewMeal?: () => void
    updateFieldHandler: (any) => void
    updateListFieldHandler: (a: Array<any>) => void
    cancelEditingHandler: (e: Event) => void
    activeField?: string
    activeFieldValue?: any
    activateEditor?: (field: editableFields, value: any) => void
    acknowledgeMessage: (messageId: string) => void,
    children?: ReactNode
}

export default IMealProps