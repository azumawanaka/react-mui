import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import { Edit, Close } from "@mui/icons-material";

const ActionButtons = (props) => {
	const { row, handleActions, optionTypes } = props;

	const renderIcon = (opt) => {
		let icon = null;

		switch (opt) {
			case "edit":
				icon = <Edit />;
				break;
			case "delete":
				icon = <Close />;
				break;
			default:
				break;
		}

		return icon;
	};

	return (
		<Box>
			{optionTypes.map((opt, index) => (
				<IconButton
					key={`key:${index}`}
					edge="end"
					onClick={() => handleActions(opt, row.id)}
					color={opt === "edit" ? "primary" : "danger"}
				>
					{renderIcon(opt)}
				</IconButton>
			))}
		</Box>
	);
};

export default ActionButtons;
