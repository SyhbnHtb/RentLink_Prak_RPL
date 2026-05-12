import { useState, useMemo } from "react";
import { filterData, sortData } from "../utils/filterUtils";

export function useTableFilter(initialData, initialFilters = {}) {
  const [data, setData] = useState(initialData);
  const [filters, setFilters] = useState({
    search: "",
    status: "All",
    lantai: "All",
    bulan: "All",
    tahun: "All",
    ...initialFilters,
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedData = useMemo(() => {
    const filtered = filterData(data, filters);
    return sortData(filtered, sortConfig);
  }, [data, filters, sortConfig]);

  return {
    data: filteredAndSortedData,
    filters,
    handleFilterChange,
    sortConfig,
    handleSort,
    setData, // To update the base data if needed (e.g. adding new items)
  };
}
