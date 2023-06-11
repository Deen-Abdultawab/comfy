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
                <button class="product-cart-btn product-icon" :data-id="product.id">
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
import getFormatPrice from '../functions/getFormatPrice'
    export default {
        props: ['products'],
        setup(){
            const { formatPrice } = getFormatPrice()


            return { formatPrice }
        }

    }
</script>


<style scoped>

</style>