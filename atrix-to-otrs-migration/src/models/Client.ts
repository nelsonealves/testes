export interface ClientModel {
	id: number
	customer_id: string
	name?: string 
	CNPJ?: string
	street: string
	district: string
	UF: string
	zip: string
	country: string
	city: string
	comments: string
	updated_at: Date
}

