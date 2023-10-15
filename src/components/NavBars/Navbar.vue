<template>
    <nav class="nav-bar" :class="{ page: page, home: home}" >
        <div class="nav-header">
            <ul class="nav-links">
                <li><router-link :to="{ name: 'home'}">home</router-link></li>
                <li><router-link :to="{ name: 'products'}">products</router-link></li>
                <li> <router-link :to="{ name: 'about'}">about</router-link> </li>
            </ul>
            <button class="nav-toggle" @click="navToggle">
                <span class="material-icons">menu</span>
            </button>
        </div>

        <div class="nav-logo">
            <img :src="require(`@/assets/images/${logo}`)" alt="logo">
        </div>

        <div class="right-btns">
            <div class="user-btns">
                <router-link :to="{ name: 'signin'}" class="btn" v-if="!user">login</router-link>
                <router-link :to="{ name: 'signup'}" class="btn" v-if="!user">SignUp</router-link>
                <button class="btn" v-if="user" @click="handleClick">log out</button>
            
            </div>

            <div class="cart-toggle" @click="cartToggle">
                <button>
                    <span class="material-icons">
                    shopping_cart
                    </span>
                </button>
                <span class="cart-item-count">{{ itemCount }}</span>
            </div>
        </div>

    </nav>

    <section class="mobile-menu-overlay" :class="{ show: showMob}">
        <aside class="mobile-menu">
            <button class="mobile-menu-close" @click="handleClose">
                <span class="material-icons close-btn">close</span>
            </button>
            <ul class="mobile-nav-links">
                <li>
                  <router-link :to="{ name: 'home'}" class="sidebar-link">home</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'products'}" class="sidebar-link">products</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'about'}" class="sidebar-link">about</router-link>
                </li>
            </ul>
             <div class="user-btns" v-if="!user">
                <router-link :to="{ name: 'signin'}" class="btn">login</router-link>
                <router-link :to="{ name: 'signup'}" class="btn">SignUp</router-link>
            </div>
            <div class="user-btns">
                <button class="btn" v-if="user" @click="handleClick">log out</button>
            </div>
        </aside>
    </section>

    <!-- Cart Menu -->
    
    <section class="cart-overlay" :class="{ show: showCart}">
        <div class="cart-container">
            <div>
                <button class="close-cart-btn" @click="closeCart">
                    <span class="material-icons close-btn">close</span>
                </button>
                <h3 class="cart-title slanted-text">Your Bag</h3>
            </div>
            

            <div class="cart-items-container">
                <article class="cart-items" v-for="cart in carts" :key="cart.id">
                    <div class="col-1">
                        <img :src="cart.fields.image[0].thumbnails.large.url" class="cart-item-img" :alt="cart.fields.name">
                    </div>
                    <div class="col-2">
                        <div cart-info>
                            <h4 class="title">{{ cart.fields.name }}</h4>
                            <p class="price">{{ `${formatPrice(cart.fields.price)}` }}</p>

                            <button class="remove-btn" :data-id="cart.id">
                                remove
                            </button>
                        </div>
                        <div class="ctrl-btns" >
                            <button class="increase-btn" :data-id="cart.id" @click="handleIncrease">
                                <span class="material-icons">keyboard_arrow_up</span>
                            </button>
                            <span class="item-quantity" :data-id="cart.id">{{ cart.amount }}</span>
                            <button class="decrease-btn" :data-id="cart.id" @click="handleDecrease">
                                <span class="material-icons">keyboard_arrow_down</span>
                            </button>
                        </div>
                    </div>
                </article>
            </div>

            <footer>
                <h3 class="cart-total slanted-text">
                  total: {{ totalCost }}
                </h3>
                <a  href="payment.html" class="cart-checkout-btn btn">checkout</a>
            </footer>
        </div>
    </section>
</template>

<script>
import getCollection from '@/functions/getCollection'
import useDocument from '@/functions/useDocument'
import getUser from '@/functions/getUser'
import CartMenu from '../CartMenu.vue'
import useLogout from '@/functions/useLogout'
import { useRouter } from 'vue-router'
import getFormatPrice from '@/functions/getFormatPrice'
import { computed, onMounted, ref } from 'vue'
    export default {
        props: ['logo', 'page', 'home'],
        components: { CartMenu },
        
        setup(){
            const { user } = getUser()
            const showMob = ref(false)
            const showCart = ref(false)
            const {logout} = useLogout()
            const router = useRouter()
            const { formatPrice } = getFormatPrice()
            const { documents:carts } = getCollection('cart', ['userID', '==', user.value.uid])
            const itemCount = ref(0)
            const totalCost = ref(0)

            onMounted(()=>{
                setTimeout(()=>{
                    console.log(carts.value)
                    itemCount.value = computed(()=>{
                        let count = 0
                        carts.value.forEach((item)=>{
                            count += item.amount
                        })
                        return count
                    })
    
                    totalCost.value = computed(()=>{
                        let cost = 0
                        carts.value.forEach((item)=>{
                            cost += Number(item.fields.price) * Number(item.amount)
                        })
                         return formatPrice(cost)
                    })
                }, 1500)
            })

        
            async function handleIncrease(e){
                const targetElement = e.target
                const targetId = targetElement.dataset.id || targetElement.parentElement.dataset.id
                let targetItem = carts.value.find((item)=> item.id === targetId && item.userID === user.value.uid)
                if(targetItem){
                    const { updateDoc } = useDocument('cart', targetItem.id)
                    await updateDoc({
                        amount: targetItem.amount++
                    }) 
                    console.log(targetItem)
                }
            }
                

            function navToggle(){
                showMob.value = true
            }
            function handleClose(){
                showMob.value = false
            }
            function cartToggle(){
                showCart.value = true
                console.log(carts.value.length)
            }
            function closeCart(){
                showCart.value = false
            }
        

        async function handleClick(){
                await logout()
                console.log('logged out')
                router.push({ name: 'home'})

        }

            
            return { showMob, navToggle, handleClose, user, cartToggle, showCart, handleClick, closeCart, carts, formatPrice, itemCount, totalCost, handleIncrease}

        }
    }
</script>

<style scoped>
    .nav-bar {
    width: 90vw;
    max-width: var(--max-width);
    margin: 0 auto;
    height: 6.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 999;
}

.nav-header {
    display: flex;
    align-items: center;
}

.nav-header .nav-links {
    display: flex;
    gap: 3rem;
}

.right-btns, .user-btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
}

.right-btns .user-btns {
    gap: 0.5rem;
}


.btn {
    padding: 0.5rem 0.6rem;
    letter-spacing: 0.05rem;
    border-radius: 0.3rem;
    background: var(--clr-grey-10);
    color: var(--clr-grey-5);
    
}

.btn:hover {
    background: var(--clr-grey-5);
    color: var(--clr-grey-10);
}

.nav-header li {
    text-transform: capitalize;
    font-size: 1.2rem;
}

.nav-links a {
    transition: var(--transition);
}

.nav-links a:hover {
    color: var(--clr-primary-3);
}

.nav-header button {
    display: none;
}

.nav-logo {
    position: absolute;
    left: 50%;
    transform: translateX( -50%);
}


.cart-toggle {
    position: relative;
    cursor: pointer;
}

.cart-toggle button {
    background: transparent;
    border-color: transparent;
    font-size: 2.2rem;
    color: var(--clr-white);
    transition: var(--transition);
    cursor: pointer;
}

.page .cart-toggle button {
    color: var(--clr-grey-1);
}

.cart-toggle button:hover {
    transform: scale(1.1);
}

.cart-toggle .cart-item-count {
    position: absolute;
    top: -0.85rem;
    right: -0.85rem;
    font-size: 1rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    font-weight: bold;
    width: 1.75rem;
    height: 1.75rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
}

.page .nav-links a {
    color: var(--clr-grey-1);
  }

  .page .nav-links a:hover {
      color: var(--clr-primary-5);
  }

  .page .cart-toggle i {
      color: var(--clr-grey-1);
  }

  .home .user-btns .btn {
    background: var(--clr-primary-5);
    color: var(--clr-white);
  }

  .home .user-btns .btn:hover {
    background: var(--clr-primary-7);
    color: var(--clr-black);
  }

  /* Mobile Menu */

   .mobile-menu-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    display: grid;
    place-items: center;
    z-index: -1;
    transition: var(--transition);
    opacity: 0;
}

.mobile-menu-overlay.show {
    opacity: 1;
    z-index: 9999;
}

.mobile-menu {
    background: var(--clr-white);
    width: 90vw;
    height: 95vh;
    max-width: var(--fixed-width);
    padding: 4rem;
    border-radius: var(--radius);
    box-shadow: var(--dark-shadow); 
    position: relative;
    transform: scale(0);
}

.mobile-menu .user-btns {
    display: flex;
    gap: 2rem;
    margin: 2rem 0;
    justify-content: center;
}

.user-btns .btn {
    flex: 1;
    text-align: center;
    background: var(--clr-grey-10);
    color: var(--clr-grey-5);
    padding: 0.7rem 1.2rem;
}

.user-btns .btn:hover {
    background: var(--clr-grey-5);
    color: var(--clr-grey-10);
}

.show .mobile-menu {
    transform: scale(1);
}

.mobile-menu-close .close-btn {
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    color: var(--clr-grey-5);
    top: 1rem;
    right: 1.5rem;
    cursor: pointer;
    position: absolute;
    transition: var(--transition);
}

.mobile-menu-close .close-btn:hover {
    transform: rotate(45deg);
}

.mobile-nav-links {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 2rem;
    font-size: 1.5rem;
    text-transform: capitalize;
}

.mobile-nav-links a{
    color: var(--clr-grey-1);
    transition: var(--transition);
}

.mobile-nav-links a:hover {
    margin-left: 1rem;
}

.mobile-nav-links i {
    color: var(--clr-grey-5);
    margin-right: 1rem;
}

/* Cart Menu */

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
        overflow-y: auto;
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
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
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
        background: var(--clr-grey-5);
        color: var(--clr-grey-10);
    }

    .cart-checkout-btn:hover {
        background: var(--clr-primary-5);
    }


@media only screen and (min-width: 900px){
    .mobile-menu-overlay {
        display: none;
    }
}

@media only screen and (max-width: 900px){
    .nav-header .nav-links, .user-btns{
        display: none;
    }

    .nav-header .nav-toggle {
        display: grid;
        place-items: center;
        background: var(--clr-primary-5);
        border-color: transparent;
        color: var(--clr-white);
        width: 4rem;
        height: 2.25rem;
        font-size: 1.5rem;
        border-radius: 2rem;
        cursor: pointer;
        transition: var(--transition);
    }

    .nav-header .nav-toggle:hover {
        background: var(--clr-primary-3);
    }
}
</style>