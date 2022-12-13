import {getRangeOfTicketOtrs} from "@/prisma/Otrs/TicketRepository"
import {updateCustomerIdReference} from "@/prisma/Otrs/TicketRepository"



export const ticketReferenceMigration = async () => {

    console.log('opa')

    const tickets = await getRangeOfTicketOtrs(9291,20)

    console.log({tickets})
    tickets.map(async ticket => {
        if (ticket.customer_id && ticket.customer_user_id) {
        
            await updateCustomerIdReference({customer_id: ticket.customer_id, customer_user_id: ticket.customer_user_id})
        }
    })
   

    // console.log(ticket[0].customer_user?.customer_company?.CNPJ)




}