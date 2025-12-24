export interface Product{
    id: string;
    name: string;
    price: string;
    urlImg: string;
}

export interface CatalogListProps{
    productList: Product[]
}