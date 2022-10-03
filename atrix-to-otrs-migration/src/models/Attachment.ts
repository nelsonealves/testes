export interface AttachmentModel {
    id: number
    article_id: number
    content_size: string
    filename: string
    content: Buffer
    change_time: Date
    create_time: Date
    
}