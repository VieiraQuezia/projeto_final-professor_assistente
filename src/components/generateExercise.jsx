// src/components/generateExercise.js
// Função que chama a API da Gemini (Google) e retorna o texto gerado.
// Lembre-se: coloque VITE_GEMINI_KEY no seu .env (ex: VITE_GEMINI_KEY=xxxxx)

export async function generateExercisesGemini({ tema, quantidade = 5, turma }) {
    if (!tema) throw new Error("Tema é obrigatório para gerar exercícios.");
  
    const prompt = `
  Gere ${quantidade} exercícios didáticos de inglês para alunos da turma ${turma}.
  Tema: ${tema}
  
  Formato OBRIGATÓRIO (retorne SOMENTE isso, sem explicações adicionais, sem markdown):
  
  EXERCICIOS:
  1) Título: <título curto>
     Enunciado: <texto do enunciado, pode ter várias sentenças>
     Resposta: <resposta curta ou gabarito>
  
  Repita até ${quantidade} itens.
  `;
  
    // endpoint da Google Generative Language API
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_KEY}`;
  
    const body = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    };
  
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
  
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Erro na API Gemini: ${res.status} ${text}`);
      }
  
      const data = await res.json();
      // caminho típico onde o texto é retornado (pode variar com a API/versão)
      const output = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
      if (!output) {
        throw new Error("Resposta da Gemini está vazia.");
      }
  
      return output;
    } catch (err) {
      console.error("generateExercisesGemini error:", err);
      throw err;
    }
  }
  