export interface UserPayload {
    sub: number;
    username: string;
    email: string;
    iat?: number;
    exp?: number;
}