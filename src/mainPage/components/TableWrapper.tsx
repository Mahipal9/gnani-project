import { useState } from "react";

//material imports
import {
  Avatar,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  TableSortLabel,
  Box,
} from "@mui/material";
import { Dog, TableColumn, TableWrapperProps } from "../helpers/interface";

//components
import NoDataComponent from "./NoDataFound";
import SearchBar from "./SearchBar";
import { searchOptions } from "../helpers/constants";
import "./tableWrapper.css";

const TableWrapper = ({
  tableColumns,
  data,
  isLoading,
  handleChangePage,
  handleChangeRowsPerPage,
  page,
  rowsPerPage,
}: TableWrapperProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("dog_id");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("");

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortData = (array: Dog[], comparator: (a: any, b: any) => number) => {
    const finalSortedArray = array?.map(
      (el, index) => [el, index] as [any, number]
    );
    finalSortedArray?.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return finalSortedArray?.map((el) => el[0]);
  };

  const getComparator = (order: "asc" | "desc", orderBy: string) => {
    return order === "desc"
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a: any, b: any, orderBy: string) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getTableData = (item: any, column: TableColumn) => {
    if (column?.type === "avatar") {
      return (
        <Tooltip title="Click to view">
          <a href={item?.[column?.header]} target="blank">
            <Avatar
              alt="Dog Image"
              src={item?.[column?.header]}
              className="avatar-style"
             
            />
          </a>
        </Tooltip>
      );
    }
    return item?.[column?.header] ?? "-";
  };

  const filteredData = (data || [])?.filter((item: any) => {
    return searchType === "dog_id"
      ? item.id.toLowerCase().includes(searchTerm.toLowerCase().trim())
      : item.name.toLowerCase().includes(searchTerm.toLowerCase().trim());
  });

  const sortedData = sortData(
    filteredData || [],
    getComparator(order, orderBy)
  );

  return (
    <Box margin={"18px 12px"}>
      <SearchBar
        searchType={searchType}
        setSearchType={setSearchType}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchOptions={searchOptions}
      />
      <TableContainer className="table-container" component={Paper}>
        <Table className="table-style">
          <TableHead>
            <TableRow>
              {tableColumns?.map((column: any) => (
                <TableCell key={column?.header} className="table-head-cell">
                  <TableSortLabel
                    active={orderBy === column?.header}
                    direction={orderBy === column?.header ? order : "asc"}
                    onClick={() => handleRequestSort(column?.header)}
                  >
                    {column?.header?.replace("_", " ")}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody hidden={!filteredData?.length}>
            {isLoading
              ? Array.from(new Array(rowsPerPage)).map((_, rowIndex) => (
                  <TableRow key={rowIndex} hover>
                    {tableColumns?.map((column: TableColumn) => (
                      <TableCell key={column.header}>
                        <Skeleton animation="wave" variant="text" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : sortedData?.map((item: Dog) => (
                  <TableRow key={item?.id} hover>
                    {tableColumns?.map((column: TableColumn) => (
                      <TableCell sx={{ padding: "6px" }} key={column?.header}>
                        {getTableData(item, column)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      {!filteredData?.length && !isLoading && <NoDataComponent />}

      <TablePagination
        className="table-pagination"
        hidden={!filteredData?.length}
        component="div"
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10]}
      />
    </Box>
  );
};

export default TableWrapper;
