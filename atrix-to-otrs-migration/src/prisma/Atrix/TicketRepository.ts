
import {} from "@/models"

export const getRangeOfClient = (start:number) => {
    const tblclients = await this.ormRepository.tblclients.findMany({
        where: {
          id: {
            gt: id
          }
        }
      })
        
        

      if (!tblclients) return {} as GetLatestClientsRepository.Result;

      const clientsArray: GetLatestClientsRepository.Result = tblclients.map(client => {
        return {
          id: client.id,
          customer_id: (client.id).toString(),
          name: `${client.firstName} ${client.lastName}`,
          CNPJ: client.document,
          street: client.address1,
          district: client.state,
          UF: client.state,
          zip: client.postcode,
          country: client.country,
          city: client.city,
          comments: '-',
          updated_at: client.updated_at!
          
        };
      })

      return clientsArray
}

export namespace ClientRepository {
    export type Result = {

    } 
}