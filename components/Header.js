const Header = {
    data() {
        return {
            isHighlightMode: false,
            isDarkTheme: localStorage.getItem('darkTheme') === 'true'
        }
    },
    computed: {
        availableLanguages() {
            return store.state.languages
        },
        currentLanguage() {
            return i18n.currentLanguage.value
        }
    },
    methods: {
        changeLanguage(langCode) {
            i18n.setLanguage(langCode)
        },
        resetAll() {
            if (confirm(this.$t('messages.resetConfirm'))) {
                store.resetToInitial()
                
                i18n.setLanguage('en')
                
                this.isDarkTheme = false
                document.body.classList.remove('dark-theme')
                localStorage.removeItem('darkTheme')
                
                if (this.isHighlightMode) {
                    this.toggleHighlightMode()
                }
            }
        },
        exportToFigma() {
            const tokensByLang = {}
            
            store.state.languages.forEach(lang => {
                const translations = store.state.translations.filter(t => t.langId === lang.id)
                tokensByLang[lang.code] = translations
            })
            
            const tokens = {}
            
            Object.entries(tokensByLang).forEach(([langCode, translations]) => {
                tokens[langCode] = {
                    "$type": "string",
                    "$description": `Translations for ${langCode} language`,
                    ...translations.reduce((acc, translation) => {
                        acc[translation.key] = {
                            "$type": "string",
                            "$value": translation.value,
                            "$description": `Translation for key: ${translation.key}`
                        }
                        return acc
                    }, {})
                }
            })
            
            const blob = new Blob([JSON.stringify(tokens, null, 2)], { type: 'application/design-tokens+json' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'translations.tokens.json'
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
        },
        handleTranslationClick(event) {
            const element = event.target.closest('[data-translate-key]')
            if (!element) return
            
            event.preventDefault()
            event.stopPropagation()
            
            if (element.closest('button')) {
                const button = element.closest('button')
                const originalType = button.type
                button.type = 'button'
                
                const key = element.getAttribute('data-translate-key')
                window.showTranslationModal(key, event)
                
                setTimeout(() => {
                    button.type = originalType
                }, 100)
                
                return
            }
            
            const key = element.getAttribute('data-translate-key')
            window.showTranslationModal(key, event)
        },
        enableHighlightMode() {
            document.addEventListener('click', this.handleTranslationClick, true)
        },
        disableHighlightMode() {
            document.removeEventListener('click', this.handleTranslationClick, true)
        },
        toggleHighlightMode() {
            this.isHighlightMode = !this.isHighlightMode
            document.body.classList.toggle('highlight-translations')
            
            if (this.isHighlightMode) {
                this.enableHighlightMode()
            } else {
                this.disableHighlightMode()
            }
        },
        toggleTheme() {
            this.isDarkTheme = !this.isDarkTheme
            document.body.classList.toggle('dark-theme')
            localStorage.setItem('darkTheme', this.isDarkTheme)
        }
    },
    mounted() {
        if (this.isDarkTheme) {
            document.body.classList.add('dark-theme')
        }
    },
    unmounted() {
        this.disableHighlightMode()
    },
    template: `
        <div class="header fixed-top py-2 px-3">
            <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div class="d-flex flex-wrap gap-2">
                    <button class="btn btn-warning btn-sm d-flex align-items-center gap-2" @click="resetAll">
                        <i class="bi bi-arrow-counterclockwise"></i>
                        <span data-translate-key="buttons.reset" class="d-none d-sm-inline">{{ $t('buttons.reset') }}</span>
                    </button>
                    <button class="btn btn-primary btn-sm d-flex align-items-center gap-2" @click="exportToFigma">
                        <i class="bi bi-box-arrow-up-right"></i>
                        <span data-translate-key="buttons.exportFigma" class="d-none d-sm-inline">{{ $t('buttons.exportFigma') }}</span>
                    </button>
                    <button 
                        class="btn btn-sm d-flex align-items-center gap-2" 
                        :class="isHighlightMode ? 'btn-success' : 'btn-outline-secondary'"
                        @click="toggleHighlightMode">
                        <i class="bi bi-translate"></i>
                        <span data-translate-key="buttons.highlight" class="d-none d-sm-inline">{{ $t('buttons.highlight') }}</span>
                    </button>
                </div>
                <div class="d-flex align-items-center gap-3">
                    <button 
                        class="btn btn-icon btn-sm"
                        :class="isDarkTheme ? 'btn-light' : 'btn-dark'"
                        @click="toggleTheme"
                        :title="isDarkTheme ? $t('buttons.lightTheme') : $t('buttons.darkTheme')">
                        <i class="bi" :class="isDarkTheme ? 'bi-sun' : 'bi-moon'"></i>
                    </button>
                    <select class="form-select form-select-sm" 
                            @change="changeLanguage($event.target.value)"
                            :value="currentLanguage"
                            style="min-width: 100px">
                        <option v-for="lang in availableLanguages" 
                                :key="lang.id" 
                                :value="lang.code">
                            {{ lang.name }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
    `
} 