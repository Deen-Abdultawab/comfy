import { ref } from "vue";
import { projectFirestore } from "@/firebase/config";

function useDocument(collection, id){
    const error = ref(null)
    const isPending = ref(false)

    let docRef = projectFirestore.collection(collection).doc(id)

    async function deleteDoc(){
        isPending.value = true
        error.value = null

        try {
           const res = await docRef.delete()
           isPending.value = false
           return res
            
        } catch (err) {
            console.log(err.message)
            isPending.value = false
            error.value = 'document failed to delete'
            
        }

    }

     async function updateDoc(updates){
        isPending.value = true
        error.value = null

        try {
           const res = await docRef.update(updates)
           isPending.value = false
           return res
            
        } catch (err) {
            console.log(err.message)
            isPending.value = false
            error.value = 'document update failed'
            
        }

    }

    
    return { error, isPending, deleteDoc, updateDoc}

}

export default useDocument