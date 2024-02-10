<template>
    <article class="single-product" v-for="product in products" :key="product.id">
        <div class="top">
            <img :src="product.fields.image[0].thumbnails.large.url" alt="furniture" class="product-img">
            <div class="product-icons">
                <router-link :to="{ name: 'product', params: { id: product.id}}"  class="product-icon">
                    <span class="material-icons">
                    search
                    </span>
                </router-link>
                <button class="product-cart-btn product-icon" :data-id="product.id" @click="addToCart">
                    <span class="material-icons">
                    shopping_cart
                    </span>
                </button>
            </div>
        </div>
        
        <div class="footer">
            <h3 class="product-name">{{ product.fields.name }}</h3>
            <p class="product-price">{{ `${formatPrice(product.fields.price)}` }}</p>
        </div>
    </article>
</template>

<script>
import getCollection from '@/functions/getCollection'
import getFormatPrice from '../functions/getFormatPrice'
import useDocument from '@/functions/useDocument'
import { timestamp, projectFirestore } from '@/firebase/config'
import getUser from '@/functions/getUser'
import { useRouter } from 'vue-router'
    export default {
        props: ['products'],
        setup(props){
            const { documents } = getCollection('cart')
            const { formatPrice } = getFormatPrice()
            const { user } = getUser()
            const router = useRouter()
                    


            async function addToCart(e){
                if(user.value){
                    const target = e.target
                    const targetID = target.dataset.id || target.parentElement.dataset.id
    
                    const item = documents.value.find((cartItem)=> cartItem.id === targetID && cartItem.userID === user.value.uid)
                    
                    if(!item){                   
                        console.log('exist not')
                        let product = props.products.find((storeItem)=> storeItem.id === targetID)
                        const { id } = product
                        console.log(id)
                        const res = await projectFirestore.collection('cart').doc(id).set({
                            ...product, 
                            amount:1, 
                            createdAt: timestamp(),
                            userID: user.value.uid,
                        })
                    } else {
                        console.log('exist')
                        // const { updateDoc } = useDocument('cart', item.id)
                        const res = await projectFirestore.collection('cart').doc(item.id).update({
                            amount: item.amount++
                        })
                       
                        console.log('updated ', documents.value, item, documents.value)
                    }
                } else {
                    router.push({ name: 'signin'})
                }

            }

            return { formatPrice, addToCart }
        }

    }
</script>


<style scoped>

</style>