import React, { useEffect, useState } from "react";
import TableWrapper from "./components/TableWrapper";
import { useDogs } from "./hooks/useDogs";
import { tableColumns } from "./helpers/constants";
import "./mainPage.css";
import { Box, Typography } from "@mui/material";

const MainPage = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const { data, isLoading, refetch } = useDogs(rowsPerPage, page);

  useEffect(() => {
    refetch();
  }, [rowsPerPage, page, refetch]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Typography variant="h3" className="header-style">
        Dog Breeds
      </Typography>

      <TableWrapper
        tableColumns={tableColumns}
        data={data}
        isLoading={isLoading}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
      />
    </Box>
  );
};

export default MainPage;
