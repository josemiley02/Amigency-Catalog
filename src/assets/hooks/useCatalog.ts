import { useState } from "react"
import { catalogDb } from "../data/catalogdb"
export const useCatalog = () => {
    const [category, setCategory] = useState(1);
    const [list, setList] = useState(catalogDb.aretes);

    const [query, setQuery] = useState("");
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    const onClickCategory = (newCategory: number) => {
        setCategory(newCategory);

        if (newCategory === 1) setList(catalogDb.aretes);
        else if (newCategory === 2) setList(catalogDb.collares);
        else setList(catalogDb.combos)
    }
    return {
        category,
        list,
        onClickCategory,
        query,
        onChangeInput
    }
}