import axios from 'axios'
import { onMounted, ref } from 'vue';

export function useDepth(symbol='BTCUSDT', limit = 500) {
    const depthRecords = ref([]);
    const isDepthLoading = ref(true);
    const fetching = async () => {
        try {
            const response = await axios.get(`https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=${limit}`)
            depthRecords.value = response.data;
        } catch (e) {
            alert(e)
        } finally {
            isDepthLoading.value = false;
        }
    }

    onMounted(fetching) //функция должна отрабатываться, когда компонент монтируется
    return {
        depthRecords, isDepthLoading
    }

}