export async function fetchGPTResponse (prompt) {
  const API_URL = 'https://api.openai.com/v1/chat/completions';
  const API_KEY = 'API_KEY'; 
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Authorization": `Bearer ${API_KEY}`},
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to output JSON."
        },
        {
          role: "user",
          content:`
          Generate a food receipe based on these ingredients: ${prompt}.
          The response must be JSON in the format:
          {
            preparationMethod: string,
            nutritionalInformations: string
          }`
        }
      ],
      response_format: {
        type: "json_object"
      }
    }),
  });

  return JSON.parse((await response.json()).choices[0].messages.content);
}