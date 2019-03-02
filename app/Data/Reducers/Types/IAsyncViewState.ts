import Message from 'Business/Validation/Types/Message';

export default interface IAsyncViewState {
    isLoading: boolean
    messages: Message[]
}