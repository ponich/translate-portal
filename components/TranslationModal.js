const TranslationModal = {
    data() {
        return {
            show: false,
            currentKey: null,
            currentLangId: null
        }
    },
    computed: {
        translation() {
            if (!this.currentKey || !this.currentLangId) return null
            return store.state.translations.find(
                t => t.key === this.currentKey && t.langId === this.currentLangId
            )
        },
        language() {
            if (!this.currentLangId) return null
            return store.state.languages.find(l => l.id === this.currentLangId)
        }
    },
    methods: {
        showModal(key, langId) {
            this.currentKey = key
            this.currentLangId = langId
            this.show = true
        },
        hideModal() {
            this.show = false
            this.currentKey = null
            this.currentLangId = null
        }
    },
    mounted() {
        window.showTranslationModal = this.showModal
    },
    template: `
        <div v-if="show" class="modal d-block" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" data-translate-key="modal.title">
                            {{ $t('modal.title') }}
                        </h5>
                        <button type="button" 
                            class="btn-close" 
                            @click="hideModal"
                            :aria-label="$t('buttons.close')">
                        </button>
                    </div>
                    <div class="modal-body">
                        <div v-if="translation">
                            <p>
                                <strong data-translate-key="modal.key">{{ $t('modal.key') }}</strong>: 
                                {{ translation.key }}
                            </p>
                            <p>
                                <strong data-translate-key="modal.language">{{ $t('modal.language') }}</strong>: 
                                {{ language?.name }}
                            </p>
                            <p>
                                <strong data-translate-key="modal.translation">{{ $t('modal.translation') }}</strong>: 
                                {{ translation.value }}
                            </p>
                            <router-link 
                                :to="'/translations/' + currentLangId"
                                class="btn btn-primary"
                                @click="hideModal">
                                <span data-translate-key="modal.viewAll">{{ $t('modal.viewAll') }}</span>
                            </router-link>
                        </div>
                        <div v-else>
                            <p data-translate-key="modal.notFound">{{ $t('modal.notFound') }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop fade show"></div>
        </div>
    `
}