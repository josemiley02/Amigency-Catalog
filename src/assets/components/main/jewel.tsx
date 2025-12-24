import type { Product } from "./interfaces"

export const Jewel = ({id, name, urlImg, price}: Product) => {
    return(
        <div className="bg-soft-white relative pb-4 text-center rounded-lg" id={name + id}>
            <figure className="bg-soft-white mb-2 border-2 border-pastel-pink rounded-lg overflow-hidden">
                <img width={720} height={960} src={urlImg} alt={name}></img>
            </figure>
            <h2 className="text-accent-dark capitalize font-bold px-2 line-clamp-2 h-14 flex items-center justify-center">{name}</h2>
            <h3 className="absolute bg-pastel-peach rounded-xl px-4 border-2 border-pastel-pink bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 whitespace-nowrap font-bold text-accent-dark">{price}</h3>
        </div>
    )
}