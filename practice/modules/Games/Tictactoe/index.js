import React, { useState, useEffect } from "react";
import {
	Button,
	Grid,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";

const Tictactoe = () => {
	const [lines] = useState([
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]);

	const [board, setBoard] = useState(Array(9).fill(null));
	const [isPlayerTurn, setIsPlayerTurn] = useState(false);
	const [pScores, setPScores] = useState(0);
	const [cScores, setCScores] = useState(0);
	const [result, setResult] = useState("");

	useEffect(() => {
		const savedPScores = localStorage.getItem("pScores");
		const savedCScores = localStorage.getItem("cScores");

		if (savedPScores) setPScores(parseInt(savedPScores));
		if (savedCScores) setCScores(parseInt(savedCScores));
	}, []);

	useEffect(() => {
		const winner = calculateWinner(board);
		let res = "";

		if (winner === "blue") {
			let savedPScores = parseInt(localStorage.getItem("pScores")) || 0;
			savedPScores++;
			localStorage.setItem("cScores", savedPScores);
			setCScores(savedPScores);
			res = "Player wins!";
		} else if (winner === "red") {
			let savedCScores = parseInt(localStorage.getItem("cScores")) || 0;
			savedCScores++;
			localStorage.setItem("cScores", savedCScores);
			setCScores(savedCScores);
			res = "Computer wins!";
		} else if (getAvailableTiles(board).length === 0) {
			res = "It's a draw!";
		}

		setResult(res);
	}, [board]);

	useEffect(() => {
		if (!isPlayerTurn) {
			computerTurn(board);
		}
	}, [isPlayerTurn]);

	const calculateWinner = (squares) => {
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (
				squares[a] &&
				squares[a] === squares[b] &&
				squares[a] === squares[c]
			) {
				return squares[a];
			}
		}
		return null;
	};

	const getAvailableTiles = (board) => {
		return board.reduce((acc, value, index) => {
			if (value === null) acc.push(index);
			return acc;
		}, []);
	};

	const getRandomElement = (arr) => {
		const randomIndex = Math.floor(Math.random() * arr.length);
		return arr[randomIndex];
	};

	const minimax = (newBoard, isMaximizing) => {
		const winner = calculateWinner(newBoard);
		if (winner === "red") return { score: 1 };
		if (winner === "blue") return { score: -1 };
		if (getAvailableTiles(newBoard).length === 0) return { score: 0 };

		if (isMaximizing) {
			let bestMove = { score: -Infinity };
			getAvailableTiles(newBoard).forEach((index) => {
				const tempBoard = [...newBoard];
				tempBoard[index] = "red";
				const score = minimax(tempBoard, false).score;
				if (score > bestMove.score) {
					bestMove = { score, index };
				}
			});
			return bestMove;
		} else {
			let bestMove = { score: Infinity };
			getAvailableTiles(newBoard).forEach((index) => {
				const tempBoard = [...newBoard];
				tempBoard[index] = "blue";
				const score = minimax(tempBoard, true).score;
				if (score < bestMove.score) {
					bestMove = { score, index };
				}
			});
			return bestMove;
		}
	};

	const computerTurn = (currentBoard) => {
		const availableTiles = getAvailableTiles(currentBoard);
		if (availableTiles.length === 0) return;

		const isFirstMove = availableTiles.length === 9;
		let newBoard = [...currentBoard];

		if (isFirstMove) {
			const randomTile = getRandomElement(availableTiles);
			newBoard[randomTile] = "red";
		} else {
			const bestMove = minimax(currentBoard, true);
			if (bestMove.index !== undefined) {
				newBoard[bestMove.index] = "red";
			}
		}

		setBoard(newBoard);
		if (!calculateWinner(newBoard)) {
			setIsPlayerTurn(true);
		}
	};

	const handleClick = (index) => {
		if (board[index] || calculateWinner(board) || !isPlayerTurn) return;
		const newBoard = [...board];
		newBoard[index] = "blue";
		setBoard(newBoard);
		setIsPlayerTurn(false);
	};

	const restart = () => {
		const emptyBoard = Array(9).fill(null);
		setBoard(emptyBoard);
		setIsPlayerTurn(false);
		setResult("");

		computerTurn(emptyBoard);
	};

	return (
		<div style={{ textAlign: "center", marginTop: "20px" }}>
			<Typography variant="h6">Tic-tac-toe</Typography>
			<Typography variant="h6">{result}</Typography>
			<Grid display="block" sx={{ width: 300, margin: "auto" }}>
				{board.map((value, index) => (
					<Button
						key={index}
						variant="outlined"
						style={{
							height: "100px",
							width: "100px",
							fontSize: "12px",
							color: "white",
							backgroundColor:
								value === "blue"
									? "blue"
									: value === "red"
									? "red"
									: "white",
						}}
						onClick={() => handleClick(index)}
					>
						{value === "blue" && "Player"}
						{value === "red" && "Computer"}
					</Button>
				))}
			</Grid>

			{result ? (
				<Button
					variant="contained"
					color="info"
					onClick={() => restart()}
					style={{ marginTop: "20px", marginRight: 5 }}
				>
					Restart
				</Button>
			) : null}

			<ListItem component="span" href="#simple-list">
				<ListItemText primary={`You: ${pScores}`} />
				<ListItemText primary={`Computer: ${cScores}`} />
			</ListItem>
		</div>
	);
};

export default Tictactoe;
