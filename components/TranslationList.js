const TranslationList = {
    data() {
        return {
            newTranslation: { key: '', value: '', langId: '' },
            editingTranslation: null
        }
    },
    computed: {
        languages() {
            return store.state.languages
        },
        currentLangId() {
            return parseInt(this.$route.params.langId) || ''
        },
        translations() {
            let translations = store.state.translations
            if (this.currentLangId) {
                translations = translations.filter(t => t.langId === this.currentLangId)
            }
            return translations
        }
    },
    methods: {
        addTranslation() {
            if (this.newTranslation.key && this.newTranslation.value && 
                (this.newTranslation.langId || this.currentLangId)) {
                store.addTranslation({
                    ...this.newTranslation,
                    langId: this.currentLangId || this.newTranslation.langId
                })
                this.newTranslation = { key: '', value: '', langId: '' }
            }
        },
        startEdit(translation) {
            this.editingTranslation = { ...translation }
        },
        saveEdit() {
            if (this.editingTranslation) {
                store.updateTranslation(
                    this.editingTranslation.id,
                    this.editingTranslation.langId,
                    this.editingTranslation
                )
                this.editingTranslation = null
            }
        },
        deleteTranslation(id, langId) {
            if (confirm(this.$t('messages.deleteConfirm'))) {
                store.deleteTranslation(id, langId)
            }
        },
        showTranslationModal(key, langId) {
            window.showTranslationModal(key, langId)
        },
        getLanguageName(langId) {
            const lang = this.languages.find(l => l.id === langId)
            return lang ? lang.name : this.$t('labels.unknown')
        }
    },
    template: `
        <div class="container mt-4">
            <h2 data-translate-key="titles.translations">
                {{ $t('titles.translations') }}
                <template v-if="currentLangId">
                    - {{ getLanguageName(currentLangId) }}
                </template>
            </h2>
            
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title" data-translate-key="titles.addTranslation">
                        {{ $t('titles.addTranslation') }}
                    </h5>
                    <div class="row g-3">
                        <div class="col-md-3">
                            <input type="text" 
                                class="form-control" 
                                v-model="newTranslation.key" 
                                :placeholder="$t('labels.translationKey')"
                                :aria-label="$t('labels.translationKey')">
                        </div>
                        <div class="col-md-3" v-if="!currentLangId">
                            <select class="form-control" 
                                v-model="newTranslation.langId"
                                :aria-label="$t('labels.selectLanguage')">
                                <option value="" data-translate-key="labels.selectLanguage">
                                    {{ $t('labels.selectLanguage') }}
                                </option>
                                <option v-for="lang in languages" 
                                    :key="lang.id" 
                                    :value="lang.id">
                                    {{ lang.name }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-4">
                            <input type="text" 
                                class="form-control" 
                                v-model="newTranslation.value" 
                                :placeholder="$t('labels.translationValue')"
                                :aria-label="$t('labels.translationValue')">
                        </div>
                        <div class="col-md-2">
                            <button class="btn btn-primary" @click="addTranslation">
                                <span data-translate-key="buttons.add">{{ $t('buttons.add') }}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <table class="table">
                <thead>
                    <tr>
                        <th data-translate-key="labels.translationKey">{{ $t('labels.translationKey') }}</th>
                        <th v-if="!currentLangId" data-translate-key="labels.language">
                            {{ $t('labels.language') }}
                        </th>
                        <th data-translate-key="labels.translationValue">{{ $t('labels.translationValue') }}</th>
                        <th data-translate-key="labels.actions">{{ $t('labels.actions') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="translation in translations" :key="translation.id + '-' + translation.langId">
                        <td>
                            <span class="translation-key" 
                                @click="showTranslationModal(translation.key, translation.langId)">
                                {{ translation.key }}
                            </span>
                        </td>
                        <td v-if="!currentLangId">
                            <router-link :to="'/translations/' + translation.langId">
                                {{ getLanguageName(translation.langId) }}
                            </router-link>
                        </td>
                        <td v-if="editingTranslation && 
                            editingTranslation.id === translation.id && 
                            editingTranslation.langId === translation.langId">
                            <input type="text" 
                                class="form-control" 
                                v-model="editingTranslation.value">
                        </td>
                        <td v-else>{{ translation.value }}</td>
                        <td>
                            <div class="btn-group">
                                <button v-if="editingTranslation && 
                                    editingTranslation.id === translation.id && 
                                    editingTranslation.langId === translation.langId"
                                    class="btn btn-success btn-sm"
                                    @click="saveEdit">
                                    <span data-translate-key="buttons.save">{{ $t('buttons.save') }}</span>
                                </button>
                                <button v-else
                                    class="btn btn-primary btn-sm"
                                    @click="startEdit(translation)">
                                    <span data-translate-key="buttons.edit">{{ $t('buttons.edit') }}</span>
                                </button>
                                <button class="btn btn-danger btn-sm"
                                    @click="deleteTranslation(translation.id, translation.langId)">
                                    <span data-translate-key="buttons.delete">{{ $t('buttons.delete') }}</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
} 