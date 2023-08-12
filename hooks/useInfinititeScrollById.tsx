'use client'
import { useEffect, useState } from "react";

export default function useInfiniteScroll(serviceFn: (id:number, page: number) => Promise<any>, content: any, fixedSection: any) {

    const [itemsList, setItemsList] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [last_page, setLast_page] = useState<number>(2)
    const [idState, setIdState] = useState<number|null>(null)

    const fetchItems = (id:number) => {
        setIdState(id)
        setLoading(true)
        if (page <= last_page) {
            serviceFn(id, page)
                .then((data: any) => {
                    data && setItemsList(prevItems => {
                        let uniqueItems: any[] = []
                        if (data.items) {
                            uniqueItems = data.items.data.filter((newItem: any) => !prevItems.some(existingItem => existingItem.id === newItem.id))
                        }
                        return [...prevItems, ...uniqueItems]
                    })
                    data && setPage(prevPage => prevPage + 1)
                    data && data.items.last_page && setLast_page(data.items.last_page)
                }).finally(() => {
                    setLoading(false)
                })
        }
        if (page >= last_page) { setLoading(false) }
    }

    const handleScroll = () => {
        if (content && fixedSection) {
            let dif = Math.floor(content?.clientHeight + content?.scrollTop) - Math.floor(fixedSection?.clientHeight)
            if ((Math.abs(dif) > 4) || loading) {
                return;
            }
        }
        idState && fetchItems(idState);
    }

    useEffect(() => {
        content?.addEventListener('scroll', handleScroll);
        return () => content?.removeEventListener('scroll', handleScroll);
    }, [loading, page]);

    return {
        loading,
        itemsList,
        page,
        last_page,
        fetchItems
    }
}

