import React, { useState } from "react";
import {
	Container,
	TextField,
	Button,
	Typography,
	Box,
	Paper,
} from "@mui/material";
import { sendMessage } from "./api";

export default function ChatApp() {
	const [inputMessage, setInputMessage] = useState("");
	const [chatHistory, setChatHistory] = useState([]);

	const handleSendMessage = async () => {
		if (inputMessage.trim()) {
			const userMessage = { role: "user", content: inputMessage };
			setChatHistory([...chatHistory, userMessage]);

			const botResponse = await sendMessage(inputMessage);
			const botMessage = { role: "bot", content: botResponse };
			setChatHistory((prev) => [...prev, botMessage]);

			setInputMessage("");
		}
	};

	return (
		<Container>
			<Typography variant="h4" gutterBottom>
				Chat with GPT
			</Typography>
			<Paper elevation={3} sx={{ p: 2, mb: 2 }}>
				<Box sx={{ maxHeight: 400, overflow: "auto" }}>
					{chatHistory.map((msg, idx) => (
						<Typography
							key={idx}
							color={
								msg.role === "user" ? "primary" : "secondary"
							}
						>
							{msg.role === "user" ? "You: " : "Bot: "}
							{msg.content}
						</Typography>
					))}
				</Box>
			</Paper>
			<TextField
				fullWidth
				label="Type your message"
				value={inputMessage}
				onChange={(e) => setInputMessage(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") handleSendMessage();
				}}
			/>
			<Button
				variant="contained"
				sx={{ mt: 2 }}
				onClick={handleSendMessage}
			>
				Send
			</Button>
		</Container>
	);
}
