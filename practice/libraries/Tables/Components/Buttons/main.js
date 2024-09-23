import { IconButton } from "@mui/material";
import { Edit, Delete, Info } from "@mui/icons-material";

const MainButton = (props) => {
  const { row, onClick, type } = props;
  const types = ["edit", "delete", "show"];

  if (!types.includes(type)) return null;

  const renderIcon = () => {
    let icon = null;

    switch (type) {
      case "edit":
        icon = <Edit />;
        break;
      case "delete":
        icon = <Delete />;
        break;
      default:
        icon = <Info />;
        break;
    }

    return icon;
  };

  return (
    <IconButton edge="end" onClick={() => onClick(type, row.id)}>
      {renderIcon()}
    </IconButton>
  );
};

export default MainButton;
