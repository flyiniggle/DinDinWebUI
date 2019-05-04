import { ReactNode } from 'react';
import editableFields from 'Components/Meal/Types/editableFields';
import IMeal from 'Business/Meals/Types/Meal';
import INewMeal from 'Business/Meals/Types/INewMeal';
import IMessage from 'Business/Validation/Types/Message';
import { Maybe } from 'true-myth';
import { IGetUsernamesListAction } from 'Data/ActionCreators/userActionCreators';
import IUser from 'Business/Auth/Types/User';


interface IMealProps {
    meal: Maybe<IMeal | INewMeal>
    usernamesList: IUser[]
    getUsernamesList: () => IGetUsernamesListAction
    messages?: Maybe<IMessage[]>
    isWorking: boolean
    saveField?: () => void
    useMeal?: (meal: IMeal) => void
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