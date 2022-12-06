import { PrismaClient } from "@internal/.prisma/Atrix/client"

const prismaClient = new PrismaClient()

export const getTickets = async (idContract:number) => {
    const ticketsArray = await prismaClient.tbltickets.findMany({
        where: {
          AND: [
            {
              serviceid: idContract
            },
            {
              status: "Open"
            }
          ]
          
        },
        orderBy: {
          id: 'asc'
        },
        include: {
          tblclients: true,
          tblticketdepartments: true,
          tblhosting: {
            include: {
              tblproducts: {
                include: {
                  tblproductgroups: true
                }
              }
            }
          }

        }
      })
        
        

      if (!ticketsArray) return {} as TicketRepository.Result;

      const tickets: TicketRepository.Result = ticketsArray.map(ticket => {
        return {
          id: ticket.id,
            tid: ticket.tid,
            customer_id: `${ticket.tblclients?.document!}`,
            queue_id: ticket?.tblticketdepartments?.id!,
            service_id: ticket.typerequest!,
            title: ticket.title,
            a_subject: ticket.title,
            a_body: ticket.message,
          
        };
      })
      await prismaClient.$disconnect()
      return tickets
}

export namespace TicketRepository {
    export type Result = {
      id: number
      tid: number
      customer_id: string
      queue_id: number
      service_id: number
      a_subject: string
      a_body: string
    } 
}