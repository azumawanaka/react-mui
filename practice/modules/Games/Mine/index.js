import React, { useState, useEffect } from "react";
import { Button, FormControl, Grid, TextField } from "@mui/material";
import { Typography } from "@mui/material";

let scoreCounter = 1;
const Mine = () => {
	const [board, setBoard] = useState(Array(100).fill(null));
	const [bombs, setBombs] = useState(10);
	const [scores, setScores] = useState(0);
	const [kaboom, setKaboom] = useState(false);
	const [visitedTiles, setVisitedTiles] = useState([]);

	useEffect(() => {}, [board, scores, visitedTiles]);

	useEffect(() => {
		generateRandomBoard(false);
	}, []);

	const generateRandomBoard = (begin = true) => {
		scoreCounter = 1;
		setScores(0);
		setVisitedTiles([]);

		const randomIndices = new Set();
		while (randomIndices.size < bombs) {
			const randomIndex = Math.floor(Math.random() * 100);
			randomIndices.add(randomIndex);
		}

		const newBoard = Array(100).fill(null);
		let value = 1;
		randomIndices.forEach((index) => {
			newBoard[index] = value++;
		});

		setKaboom(false);
		setBoard(newBoard);
	};

	const handleClick = (value, index) => {
		if (kaboom) return;

		const hasBomb = value ? true : false;

		if (!hasBomb) {
			setVisitedTiles([...visitedTiles, index]);
			setScores(scoreCounter++);
		}

		setKaboom(hasBomb);
	};

	return (
		<div style={{ textAlign: "center", marginTop: "20px" }}>
			<Button
				variant="outlined"
				sx={{ mb: 2 }}
				onClick={generateRandomBoard}
			>
				Generate
			</Button>
			<Typography variant="h6">
				Scores: <span variant="h1">{scores}</span>
			</Typography>
			<Grid display="block" sx={{ width: 700, margin: "auto" }}>
				{board.map((value, index) => (
					<Button
						key={index}
						variant="outlined"
						style={{
							width: "50px",
							height: "50px",
							color: "white",
							borderColor: kaboom && value ? "red" : "#1976d2",
							backgroundColor: visitedTiles.includes(index)
								? "lightGray"
								: "white",
						}}
						sx={{ m: 0.25 }}
						onClick={() => handleClick(value, index)}
					>
						{kaboom && value && (
							<img
								src="/bomb.jpg"
								alt="bomb"
								style={{
									height: "100%",
									width: "100%",
									objectFit: "cover",
								}}
							/>
						)}
					</Button>
				))}
			</Grid>
		</div>
	);
};

export default Mine;
