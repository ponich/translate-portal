const i18n = {
    currentLanguage: Vue.ref('en'),

    setLanguage(langCode) {
        this.currentLanguage.value = langCode
        localStorage.setItem('currentLanguage', langCode)
    },

    translate(key) {
        const currentLangId = store.state.languages.find(l => l.code === this.currentLanguage.value)?.id
        if (!currentLangId) return key

        const translation = store.state.translations.find(
            t => t.key === key && t.langId === currentLangId
        )
        return translation?.value || key
    },

    init() {
        const savedLanguage = localStorage.getItem('currentLanguage')
        if (savedLanguage) {
            this.currentLanguage.value = savedLanguage
        }
    }
}

// Создаем Vue плагин
const i18nPlugin = {
    install(app) {
        i18n.init()
        
        app.config.globalProperties.$t = function(key) {
            const translation = Vue.computed(() => i18n.translate(key))
            // Переопределяем toString для корректного отображения в атрибутах
            translation.toString = () => i18n.translate(key)
            return translation
        }
        app.config.globalProperties.$i18n = i18n
    }
} 