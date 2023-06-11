<template>
    <div class="payment-page user">
    <form id="paymentForm" @submit.prevent="handleSubmit">
    <h3>Sign In</h3>
            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email-address" required placeholder="something@gmail.com" v-model="email"/>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="Password" id="password" placeholder="Password" v-model="password"/>
            </div>
            <div v-if="error">{{ error }}</div>
            <div class="form-submit">
                <button v-if="isPending" class="payment-btn btn">Loading....</button>
                <button v-else class="payment-btn btn">SignIn</button>
            </div>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import useLogin from '@/functions/useLogin'
import { useRouter } from 'vue-router';

    export default {
        setup(){
            const password = ref('')
            const email = ref('')
            const { error, login, isPending } = useLogin()
            const router = useRouter()

            async function handleSubmit(){
               const response = await login(email.value, password.value)
               if(!error.value){
                router.push({ name: 'home'})
               }
            }
            return { email, password, error, isPending, handleSubmit}
        }

    }
</script>

<style scoped>

</style>