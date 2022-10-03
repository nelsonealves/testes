export interface TicketModel {
    id: number
    queue_id: number
    customer_id: string
    service_id?: number
    title: string
    a_subject?: string
    a_body?: string
    change_time: Date
    id_state: number
    state_atrix: string
    customer_user_id: string
    nameOfCustomer?: string
    contract_id?: number
    
    
}