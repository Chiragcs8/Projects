const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = "YOUR_API_KEY";

export async function fetchGPTResponse(prompt) {
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
          content: "You are a helpful assistant designed to output multiple recipes in JSON format."
        },
        {
          role: "user",
          content: `Generate a list of recipes based on these ingredients: ${prompt}. Each recipe should be in the format: { name: string, preparationMethod: string, nutritionalInformations: string }`
        }
      ],
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } else {
    throw new Error(`Error: ${response.status}`);
  }
}
