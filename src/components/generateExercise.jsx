// ...existing code...
// Define a função assíncrona para gerar exercícios usando a API Gemini.
// Recebe o tema, a quantidade de exercícios (padrão 5) e a turma como parâmetros.
export async function generateExercisesGemini({ tema, quantidade = 5, turma }) {
  // Validação inicial: Garante que o tema foi fornecido.
  if (!tema) throw new Error("Tema é obrigatório para gerar exercícios.");

  // 🔥 Pegamos a KEY do jeito correto
  // Acessa a variável de ambiente VITE_GEMINI_KEY definida no arquivo .env (padrão em projetos Vite).
  const API_KEY = import.meta.env.VITE_GEMINI_KEY;

  // Validação: evita erro 400 por key undefined
  if (!API_KEY) {
    // Log de erro no console para depuração.
    console.error("❌ ERROR: VITE_GEMINI_KEY não encontrada. Verifique o arquivo .env!");
    // Lança um erro para interromper a execução da função.
    throw new Error("Chave da API Gemini ausente.");
  }

  // 🔥 Teste opcional — mostra no console se está vindo certinho
  // (Este comentário apenas indica onde um console.log opcional estaria).

  // Constrói o prompt (instrução) que será enviado ao modelo Gemini.
  // É uma template string (delimitada por `) e DEVE conter apenas o texto que o modelo deve ler.
  const prompt = `
Gere ${quantidade} exercícios didáticos de inglês para alunos da turma ${turma}.
Tema: ${tema}

Formato OBRIGATÓRIO (retorne SOMENTE isso, sem explicações adicionais, sem markdown):
De acordo com a turma selecionada deixe mais difícil os exercícios 

EXERCICIOS:
1) Título: <título curto>
  Enunciado: <texto do enunciado, pode ter várias sentenças>
  Resposta: <resposta curta ou gabarito>

Repita até ${quantidade} itens.
`; // Fim da string do prompt.

  // ⚡ URL com API KEY válida
  // Define a URL do endpoint da API, incluindo o modelo e a chave de API.
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

  // Constrói o corpo (body) da requisição, conforme o formato exigido pela API.
  const body = {
    // Envia o prompt como uma parte de texto do papel 'user'.
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  };

  try {
    // Realiza a chamada fetch (requisição HTTP POST) para a API Gemini.
    const res = await fetch(url, {
      method: "POST",
      // Define o cabeçalho para indicar que o corpo é JSON.
      headers: { "Content-Type": "application/json" },
      // Converte o objeto 'body' para uma string JSON.
      body: JSON.stringify(body),
    });

    // Checa se a resposta da requisição foi bem-sucedida (status 200-299).
    if (!res.ok) {
      // Se houver erro, tenta ler o corpo da resposta para obter detalhes.
      const text = await res.text();
      console.error("❌ Response error:", text);
      // Lança um erro com o status HTTP e a mensagem de erro da API.
      throw new Error(`Erro na API Gemini: ${res.status} ${text}`);
    }

    // Converte a resposta JSON para um objeto JavaScript.
    const data = await res.json();

    // ✔️ Caminho correto onde o Gemini retorna o texto
    // Acessa o texto gerado de forma segura na estrutura aninhada da resposta da API.
    const output = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    // Verifica se o output (texto gerado) está vazio.
    if (!output) {
      console.error("❌ Resposta vazia =>", data);
      throw new Error("Resposta da Gemini está vazia.");
    }

    // Retorna a string de texto contendo os exercícios formatados.
    return output;

  } catch (err) {
    // Captura e loga quaisquer erros que ocorreram durante o processo (rede, parsing, etc.).
    console.error("generateExercisesGemini error:", err);
    // Relança o erro para que o chamador da função possa tratá-lo.
    throw err;
  }
}
// ...existing code...