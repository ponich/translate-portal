const app = Vue.createApp({
    template: `
        <app-header></app-header>
        <div class="container-fluid">
            <div class="row">
                <sidebar></sidebar>
                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <router-view></router-view>
                </main>
            </div>
        </div>
    `
})

// Регистрируем компоненты
app.component('app-header', Header)
app.component('sidebar', Sidebar)

const routes = [
    { 
        path: '/', 
        redirect: '/languages' 
    },
    { 
        path: '/languages', 
        component: LanguageList 
    },
    { 
        path: '/translations', 
        component: TranslationList 
    },
    { 
        path: '/translations/:langId', 
        component: TranslationList 
    }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})

app.use(router)
app.use(i18nPlugin)
app.mount('#app') 