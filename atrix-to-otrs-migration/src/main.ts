
import { clientMigration, contractMigration } from "@/migration/"
import { PrismaClient } from "@internal/.prisma/Atrix/client"
import { getRangeOfClient } from "@/prisma/Atrix/ClientRepository"
import { Client as ClientAtrix } from "@/prisma/Atrix/ClientRepository"
import "dotenv/config";
import { ticketReferenceMigration } from "@/migration/ticketReferenceMigration"
import { createClient } from "@/endpoints/Axios/CreateClient"
import fs from 'fs'
import { Parser } from 'json2csv'

(async () => {
    const clients = await getRangeOfClient(217873, 2)

    // await ticketReferenceMigration()

    const fields = ['id', 'address1', 'address2', 'city', 'country', 'document', 'email', 'postcode', 'state', 'updated_at', 'firstName', 'lastName']

    const parser = new Parser({ fields })


    await clients.forEach(async (client: ClientAtrix) => {
        console.log({client})
        const clientOk = await clientMigration(client)
        
        // console.log({ clientOk })
        if (!clientOk) {
            // It allow to migrate
            // console.log(`${client.firstName} sem erro e com contrato`)
            // await createClient(client.id)

        } else {
            // It disallow to migrate
            const csv = parser.parse(clients);
            const csvClients = `"${client.id}","${client.address1}","${client.address2}","${client.city}","${client.country}","${client.document}","${client.email}","${client.postcode}","${client.state}","${client.updated_at}","${client.firstName}","${client.lastName}";\n`
            fs.appendFile('./black-list-2022-12-06.csv', csvClients, (err) => {
                if (err) console.log(err);
                else {
                    console.log("File written successfully\n");
                    console.log("The written has the following contents:");
                   
                }
            })
            // console.log(`${client.firstName} com erro`)
            // console.log({ client })
        }

    })

})()