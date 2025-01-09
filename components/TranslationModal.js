const TranslationModal = {
    data() {
        return {
            show: false,
            currentKey: null,
            translations: [],
            editMode: false,
            modalStyle: {
                top: '0px',
                left: '0px'
            }
        }
    },
    computed: {
        languages() {
            return store.state.languages
        }
    },
    methods: {
        showModal(key, event) {
            this.currentKey = key
            this.translations = this.languages.map(lang => {
                const translation = store.state.translations.find(
                    t => t.key === key && t.langId === lang.id
                )
                return {
                    langId: lang.id,
                    langCode: lang.code,
                    langName: lang.name,
                    value: translation?.value || '',
                    id: translation?.id
                }
            })

            // Позиционируем модальное окно рядом с кликнутым элементом
            if (event) {
                const rect = event.target.getBoundingClientRect()
                const modalWidth = 400 // Примерная ширина модального окна
                const modalHeight = 300 // Примерная высота модального окна
                
                // Определяем, поместится ли модальное окно справа
                let left = rect.right + 10
                if (left + modalWidth > window.innerWidth) {
                    left = rect.left - modalWidth - 10
                }
                
                // Определяем, поместится ли модальное окно снизу
                let top = rect.top
                if (top + modalHeight > window.innerHeight) {
                    top = window.innerHeight - modalHeight - 10
                }
                
                // Убеждаемся, что окно не выходит за пределы экрана
                top = Math.max(10, Math.min(top, window.innerHeight - modalHeight - 10))
                left = Math.max(10, Math.min(left, window.innerWidth - modalWidth - 10))
                
                this.modalStyle = {
                    position: 'fixed',
                    top: `${top}px`,
                    left: `${left}px`
                }
            }
            
            this.show = true
        },
        hideModal() {
            this.show = false
            this.currentKey = null
            this.translations = []
            this.editMode = false
        },
        saveTranslations() {
            this.translations.forEach(translation => {
                if (translation.id) {
                    store.updateTranslation(
                        translation.id,
                        translation.langId,
                        { value: translation.value }
                    )
                } else if (translation.value) {
                    store.addTranslation({
                        key: this.currentKey,
                        langId: translation.langId,
                        value: translation.value
                    })
                }
            })
            this.hideModal()
        }
    },
    mounted() {
        window.showTranslationModal = this.showModal
    },
    template: `
        <div v-if="show" class="translation-modal" :style="modalStyle">
            <div class="card shadow">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h6 class="mb-0">
                        <span data-translate-key="modal.editTranslation">{{ $t('modal.editTranslation') }}</span>
                        <small class="text-muted ms-2">{{ currentKey }}</small>
                    </h6>
                    <button type="button" class="btn-close" @click="hideModal"></button>
                </div>
                <div class="card-body">
                    <div class="mb-3" v-for="translation in translations" :key="translation.langId">
                        <label class="form-label">{{ translation.langName }}</label>
                        <input 
                            type="text" 
                            class="form-control form-control-sm"
                            v-model="translation.value"
                            :placeholder="$t('modal.enterTranslation')">
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-end gap-2">
                    <button type="button" class="btn btn-sm btn-secondary" @click="hideModal">
                        {{ $t('buttons.cancel') }}
                    </button>
                    <button type="button" class="btn btn-sm btn-primary" @click="saveTranslations">
                        {{ $t('buttons.save') }}
                    </button>
                </div>
            </div>
        </div>
    `
}