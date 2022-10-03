
import { clientMigration, contractMigration } from "@/migration/"
import { PrismaClient } from "@internal/.prisma/Atrix/client"
import { getRangeOfClient } from "@/prisma/Atrix/ClientRepository"
import { Client as ClientAtrix } from "@/prisma/Atrix/ClientRepository"

(async () => {
    const clients = await getRangeOfClient(204633, 20)

    await clients.forEach(async (client: ClientAtrix) => {
        // console.log({client})
        const clientOk = await clientMigration(client)

        if (clientOk) {
            // It allow to migrate
            console.log(`${client.firstName} sem erro e com contrato`)
            
            const contractOk = await contractMigration(client.id)

            


        } else {
            // It desallow to migrate
            console.log(`${client.firstName} com erro`)
            console.log({ client })

        }
        // console.log({ clientError })
        // console.log()
    })

    console.log('ok')




    // await clientMigration(195000)
})()