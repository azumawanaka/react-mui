import React, { useState } from "react";
import { Container, TextField, Button, Card, Typography } from "@mui/material";
import ChatApp from "@/components/ChatApp";

const Chatgpt = () => {
	return (
		<Container>
			<Card style={{ padding: 16, marginTop: 16 }}>
				<ChatApp />
			</Card>
		</Container>
	);
};

export default Chatgpt;
