import React from "react";
import { styled } from "@mui/material/styles";
import { Container, Grid, Paper } from "@mui/material";
import Tictactoe from "./Tictactoe";
import Mine from "./Mine";

const Games = () => {
	return (
		<Container sx={{ mt: 4 }}>
			<Paper sx={{ flexGrow: 1, p: 3 }}>
				<Grid container spacing={2}>
					<Grid item size={8}>
						<Paper sx={{ p: 2 }}>
							<Tictactoe />
						</Paper>
					</Grid>
					<Grid item size={10}>
						<Mine />
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
};

export default Games;
