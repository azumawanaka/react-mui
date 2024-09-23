import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectStatus = (props) => {
	const { row, handleStatus } = props;

	return (
		<FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
			<Select
				labelId="demo-simple-select-standard-label"
				id="demo-simple-select-standard"
				value={row.status}
				onChange={(event) => handleStatus(row, event)}
				label="Age"
			>
				<MenuItem value="0">Todo</MenuItem>
				<MenuItem value="1">Ongoing</MenuItem>
				<MenuItem value="2">Done</MenuItem>
			</Select>
		</FormControl>
	);
};

export default SelectStatus;
