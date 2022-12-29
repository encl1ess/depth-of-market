export const sdk = {
    wsSubscribe: (symbol) => new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth`)

}