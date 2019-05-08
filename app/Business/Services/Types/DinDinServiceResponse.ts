import { Result } from 'true-myth';

export type DinDinServiceResponse<T, E> = Promise<Result<T, E>>;
export const DinDinServiceResponse = Promise;