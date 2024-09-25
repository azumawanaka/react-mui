import axios from "axios";

const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${API_KEY}`,
	},
});

export const sendMessage = async (message) => {
	try {
		const response = await api.post("/chat/completions", {
			model: "gpt-3.5-turbo",
			messages: [
				{ role: "system", content: "You are a helpful assistant." },
				{ role: "user", content: message },
			],
		});

		return response.data.choices[0].message.content;
	} catch (error) {
		console.error("Error sending message:", error);
	}
};
