class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.querySelector('.theme-icon');
        this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
    }

    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    getStoredTheme() {
        return localStorage.getItem('portfolio-theme');
    }

    storeTheme(theme) {
        localStorage.setItem('portfolio-theme', theme);
    }

    applyTheme(theme) {
        // Add transition effect
        document.body.classList.add('theme-changing');
        
        document.documentElement.setAttribute('data-theme', theme);
        this.updateToggleIcon(theme);
        this.currentTheme = theme;
        this.storeTheme(theme);
        
        // Remove transition class after animation
        setTimeout(() => {
            document.body.classList.remove('theme-changing');
        }, 400);
    }

    updateToggleIcon(theme) {
        if (this.themeIcon) {
            this.themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add rotation animation
        if (this.themeToggle) {
            this.themeToggle.classList.add('rotating');
            setTimeout(() => {
                this.themeToggle.classList.remove('rotating');
            }, 300);
        }

        this.applyTheme(newTheme);
    }

    setupEventListeners() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!this.getStoredTheme()) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}

class PortfolioShowcase {
    constructor() {
        this.projectsGrid = document.getElementById('projectsGrid');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.projects = [];
        this.init();
    }

    async init() {
        this.showLoading();
        await this.loadProjects();
        this.renderProjects();
        this.hideLoading();
    }

    showLoading() {
        this.loadingOverlay.classList.add('active');
    }

    hideLoading() {
        this.loadingOverlay.classList.remove('active');
    }

    async loadProjects() {
        // Since we can't access the filesystem directly from the browser,
        // we'll define the projects manually. In a real scenario, this could
        // come from a JSON file or API endpoint.
        this.projects = [
            {
                name: 'animated-modern-hero-section',
                title: 'Animated Modern Hero Section',
                description: 'A stunning hero section with modern animations, floating shapes, and gradient effects. Perfect for landing pages and portfolios.',
                tags: ['HTML', 'CSS', 'JavaScript', 'Animations'],
                status: 'completed',
                icon: '🚀',
                path: './animated-modern-hero-section/',
                features: [
                    'Smooth animations',
                    'Responsive design',
                    'Modern UI/UX',
                    'Cross-browser compatible'
                ]
            }
            // Add more projects here as they are created
        ];

        // Simulate loading delay for better UX
        await new Promise(resolve => setTimeout(resolve, 800));
    }

    generateProjectIcon(projectName) {
        const icons = {
            'animated': '🎬',
            'hero': '🚀',
            'modern': '✨',
            'dashboard': '📊',
            'portfolio': '💼',
            'ecommerce': '🛒',
            'blog': '📝',
            'landing': '🎯',
            'chat': '💬',
            'weather': '🌤️',
            'todo': '✅',
            'calculator': '🔢',
            'gallery': '🖼️',
            'form': '📋',
            'card': '🃏'
        };

        // Try to match keywords in project name
        for (const [keyword, icon] of Object.entries(icons)) {
            if (projectName.toLowerCase().includes(keyword)) {
                return icon;
            }
        }

        return '📁'; // Default icon
    }

    generateProjectDescription(projectName) {
        const descriptions = {
            'animated-modern-hero-section': 'A stunning hero section with modern animations, floating shapes, and gradient effects. Perfect for landing pages and portfolios.',
            'dashboard': 'Interactive dashboard with charts, widgets, and real-time data visualization.',
            'portfolio': 'Clean and professional portfolio showcase with smooth transitions.',
            'ecommerce': 'Modern e-commerce interface with shopping cart and product listings.',
            'blog': 'Responsive blog layout with clean typography and reading experience.',
            'landing': 'High-converting landing page with call-to-action sections.',
            'chat': 'Real-time chat application with modern messaging interface.',
            'weather': 'Beautiful weather app with location-based forecasts and animations.',
            'todo': 'Productive task management app with drag-and-drop functionality.',
            'calculator': 'Scientific calculator with advanced mathematical operations.',
            'gallery': 'Responsive image gallery with lightbox and filtering options.',
            'form': 'Advanced form builder with validation and custom styling.'
        };

        return descriptions[projectName] || 'Modern web application built with latest technologies and best practices.';
    }

    generateProjectTags(projectName) {
        const commonTags = ['HTML', 'CSS', 'JavaScript'];
        const specificTags = {
            'animated': ['Animations', 'GSAP', 'CSS3'],
            'react': ['React', 'JSX', 'Components'],
            'vue': ['Vue.js', 'Vuex', 'Vue Router'],
            'angular': ['Angular', 'TypeScript', 'RxJS'],
            'node': ['Node.js', 'Express', 'API'],
            'dashboard': ['Charts', 'Data Viz', 'D3.js'],
            'ecommerce': ['Shopping Cart', 'Payment', 'Stripe'],
            'chat': ['WebSocket', 'Real-time', 'Socket.io'],
            'weather': ['API Integration', 'Geolocation', 'Charts'],
            'form': ['Validation', 'UI/UX', 'Accessibility']
        };

        let tags = [...commonTags];
        
        for (const [keyword, additionalTags] of Object.entries(specificTags)) {
            if (projectName.toLowerCase().includes(keyword)) {
                tags = [...tags, ...additionalTags];
                break;
            }
        }

        return tags.slice(0, 4); // Limit to 4 tags
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.onclick = () => this.openProject(project.path);

        const icon = project.icon || this.generateProjectIcon(project.name);
        const tags = project.tags || this.generateProjectTags(project.name);
        const description = project.description || this.generateProjectDescription(project.name);

        card.innerHTML = `
            <div class="card-header">
                <div class="card-icon">${icon}</div>
                <h3 class="card-title">${project.title}</h3>
                <p class="card-description">${description}</p>
            </div>
            <div class="card-content">
                <div class="card-tags">
                    ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="card-footer">
                <button class="view-button" onclick="event.stopPropagation(); window.open('${project.path}', '_blank')">
                    View Project
                    <span>→</span>
                </button>
                <div class="project-status">
                    <div class="status-dot"></div>
                    <span>${project.status || 'completed'}</span>
                </div>
            </div>
        `;

        return card;
    }

    renderProjects() {
        this.projectsGrid.innerHTML = '';

        if (this.projects.length === 0) {
            this.renderEmptyState();
            return;
        }

        this.projects.forEach((project, index) => {
            const card = this.createProjectCard(project);
            card.style.animationDelay = `${index * 0.1}s`;
            this.projectsGrid.appendChild(card);
        });
    }

    renderEmptyState() {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <h3>No Projects Found</h3>
            <p>Start building amazing projects and they will appear here automatically!</p>
        `;
        this.projectsGrid.appendChild(emptyState);
    }

    openProject(path) {
        // Add loading effect
        this.showLoading();
        
        // Simulate loading and then open project
        setTimeout(() => {
            window.open(path, '_blank');
            this.hideLoading();
        }, 500);
    }

    // Method to add new projects dynamically
    addProject(projectData) {
        this.projects.push(projectData);
        this.renderProjects();
    }

    // Method to filter projects
    filterProjects(searchTerm) {
        const filtered = this.projects.filter(project => 
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        
        this.projectsGrid.innerHTML = '';
        filtered.forEach((project, index) => {
            const card = this.createProjectCard(project);
            card.style.animationDelay = `${index * 0.1}s`;
            this.projectsGrid.appendChild(card);
        });
    }
}

// Enhanced project data structure for future projects
const projectTemplates = {
    'react-dashboard': {
        title: 'React Dashboard',
        description: 'Modern admin dashboard built with React and Chart.js featuring real-time analytics.',
        tags: ['React', 'Chart.js', 'Dashboard', 'Analytics'],
        icon: '📊'
    },
    'vue-portfolio': {
        title: 'Vue Portfolio',
        description: 'Clean portfolio website built with Vue.js and smooth page transitions.',
        tags: ['Vue.js', 'Portfolio', 'Animations', 'SPA'],
        icon: '💼'
    },
    'vanilla-calculator': {
        title: 'Vanilla Calculator',
        description: 'Scientific calculator built with pure JavaScript and modern UI design.',
        tags: ['JavaScript', 'Calculator', 'Math', 'UI/UX'],
        icon: '🔢'
    }
};

// Utility functions for future use
const utils = {
    // Convert folder name to title case
    toTitleCase: (str) => {
        return str.replace(/[-_]/g, ' ')
                  .replace(/\w\S*/g, (txt) => 
                      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                  );
    },

    // Generate random gradient for cards
    generateGradient: () => {
        const gradients = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        ];
        return gradients[Math.floor(Math.random() * gradients.length)];
    },

    // Validate project structure
    validateProject: (projectPath) => {
        // In a real implementation, this would check if index.html exists
        return true;
    }
};

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioShowcase = new PortfolioShowcase();
    window.themeManager = new ThemeManager();
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay.classList.contains('active')) {
            loadingOverlay.classList.remove('active');
        }
    }
    
    // Toggle theme with Ctrl/Cmd + D
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        if (window.themeManager) {
            window.themeManager.toggleTheme();
        }
    }
});

// Add search functionality (for future use)
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search projects...';
    searchInput.className = 'search-input';
    
    searchInput.addEventListener('input', (e) => {
        if (window.portfolioShowcase) {
            window.portfolioShowcase.filterProjects(e.target.value);
        }
    });
    
    const header = document.querySelector('.header-content');
    header.appendChild(searchInput);
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioShowcase, projectTemplates, utils };
}
