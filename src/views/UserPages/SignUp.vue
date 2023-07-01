<template>
     <div class="payment-page user">
        <form id="paymentForm" @submit.prevent="handleSubmit">
        <h3>Sign Up</h3>
        <div class="form-group">
                <label for="displayName">Display Name</label>
                <input type="text" id="displayName" required placeholder="Display Name" v-model="displayName"/>
            </div>
            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email-address" required placeholder="something@gmail.com" v-model="email"/>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="Password" id="password" placeholder="Password" v-model="password" />
            </div>
            
            <div v-if="error">{{ error }}</div>
            <div class="alt-route">
                <span>Already have an account? </span>
                <router-link class="route" :to="{ name: 'signin'}">Sign In</router-link>
            </div>
            <div class="form-submit">
                <button class="payment-btn btn" v-if="isPending">Loading</button>
                <button class="payment-btn btn" v-else>Sign Up</button>
            </div>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import useSignup from '@/functions/useSignup';
import { useRouter } from 'vue-router';

    export default {
        setup(){
            const password = ref('')
            const email = ref('')
            const displayName = ref('')
            const { error, signup, isPending } = useSignup()
            const router = useRouter()

            async function handleSubmit(){
                const res = await signup(email.value, password.value, displayName.value)

                if(!error.value){
                    router.push({ name: 'home'})
                }
            }



            return { email, password, displayName, handleSubmit, isPending, error}
        }
    }

</script>

<style scoped>

</style>