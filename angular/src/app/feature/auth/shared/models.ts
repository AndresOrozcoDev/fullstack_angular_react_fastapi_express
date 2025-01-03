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
    data: any
}

export interface User {
    id: number,
    username: string,
    password?: string,
    role: string
}