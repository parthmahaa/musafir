// import express from 'express';
// import OpenAI from 'openai/index.mjs';
// const router = express.Router();

// const openai = new OpenAI({ apiKey: "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" });

// router.post('', async (req, res) => {
//     const conversationHistory = req.body.messages;
//     const messages = [
//       { role: 'system', content: 'You are a helpful assistant for our website.' },
//       ...conversationHistory
//     ];
//     try {
//       const completion = await openai.chat.completions.create({
//         model: 'gpt-3.5-turbo', // Use 'gpt-4' if available and preferred
//         messages: messages,
//       });
//       const assistantMessage = completion.choices[0].message.content;
//       res.json({ message: assistantMessage });
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({ error: 'Something went wrong' });
//     }
//   });

// export default router;