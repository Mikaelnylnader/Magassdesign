import axios from 'axios';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;

export async function getChatResponse(message) {
  try {
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        messages: [
          {
            role: "system",
            content: "You are a helpful automotive customization expert working for Magass Design, a custom car shop in Göteborg, Sweden. You specialize in custom paint, body work, and carbon fiber modifications. Be friendly and professional."
          },
          { role: "user", content: message }
        ],
        model: "deepseek-chat",
        temperature: 0.7,
        max_tokens: 1000
      },
      {
        headers: {
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('DeepSeek API error:', error);
    return "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again later or contact us directly at shop@magassdesign.com";
  }
}