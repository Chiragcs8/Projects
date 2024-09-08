export async function fetchGPTResponse(ingredients) {
  const API_KEY = 'your-openai-api-key'; // Add your OpenAI API key here
  const API_URL = 'https://api.openai.com/v1/chat/completions';

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that provides recipe suggestions based on ingredients.',
        },
        {
          role: 'user',
          content: `Generate a list of recipes based on these ingredients: ${ingredients}. Each recipe should be in the format: { name: string, preparationMethod: string, nutritionalInformations: string }`,
        },
      ],
    }),
  });

  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}
