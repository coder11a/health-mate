// import OpenAI from 'openai';

// export class PDFAnalysisService {
//   constructor(apiKey) {
//     if (!apiKey) {
//       throw new Error('OpenAI API key is required');
//     }

//     this.openai = new OpenAI({
//       apiKey: apiKey,
//       dangerouslyAllowBrowser: true // Use with caution in production
//     });
//   }

//   async extractTextFromPDF(pdfFile) {
//     // In a real-world scenario, you'd use a PDF parsing library like pdf.js or mammoth
//     // This is a placeholder - you'll need to implement actual PDF text extraction
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         resolve(e.target.result);
//       };
//       reader.onerror = (error) => {
//         reject(error);
//       };
//       reader.readAsText(pdfFile);
//     });
//   }

//   async analyzePDF(pdfFile) {
//     try {
//       // Extract text from PDF
//       const pdfText = await this.extractTextFromPDF(pdfFile);

//       // Analyze PDF content using OpenAI
//       const completion = await this.openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: [
//           {
//             role: "system", 
//             content: "You are a helpful medical document analysis assistant. Provide a concise summary and key insights from the medical document."
//           },
//           {
//             role: "user", 
//             content: `Please analyze the following medical document and provide:
//             1. A brief summary
//             2. Key medical findings
//             3. Any potential health recommendations
//             4. Highlight any critical information

//             Document content:
//             ${pdfText}`
//           }
//         ],
//         max_tokens: 300
//       });

//       // Return the analysis
//       return {
//         summary: completion.choices[0].message.content,
//         rawText: pdfText
//       };
//     } catch (error) {
//       console.error('PDF Analysis Error:', error);
//       throw error;
//     }
//   }
// }

// // Export a function to create the service with API key
// export function createPDFAnalysisService() {
//   const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
//   if (!apiKey) {
//     console.warn('OpenAI API key is not set');
//     return null;
//   }
//   return new PDFAnalysisService(apiKey);
// }