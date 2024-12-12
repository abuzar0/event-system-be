export interface JwtPayload {
    _id: string;
    email: string;
    role:string
}

export interface JwtRefreshPayload {
    _id: string;
    email: string;
    role:string
    version: number;
}