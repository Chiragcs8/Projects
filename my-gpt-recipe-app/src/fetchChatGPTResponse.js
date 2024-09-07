const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = "API_KEY";

export async function fetchGPTResponse(prompt) {
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000; // in milliseconds

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant designed to output JSON."
            },
            {
              role: "user",
              content: `Generate a food recipe based on these ingredients: ${prompt}. The response must be JSON in the format: { preparationMethod: string, nutritionalInformations: string }`
            }
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return JSON.parse(data.choices[0].message.content);
      } else if (response.status === 429) {
        // Handle rate limit error
        console.warn('Rate limit exceeded. Retrying...');
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      } else {
        // Handle other errors
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      if (attempt === MAX_RETRIES - 1) {
        throw error; // Re-throw the error if max retries reached
      }
    }
  }
}
