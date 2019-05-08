import { DinDinServiceResponse } from './DinDinServiceResponse';

type DinDinServiceMethod = (...args: any[]) => DinDinServiceResponse<any, any>
interface DinDinService {
    get?: DinDinServiceMethod
    post?: DinDinServiceMethod
    patch?: DinDinServiceMethod
    put?: DinDinServiceMethod
    delete?: DinDinServiceMethod
}

export default DinDinService;