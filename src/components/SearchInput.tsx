import { Paper, InputBase, IconButton } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <Paper component="form" className="flex">
      <InputBase
        className="mx-2"
        placeholder="Suche..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
