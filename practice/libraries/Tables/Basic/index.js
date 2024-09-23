import { Table } from "@mui/material";

import TblHead from "../Components/TblHead";
import TblBody from "../Components/TblBody";

const BasicTable = (props) => {
	const { data, columns, renderOptions, renderStatus } = props;

	return (
		<Table>
			<TblHead columns={columns} />
			<TblBody
				data={data}
				columns={columns}
				renderOptions={renderOptions}
				renderStatus={renderStatus}
			/>
		</Table>
	);
};

export default BasicTable;
