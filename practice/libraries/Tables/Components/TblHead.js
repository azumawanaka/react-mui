import { TableRow, TableCell, TableHead } from "@mui/material";

const TblHead = (props) => {
	const { columns } = props;

	return (
		<TableHead>
			<TableRow>
				{columns.map((col) => (
					<TableCell key={col.label} width={col?.size}>
						{col.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};

export default TblHead;
