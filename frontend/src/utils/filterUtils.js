/**
 * Utility functions for filtering, sorting, and searching data.
 */

export const filterData = (data, filters) => {
  return data.filter((item) => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = Object.values(item).some(
        (val) => val && String(val).toLowerCase().includes(searchLower)
      );
      if (!matchesSearch) return false;
    }

    // Status filter
    if (filters.status && filters.status !== "All") {
      if (item.status !== filters.status) return false;
    }

    // Lantai filter
    if (filters.lantai && filters.lantai !== "All") {
      if (item.lantai !== filters.lantai) return false;
    }

    // Bulan filter (for Tagihan)
    if (filters.bulan && filters.bulan !== "All") {
      if (item.bulan !== filters.bulan) return false;
    }
    
    // Tahun filter (for Riwayat)
    if (filters.tahun && filters.tahun !== "All") {
      if (item.tahun !== filters.tahun) return false;
    }

    return true;
  });
};

export const sortData = (data, sortConfig) => {
  if (!sortConfig || !sortConfig.key) return data;

  return [...data].sort((a, b) => {
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    // Handle nulls
    if (aValue === null) return sortConfig.direction === "asc" ? 1 : -1;
    if (bValue === null) return sortConfig.direction === "asc" ? -1 : 1;

    // Numeric sort if applicable
    if (!isNaN(Number(aValue)) && !isNaN(Number(bValue))) {
      aValue = Number(aValue);
      bValue = Number(bValue);
    } else {
      aValue = String(aValue).toLowerCase();
      bValue = String(bValue).toLowerCase();
    }

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });
};
