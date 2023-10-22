export interface ResponseType {
    message: string;
    result:{
        access_token: string;
        refresh_token: string;
    }
}