import { useEffect, useState } from 'react'

export function usePagination(fetchPage: (page: number) => Promise<any>) {
  const [data, setData] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(0) // react-paginate считает с 0
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await fetchPage(currentPage + 1) // сервер считает с 1
        setData(res.data)
        setTotalPages(res.totalPages)
      } catch (e) {
        console.error('Ошибка при загрузке:', e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [currentPage])

  return {
    data,
    currentPage,
    setCurrentPage,
    totalPages,
    loading,
  }
}
