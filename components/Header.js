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
            const exportData = {
                languages: store.state.languages,
                translations: store.state.translations,
                timestamp: new Date().toISOString()
            }
            
            const dataStr = JSON.stringify(exportData, null, 2)
            const dataBlob = new Blob([dataStr], { type: 'application/json' })
            const url = window.URL.createObjectURL(dataBlob)
            const link = document.createElement('a')
            link.href = url
            link.download = `translations-figma-${new Date().toISOString().split('T')[0]}.json`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
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