export interface UserI {
    id?: number
    email: string
    plainPassword?: string
}


export interface AuthI {
    api_key?: string | null,
    account_id?: string | null,
    loading?: boolean,
    error?: string | null,
}

