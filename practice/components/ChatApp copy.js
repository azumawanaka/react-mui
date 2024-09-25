import React, { useState } from "react";
import {
	Container,
	TextField,
	Button,
	Typography,
	Box,
	Paper,
} from "@mui/material";
import axios from "axios"; // Import axios for API call

const ChatApp = () => {
	const [inputMessage, setInputMessage] = useState("");
	const [chatHistory, setChatHistory] = useState([]);

	// Function to call local API route
	const sendMessage = async (message) => {
		try {
			const response = await axios.post("/api/chat", { message });
			const botReply = response.data.choices[0].message.content;
			return botReply;
		} catch (error) {
			console.error(
				"Error sending message:",
				error.response ? error.response.data : error.message
			);
		}
	};

	// Handle message send
	const handleSendMessage = async () => {
		if (inputMessage.trim()) {
			const userMessage = { role: "user", content: inputMessage };
			setChatHistory([...chatHistory, userMessage]);

			// Call sendMessage to get bot's response
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
					if (e.key === "Enter") handleSendMessage(); // Send message on Enter key press
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
};

export default ChatApp;
