import { Together } from 'together-ai';
import * as chatModel from '../models/chatModel';

if (!process.env.TOGETHER_API_KEY) {
  throw new Error('TOGETHER_API_KEY is not set in .env file');
}

const apiKey = process.env.TOGETHER_API_KEY;
const togetherClient = new Together({ apiKey });

export const sendChatMessage = async (req: Request) => {
  try {
    const { userId, message } = await req.json();
    console.log('Processing chat request for user:', userId);

    if (!userId || !message) {
      return new Response(
        JSON.stringify({ error: 'userId and message are required' }),
        { status: 400 }
      );
    }

    // Get or create session
    let session = chatModel.getChatSession(userId);
    if (!session) {
      session = chatModel.createChatSession(userId);
    }

    // Add user message to session
    chatModel.addMessageToChatSession(userId, "user", message);

    // Format messages for API
    const messages = chatModel.formatMessagesForAPI(session);
    console.log('Formatted messages for API:', messages);

    // Create streaming request to Together AI
    const stream = await togetherClient.chat.completions.create({
      model: session.model,
      messages,
      stream: true,
      max_tokens: 1024,
      temperature: 0.7,
      repetition_penalty: 1.1,
      top_p: 0.7
    });

    // Create a TransformStream to handle the response
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();

    // Process the stream
    (async () => {
      try {
        let fullResponse = '';

        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          fullResponse += content;
          
          // Write the chunk to the stream
          await writer.write(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
        }

        // Store the complete response in the session
        chatModel.addMessageToChatSession(userId, "assistant", fullResponse);

        // End the stream
        await writer.write(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
        await writer.close();
      } catch (error) {
        console.error('Streaming error:', error);
        await writer.write(encoder.encode(`data: ${JSON.stringify({ error: error.message })}\n\n`));
        await writer.close();
      }
    })();

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat error:', error.message, '\nStack:', error.stack);
    return new Response(
      JSON.stringify({ error: 'Error processing chat request' }),
      { status: 500 }
    );
  }
};