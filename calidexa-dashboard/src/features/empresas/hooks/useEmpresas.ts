import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { empresasService } from '../../../api/empresas';

export const useEmpresas = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const query = useQuery({
    queryKey: ['empresas', page, search],
    queryFn: () =>
      empresasService.getAll({
        per_page: 15,
        ...(search && { buscar: search }),
      }),
  });

  return {
    ...query,
    page,
    setPage,
    search,
    setSearch,
  };
};