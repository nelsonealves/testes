
import { ClientModel } from "@/models"
import { PrismaClient } from "@internal/.prisma/Atrix/client"

const prismaClient = new PrismaClient()

export const getContractsOfClient = async (clientID: number): Promise<ContractRepository.Result> => {

  const contractsQuery: ContractRepository.Result = await prismaClient.tblhosting.findMany({
    where: {
      userid: clientID
    },
    orderBy: {
      id: 'asc'
    },
    include: {
      tblclients: {
        include: {
          tblcontacts: true
        }
      },
      tblproducts: {
        include: {
          tblproductgroups: true
        }
      },
      tbladdress: {
        include: {
          tblcities: true
        }
      },
      tblhostingconfigoptions: {
        include: {
          tblproductconfigoptionssub: true
        }
      }
    }

  });


  if (!contractsQuery) return [] as ContractRepository.Result

  const contracts: ContractRepository.Result = contractsQuery.map(contract => {

    return {
      id: contract.id,
      first_name: contract.tblclients?.firstName!,
      last_name: contract.tblclients?.lastName!,
      customer_id: `${contract.tblclients?.document}`,
      login: `${contract.numplan!} - ${contract.tblproducts?.tblproductgroups.name} - ${contract.tblproducts?.tblproductgroups.subcategory} - ${contract.id!}`,
      zip: contract.tbladdress ? contract.tbladdress.postcode! : contract.tblclients?.postcode!,
      street: contract.tbladdress ? contract.tbladdress.address! : contract.tblclients?.address1!,
      number: `${contract.tbladdress?.number!}`,
      sala: contract.tbladdress?.room! || '',
      complemento: contract.tbladdress?.complement || '',
      city: contract.tbladdress ? `${contract.tbladdress.tblcities?.name}` : contract.tblclients?.city!,
      uf: contract.tbladdress ? contract.tbladdress.state! : contract.tblclients?.state!,
      tipo_de_servico_contratado: `${contract.tblproducts?.tblproductgroups.subcategory} - ${contract.tblproducts?.tblproductgroups.name} - ${contract.tblproducts?.name}  `,
      velocidade: contract.tblhostingconfigoptions?.tblproductconfigoptionssub?.optionname!,
      nome_do_contato_tecnico: `${contract.tblclients?.tblcontacts[0]?.firstname!} ${contract.tblclients?.tblcontacts[0]?.lastname!}`,
      telefone_de_contato_tecnico: contract.tblclients?.tblcontacts[0]?.phonenumber!,
      nome_do_cliente: contract.tblclients?.firstName!,
      cnpj: contract.tblclients?.document!,
      email: contract.tblclients?.email!,
      designacao: contract.designator!,
      numero_do_plano: contract.numplan!,
      updated_at: new Date(contract.updated_at!),
      classification: contract.classification!
    }
  })

  await prismaClient.$disconnect()
  return contracts;

}


export type ContractOtrs = {
  id: number
  login: string
  customer_id: string
  first_name?: string
  last_name?: string
  zip: string
  street: string
  number: string
  sala: string
  complemento: string
  city: string
  uf: string
  tipo_de_servico_contratado: string
  velocidade: string
  nome_do_contato_tecnico: string
  telefone_de_contato_tecnico: string
  nome_do_cliente: string
  cnpj: string
  email: string
  numero_do_plano: number
  updated_at: Date
}
export namespace ContractRepository {
  export type Result = Array<any>
}