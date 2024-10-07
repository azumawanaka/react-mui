import React, { useState, useEffect } from "react";
import {
	Avatar,
	Box,
	Button,
	Chip,
	Grid,
	List,
	ListItemButton,
	ListItemText,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AddCircleRounded } from "@mui/icons-material";

const useStyles = makeStyles(() => ({
	bombList: {
		display: "flex",
		position: "absolute",
		padding: "0 0 0 15px",
		left: "100%",
		top: "0",
		zIndex: 0,
		"& >div": {
			padding: "2px 10px",
			"& span": {
				fontSize: 12,
			},
		},
		"&:before": {
			content: '"=>"',
			position: "absolute",
			top: "5px",
			left: "-1px",
			fontSize: "16px",
			color: "#000",
		},
	},
}));

let scoreCounter = 1;
const Mine = () => {
	const [isGame, setIsGame] = useState(false);
	const [board, setBoard] = useState(Array(100).fill(null));
	const [bombs, setBombs] = useState(10);
	const [scores, setScores] = useState(0);
	const [kaboom, setKaboom] = useState(false);
	const [visitedTiles, setVisitedTiles] = useState([]);
	const [isOpenBombCount, setIsOpenBombCount] = useState(false);
	const [credits, setCredits] = useState(0.0);

	useEffect(() => {}, [isGame, bombs, board, scores, visitedTiles]);

	useEffect(() => {
		generateRandomBoard();
	}, []);

	const classes = useStyles();

	const startGame = () => {
		setIsGame(true);
		generateRandomBoard();
	};

	const handleBombSelect = () => {
		const isOpen = !isOpenBombCount;
		setIsOpenBombCount(isOpen);
	};

	const handleChangeBombCount = (event, v) => {
		setBombs(v);
		setIsOpenBombCount(false);
	};

	const generateRandomBoard = () => {
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
		const hasBomb = value ? true : false;
		if (!isGame || kaboom || visitedTiles.includes(index)) return;

		if (!hasBomb) {
			setVisitedTiles([...visitedTiles, index]);
			setScores(scoreCounter++);
		}

		setKaboom(hasBomb);
	};

	return (
		<div style={{ textAlign: "center", marginTop: "20px" }}>
			<Grid
				sx={{
					px: 4,
					pb: 1,
					my: 1,
					borderBottom: "1px solid #ccc",
				}}
			>
				<Box sx={{ flexGrow: 1 }}>
					<Chip
						position="relative"
						zIndex="22"
						avatar={
							<Avatar>
								<img
									src="/credit.png"
									alt="credit"
									style={{
										height: "80%",
										width: "100%",
										objectFit: "cover",
									}}
								/>
							</Avatar>
						}
						label={`Bet amount: ${credits}`}
						sx={{ backgroundColor: "transparent" }}
					/>

					<Chip
						position="relative"
						zIndex="22"
						avatar={
							<Avatar>
								<AddCircleRounded color="primary" />
							</Avatar>
						}
						label={`Credits: ${credits}`}
						sx={{ backgroundColor: "transparent" }}
					/>
				</Box>
			</Grid>

			<Grid
				display="flex"
				sx={{
					alignItems: "center",
					justifyContent: "space-between",
					px: 4,
					pb: 1,
					my: 1,
					borderBottom: "1px solid #ccc",
				}}
			>
				<Box position="relative">
					<Chip
						position="relative"
						zIndex="22"
						avatar={
							<Avatar>
								<img
									src="/bomb.jpg"
									alt="bomb"
									style={{
										height: "100%",
										width: "100%",
										objectFit: "cover",
									}}
								/>
							</Avatar>
						}
						label={`Bombs: ${bombs}`}
						onClick={handleBombSelect}
						sx={{ backgroundColor: "transparent" }}
					/>

					{isOpenBombCount && (
						<List
							className={classes.bombList}
							component="nav"
							aria-label="bombs"
						>
							<ListItemButton
								onClick={(event) =>
									handleChangeBombCount(event, 10)
								}
							>
								<ListItemText primary="10" />
							</ListItemButton>
							<ListItemButton
								onClick={(event) =>
									handleChangeBombCount(event, 15)
								}
							>
								<ListItemText primary="15" />
							</ListItemButton>
							<ListItemButton
								onClick={(event) =>
									handleChangeBombCount(event, 20)
								}
							>
								<ListItemText primary="20" />
							</ListItemButton>
						</List>
					)}
				</Box>

				<span>
					Scores: <span variant="h1">{scores}</span>
				</span>
			</Grid>

			<Grid display="block" sx={{ width: 700, margin: "auto" }}>
				{board.map((value, index) => (
					<Button
						key={index}
						variant="outlined"
						style={{
							width: "50px",
							height: "50px",
							color: "white",
							borderColor: "#cccccc",
							borderRadius: 0,
							padding: 0,
							backgroundColor: !isGame ? "#ccccdd" : "#ffffff",
						}}
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

						{visitedTiles.includes(index) ? (
							<img
								src="/gem.jpeg"
								alt="bomb"
								style={{
									height: "100%",
									width: "100%",
									objectFit: "fit",
								}}
							/>
						) : null}
					</Button>
				))}
			</Grid>

			<Button variant="outlined" sx={{ my: 2 }} onClick={startGame}>
				Game
			</Button>
		</div>
	);
};

export default Mine;
