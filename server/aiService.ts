// AI Service for course recommendations using OpenRouter and AiTunnel
interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

interface AiTunnelResponse {
  embedding: number[];
}

class AIService {
  private openRouterApiKey: string;
  private aiTunnelApiKey: string;

  constructor() {
    this.openRouterApiKey = process.env.OPENROUTER_API_KEY || '';
    this.aiTunnelApiKey = process.env.AITUNNEL_API_KEY || '';
    
    if (!this.openRouterApiKey || !this.aiTunnelApiKey) {
      console.warn('AI service keys not configured. AI features will be disabled.');
    }
  }

  // Generate text embeddings using AiTunnel
  async generateEmbedding(text: string): Promise<number[]> {
    if (!this.aiTunnelApiKey) {
      throw new Error('AiTunnel API key not configured');
    }

    try {
      const response = await fetch('https://api.aitunnel.ai/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.aiTunnelApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          input: text,
          model: 'text-embedding-ada-002'
        })
      });

      if (!response.ok) {
        throw new Error(`AiTunnel API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.data[0].embedding;
    } catch (error) {
      console.error('Error generating embedding:', error);
      throw error;
    }
  }

  // Calculate cosine similarity between two vectors
  cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) return 0;
    
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  // Generate recommendations using OpenRouter LLM
  async generateRecommendationReasoning(
    studentProfile: {
      specialty: string;
      level: string;
      completedCourses: Array<{ name: string; description?: string; grade: string }>;
    },
    targetCourse: {
      name: string;
      description?: string;
      prerequisites?: string;
    },
    similarityScore: number
  ): Promise<string> {
    if (!this.openRouterApiKey) {
      return `Курс рекомендован на основе совпадения с профилем студента (${Math.round(similarityScore * 100)}% соответствие)`;
    }

    const prompt = `
Проанализируй, почему курс "${targetCourse.name}" подходит для студента со следующим профилем:

Студент:
- Специальность: ${studentProfile.specialty}
- Уровень: ${studentProfile.level}
- Пройденные курсы: ${studentProfile.completedCourses.map(c => `${c.name} (${c.grade})`).join(', ')}

Предлагаемый курс:
- Название: ${targetCourse.name}
- Описание: ${targetCourse.description || 'Не указано'}
- Требования: ${targetCourse.prerequisites || 'Не указаны'}
- Совпадение профиля: ${Math.round(similarityScore * 100)}%

Дай краткое обоснование (1-2 предложения), почему этот курс подойдет студенту, учитывая его академическую подготовку.
`;

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.openRouterApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3.5-sonnet',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 200,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.statusText}`);
      }

      const data: OpenRouterResponse = await response.json();
      return data.choices[0]?.message?.content || 
        `Курс рекомендован на основе анализа профиля студента (${Math.round(similarityScore * 100)}% соответствие)`;
    } catch (error) {
      console.error('Error generating recommendation reasoning:', error);
      return `Курс рекомендован на основе совпадения с профилем студента (${Math.round(similarityScore * 100)}% соответствие)`;
    }
  }

  // Generate course description from student input using LLM
  async enhanceCourseDescription(courseName: string, basicInfo?: string): Promise<string> {
    if (!this.openRouterApiKey) {
      return basicInfo || courseName;
    }

    const prompt = `
Создай краткое академическое описание курса "${courseName}" для студенческой зачетной книжки.
${basicInfo ? `Дополнительная информация: ${basicInfo}` : ''}

Описание должно быть:
- Кратким (1-2 предложения)
- Академическим по стилю
- Указывать основные темы курса
- На русском языке

Пример: "Основы алгоритмов и структур данных. Изучение базовых алгоритмов сортировки, поиска, работы с деревьями и графами."
`;

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.openRouterApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3.5-sonnet',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 150,
          temperature: 0.5
        })
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.statusText}`);
      }

      const data: OpenRouterResponse = await response.json();
      return data.choices[0]?.message?.content?.trim() || basicInfo || courseName;
    } catch (error) {
      console.error('Error enhancing course description:', error);
      return basicInfo || courseName;
    }
  }
}

export const aiService = new AIService();