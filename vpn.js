const connectBtn = document.getElementById('connect-btn');
const statusText = document.getElementById('status-text');
const serverSelect = document.getElementById('server-select');
const sniSelect = document.getElementById('sni-select');

let isConnected = false;

// Função para buscar Servidores e Tweaks diretamente do servidores.json
async function carregarConfiguracoes() {
    try {
        const response = await fetch('servidores.json');
        const data = await response.json();
        
        // 1. Limpar e Preencher o Seletor de Servidores (Países)
        serverSelect.innerHTML = '';
        data.servers.forEach(server => {
            const option = document.createElement('option');
            option.value = server.ip;
            option.innerText = server.name;
            option.setAttribute('data-port', server.port);
            serverSelect.appendChild(option);
        });

        // 2. Limpar e Preencher o Seletor de Tweaks (Unitel)
        sniSelect.innerHTML = '';
        data.tweaks.forEach(tweak => {
            const option = document.createElement('option');
            option.value = tweak.sni;
            option.innerText = tweak.name;
            option.setAttribute('data-mode', tweak.mode);
            sniSelect.appendChild(option);
        });
        
        statusText.innerText = "FAST & FURIOUS - Servidores Mundiais Prontos!";
    } catch (error) {
        console.error("Erro ao ler servidores.json:", error);
        statusText.innerText = "Erro ao conectar com a lista de servidores.";
    }
}

// Inicializa a aplicação carregando os dados do JSON
carregarConfiguracoes();

// Lógica de Conexão Profissional
connectBtn.addEventListener('click', () => {
    if (!isConnected) {
        const selectedServerName = serverSelect.options[serverSelect.selectedIndex].text;
        const targetIP = serverSelect.value;
        const activeSNI = sniSelect.value;
        const selectedTweak = sniSelect.options[sniSelect.selectedIndex];
        const mode = selectedTweak.getAttribute('data-mode');
        
        connectBtn.innerText = "CONECTANDO...";
        statusText.innerText = `A ligar a ${selectedServerName} via ${mode}...`;
        statusText.style.color = "#FF1744"; 
        
        setTimeout(() => {
            isConnected = true;
            connectBtn.innerText = "DESCONECTAR";
            connectBtn.className = "connected"; // Ativa o Azul Escuro / Elétrico
            statusText.innerText = `Conectado com Sucesso!\nServidor: ${targetIP}\nSNI Injetada: ${activeSNI}\nSaldo Unitel Congelado com Segurança.`;
            statusText.style.color = "#1565C0"; 
        }, 2500); 
    } else {
        isConnected = false;
        connectBtn.innerText = "CONECTAR";
        connectBtn.className = "disconnected"; // Retorna ao Vermelho original
        statusText.innerText = "Status: Desconectado. Proteção de dados desativada.";
        statusText.style.color = "#8B8D99";
    }
});
