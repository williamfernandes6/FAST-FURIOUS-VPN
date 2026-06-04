const connectBtn = document.getElementById('connect-btn');
const statusText = document.getElementById('status-text');
const serverSelect = document.getElementById('server-select');
const sniSelect = document.getElementById('sni-select');

let isConnected = false;

connectBtn.addEventListener('click', () => {
    if (!isConnected) {
        // Simulando início de conexão
        connectBtn.innerText = "CONECTANDO...";
        statusText.innerText = "Injetando SNI: " + sniSelect.value;
        
        setTimeout(() => {
            isConnected = true;
            connectBtn.innerText = "DESCONECTAR";
            connectBtn.className = "connected";
            statusText.innerText = `Conectado ao servidor [${serverSelect.value.toUpperCase()}]`;
            statusText.style.color = "#1565C0";
        }, 2000); // 2 segundos para simular a ligação
    } else {
        // Desconectar
        isConnected = false;
        connectBtn.innerText = "CONECTAR";
        connectBtn.className = "disconnected";
        statusText.innerText = "Status: Desconectado";
        statusText.style.color = "#8B8D99";
    }
});
