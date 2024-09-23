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
	const [yourScore, setYourScore] = useState(0);
	const [computerScore, setComputerScore] = useState(0);

	useEffect(() => {
		if (!isPlayerTurn) {
			computerTurn(board);
		}

		let pScore = 0;
		let cScore = 0;
		let result = calculateWinner(board);
		if (result === "blue") {
			setYourScore(pScore++);
		} else if (result === "red") {
			setComputerScore(cScore++);
		}
	}, [isPlayerTurn, board, yourScore, computerScore]);

	useEffect(() => {
		if (!isPlayerTurn) {
			computerTurn(board);
		}

		let pScore = 0;
		let cScore = 0;
		let result = calculateWinner(board);
		if (result === "blue") {
			pScore++;
			result = "Player wins!";
		} else if (result === "red") {
			cScore++;
			result = "Computer wins!";
		} else if (getAvailableTiles(board).length === 0) {
			result = "It's a draw!";
		}

		setYourScore(pScore);
		setComputerScore(cScore);
	}, [isPlayerTurn, board, yourScore, computerScore]);

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
		setBoard(Array(9).fill(null));
		setIsPlayerTurn(false);
	};

	let result = calculateWinner(board);
	if (result === "blue") {
		result = "Player wins!";
	} else if (result === "red") {
		result = "Computer wins!";
	} else if (getAvailableTiles(board).length === 0) {
		result = "It's a draw!";
	}

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

			<Button
				variant="contained"
				color="info"
				onClick={() => restart()}
				style={{ marginTop: "20px", marginRight: 5 }}
			>
				Restart
			</Button>

			<ListItem component="span" href="#simple-list">
				<ListItemText primary={`You: ${yourScore}`} />
				<ListItemText primary={`Computer: ${computerScore}`} />
			</ListItem>
		</div>
	);
};

export default Tictactoe;
