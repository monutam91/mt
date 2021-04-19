import { ResponseCode } from '../../enums';

export interface RequestSession {
    response_code: ResponseCode;
    response_message: string;
    token: string;
}
