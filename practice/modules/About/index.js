import React from "react";
import { Container, Card, Typography } from "@mui/material";

import InfiniteScroll from "@/components/InfiniteScroll";

const About = () => {
	const fetchMoreItems = () => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const newItems = Array.from(
					{ length: 10 },
					(_, i) => i + Math.random().toFixed(2)
				);
				resolve(newItems);
			}, 1500);
		});
	};

	return (
		<Container>
			<Card style={{ padding: 16, marginTop: 16 }}>
				<Typography variant="h4">Infinite Scroll Effect</Typography>

				<InfiniteScroll
					initialItems={Array.from({ length: 10 }, (_, i) => i)}
					loadMoreItems={fetchMoreItems}
				/>
			</Card>
		</Container>
	);
};

export default About;
