export interface Login {
    username?: string | null | undefined,
    password?: string | null | undefined
}

export interface ResponseLogin {
    auth: boolean,
    token: string
}

export interface Response {
    status_code: number,
    message: string,
    data: ResponseLogin
}

export interface User {
    id: number,
    username: string,
    password?: string,
    role: string
}