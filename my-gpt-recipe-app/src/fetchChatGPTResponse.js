export async function fetchGPTResponse(prompt) {
  const API_URL = 'https://api.openai.com/v1/chat/completions';
  const API_KEY = "API_KEY";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
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
            content: `Generate a food recipe based on these ingredients: ${prompt}. The response must be JSON in the format: { name: string, preparationMethod: string, nutritionalInformations: string }`
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const content = data.choices[0].message.content;
    
    return JSON.parse(content);

  } catch (error) {
    console.error("Failed to fetch recipe:", error);
    throw error;
  }
}
