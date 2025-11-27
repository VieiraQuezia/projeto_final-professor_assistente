export async function generateExercisesGemini({ tema, quantidade = 5, turma }) {
    if (!tema) throw new Error("Tema é obrigatório para gerar exercícios.");
  
    // 🔥 Pegamos a KEY do jeito correto
    const API_KEY = import.meta.env.VITE_GEMINI_KEY;
  
    // 🔥 Validação: evita erro 400 por key undefined
    if (!API_KEY) {
      console.error("❌ ERROR: VITE_GEMINI_KEY não encontrada. Verifique o arquivo .env!");
      throw new Error("Chave da API Gemini ausente.");
    }
  
    // 🔥 Teste opcional — mostra no console se está vindo certinho
    console.log("🔑 Gemini API Key carregada:", API_KEY);
  
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
  
    // ⚡ URL com API KEY válida
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
  
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
        console.error("❌ Response error:", text);
        throw new Error(`Erro na API Gemini: ${res.status} ${text}`);
      }
  
      const data = await res.json();
  
      // ✔️ Caminho correto onde o Gemini retorna o texto
      const output = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  
      if (!output) {
        console.error("❌ Resposta vazia =>", data);
        throw new Error("Resposta da Gemini está vazia.");
      }
  
      return output;
  
    } catch (err) {
      console.error("generateExercisesGemini error:", err);
      throw err;
    }
  }
  