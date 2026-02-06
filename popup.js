const sourceLang = document.getElementById('sourceLang');
const targetLang = document.getElementById('targetLang');
const sourceText = document.getElementById('sourceText');
const targetText = document.getElementById('targetText');
const translateBtn = document.getElementById('translateBtn');
const swapBtn = document.getElementById('swapParams');
const statusMessage = document.getElementById('statusMessage');

// Função de tradução
async function translate() {
  const text = sourceText.value.trim();
  if (!text) return;

  let source = sourceLang.value;
  // A API MyMemory usa "Autodetect" como código para detecção automática
  if (source === 'autodetect') {
    source = 'Autodetect';
  }

  const pair = `${source}|${targetLang.value}`;
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${pair}`;


  translateBtn.disabled = true;
  translateBtn.textContent = 'Traduzindo...';
  statusMessage.textContent = '';

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.responseStatus === 200) {
      targetText.value = data.responseData.translatedText;
    } else {
      targetText.value = "Erro na tradução: " + data.responseDetails;
    }
  } catch (error) {
    console.error('Erro:', error);
    statusMessage.textContent = 'Erro de conexão.';
  } finally {
    translateBtn.disabled = false;
    translateBtn.textContent = 'Traduzir';
  }
}

// Event Listeners
translateBtn.addEventListener('click', translate);

// Traduzir ao pressionar Ctrl+Enter no textarea
sourceText.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'Enter') {
    translate();
  }
});

swapBtn.addEventListener('click', () => {
  const temp = sourceLang.value;
  sourceLang.value = targetLang.value;
  targetLang.value = temp;

  const tempText = sourceText.value;
  sourceText.value = targetText.value;
  targetText.value = tempText;
});
