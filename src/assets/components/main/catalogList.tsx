import type { CatalogListProps } from "./interfaces";
import { Jewel } from "./jewel";



export const CatalogList = ({productList}: CatalogListProps) => {
    return(
        <div className="grid grid-cols-2 justify-center gap-x-6 gap-y-8
        md:grid-cols-3">
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