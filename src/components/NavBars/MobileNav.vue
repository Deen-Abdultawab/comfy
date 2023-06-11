<template>
    <section class="mobile-menu-overlay" :class="{ show: show}">
        <aside class="mobile-menu">
            <button class="mobile-menu-close" @click="handleClose">
                <span class="material-icons close-btn">close</span>
            </button>
            <ul class="mobile-nav-links">
                <li>
                  <a href="index.html" class="sidebar-link">
                    <i class="fas fa-home fa-fw"></i>
                    home
                  </a>
                </li>
                <li>
                  <a href="products.html" class="sidebar-link">
                    <i class="fas fa-couch fa-fw"></i>
                    products
                  </a>
                </li>
                <li>
                  <a href="about.html" class="sidebar-link">
                    <i class="fas fa-book fa-fw"></i>
                    about
                  </a>
                </li>
            </ul>
             <div class="user-btns">
                <router-link :to="{ name: 'signin'}" class="btn">login</router-link>
                <router-link :to="{ name: 'signup'}" class="btn">SignUp</router-link>
            </div>
        </aside>
    </section>
</template>

<script>
    export default {
        props: [ 'show' ],
       
        
    }
</script>

<style  scoped>
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

.user-btns {
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

@media only screen and (min-width: 900px){
    .mobile-menu-overlay {
        display: none;
    }
}
</style>