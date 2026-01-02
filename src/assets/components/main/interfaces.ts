export interface Product{
    id: string;
    name: string;
    price: string;
    urlImg: string;
    keywords: string;
}

export interface CatalogListProps{
    productList: Product[]
}