import React, { useEffect } from "react";

import BasicTable from "@/libraries/Tables/Basic";
import ActionButtons from "@/libraries/Tables/Components/Buttons";
import SelectStatus from "@/libraries/Tables/Components/Select";

const TodoList = (props) => {
	const { todos, handleActions, handleStatus } = props;

	const columns = [
		{
			key: "id",
			label: "ID",
			size: 50,
		},
		{
			key: "text",
			label: "Task",
		},
		{
			key: "status",
			label: "Status",
			size: 100,
		},
		{
			key: "options",
			label: "Options",
			size: 100,
		},
	];

	const optionTypes = ["edit", "delete"];
	const MyOptions = ({ row }) =>
		ActionButtons({ row, handleActions, optionTypes });
	const Status = ({ row }) => SelectStatus({ row, handleStatus });

	return (
		<BasicTable
			data={todos}
			columns={columns}
			renderOptions={(row) => <MyOptions row={row} />}
			renderStatus={(row) => <Status row={row} />}
		/>
	);
};

export default TodoList;
