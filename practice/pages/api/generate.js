import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { prompt } = req.body;

		if (!prompt) {
			return res.status(400).json({ error: "Prompt is required" });
		}

		try {
			const response = await axios.post(
				"https://api.openai.com/v1/chat/completions",
				{
					model: "gpt-3.5-turbo",
					messages: [{ role: "user", content: prompt }],
					// max_tokens: 100,
					// temperature: 0.7,
				},
				{
					headers: {
						Authorization: `Bearer ${API_KEY}`,
						"Content-Type": "application/json",
					},
				}
			);

			const generatedText = response.data.choices[0].message.content;
			return res.status(200).json({ generatedText });
		} catch (error) {
			if (error.response) {
				console.error("OpenAI API error:", error.response.data);
				return res.status(500).json({ error: error.response.data });
			} else {
				console.error("Network or other error:", error.message);
				return res
					.status(500)
					.json({ error: "Failed to fetch data from OpenAI" });
			}
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
