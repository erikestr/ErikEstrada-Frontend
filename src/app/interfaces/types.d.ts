export interface ISalesModel {
    id: number,
    date: Date,
    name: string,
    sales: number,
    expenses: number,
    utility: number,
}

export interface SearchTerms {
    ids: string,
    date: string
}