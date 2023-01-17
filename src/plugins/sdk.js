import axios from 'axios'
export const sdk = {
    getDepth: async(symbol, limit=500) => (await axios.get(`https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=${limit}`)).data,  
    wsSubscribe: (symbol) => new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth`)
}