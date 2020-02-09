export type Beer = {
    materialNumber: string,
    name: string,
    brewery: string,
    type: string,
    price: number,
    untappdId: string,
    labelUrl: string,
    style: string,
    volume: number,
    abv: number,
    ibu: number,
    ratings: number,
    averageScore: number,
    totalCheckins: number,
    monthlyCheckins: number,
    totalUserCount: number,
    description: string,
    storeStocks: StoreStock[],
    onNewProductList: boolean,
}

export type StoreStock = {
    storeId: string,
    storeName: string,
    stockLevel: number,
}