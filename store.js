const initialTranslations = [
    // English translations
    { id: 1, key: 'menu.languages', langId: 1, value: 'Languages' },
    { id: 2, key: 'menu.translations', langId: 1, value: 'Translations' },
    { id: 3, key: 'buttons.add', langId: 1, value: 'Add' },
    { id: 4, key: 'buttons.edit', langId: 1, value: 'Edit' },
    { id: 5, key: 'buttons.delete', langId: 1, value: 'Delete' },
    { id: 6, key: 'buttons.save', langId: 1, value: 'Save' },
    { id: 7, key: 'titles.languages', langId: 1, value: 'Languages' },
    { id: 8, key: 'titles.translations', langId: 1, value: 'Translations' },
    { id: 9, key: 'titles.addLanguage', langId: 1, value: 'Add New Language' },
    { id: 10, key: 'titles.addTranslation', langId: 1, value: 'Add New Translation' },
    { id: 11, key: 'labels.languageCode', langId: 1, value: 'Language Code' },
    { id: 12, key: 'labels.languageName', langId: 1, value: 'Language Name' },
    { id: 13, key: 'labels.translationKey', langId: 1, value: 'Translation Key' },
    { id: 14, key: 'labels.translationValue', langId: 1, value: 'Translation Value' },
    { id: 15, key: 'labels.selectLanguage', langId: 1, value: 'Select Language' },
    { id: 16, key: 'messages.deleteConfirm', langId: 1, value: 'Are you sure you want to delete this?' },
    { id: 33, key: 'modal.title', langId: 1, value: 'Translation Details' },
    { id: 34, key: 'modal.key', langId: 1, value: 'Key' },
    { id: 35, key: 'modal.language', langId: 1, value: 'Language' },
    { id: 36, key: 'modal.translation', langId: 1, value: 'Translation' },
    { id: 37, key: 'modal.viewAll', langId: 1, value: 'View All Translations' },
    { id: 38, key: 'modal.notFound', langId: 1, value: 'Translation not found' },
    { id: 39, key: 'buttons.close', langId: 1, value: 'Close' },
    
    // German translations
    { id: 17, key: 'menu.languages', langId: 2, value: 'Sprachen' },
    { id: 18, key: 'menu.translations', langId: 2, value: 'Übersetzungen' },
    { id: 19, key: 'buttons.add', langId: 2, value: 'Hinzufügen' },
    { id: 20, key: 'buttons.edit', langId: 2, value: 'Bearbeiten' },
    { id: 21, key: 'buttons.delete', langId: 2, value: 'Löschen' },
    { id: 22, key: 'buttons.save', langId: 2, value: 'Speichern' },
    { id: 23, key: 'titles.languages', langId: 2, value: 'Sprachen' },
    { id: 24, key: 'titles.translations', langId: 2, value: 'Übersetzungen' },
    { id: 25, key: 'titles.addLanguage', langId: 2, value: 'Neue Sprache hinzufügen' },
    { id: 26, key: 'titles.addTranslation', langId: 2, value: 'Neue Übersetzung hinzufügen' },
    { id: 27, key: 'labels.languageCode', langId: 2, value: 'Sprachcode' },
    { id: 28, key: 'labels.languageName', langId: 2, value: 'Sprachname' },
    { id: 29, key: 'labels.translationKey', langId: 2, value: 'Übersetzungsschlüssel' },
    { id: 30, key: 'labels.translationValue', langId: 2, value: 'Übersetzungswert' },
    { id: 31, key: 'labels.selectLanguage', langId: 2, value: 'Sprache auswählen' },
    { id: 32, key: 'messages.deleteConfirm', langId: 2, value: 'Sind Sie sicher, dass Sie dies löschen möchten?' },
    { id: 40, key: 'modal.title', langId: 2, value: 'Übersetzungsdetails' },
    { id: 41, key: 'modal.key', langId: 2, value: 'Schlüssel' },
    { id: 42, key: 'modal.language', langId: 2, value: 'Sprache' },
    { id: 43, key: 'modal.translation', langId: 2, value: 'Übersetzung' },
    { id: 44, key: 'modal.viewAll', langId: 2, value: 'Alle Übersetzungen anzeigen' },
    { id: 45, key: 'modal.notFound', langId: 2, value: 'Übersetzung nicht gefunden' },
    { id: 46, key: 'buttons.close', langId: 2, value: 'Schließen' },
    
    // English
    { id: 47, key: 'labels.actions', langId: 1, value: 'Actions' },
    { id: 48, key: 'labels.language', langId: 1, value: 'Language' },
    
    // German
    { id: 49, key: 'labels.actions', langId: 2, value: 'Aktionen' },
    { id: 50, key: 'labels.language', langId: 2, value: 'Sprache' },
    { id: 51, key: 'buttons.reset', langId: 1, value: 'Reset All Changes' },
    { id: 52, key: 'buttons.exportFigma', langId: 1, value: 'Export to Figma' },
    { id: 53, key: 'messages.resetConfirm', langId: 1, value: 'Are you sure you want to reset all changes? This cannot be undone.' },
    { id: 54, key: 'buttons.reset', langId: 2, value: 'Alle Änderungen zurücksetzen' },
    { id: 55, key: 'buttons.exportFigma', langId: 2, value: 'Nach Figma exportieren' },
    { id: 56, key: 'messages.resetConfirm', langId: 2, value: 'Sind Sie sicher, dass Sie alle Änderungen zurücksetzen möchten? Dies kann nicht rückgängig gemacht werden.' }
]

const store = {
    state: Vue.reactive({
        languages: JSON.parse(localStorage.getItem('languages')) || [
            { id: 1, code: 'en', name: 'English' },
            { id: 2, code: 'de', name: 'Deutsch' }
        ],
        translations: JSON.parse(localStorage.getItem('translations')) || initialTranslations
    }),

    saveToLocalStorage() {
        localStorage.setItem('languages', JSON.stringify(this.state.languages))
        localStorage.setItem('translations', JSON.stringify(this.state.translations))
    },

    addLanguage(language) {
        const newLanguage = {
            id: Date.now(),
            ...language
        }
        this.state.languages.unshift(newLanguage)
        this.saveToLocalStorage()
        
        // Добавляем базовые переводы для нового языка
        const baseTranslations = this.state.translations
            .filter(t => t.langId === 1)
            .map(t => ({
                id: Date.now() + Math.random(),
                key: t.key,
                langId: newLanguage.id,
                value: t.key
            }))
        
        this.state.translations.unshift(...baseTranslations)
        this.saveToLocalStorage()
    },

    deleteLanguage(id) {
        this.state.languages = this.state.languages.filter(lang => lang.id !== id)
        this.state.translations = this.state.translations.filter(trans => trans.langId !== id)
        this.saveToLocalStorage()
    },

    updateLanguage(id, data) {
        const index = this.state.languages.findIndex(lang => lang.id === id)
        if (index !== -1) {
            this.state.languages[index] = { ...this.state.languages[index], ...data }
            this.saveToLocalStorage()
        }
    },

    addTranslation(translation) {
        const newTranslation = {
            id: Date.now(),
            ...translation
        }
        this.state.translations.unshift(newTranslation)
        this.saveToLocalStorage()
    },

    deleteTranslation(id, langId) {
        this.state.translations = this.state.translations.filter(
            trans => !(trans.id === id && trans.langId === langId)
        )
        this.saveToLocalStorage()
    },

    updateTranslation(id, langId, data) {
        const index = this.state.translations.findIndex(
            trans => trans.id === id && trans.langId === langId
        )
        if (index !== -1) {
            this.state.translations[index] = { ...this.state.translations[index], ...data }
            this.saveToLocalStorage()
        }
    },

    resetToInitial() {
        this.state.languages = [
            { id: 1, code: 'en', name: 'English' },
            { id: 2, code: 'de', name: 'Deutsch' }
        ]
        this.state.translations = [...initialTranslations]
        this.saveToLocalStorage()
    }
} 