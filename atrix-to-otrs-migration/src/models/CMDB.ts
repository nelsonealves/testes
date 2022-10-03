export interface CmdbModel {
    ticketid: number
    admin: string
    message: string
    editor: "plain" | "markdown"
}