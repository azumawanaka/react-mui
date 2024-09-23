import React, { useState, useEffect } from "react";
import { alpha } from "@mui/material/styles";
import {
  List,
  Table,
  Paper,
  Checkbox,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  TableContainer,
  IconButton,
  ListItemSecondaryAction,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

import TodoItem from "./TodoItem";

const TodoList = (props) => {
  const { todos, onToggle, onEdit, onDelete } = props;

  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell width={50}>ID</TableCell>
          <TableCell>Task</TableCell>
          <TableCell width={100}></TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {todos.map((row) => (
          <TableRow
            key={row.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.id}
            </TableCell>
            <TableCell component="th" scope="row">
              {row.text}
            </TableCell>
            <TableCell component="th" scope="row">
              <IconButton edge="end" onClick={() => onEdit(row.id)}>
                <Edit />
              </IconButton>
              <IconButton
                edge="end"
                onClick={() => onDelete(row.id)}
                sx={{ color: "red" }}
              >
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    // <List>
    //   {todos.map(todo => (
    //     <TodoItem
    //       key={todo.id}
    //       todo={todo}
    //       onToggle={onToggle}
    //       onEdit={onEdit}
    //       onDelete={onDelete}
    //     />
    //   ))}
    // </List>
  );
};

export default TodoList;
