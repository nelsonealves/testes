import {getRangeOfTicketOtrs} from "@/prisma/Otrs/TicketRepository"
import {updateTicketCustomerIdReference} from "@/prisma/Otrs/TicketRepository"



export const ticketReferenceMigration = async () => {

    console.log('opa')

    const tickets = await getRangeOfTicketOtrs(30211,10000)

    tickets.map(async ticket => {
        if(ticket.customer_user?.customer_company?.CNPJ) {
            console.log({
                idTicket: ticket.id, 
                CNPJ: ticket.customer_user?.customer_company?.CNPJ
            })
            await updateTicketCustomerIdReference(ticket.id, ticket.customer_user?.customer_company?.CNPJ)
        }
    })
   

    // console.log(ticket[0].customer_user?.customer_company?.CNPJ)




}