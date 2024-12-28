
export default interface Response {
    success: boolean,
    data?: {
        [key: string]: string | any
    },
    error?: string
}