import { useCatalog } from "../../hooks/useCatalog"
import { Button } from "./button"
import { CatalogList } from "./catalogList";

export const Main = () => {
    const {query, onChangeInput, category, list, onClickCategory} = useCatalog();
    return(
        <section className="py-4 margin-responsive px-4">
            <h1 className="text-2xl font-bold text-center mb-4 text-accent-dark">
                Nuestros Productos 💙❤️
            </h1>
            <div className="flex flex-col-reverse items-center gap-4 mb-4">
                <nav className="relative flex justify-between gap-2 w-full">
                    <Button handleClick={()=>onClickCategory(1)} classActive={category==1 ? 'active' : ''}>Aretes</Button>
                    <Button handleClick={()=>onClickCategory(2)} classActive={category==2 ? 'active' : ''}>Collares</Button>
                    <Button handleClick={()=>onClickCategory(3)} classActive={category==3 ? 'active' : ''}>Combos</Button>
                    <span className="absolute w-full h-3 bg-blue-cyan -z-1 translate-y-1/2"></span>
                </nav>

                <label className="px-2 py-2 w-full max-w-75 flex bg-pastel-blue rounded-2xl items-center border-2 border-pastel-blue">
                    <input 
                        className="w-full outline-0 bg-transparent text-soft-white placeholder-soft-white placeholder-opacity-60" 
                        type="search" 
                        placeholder="Amapolas"
                        name="search"
                        value={query}
                        onChange={onChangeInput}/>
                    <img className="w-auto h-4" src="images/icons/buscar.webp"></img>
                </label>
            </div>

            <CatalogList productList={list}>

            </CatalogList>
        </section>
    )
}