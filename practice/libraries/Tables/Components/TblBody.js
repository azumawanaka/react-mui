import { TableBody, TableRow, TableCell } from "@mui/material";

const TblBody = (props) => {
	const { data, columns, renderOptions, renderStatus } = props;

	return (
		<TableBody>
			{data &&
				data.map((row, index) => (
					<TableRow key={`key:${index}`}>
						{columns.map((col) => (
							<TableCell
								key={`key:${col.key}`}
								component="th"
								scope="row"
							>
								{col.key === "status" &&
									typeof renderStatus === "function" &&
									renderStatus(row)}

								{col.key === "options" &&
									typeof renderOptions === "function" &&
									renderOptions(row)}

								{col.key !== "options" &&
									col.key !== "status" &&
									row[col.key]}
							</TableCell>
						))}
					</TableRow>
				))}
		</TableBody>
	);
};

export default TblBody;
