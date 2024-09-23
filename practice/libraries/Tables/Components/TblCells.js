import { TableCell } from "@mui/material";

const TblHead = (props) => {
	const { col, renderOptions, renderStatus } = props;

	return (
		<TableCell key={`key:${col.key}`} component="th" scope="row">
			{col.key === "options" &&
				typeof renderOptions === "function" &&
				renderOptions(row)}
			{col.key === "status" &&
				typeof renderStatus === "function" &&
				renderStatus(row)}
			{col.key !== "options" && row[col.key]}
		</TableCell>
	);
};

export default TblHead;
