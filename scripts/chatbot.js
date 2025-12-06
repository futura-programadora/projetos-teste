// ---------------------------------------------------------
// Base de conhecimento do chat
// Cada item representa uma intenção que o usuário pode ter,
// com palavras-chave associadas e a resposta do bot.
// ---------------------------------------------------------
const baseConhecimento = [
  {
    intent: "quimica", // Nome do tema
    // Palavras/Frases que, se encontradas na mensagem, ativam essa resposta
    chaves: [
      "quimica", "química", "quimico", "elementos",
      "experimentos", "tabela periodica", "moleculas",
      "vocês tem plataformas de quimica", "jogo de quimica",
      "aprender quimica", "estudar quimica", "química jogo"
    ],
    resposta: "Sim! Temos o 🧪 ChemLab — uma plataforma para aprender química com jogos, quizzes e experiências divertidas!"
  },
  {
    intent: "historia",
    chaves: [
      "historia", "história", "guerras", "idade media",
      "ensinando historia", "aprender historia", "jogo de historia",
      "vocês tem conteúdo de historia", "histórico"
    ],
    resposta: "Claro! ⚔️ Crônica de Guerra é nossa plataforma para aprender História através de aventuras e desafios!"
  },
  {
    intent: "python",
    chaves: [
      "python", "programar", "programação", "ads",
      "linguagem", "vocês têm plataforma de programação",
      "curso de programação", "aprender python", "desenvolvimento"
    ],
    resposta: "Você vai gostar do 🐍 LangoQuest! Uma plataforma que ensina Python com quests e desafios super divertidos!"
  },
  {
    intent: "biomas",
    chaves: [
      "geografia", "biomas", "meio ambiente", "natureza", "flora",
      "fauna", "roblox", "jogo sobre biomas",
      "biomas do brasil", "aprender natureza"
    ],
    resposta: "Temos o 🌎 Geobind! Um jogo no Roblox para explorar os biomas do Brasil aprendendo enquanto joga!"
  },
  {
    intent: "sobre",
    chaves: [
      "sobre", "quem são voces", "sobre voces", "o que é a giocando",
      "quem fez", "qual o objetivo", "da escola",
      "que projeto é esse", "como funciona", "quem criou"
    ],
    resposta: "Somos a Giocando J3 🎮✨ Um projeto educacional criado por alunos de ADS da Escola Parque Jurema 3 para aprender através de jogos e muito mais!"
  },
  {
    intent: "contato",
    chaves: ["contato", "email", "falar com vocês", "instagram", "suporte"],
    resposta: "Você pode falar com a gente pelo Instagram 👉 @giocandoj3 📩"
  },
  {
    intent: "saudacao",
    chaves: ["oi", "ola", "olá", "hey", "bom dia", "boa tarde", "boa noite"],
    resposta: "Olá! 👋 Eu sou o GioChat! Quer saber mais sobre nossas plataformas educacionais? 😄"
  },
  {
    intent: "elogio",
    chaves: ["legal", "top", "bacana", "daora", "gostei", "muito bom"],
    resposta: "Que ótimo! 😍 Continue explorando nosso universo de jogos educativos nos cards acima 👆"
  },
  {
    intent: "despedida",
    chaves: ["tchau", "adeus", "até mais", "falou", "até logo"],
    resposta: "Até mais! 👋 Volte sempre que quiser aprender algo novo com a Giocando J3!   🚀"
  },
  {
    intent: "agradecimento",
    chaves: ["obrigado", "obrigada", "valeu", "agradecido", "grato"],
    resposta: "De nada! 😊 Estamos aqui para ajudar você a aprender de forma divertida! 🎉"
  },
  {
    intent: "saude",
    chaves: ["saude", "bem estar", "mental", "saúde", "relaxar", "estresse"],
    resposta: "Cuidar da saúde mental é importante! 😊 Se precisar, vá em <a style='color: blue;' href='https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-mental' target='_blank'>https://www.gov.br/saude/pt-br/assuntos/</a> para mais informações. Ou visite Mais projetos para encontrar apoio!"
  }
];

// ---------------------------------------------------------
// Função que analisa a mensagem do usuário e retorna a resposta
// Faz a comparação com a base de conhecimento (busca por palavras)
// ---------------------------------------------------------
function responder(msg) {
  const texto = msg.toLowerCase();

  for (const tema of baseConhecimento) {
    if (tema.chaves.some(frase => texto.includes(frase))) {
      return tema.resposta;
    }
  }

  return "Hmm… acho que ainda não aprendi isso 🤔<br><br>" +
         "Mas posso te ajudar com várias coisas!<br>" +
         "Pergunte sobre nossas plataformas educativas: <strong>Química</strong>, <strong>História</strong>, <strong>Python</strong> ou <strong>Biomas</strong> 🎮✨<br>" +
         "Também posso te ajudar com informações de <strong>contato</strong> 📩<br>" +
         "E até direcionar você caso o assunto seja sobre <strong>bem-estar e saúde mental</strong> 💚";
}

// ---------------------------------------------------------
// Função que lida com o envio da mensagem pelo usuário
// Exibe no chat e chama a função de resposta do bot
// ---------------------------------------------------------
function enviarMensagem(textoForcado = null) {
  const input = document.querySelector("#mensagem");
  const chatArea = document.querySelector("#chat-area");
  const msg = textoForcado || input.value.trim();
  if (!msg) return;

  chatArea.innerHTML += `<div class="user">${msg}</div>`;

  const resp = responder(msg);
  setTimeout(() => {
    chatArea.innerHTML += `<div class="bot">${resp}</div>`;
    chatArea.scrollTop = chatArea.scrollHeight;
  }, 300);

  if (!textoForcado) input.value = "";
}

// ---------------------------------------------------------
// Eventos de interação do usuário
// Clique no botão ou pressionar ENTER
// Também lida com os botões de tópicos clicáveis
// ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#enviar").addEventListener("click", () => enviarMensagem());

  document.querySelector("#mensagem").addEventListener("keypress", e => {
    if (e.key === "Enter") enviarMensagem();
  });

  // Quando clicar nos tópicos, dispara mensagem automática
  document.querySelectorAll(".topic-buttons button").forEach(btn => {
    btn.addEventListener("click", () => {
      const intent = btn.getAttribute("data-intent");
      const tema = baseConhecimento.find(t => t.intent === intent);
      if (tema) {
        enviarMensagem(tema.chaves[0]); // Pergunta automática usando a primeira chave
      }
    });
  });
});
