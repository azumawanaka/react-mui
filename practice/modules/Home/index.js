import React, { useState, useEffect } from "react";
import {
	Container,
	TextField,
	Button,
	Card,
	Typography,
	Snackbar,
	Alert,
	Divider,
} from "@mui/material";

import TodoList from "@/components/TodoList";
import useTodoStyles from "@/styles/TodoStyles";
import ConfirmDialog from "@/libraries/Dialogs/Confirm";

let nextId = 0;

const Home = () => {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");
	const [editing, setEditing] = useState(null);
	const [editText, setEditText] = useState("");
	const [responseOpen, setResponseOpen] = useState(false);
	const [responseMsg, setResponseMsg] = useState("");
	const [severity, setSeverity] = useState("error");
	const [item, setItem] = useState("");
	const [confirmDialog, setConfirmDialog] = useState(false);
	const [status, setStatus] = useState(0);
	const [error, setError] = useState(false);

	const todoClasses = useTodoStyles();

	useEffect(() => {
		localStorage.setItem("items", JSON.stringify(todos));
	}, [todos]);

	const handleClose = () => {
		setResponseOpen(false);
		setSeverity("");
		setResponseMsg("");
	};

	const addTodo = () => {
		if (!newTodo) {
			setResponseOpen(true);
			setError(true);
			setSeverity("error");
			setResponseMsg(`Please add an item first!`);
		}

		if (newTodo.trim()) {
			const normalizedNewTodo = newTodo.trim().toLowerCase();
			if (normalizedNewTodo.length < 6) {
				setResponseOpen(true);
				setError(true);
				setSeverity("error");
				setResponseMsg(`Item length should not be less than 6.`);

				return;
			}

			const isDuplicate = todos.some(
				(todo) => todo.text.toLowerCase() === normalizedNewTodo
			);

			if (!isDuplicate) {
				nextId++;
				setTodos([
					...todos,
					{
						id: nextId,
						text: newTodo,
						status: 0,
					},
				]);

				setNewTodo("");
				setResponseOpen(true);
				setError(false);
				setSeverity("success");
				setResponseMsg(
					`Item <strong>${newTodo}</strong> successfully added!`
				);
			} else {
				setResponseOpen(true);
				setError(true);
				setSeverity("error");
				setResponseMsg(
					`Item <strong>${newTodo}</strong> already exists!`
				);
			}
		}
	};

	const toggleTodo = (id) => {
		setTodos(todos.map((todo) => (todo.id === id ? { ...todo } : todo)));
	};

	const handleActions = (type, id) => {
		if (type === "edit") {
			const todo = todos.find((todo) => todo.id === id);
			setEditing(id);
			setEditText(todo.text);
		}

		if (type === "delete") {
			setItem(id);
			setConfirmDialog(true);
		}
	};

	const saveEdit = () => {
		const currentItem = editText.trim().toLowerCase();
		const isDuplicate = todos.some(
			(todo) =>
				todo.id !== editing && todo.text.toLowerCase() === currentItem
		);

		if (!isDuplicate) {
			if (!currentItem) {
				setResponseOpen(true);
				setError(true);
				setSeverity("error");
				setResponseMsg(`Please add an item first!`);
				return;
			}

			setTodos(
				todos.map((todo) =>
					todo.id === editing ? { ...todo, text: editText } : todo
				)
			);
			setEditing(null);
			setError(false);
			setEditText("");
		} else {
			setResponseOpen(true);
			setError(true);
			setSeverity("error");
			setResponseMsg(
				`Item <strong>${currentItem}</strong> already exists!`
			);
		}
	};

	const cancelEdit = () => {
		setResponseOpen(false);
		setEditing(null);
		setEditText("");
	};

	const handleConfirmation = (item, isDelete = false) => {
		setConfirmDialog(false);
		setEditing(null);
		setEditText("");

		if (isDelete) {
			setTodos(todos.filter((todo) => todo.id !== item));
			setError(false);
			setResponseOpen(true);
			setSeverity("success");
			setResponseMsg(`Item was successfully deleted!`);
		}
	};

	const handleStatus = (row, event) => {
		const status = event.target.value;

		setStatus(status);
		setTodos(
			todos.map((todo) =>
				todo.id === row.id ? { ...todo, status: status } : todo
			)
		);

		return status;
	};

	return (
		<>
			<Container sx={{ marginTop: 6 }}>
				<Card sx={{ padding: 3 }}>
					<Typography variant="h4">ToDo List</Typography>

					<Container className={todoClasses.todoContainer}>
						<TextField
							variant="filled"
							color={error ? "error" : "success"}
							focused={error}
							label={
								editing ? `Item:${editText}` : "Add item here"
							}
							value={editing ? editText : newTodo}
							onChange={(e) =>
								editing
									? setEditText(e.target.value)
									: setNewTodo(e.target.value)
							}
							sx={{ flexGrow: 1 }}
						/>

						{editing && (
							<Button
								variant="contained"
								color="inherit"
								onClick={cancelEdit}
								sx={{ marginLeft: 1 }}
							>
								Cancel
							</Button>
						)}
						<Button
							variant="contained"
							color="primary"
							onClick={editing ? saveEdit : addTodo}
							sx={{ marginLeft: 1 }}
						>
							{editing ? "Save" : "Add Todo"}
						</Button>
					</Container>

					<Snackbar
						open={responseOpen}
						autoHideDuration={3000}
						onClose={handleClose}
						anchorOrigin={{ vertical: "top", horizontal: "center" }}
					>
						<Alert onClose={handleClose} severity={severity}>
							<span
								dangerouslySetInnerHTML={{
									__html: responseMsg,
								}}
							/>
						</Alert>
					</Snackbar>

					<Divider sx={{ mt: 2 }} />

					<TodoList
						todos={todos}
						onToggle={toggleTodo}
						handleActions={handleActions}
						handleStatus={handleStatus}
					/>
				</Card>
			</Container>

			<ConfirmDialog
				item={item}
				open={confirmDialog}
				handleConfirmation={handleConfirmation}
			/>
		</>
	);
};

export default Home;
