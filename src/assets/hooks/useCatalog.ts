import { useState, useMemo } from "react"
import { catalogDb } from "../data/catalogdb"
import type { Product } from "../components/main/interfaces";
export const useCatalog = () => {
    const [category, setCategory] = useState(1);
    const [query, setQuery] = useState("");
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setCategory(0);
    }

    const list = useMemo(() => {
        const useSearch = query.trim().toLowerCase()
        if (useSearch) {
            const filtered: Product[] = [];
            for (const key in catalogDb) {
                const matches = catalogDb[key as keyof typeof catalogDb].filter(item => item.name.toLowerCase().includes(useSearch))
                if (matches.length > 0) {
                    matches.forEach(match => filtered.push(match))
                }
            }
            return filtered;
        } else {
            if (category === 1) return catalogDb.aretes;
            else if (category === 2) return catalogDb.collares;
            else return catalogDb.combos;
        }
    }, [query, category])

    const onClickCategory = (newCategory: number) => {
        setCategory(newCategory);
    }
    return {
        category,
        list,
        onClickCategory,
        query,
        onChangeInput
    }
}