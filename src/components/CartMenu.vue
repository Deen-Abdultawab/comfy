<template>
    <section class="cart-overlay" :class="{ show: propValue}">
        <div class="cart-container">
            <div>
                <button class="close-cart-btn" @click="handleClose">
                    <span class="material-icons close-btn">close</span>
                </button>
                <h3 class="cart-title slanted-text">Your Bag</h3>
            </div>
            

            <div class="cart-items-container">
                
            </div>

            <footer>
                <h3 class="cart-total slanted-text">
                  total : $00.00
                </h3>
                <a  href="payment.html" class="cart-checkout-btn btn">checkout</a>
            </footer>
        </div>
    </section>
</template>

<script>
    export default {
       
        
    }
</script>

<style scoped>
    .cart-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        transition: var(--transition);
        z-index: -1;
        opacity: 0;
    }

    .cart-overlay.show {
        opacity: 1;
        z-index: 9999;
    }

    .cart-container {
        position: fixed;
        top: 0;
        right: 0;
        background: var(--clr-grey-10);
        width: 95vw;
        height: 100%;
        max-width: 400px;
        padding: 1.5rem 1rem 0;
        display: grid;
        grid-template-rows: auto 1fr auto;
        overflow: scroll;
        transition: var(--transition);
        transform: translateX(100%);
    }

    .show .cart-container {
        transform: translateX(0);
    }

    .close-cart-btn{
        background: transparent;
        border-color: transparent;
        color: var(--clr-grey-5);
        cursor: pointer;
        transition: var(--transition);
        /* padding: 0.5rem; */
    }

    .close-cart-btn .close-btn{
        font-size: 2.5rem;
        font-weight: bold;
        
    }

    .close-cart-btn:hover {
        color: var(--clr-primary-5);
    }

    .cart-title {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 3rem;
        font-weight: 500;
    }

    .cart-item-img {
        width: 75px;
        height: 50px;
        border-radius: var(--radius);
    }

    .cart-items {
        display: flex ;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    .col-2 {
        flex: 1;
        display: flex;
        justify-content: space-between;
    }

    .remove-btn {
        margin-top: 0.5rem;
        border-color: transparent;
        cursor: pointer;
        transition: var(--transition);
    }

    .remove-btn:hover {
        color: var(--clr-primary-5);
    }

    .col-2 .price {
        font-size: 0.75rem;
        color: var(--clr-grey-3);
    }

    .cart-items .ctrl-btns {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0;
        
    }

    .increase-btn, .decrease-btn {
        border: none;
        border-color: transparent;
        background: transparent;
        color: var(--clr-primary-5);
        cursor: pointer;
        font-size: 0.85rem;
        padding: 0.25rem;
        font-weight: bold;
    }

    .item-quantity {
        color: var(--clr-grey-3);
        font-weight: bold;
    }

    footer {
        width: 100%;
        text-align: center;
        margin-top: 2rem;
    }

    .cart-checkout-btn {
        width: 70%;
        margin: 2rem 0 1.5rem;
    }
</style>