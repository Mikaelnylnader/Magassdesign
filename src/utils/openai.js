import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function getChatResponse(message) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful automotive customization expert working for Magass Design, a custom car shop in Göteborg, Sweden. You specialize in custom paint, body work, and carbon fiber modifications. Be friendly and professional."
        },
        { role: "user", content: message }
      ],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    return "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again later or contact us directly at shop@magassdesign.com";
  }
}