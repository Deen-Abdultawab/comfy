import { projectStorage } from "@/firebase/config";
import { ref } from "vue";
import getUser from "./getUser";

function useStorage(){
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)
    const { user } = getUser()

    async function uploadImage(file){
        filePath.value = `covers/${user.value.uid}/${file.name}`
        const storageRef = projectStorage.ref(filePath.value)

        try {
            const response = await storageRef.put(file)
            url.value = await response.ref.getDownloadURL()
            
        } catch (err) {
            console.log(err.message)
            error.value = err.message
        }
    }

    async function uploadSong(file){
        filePath.value = `songs/${user.value.uid}/${file.name}`
        const storageRef = projectStorage.ref(filePath.value)

        try {
            const response = await storageRef.put(file)
            url.value = await response.ref.getDownloadURL()
            
        } catch (err) {
            console.log(err.message)
            error.value = err.message
        }
    }

    async function deleteImg(path){
        const storageRef = projectStorage.ref(path)
        try {
            await storageRef.delete()
        } catch (err) {
            console.log(err.message)
            error.value = err.message
        }
    }

     async function deleteSong(path) {
       const storageRef = projectStorage.ref(path);
       try {
         await storageRef.delete();
       } catch (err) {
         console.log(err.message);
         error.value = err.message;
       }
     }


    return { url, filePath, error, uploadImage, deleteImg, uploadSong, deleteSong}
}

export default useStorage