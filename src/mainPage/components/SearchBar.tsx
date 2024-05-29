import React from "react";
import { TextField, MenuItem, InputAdornment, Box } from "@mui/material";
import { Search } from "@mui/icons-material";
import { SearchBarProps, SearchOption } from "../helpers/interface";

const SearchBar = ({
  searchType,
  setSearchType,
  searchTerm,
  setSearchTerm,
  searchOptions,
}: SearchBarProps) => {
  // Handler for search type change
  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchType(e.target.value);
  };

  // Handler for search term change
  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Box display={"flex"} alignSelf={"center"}>
      <TextField
        select
        label="Search By"
        value={searchType}
        sx={{
          "& .MuiInputBase-root": {
            borderTopRightRadius: "initial",
            borderBottomRightRadius: "initial",
          },
        }}
        onChange={handleSearchTypeChange}
        size="small"
        InputLabelProps={{
          style: { color: "#000000" },
        }}
      >
        {searchOptions.map((option: SearchOption) => (
          <MenuItem key={option?.value} value={option?.value}>
            {option?.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Search..."
        variant="outlined"
        size="small"
        placeholder={`Search by ${
          searchType === "dog_id" ? "Dog Id" : "Dog Name"
        }`}
        value={searchTerm}
        onChange={handleSearchTermChange}
        InputLabelProps={{
          style: { color: "#000000" },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiInputBase-root": {
            borderTopLeftRadius: "initial",
            borderBottomLeftRadius: "initial",
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
