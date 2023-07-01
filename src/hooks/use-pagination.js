import { useEffect, useState } from "react";

function getItemsForPage(items, page, itemsPerPage) {
    const startOffset = 0 + page * itemsPerPage;
    const endOffset = 0 + (page + 1) * itemsPerPage;
    return (items||[]).slice(startOffset, endOffset)
}

export default function usePagination(items, pageSize, currentPag = 0) {
    const [currentPage, setCurrentPage] = useState(currentPag);
    const [itemsPerPage, setItemsPerPage] = useState(pageSize);
    const currentPageItems =  getItemsForPage(items, currentPage, itemsPerPage);
    useEffect(() => {if((items||[]).length/itemsPerPage<=currentPage)setCurrentPage(0)}, [itemsPerPage,items ])
    return [itemsPerPage, setItemsPerPage, currentPage, setCurrentPage, currentPageItems]

}