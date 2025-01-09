const Header = {
    data() {
        return {
            isHighlightMode: false
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
        toggleHighlightMode() {
            this.isHighlightMode = !this.isHighlightMode
            document.body.classList.toggle('highlight-translations')
            
            if (this.isHighlightMode) {
                this.enableHighlightMode()
            } else {
                this.disableHighlightMode()
            }
        },
        enableHighlightMode() {
            document.addEventListener('click', this.handleTranslationClick)
        },
        disableHighlightMode() {
            document.removeEventListener('click', this.handleTranslationClick)
        },
        handleTranslationClick(event) {
            const element = event.target.closest('[data-translate-key]')
            if (element) {
                event.preventDefault()
                event.stopPropagation()
                const key = element.getAttribute('data-translate-key')
                window.showTranslationModal(key, event)
            }
        }
    },
    unmounted() {
        this.disableHighlightMode()
    },
    template: `
        <div class="header fixed-top bg-light py-2 px-3">
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex gap-2">
                    <button class="btn btn-warning btn-sm" @click="resetAll">
                        <i class="bi bi-arrow-counterclockwise"></i>
                        <span data-translate-key="buttons.reset">{{ $t('buttons.reset') }}</span>
                    </button>
                    <button class="btn btn-primary btn-sm" @click="exportToFigma">
                        <i class="bi bi-box-arrow-up-right"></i>
                        <span data-translate-key="buttons.exportFigma">{{ $t('buttons.exportFigma') }}</span>
                    </button>
                    <button 
                        class="btn btn-sm" 
                        :class="isHighlightMode ? 'btn-success' : 'btn-outline-secondary'"
                        @click="toggleHighlightMode">
                        <i class="bi bi-translate"></i>
                        <span data-translate-key="buttons.highlight">{{ $t('buttons.highlight') }}</span>
                    </button>
                </div>
                <select class="form-select form-select-sm w-auto" 
                        @change="changeLanguage($event.target.value)"
                        :value="currentLanguage">
                    <option v-for="lang in availableLanguages" 
                            :key="lang.id" 
                            :value="lang.code">
                        {{ lang.name }}
                    </option>
                </select>
            </div>
        </div>
    `
} 