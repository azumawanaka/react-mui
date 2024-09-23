import {
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  ListItemSecondaryAction,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const TodoItem = (props) => {
  const { todo, onToggle, onEdit, onDelete } = props;

  return (
    <ListItem>
      <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />
      <ListItemText primary={todo.text} />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={() => onEdit(todo.id)}>
          <Edit />
        </IconButton>
        <IconButton edge="end" onClick={() => onDelete(todo.id)}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoItem;
