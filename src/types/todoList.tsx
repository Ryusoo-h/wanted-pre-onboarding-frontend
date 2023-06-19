
export type TodoType = {
    id: number,
    todo: string,
    isCompleted: boolean,
    userId: number
}

export type SignUpDataType = {
    statusCode: number,
    message: string,
    error?: string,
}

export type SignInDataType = {
    statusCode: number,
    message?: string,
    access_token?: string,
}