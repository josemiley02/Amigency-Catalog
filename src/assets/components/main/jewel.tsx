import type { Product } from "./interfaces"

export const Jewel = ({id, name, urlImg, price}: Product) => {
    return(
        <div id={name + id}>
            <figure>
                <img src={urlImg} alt={name}></img>
            </figure>
            <h2>{name}</h2>
            <h3>{price}</h3>
        </div>
    )
}