import { ContractOtrs } from "@/prisma/Atrix/ContractRepository"

export const clientValidation = (contract: ContractOtrs): Boolean => {
    
    const validation = !(contract.email === '') || !(contract.login === '') || !(contract.customer_id === '') || !(contract.first_name === '') 

    return validation
}