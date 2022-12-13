
import { clientMigration, contractMigration } from "@/migration/"
import { PrismaClient } from "@internal/.prisma/Atrix/client"
import { getRangeOfClient } from "@/prisma/Atrix/ClientRepository"
import { Client as ClientAtrix } from "@/prisma/Atrix/ClientRepository"
import "dotenv/config";
import { ticketReferenceMigration } from "@/migration/ticketReferenceMigration"
import { createClient } from "@/endpoints/Axios/CreateClient"
import fs from 'fs'
import { Parser } from 'json2csv'
import { getLastId, setLastId } from "./prisma/Corpintegrator/lastidRepository";
import node_schedule from "node-schedule"


const runSchedule = async () => {
    const lastid = await getLastId()
    const range = 60
    // const clients = await getRangeOfClient(lastid, range)
    const clients = await getRangeOfClient(69, 2)
    console.log(`lastid: ${lastid}`)
    
    const fields = ['id', 'address1', 'address2', 'city', 'country', 'document', 'email', 'postcode', 'state', 'updated_at', 'firstName', 'lastName', "companyname"]

    const parser = new Parser({ fields })


    await clients.forEach(async (client: ClientAtrix) => {
        // console.log({client})
        const clientOk = await clientMigration(client)
        
        // console.log({ clientOk })
        if (!clientOk) {
            // It disallow to migrate
            const csv = parser.parse(clients);
            const csvClients = `"${client.id}","${client.address1}","${client.address2}","${client.city}","${client.country}","${client.document}","${client.email}","${client.postcode}","${client.state}","${client.updated_at}","${client.firstName}","${client.lastName}", "${client.companyname}";\n`
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
        // await setLastId(client.id)
    })
    // await setLastId(lastid + 1)
}

(async () => {


    // node_schedule.scheduleJob("*/40 * * * * *", async () => {
        const date = new Date().toISOString()
        console.log(`Rotina executada às ${date}`)
        await runSchedule()
        // await ticketReferenceMigration()

    // }
    // )
    
})()


