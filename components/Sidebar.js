const Sidebar = {
    template: `
        <nav class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div class="position-sticky pt-3">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/languages">
                            <span class="me-2">🌐</span>
                            <span data-translate-key="menu.languages">{{ $t('menu.languages') }}</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/translations">
                            <span class="me-2">🔤</span>
                            <span data-translate-key="menu.translations">{{ $t('menu.translations') }}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
    `
} 