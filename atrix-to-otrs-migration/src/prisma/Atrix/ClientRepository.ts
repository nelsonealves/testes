
import { ClientModel } from "@/models"
import { PrismaClient } from "@internal/.prisma/Atrix/client"

const prismaClient = new PrismaClient()

export const getRangeOfClient = async (startID: number, range: number): Promise<ClientRepository.Result> => {
  const tblclients = await prismaClient.tblclients.findMany({
    where: {
      AND: [
        {
          id: {
            gt: startID
          }
        },
        {
          id: {
            lt: startID + range
          }
        }
      ]

    },
    orderBy: {
      id: 'asc'
    }
  });

  if (!tblclients) return {} as ClientRepository.Result;

  return tblclients.map(client => {
    return {
      id: client.id,
      address1: client.address1,
      address2: client.address2,
      city: client.city,
      country: client.country,
      document: client.document!,
      email: client.email,
      postcode: client.postcode,
      state: client.state,
      updated_at: client.updated_at,
      firstName: client.firstName!,
      lastName: client.lastName!,

    }
  })
}

export type Client = {
  id: number
  firstName?: string 
  lastName?: string 
  email: string
  address1: string
  address2: string
  city: string
  state: string
  postcode: string
  document: string
  country: string
  updated_at: Date
}
export namespace ClientRepository {
  export type Result = Array<Client>
}