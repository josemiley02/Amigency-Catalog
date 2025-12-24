import type { CatalogListProps } from "./interfaces";
import { Jewel } from "./jewel";



export const CatalogList = ({productList}: CatalogListProps) => {
    return(
        <div>
            {productList.map((item)=>{
                return(
                    <Jewel
                    key={item.name + item.id}
                    id={item.id}
                    name={item.name}
                    urlImg={item.urlImg}
                    price={item.price}
                    ></Jewel>
                )
            })}
        </div>
    )
}