import axios from "axios";

// Google Gemini API configuration
const GEMINI_API_KEY = "AIzaSyCH_oeA26zoqZBIVAt6Q7NBXOkfq0LKVP0";
const GEMINI_API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export const generateFlashcards = async (topic, count = 5) => {
    const prompt = `Create ${count} educational flashcards for the topic "${topic}.

IMPORTANT REQUIREMENTS:
- Generate questions that test deep understanding and critical thinking, not just basic recall
- Provide comprehensive, detailed answers that fully explain concepts with examples
- Include specific details, mechanisms, processes, or applications where relevant
- Make answers educational and informative - students should learn from reading them
- Ensure answer complexity matches the question difficulty
- Focus on the most important and challenging aspects of the topic
- Include real-world applications or examples when appropriate

For each flashcard:
- Question should be thought-provoking and require understanding
- Answer should be detailed, comprehensive, and educational (2-4 sentences minimum)
- Answer should directly address what the question is asking

Return ONLY a valid JSON array with this exact format:
[
  {
    "question": "Your detailed question here?",
    "answer": "Your comprehensive, educational answer here with specific details and examples."
  }
]

Topic: ${topic}
Number of cards: ${count}`;

    try {
        const response = await axios.post(
            `${ GEMINI_API_URL } ? key = ${ GEMINI_API_KEY }`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: prompt,
                            },
                        ],
                    },
                ],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 2048,
                },
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const text = response.data.candidates[0].content.parts[0].text;
        console.log("Raw AI response:", text);

        let cleanedText = text.trim();

        cleanedText = cleanedText.replace(/json\n?|\n?/g, "").trim();

        const jsonMatch = cleanedText.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            cleanedText = jsonMatch[0];
        }

        const flashcards = JSON.parse(cleanedText);

        if (!Array.isArray(flashcards)) {
            throw new Error("Invalid response format");
        }

        const validFlashcards = flashcards.filter(
            (card) =>
                card.question &&
                card.answer &&
                typeof card.question === "string" &&
                typeof card.answer === "string"
        );

        if (validFlashcards.length === 0) {
            throw new Error("No valid flashcards generated");
        }

        return validFlashcards.slice(0, count);
    } catch (error) {
        console.error("Error generating flashcards with Gemini API:", error);

        if (
            error.response?.status === 400 &&
            error.response?.data?.error?.message?.includes("API_KEY")
        ) {
            throw new Error(
                "Invalid API key. Please check your Gemini API key configuration."
            );
        }

        if (error.response?.status === 429) {
            throw new Error(
                "API quota exceeded. Please try again later or check your API limits."
            );
        }

        console.log("Falling back to enhanced mock data...");
        return generateEnhancedMockFlashcards(topic, count);
    }
};

const generateEnhancedMockFlashcards = (topic, count) => {
    const topicLower = topic.toLowerCase();

    for (const [key, cards] of Object.entries(enhancedResponses)) {
        if (topicLower.includes(key) || key.includes(topicLower)) {
            return cards.slice(0, count);
        }
    }

    return generateComprehensiveCards(topic, count);
};

const generateComprehensiveCards = (topic, count) => {
    const templates = [
        {
            question: `What are the fundamental principles and key concepts that define ${topic}?`,
            answer: `${topic} is built upon several fundamental principles that work together to create a comprehensive understanding. These core concepts include the basic definitions, underlying mechanisms, and essential relationships that govern how ${topic} functions. Understanding these foundational elements is crucial because they form the basis for more advanced applications and help explain why ${topic} behaves the way it does in different contexts. The interconnected nature of these principles means that mastering one aspect often illuminates others, creating a deeper, more integrated knowledge base.`,
        },
        {
            question: `How does ${topic} apply to real-world situations and what are its practical implications?`,
            answer: `${topic} has significant real-world applications that impact various aspects of daily life, professional practices, and societal development. In practical terms, understanding ${topic} enables better decision-making, problem-solving, and innovation in relevant fields. The implications extend beyond immediate applications to influence long-term trends, policy decisions, and technological advancement. Real-world examples demonstrate how theoretical knowledge translates into tangible benefits, showing the relevance and importance of mastering ${topic} for both personal and professional growth.`,
        },
        {
            question: `What are the current challenges and emerging developments in ${topic}?`,
            answer: `Current challenges in ${topic} include technical limitations, ethical considerations, resource constraints, and evolving complexities that require innovative solutions. These challenges drive ongoing research and development efforts aimed at overcoming obstacles and improving existing approaches. Emerging developments show promising directions for future advancement, including new technologies, methodologies, and theoretical frameworks. Understanding these challenges and developments is essential for staying current in the field and contributing to future progress and innovation.`,
        },
        {
            question: `How does ${topic} relate to and interact with other important concepts or fields?,
      answer: ${topic} exists within a broader ecosystem of related concepts and interdisciplinary connections that enhance its significance and application. These relationships demonstrate how knowledge in one area can inform and strengthen understanding in others, creating synergistic effects that benefit overall comprehension. The interdisciplinary nature of ${topic} means that insights from related fields often provide new perspectives and solutions to existing problems. Recognizing these connections helps develop a more holistic understanding and enables more effective application of knowledge across different contexts.`,
        },
        {
            question: `What methods and approaches are used to study, analyze, or work with ${topic}?,
      answer: The study and analysis of ${topic} employs various methodological approaches, each offering unique insights and advantages. These methods range from theoretical frameworks and analytical techniques to practical tools and experimental procedures. Different approaches may be more suitable for different aspects of ${topic}, and combining multiple methods often provides the most comprehensive understanding. Mastering these methodological approaches is essential for conducting effective research, solving problems, and making meaningful contributions to the field.`,
        },
    ];

    return templates.slice(0, count);
};