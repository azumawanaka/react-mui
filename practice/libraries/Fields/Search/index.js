import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const SearchField = () => {
	return (
		<Paper
			component="form"
			sx={{
				p: "2px 4px",
				display: "flex",
				alignItems: "center",
				width: 400,
			}}
		>
			<InputBase
				sx={{ ml: 1, flex: 1 }}
				placeholder="Search Item"
				inputProps={{ "aria-label": "searc item" }}
			/>
			<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
			<IconButton type="button" sx={{ p: "10px" }} aria-label="search">
				<SearchIcon />
			</IconButton>
		</Paper>
	);
};

export default SearchField;
