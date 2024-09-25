import React, { useState } from "react";
import {
	Container,
	TextField,
	Button,
	Typography,
	Box,
	Paper,
} from "@mui/material";
import axios from "axios";

import OpenAI from "openai";

// const client = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

// const response = await client.chat.completions.create({
// 	messages: [{ role: "user", content: "Say this is a test" }],
// 	model: "gpt-4o-mini",
// });

// console.log(response._request_id);

const ChatApp = () => {
	const [inputMessage, setInputMessage] = useState("");
	const [chatHistory, setChatHistory] = useState([]);

	const sendMessage = async (message) => {
		try {
			const response = await axios.post("/api/generate", {
				prompt: message,
			});
			return response.data.generatedText;
		} catch (error) {
			console.error(
				"Error sending message:",
				error.response ? error.response.data : error.message
			);
		}
	};

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
