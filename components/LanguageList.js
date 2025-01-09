const LanguageList = {
    data() {
        return {
            newLanguage: { code: '', name: '' },
            editingLanguage: null
        }
    },
    computed: {
        languages() {
            return store.state.languages
        }
    },
    methods: {
        addLanguage() {
            if (this.newLanguage.code && this.newLanguage.name) {
                store.addLanguage(this.newLanguage)
                this.newLanguage = { code: '', name: '' }
            }
        },
        startEdit(language) {
            this.editingLanguage = { ...language }
        },
        saveEdit() {
            if (this.editingLanguage) {
                store.updateLanguage(this.editingLanguage.id, this.editingLanguage)
                this.editingLanguage = null
            }
        },
        deleteLanguage(id) {
            if (confirm(this.$t('messages.deleteConfirm'))) {
                store.deleteLanguage(id)
            }
        }
    },
    template: `
        <div class="container mt-4">
            <h2 data-translate-key="titles.languages">{{ $t('titles.languages') }}</h2>
            
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title" data-translate-key="titles.addLanguage">
                        {{ $t('titles.addLanguage') }}
                    </h5>
                    <div class="row g-3">
                        <div class="col-md-4">
                            <input type="text" 
                                class="form-control" 
                                v-model="newLanguage.code" 
                                :placeholder="$t('labels.languageCode')"
                                :aria-label="$t('labels.languageCode')">
                        </div>
                        <div class="col-md-4">
                            <input type="text" 
                                class="form-control" 
                                v-model="newLanguage.name" 
                                :placeholder="$t('labels.languageName')"
                                :aria-label="$t('labels.languageName')">
                        </div>
                        <div class="col-md-4">
                            <button class="btn btn-primary" @click="addLanguage">
                                <span data-translate-key="buttons.add">{{ $t('buttons.add') }}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <table class="table">
                <thead>
                    <tr>
                        <th data-translate-key="labels.languageCode">{{ $t('labels.languageCode') }}</th>
                        <th data-translate-key="labels.languageName">{{ $t('labels.languageName') }}</th>
                        <th data-translate-key="labels.actions">{{ $t('labels.actions') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="language in languages" :key="language.id">
                        <td v-if="editingLanguage && editingLanguage.id === language.id">
                            <input type="text" class="form-control" v-model="editingLanguage.code">
                        </td>
                        <td v-else>{{ language.code }}</td>
                        
                        <td v-if="editingLanguage && editingLanguage.id === language.id">
                            <input type="text" class="form-control" v-model="editingLanguage.name">
                        </td>
                        <td v-else>{{ language.name }}</td>
                        
                        <td>
                            <div class="btn-group">
                                <button v-if="editingLanguage && editingLanguage.id === language.id"
                                        class="btn btn-success btn-sm"
                                        @click="saveEdit">
                                    <span data-translate-key="buttons.save">{{ $t('buttons.save') }}</span>
                                </button>
                                <button v-else
                                        class="btn btn-primary btn-sm"
                                        @click="startEdit(language)">
                                    <span data-translate-key="buttons.edit">{{ $t('buttons.edit') }}</span>
                                </button>
                                <button class="btn btn-danger btn-sm"
                                        @click="deleteLanguage(language.id)">
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