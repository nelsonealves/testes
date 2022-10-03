import {StatusHandleModel} from './StatusHandle'

export interface EventsHandle {
    id: number
    id_application_of: number
    id_application_to: number
    status_of: StatusHandleModel
    status_to: StatusHandleModel
    id_department_of: number
    id_department_to: number
    id_service_of: number
    id_service_to: number
    status_contract_to?:  'Pending'| 'Active'|'Suspended'|'Terminated'|'Cancelled'|'Fraud'| undefined
    
}