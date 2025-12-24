import type { Product } from "./interfaces"

export const Jewel = ({id, name, urlImg, price}: Product) => {
    return(
        <div className="bg-dark-purple relative pb-4 text-center" id={name + id}>
            <figure className="bg-grayish-blue mb-2">
                <img width={720} height={960} src={urlImg} alt={name}></img>
            </figure>
            <h2 className="text-intense-rose capitalize font-bold">{name}</h2>
            <h3 className="absolute bg-soft-blue-green rounded-xl px-4 border-2 border-dark-purple bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 whitespace-nowrap font-bold text-dark-purple">{price}</h3>
        </div>
    )
}