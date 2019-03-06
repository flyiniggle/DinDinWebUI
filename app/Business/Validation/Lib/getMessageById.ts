import { propEq } from 'ramda';
import Message from '../Types/Message';
import { Maybe } from 'true-myth';

function getMessageById(id: string, messages: Message[]): Maybe<Message> {
    console.log(messages.find(propEq('id', id)))
    return Maybe.find(propEq('id', id), messages)
} 


export default getMessageById;