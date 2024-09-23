import React, { useState, useRef, useCallback } from "react";
import {
	CircularProgress,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";

const InfiniteScroll = (props) => {
	const { initialItems, loadMoreItems } = props;

	const [items, setItems] = useState(initialItems);
	const [loading, setLoading] = useState(false);
	const observer = useRef();

	const lastItemRef = useCallback(
		(node) => {
			if (loading) return;

			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver((entries) => {
				console.log("Is Intersecting: ", entries[0].isIntersecting);

				if (entries[0].isIntersecting) {
					loadMore();
				}
			});

			if (node) observer.current.observe(node);
		},
		[loading]
	);

	const loadMore = async () => {
		setLoading(true);

		const newItems = await loadMoreItems();
		setItems((prevItems) => [...prevItems, ...newItems]);
		setLoading(false);
	};

	return (
		<>
			<List>
				{items.map((item, index) => {
					if (index === items.length - 1) {
						return (
							<ListItem key={index} ref={lastItemRef}>
								<ListItemText primary={`Item ${item}`} />
							</ListItem>
						);
					}

					return (
						<ListItem key={index}>
							<ListItemText primary={`Item ${item}`} />
						</ListItem>
					);
				})}
			</List>
			{loading && (
				<div sx={{ textAlign: "center", p: 20 }}>
					<CircularProgress />
					<Typography>Loading more items...</Typography>
				</div>
			)}
		</>
	);
};

export default InfiniteScroll;
