import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, Box } from "@mui/material";

const Tictactoe = () => {
	const [lines, setLines] = useState([
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]);
	const [tiles, setTiles] = useState([]);
	const [selectedTile, setSelectedTile] = useState(null);

	const [board, setBoard] = useState(Array(9).fill(null));
	const [isEmpty, setIsEmpty] = useState(true);
	const [player, setPlayer] = useState("blue");

	useEffect(() => {}, [board, tiles, selectedTile]);

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
			if (value === null) {
				acc.push(index);
			}
			return acc;
		}, []);
	};

	const startGame = () => {
		setPlayer("red");

		const newBoard = [...board];
		newBoard[4] = player;
		computerTurn(newBoard);
	};

	const getRandomElement = (arr) => {
		const randomIndex = Math.floor(Math.random() * arr.length);
		return arr[randomIndex];
	};

	const handleClick = (index) => {
		if (board[index] || calculateWinner(board)) return;

		const newBoard = [...board];
		newBoard[index] = player;

		setBoard(newBoard);

		computerTurn(newBoard, index);

		setIsEmpty(false);
	};

	const computerTurn = (newBoard, index) => {
		const playerWaitingLines = getAlmostWinningLines(newBoard, player);

		let availableTiles = getAvailableTiles(newBoard);
		if (playerWaitingLines.length > 0) {
			availableTiles = playerWaitingLines;
		}

		let newSelectedTile = getRandomElement(availableTiles);
		setSelectedTile(newSelectedTile);

		if (newSelectedTile !== undefined) {
			newBoard[newSelectedTile] = player === "red" ? "blue" : "red";
			if (newBoard[newSelectedTile] || calculateWinner(newBoard)) return;
			setBoard(newBoard);
		}
	};

	const restart = () => {
		setBoard(Array(9).fill(null));
		setIsEmpty(true);
		setPlayer("blue");
	};

	const getAlmostWinningLines = (board, player) => {
		const almostWinningPositions = [];

		for (const line of lines) {
			const [a, b, c] = line;

			if (
				(board[a] === player &&
					board[b] === player &&
					board[c] === null) ||
				(board[a] === player &&
					board[c] === player &&
					board[b] === null) ||
				(board[b] === player &&
					board[c] === player &&
					board[a] === null)
			) {
				if (board[a] === null) {
					almostWinningPositions.push(a);
				} else if (board[b] === null) {
					almostWinningPositions.push(b);
				} else if (board[c] === null) {
					almostWinningPositions.push(c);
				}
			}
		}

		return almostWinningPositions;
	};

	let result = calculateWinner(board);
	if (result !== null) {
		if (result === "blue") {
			result = "Player win!";
		}
		if (result === "red") {
			result = "Computer win!";
		}
	}

	return (
		<div style={{ textAlign: "center", marginTop: "20px" }}>
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
							backgroundColor: value,
						}}
						onClick={() => handleClick(index)}
					>
						{value === "blue" && "Player"}
						{value === "red" && "Computer"}
					</Button>
				))}
			</Grid>

			<Button
				variant="contained"
				color="info"
				onClick={restart}
				style={{ marginTop: "20px", marginRight: 5 }}
			>
				Restart
			</Button>
		</div>
	);
};

export default Tictactoe;
