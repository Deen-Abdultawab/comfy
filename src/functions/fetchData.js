import { ref } from "vue";

function fetchData(){
    const error = ref('')
    const store = ref([])
    const isLoading = ref(true)

    async function getData(source){
        isLoading.value = true
        try {
            const response = await fetch(source)
            if(!response.ok){
                throw Error('no data available')
            }
            store.value = await response.json()
            isLoading.value = false
        } catch (err) {
            console.log(err.message)
            error.value = err.message
            isLoading.value = false
        }
    }

    

    return { error, store, getData, isLoading}
}

export default fetchData