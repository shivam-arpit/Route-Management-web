// Pune Route Management Web App - Complete Working Version
class PuneRouteManagerWeb {
    constructor() {
        this.currentPage = 'home';
        this.user = {
            name: 'Rajesh Sharma',
            area: 'Pune City',
            employeeId: 'EMP2023001',
            designation: 'Field Sales Executive',
            email: 'rajesh.sharma@company.com',
            phone: '+91 9876543210'
        };
        
        this.notifications = [];
        this.routes = [];
        this.orders = [];
        this.customers = [];
        this.scheduledVisits = [];
        this.analyticsData = {};
        this.charts = {};
        this.map = null;
        this.selectedRouteId = null;
        this.mapInitialized = false;
        this.routeLayers = null;
        this.shopMarkers = [];
        this.currentRouteFilter = null;
        
        // Assignees data
        this.assignees = [
            { id: 1, name: 'Rajesh Sharma', role: 'Field Sales Executive' },
            { id: 2, name: 'Priya Patel', role: 'Sales Representative' },
            { id: 3, name: 'Amit Kumar', role: 'Area Manager' },
            { id: 4, name: 'Sneha Desai', role: 'Sales Executive' }
        ];
        
        this.init();
    }
    
    init() {
        this.loadPuneData();
        this.setupEventListeners();
        this.updateNotificationBar();
        this.loadHomePage();
        this.updateTime();
        
        // Initialize sidebar toggle
        this.setupSidebar();
        
        setInterval(() => this.updateTime(), 60000);
        setInterval(() => this.simulateRealTimeUpdates(), 15000);
        
        // Remove loading spinner
        setTimeout(() => {
            document.getElementById('loading-spinner').style.display = 'none';
        }, 500);
    }
    
    setupSidebar() {
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const sidebar = document.getElementById('sidebar');
        
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
            });
        }
        
        // Auto-collapse on mobile
        if (window.innerWidth < 1200) {
            sidebar.classList.add('collapsed');
        }
        
        window.addEventListener('resize', () => {
            if (window.innerWidth < 1200) {
                sidebar.classList.add('collapsed');
                if (sidebarToggle) sidebarToggle.style.display = 'flex';
            } else {
                sidebar.classList.remove('collapsed');
                if (sidebarToggle) sidebarToggle.style.display = 'none';
            }
        });
    }
    
    loadPuneData() {
        // Pune-specific data (same as before)
        this.routes = [
            {
                id: 1,
                name: 'Shivaji Nagar Route',
                area: 'Central Pune',
                status: 'active',
                shops: 12,
                completed: 7,
                distance: '18 km',
                duration: '6 hrs',
                progress: 58,
                color: '#FF9933',
                description: 'Covers major commercial areas in central Pune including FC Road, JM Road, and Budhwar Peth.',
                assigneeId: 1,
                assignee: 'Rajesh Sharma',
                shopsList: [
                    { id: 1, name: 'Dorabjee Store', type: 'Supermarket', status: 'completed', contact: '9876543210', sales: '₹45,000', lat: 18.5314, lng: 73.8446, address: 'FC Road, Shivaji Nagar, Pune' },
                    { id: 2, name: 'Kayani Bakery', type: 'Bakery', status: 'completed', contact: '9876543211', sales: '₹12,500', lat: 18.5260, lng: 73.8452, address: 'East Street, Pune' },
                    { id: 3, name: 'FC Road Electronics', type: 'Electronics', status: 'completed', contact: '9876543212', sales: '₹78,000', lat: 18.5280, lng: 73.8400, address: 'Fergusson College Road, Pune' },
                    { id: 4, name: 'Chitale Bandhu', type: 'Sweet Shop', status: 'completed', contact: '9876543213', sales: '₹23,000', lat: 18.5250, lng: 73.8420, address: 'Bajirao Road, Pune' },
                    { id: 5, name: 'SGS Mall Stores', type: 'Mall', status: 'completed', contact: '9876543214', sales: '₹1,20,000', lat: 18.5300, lng: 73.8380, address: 'SGS Mall, Pune' },
                    { id: 6, name: 'Budhwar Peth Market', type: 'Wholesale', status: 'completed', contact: '9876543215', sales: '₹2,50,000', lat: 18.5270, lng: 73.8500, address: 'Budhwar Peth, Pune' },
                    { id: 7, name: 'Appa Balwant Chowk', type: 'General Store', status: 'completed', contact: '9876543216', sales: '₹34,000', lat: 18.5240, lng: 73.8480, address: 'Appa Balwant Chowk, Pune' },
                    { id: 8, name: 'Tilak Road Shops', type: 'Retail', status: 'pending', contact: '9876543217', sales: '', lat: 18.5210, lng: 73.8460, address: 'Tilak Road, Pune' },
                    { id: 9, name: 'Deccan Gymkhana', type: 'Premium', status: 'pending', contact: '9876543218', sales: '', lat: 18.5200, lng: 73.8420, address: 'Deccan Gymkhana, Pune' },
                    { id: 10, name: 'JM Road Outlets', type: 'Retail', status: 'pending', contact: '9876543219', sales: '', lat: 18.5190, lng: 73.8400, address: 'JM Road, Pune' },
                    { id: 11, name: 'FC Road Restaurants', type: 'Hospitality', status: 'pending', contact: '9876543220', sales: '', lat: 18.5180, lng: 73.8380, address: 'FC Road, Pune' },
                    { id: 12, name: 'Law College Road', type: 'Educational', status: 'pending', contact: '9876543221', sales: '', lat: 18.5160, lng: 73.8360, address: 'Law College Road, Pune' }
                ]
            },
            {
                id: 2,
                name: 'Kothrud Route',
                area: 'West Pune',
                status: 'pending',
                shops: 8,
                completed: 3,
                distance: '14 km',
                duration: '5 hrs',
                progress: 38,
                color: '#138808',
                description: 'Covers residential and commercial areas in Kothrud including Paud Road and Karishma Society.',
                assigneeId: 2,
                assignee: 'Priya Patel',
                shopsList: [
                    { id: 13, name: 'Karishma Society Shops', type: 'Residential', status: 'completed', contact: '9876543222', sales: '₹28,000', lat: 18.5079, lng: 73.8079, address: 'Karishma Society, Kothrud' },
                    { id: 14, name: 'Sai Supermarket', type: 'Supermarket', status: 'completed', contact: '9876543223', sales: '₹56,000', lat: 18.5085, lng: 73.8100, address: 'Kothrud, Pune' },
                    { id: 15, name: 'Bhumkar Chowk Stores', type: 'Retail', status: 'completed', contact: '9876543224', sales: '₹19,500', lat: 18.5090, lng: 73.8120, address: 'Bhumkar Chowk, Kothrud' },
                    { id: 16, name: 'Paud Road Market', type: 'Market', status: 'pending', contact: '9876543225', sales: '', lat: 18.5100, lng: 73.8150, address: 'Paud Road, Pune' },
                    { id: 17, name: 'Dahanukar Colony', type: 'Residential', status: 'pending', contact: '9876543226', sales: '', lat: 18.5110, lng: 73.8170, address: 'Dahanukar Colony, Kothrud' },
                    { id: 18, name: 'MIT College Area', type: 'Educational', status: 'pending', contact: '9876543227', sales: '', lat: 18.5120, lng: 73.8190, address: 'MIT College Road, Pune' },
                    { id: 19, name: 'Kothrud Depot', type: 'Wholesale', status: 'pending', contact: '9876543228', sales: '', lat: 18.5130, lng: 73.8210, address: 'Kothrud Depot, Pune' },
                    { id: 20, name: 'Vanaz Corner', type: 'Retail', status: 'pending', contact: '9876543229', sales: '', lat: 18.5140, lng: 73.8230, address: 'Vanaz Corner, Kothrud' }
                ]
            },
            {
                id: 3,
                name: 'Hinjewadi Route',
                area: 'IT Park',
                status: 'active',
                shops: 6,
                completed: 4,
                distance: '22 km',
                duration: '4 hrs',
                progress: 67,
                color: '#8B4513',
                description: 'IT Park route covering Hinjewadi, Wakad, and Aundh areas with tech companies and premium stores.',
                assigneeId: 3,
                assignee: 'Amit Kumar',
                shopsList: [
                    { id: 21, name: 'Hinjewadi Phase 1', type: 'IT Park', status: 'completed', contact: '9876543230', sales: '₹89,000', lat: 18.5916, lng: 73.7389, address: 'Hinjewadi Phase 1, Pune' },
                    { id: 22, name: 'Rajnigandha Tower', type: 'Commercial', status: 'completed', contact: '9876543231', sales: '₹45,000', lat: 18.5920, lng: 73.7400, address: 'Hinjewadi, Pune' },
                    { id: 23, name: 'Wakad Shops', type: 'Retail', status: 'completed', contact: '9876543232', sales: '₹32,000', lat: 18.5930, lng: 73.7420, address: 'Wakad, Pune' },
                    { id: 24, name: 'Balewadi Stores', type: 'Sports', status: 'completed', contact: '9876543233', sales: '₹28,000', lat: 18.5940, lng: 73.7440, address: 'Balewadi, Pune' },
                    { id: 25, name: 'Baner Road', type: 'Premium', status: 'pending', contact: '9876543234', sales: '', lat: 18.5950, lng: 73.7460, address: 'Baner Road, Pune' },
                    { id: 26, name: 'Aundh IT Park', type: 'IT Park', status: 'pending', contact: '9876543235', sales: '', lat: 18.5960, lng: 73.7480, address: 'Aundh, Pune' }
                ]
            },
            {
                id: 4,
                name: 'Hadapsar Route',
                area: 'Industrial',
                status: 'pending',
                shops: 10,
                completed: 2,
                distance: '16 km',
                duration: '5.5 hrs',
                progress: 20,
                color: '#800080',
                description: 'Industrial and wholesale route covering Hadapsar, Kharadi, and Magarpatta areas.',
                assigneeId: null,
                assignee: 'Unassigned',
                shopsList: [
                    { id: 27, name: 'Hadapsar Market', type: 'Wholesale', status: 'completed', contact: '9876543236', sales: '₹1,50,000', lat: 18.5072, lng: 73.9417, address: 'Hadapsar, Pune' },
                    { id: 28, name: 'Mundhwa Stores', type: 'Industrial', status: 'completed', contact: '9876543237', sales: '₹68,000', lat: 18.5080, lng: 73.9430, address: 'Mundhwa, Pune' },
                    { id: 29, name: 'Kharadi IT Park', type: 'IT Park', status: 'pending', contact: '9876543238', sales: '', lat: 18.5090, lng: 73.9450, address: 'Kharadi, Pune' },
                    { id: 30, name: 'Magarpatta City', type: 'Commercial', status: 'pending', contact: '9876543239', sales: '', lat: 18.5100, lng: 73.9470, address: 'Magarpatta City, Pune' },
                    { id: 31, name: 'Viman Nagar', type: 'Residential', status: 'pending', contact: '9876543240', sales: '', lat: 18.5110, lng: 73.9490, address: 'Viman Nagar, Pune' },
                    { id: 32, name: 'Nagpur Road Shops', type: 'Highway', status: 'pending', contact: '9876543241', sales: '', lat: 18.5120, lng: 73.9510, address: 'Nagpur Road, Pune' },
                    { id: 33, name: 'Wagholi Market', type: 'Rural', status: 'pending', contact: '9876543242', sales: '', lat: 18.5130, lng: 73.9530, address: 'Wagholi, Pune' },
                    { id: 34, name: 'Keshav Nagar', type: 'Residential', status: 'pending', contact: '9876543243', sales: '', lat: 18.5140, lng: 73.9550, address: 'Keshav Nagar, Pune' },
                    { id: 35, name: 'Loni Market', type: 'Agricultural', status: 'pending', contact: '9876543244', sales: '', lat: 18.5150, lng: 73.9570, address: 'Loni, Pune' },
                    { id: 36, name: 'Bhosari MIDC', type: 'Industrial', status: 'pending', contact: '9876543245', sales: '', lat: 18.5160, lng: 73.9590, address: 'Bhosari, Pune' }
                ]
            }
        ];
        
        // Scheduled Visits (same as before)
        this.scheduledVisits = [
            {
                id: 1,
                shopId: 8,
                shopName: 'Tilak Road Shops',
                routeId: 1,
                routeName: 'Shivaji Nagar Route',
                date: '2024-03-15',
                time: '14:30',
                purpose: 'Monthly Sales Review',
                priority: 'high',
                status: 'scheduled',
                notes: 'Discuss new product line',
                reminder: '30 minutes before',
                duration: '30 minutes'
            },
            {
                id: 2,
                shopId: 9,
                shopName: 'Deccan Gymkhana',
                routeId: 1,
                routeName: 'Shivaji Nagar Route',
                date: '2024-03-15',
                time: '15:45',
                purpose: 'Order Collection',
                priority: 'medium',
                status: 'scheduled',
                notes: 'Collect payment for last order',
                reminder: '15 minutes before',
                duration: '15 minutes'
            },
            {
                id: 3,
                shopId: 16,
                shopName: 'Paud Road Market',
                routeId: 2,
                routeName: 'Kothrud Route',
                date: '2024-03-16',
                time: '10:00',
                purpose: 'New Customer Onboarding',
                priority: 'high',
                status: 'scheduled',
                notes: 'Introduce new loyalty program',
                reminder: '1 hour before',
                duration: '45 minutes'
            }
        ];
        
        // Orders data (same as before)
        this.orders = [
            { id: 1, shopId: 1, shop: 'Dorabjee Store', date: '2024-03-15', items: 12, value: '₹45,000', status: 'delivered' },
            { id: 2, shopId: 2, shop: 'Kayani Bakery', date: '2024-03-15', items: 5, value: '₹12,500', status: 'delivered' },
            { id: 3, shopId: 3, shop: 'FC Road Electronics', date: '2024-03-15', items: 8, value: '₹78,000', status: 'processing' },
            { id: 4, shopId: 5, shop: 'SGS Mall Stores', date: '2024-03-14', items: 25, value: '₹1,20,000', status: 'delivered' },
            { id: 5, shopId: 6, shop: 'Budhwar Peth Market', date: '2024-03-14', items: 42, value: '₹2,50,000', status: 'delivered' }
        ];
        
        // Customer activity (same as before)
        this.customers = [
            { id: 1, name: 'Dorabjee Store', lastVisit: 'Today', frequency: 'Weekly', loyalty: 'Gold', potential: 'High', contact: '9876543210', email: 'dorabjee@example.com', totalOrders: 15, totalValue: '₹5,60,000' },
            { id: 2, name: 'SGS Mall Stores', lastVisit: 'Today', frequency: 'Daily', loyalty: 'Platinum', potential: 'Very High', contact: '9876543214', email: 'sgs@example.com', totalOrders: 42, totalValue: '₹12,50,000' },
            { id: 3, name: 'Budhwar Peth Market', lastVisit: 'Yesterday', frequency: 'Weekly', loyalty: 'Gold', potential: 'High', contact: '9876543215', email: 'budhwar@example.com', totalOrders: 28, totalValue: '₹8,90,000' },
            { id: 4, name: 'Karishma Society Shops', lastVisit: '2 days ago', frequency: 'Monthly', loyalty: 'Silver', potential: 'Medium', contact: '9876543222', email: 'karishma@example.com', totalOrders: 8, totalValue: '₹1,20,000' }
        ];
        
        // Analytics data (same as before)
        this.analyticsData = {
            dailyVisits: [8, 12, 10, 15, 9, 11, 14],
            monthlyRevenue: [125000, 145000, 165000, 185000, 205000, 225000],
            routeEfficiency: [78, 85, 92, 65, 88, 76, 94],
            customerSatisfaction: [4.2, 4.5, 4.8, 4.3, 4.6, 4.7, 4.9],
            productCategories: [
                { category: 'Electronics', value: 35 },
                { category: 'Groceries', value: 25 },
                { category: 'Clothing', value: 20 },
                { category: 'Home Goods', value: 15 },
                { category: 'Others', value: 5 }
            ]
        };
        
        // Notifications (same as before)
        this.notifications = [
            { id: 1, type: 'warning', message: 'Traffic alert: Heavy traffic on Shivaji Nagar route', time: '10:30 AM' },
            { id: 2, type: 'info', message: 'New order from Dorabjee Store: ₹45,000', time: '11:15 AM' },
            { id: 3, type: 'success', message: 'Visit completed: Kayani Bakery', time: '11:45 AM' },
            { id: 4, type: 'info', message: 'Meeting scheduled: Area Manager at 3 PM', time: '12:30 PM' }
        ];
    }
    
    setupEventListeners() {
        document.addEventListener('click', (e) => {
            // Existing event listeners...
            
            // Sidebar navigation
            if (e.target.closest('.sidebar-item')) {
                e.preventDefault();
                const sidebarItem = e.target.closest('.sidebar-item');
                const page = sidebarItem.dataset.page;
                this.navigateTo(page);
            }
            
            // Route list items
            if (e.target.closest('.route-list-item')) {
                const item = e.target.closest('.route-list-item');
                const routeId = item.dataset.routeId;
                if (routeId) {
                    this.selectRoute(parseInt(routeId));
                }
            }
            
            // Edit route button
            if (e.target.closest('.edit-btn')) {
                const btn = e.target.closest('.edit-btn');
                const routeId = btn.dataset.routeId;
                if (routeId) {
                    this.openEditRouteModal(parseInt(routeId));
                }
            }
            
            // Navigate button
            if (e.target.closest('.btn[data-action="navigate"]')) {
                const btn = e.target.closest('.btn[data-action="navigate"]');
                const routeId = btn.dataset.routeId;
                if (routeId) {
                    this.handleRouteAction('navigate', parseInt(routeId));
                }
            }
            
            // Toggle view button
            if (e.target.closest('#toggle-view-btn')) {
                this.toggleRouteView();
            }
            
            // Back to list button
            if (e.target.closest('#back-to-list')) {
                this.toggleRouteView();
            }
            
            // Edit assignee button
            if (e.target.closest('.edit-assignee-btn')) {
                const btn = e.target.closest('.edit-assignee-btn');
                const routeId = btn.dataset.routeId;
                if (routeId) {
                    this.openAssignRouteModal(parseInt(routeId));
                }
            }
            
            // Search
            if (e.target.closest('#search-btn')) {
                this.performSearch();
            }
            
            // Notification buttons
            if (e.target.closest('#refresh-notifications')) {
                this.refreshNotifications();
            }
            
            if (e.target.closest('#clear-notifications')) {
                this.clearNotifications();
            }
            
            // Schedule Visit Button
            if (e.target.closest('#schedule-visit-btn') || e.target.closest('.schedule-visit-btn')) {
                this.openScheduleVisitModal();
            }
            
            // Visit action buttons
            if (e.target.closest('.visit-action-btn')) {
                const btn = e.target.closest('.visit-action-btn');
                const action = btn.dataset.action;
                const visitId = btn.dataset.visitId;
                if (action && visitId) {
                    this.handleVisitAction(action, parseInt(visitId));
                }
            }
            
            // Analytics period buttons
            if (e.target.closest('.period-btn')) {
                const btn = e.target.closest('.period-btn');
                const period = btn.dataset.period;
                if (period) {
                    this.changeAnalyticsPeriod(period, btn);
                }
            }
            
            // Customer cards
            if (e.target.closest('.customer-card')) {
                const card = e.target.closest('.customer-card');
                const customerId = card.dataset.customerId;
                if (customerId) {
                    this.openCustomerDetails(parseInt(customerId));
                }
            }
            
            // Order action buttons
            if (e.target.closest('.order-action-btn')) {
                const btn = e.target.closest('.order-action-btn');
                const orderId = btn.dataset.orderId;
                if (orderId) {
                    this.openOrderDetails(parseInt(orderId));
                }
            }
            
            // Map control buttons
            if (e.target.closest('.map-control-btn')) {
                const btn = e.target.closest('.map-control-btn');
                const action = btn.id;
                this.handleMapControl(action);
            }
            
            // Stat cards
            if (e.target.closest('.stat-card')) {
                const card = e.target.closest('.stat-card');
                const statType = card.dataset.stat;
                if (statType) {
                    this.showStatDetails(statType);
                }
            }
            
            // Logout button
            if (e.target.closest('#logout-btn')) {
                this.handleLogout();
            }
            
            // Add Route Button
            if (e.target.closest('#add-route-btn')) {
                this.openAddRouteModal();
            }
            
            // Add Customer Button
            if (e.target.closest('#add-customer-btn')) {
                this.openAddCustomerModal();
            }
            
            // Create Order Button
            if (e.target.closest('#create-order-btn')) {
                this.openCreateOrderModal();
            }
            
            // NEW: Shop list item click in map view
            if (e.target.closest('.shop-list-item')) {
                const shopItem = e.target.closest('.shop-list-item');
                const shopId = parseInt(shopItem.dataset.shopId);
                const routeId = parseInt(shopItem.dataset.routeId);
                this.focusOnShop(shopId, routeId);
            }
            
            // NEW: Navigate from shop list
            if (e.target.closest('.shop-navigate-btn')) {
                const btn = e.target.closest('.shop-navigate-btn');
                const shopId = parseInt(btn.dataset.shopId);
                const routeId = parseInt(btn.dataset.routeId);
                this.handleRouteAction('navigate', routeId);
                this.showToast(`Navigating to shop...`, 'info');
            }
        });
        
        // Search input keypress
        document.addEventListener('keypress', (e) => {
            if (e.target.id === 'route-search' && e.key === 'Enter') {
                this.performSearch();
            }
        });
        
        // NEW: Route selection change in map view
        document.addEventListener('change', (e) => {
            if (e.target.id === 'route-select-map') {
                const routeId = e.target.value ? parseInt(e.target.value) : null;
                this.filterShopsByRoute(routeId);
            }
        });
        
        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modal = document.querySelector('.modal-overlay');
                if (modal) {
                    modal.remove();
                }
            }
        });
    }
    
    navigateTo(page) {
        this.currentPage = page;
        
        // Update active sidebar item
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.classList.remove('active');
        });
        const activeItem = document.querySelector(`[data-page="${page}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
        
        // Load page content
        switch(page) {
            case 'home':
                this.loadHomePage();
                break;
            case 'routes':
                this.loadRoutesPage();
                break;
            case 'visits':
                this.loadVisitsPage();
                break;
            case 'customers':
                this.loadCustomersPage();
                break;
            case 'orders':
                this.loadOrdersPage();
                break;
            case 'reports':
                this.loadReportsPage();
                break;
            case 'settings':
                this.loadSettingsPage();
                break;
            case 'help':
                this.loadHelpPage();
                break;
        }
    }
    
    loadHomePage() {
        const today = new Date().toLocaleDateString('en-IN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="home-container">
                <div class="dashboard-header">
                    <h1>Welcome back, ${this.user.name}!</h1>
                    <div class="date-controls">
                        <div class="date-display">
                            <i class="fas fa-calendar-alt"></i> ${today}
                        </div>
                        <div class="date-picker-container">
                            <input type="date" id="date-picker" class="date-picker" value="${new Date().toISOString().split('T')[0]}">
                            <button class="date-btn" id="today-btn"><i class="fas fa-home"></i> Today</button>
                        </div>
                    </div>
                </div>
                
                <div class="dashboard-content">
                    <div class="dashboard-stats">
                        <div class="stat-card" data-stat="visit-completion">
                            <div class="stat-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <h3>Visit Completion</h3>
                            <div class="stat-value">${this.getCompletionRate()}%</div>
                            <div class="stat-change positive">
                                <i class="fas fa-arrow-up"></i> 5% from last week
                            </div>
                        </div>
                        
                        <div class="stat-card" data-stat="avg-rating">
                            <div class="stat-icon">
                                <i class="fas fa-star"></i>
                            </div>
                            <h3>Avg. Rating</h3>
                            <div class="stat-value">4.7</div>
                            <div class="stat-change positive">
                                <i class="fas fa-arrow-up"></i> 0.2 from last month
                            </div>
                        </div>
                        
                        <div class="stat-card" data-stat="orders-per-day">
                            <div class="stat-icon">
                                <i class="fas fa-shopping-cart"></i>
                            </div>
                            <h3>Orders/Day</h3>
                            <div class="stat-value">${this.getDailyOrders()}</div>
                            <div class="stat-change positive">
                                <i class="fas fa-arrow-up"></i> 15% from last week
                            </div>
                        </div>
                        
                        <div class="stat-card" data-stat="route-efficiency">
                            <div class="stat-icon">
                                <i class="fas fa-tachometer-alt"></i>
                            </div>
                            <h3>Route Efficiency</h3>
                            <div class="stat-value">${this.getRouteEfficiency()}%</div>
                            <div class="stat-change positive">
                                <i class="fas fa-arrow-up"></i> 8% from last week
                            </div>
                        </div>
                    </div>
                    
                    <div class="analytics-section">
                        <div class="analytics-header">
                            <h2>Performance Analytics</h2>
                            <div class="analytics-period">
                                <button class="period-btn active" data-period="today">Today</button>
                                <button class="period-btn" data-period="week">This Week</button>
                                <button class="period-btn" data-period="month">This Month</button>
                                <button class="period-btn" data-period="quarter">This Quarter</button>
                            </div>
                        </div>
                        
                        <div class="charts-grid">
                            <div class="chart-container">
                                <h3><i class="fas fa-chart-line"></i> Daily Visits Trend</h3>
                                <div class="chart-wrapper">
                                    <canvas id="visitsChart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3><i class="fas fa-rupee-sign"></i> Monthly Revenue</h3>
                                <div class="chart-wrapper">
                                    <canvas id="revenueChart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3><i class="fas fa-chart-pie"></i> Product Categories</h3>
                                <div class="chart-wrapper">
                                    <canvas id="categoryChart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3><i class="fas fa-tachometer-alt"></i> Route Efficiency</h3>
                                <div class="chart-wrapper">
                                    <canvas id="efficiencyChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="recent-activity">
                        <h2>Recent Activity</h2>
                        <div class="activity-list">
                            ${this.notifications.map(notification => `
                                <div class="activity-item">
                                    <div class="activity-icon ${notification.type}">
                                        <i class="fas fa-${notification.type === 'success' ? 'check-circle' : notification.type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                                    </div>
                                    <div class="activity-content">
                                        <p class="activity-text">${notification.message}</p>
                                        <span class="activity-time">${notification.time}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Update badges
        this.updateBadges();
        
        // Initialize charts
        setTimeout(() => this.initCharts(), 200);
        
        // Add event listeners for date controls
        setTimeout(() => {
            document.getElementById('today-btn')?.addEventListener('click', () => {
                const today = new Date().toISOString().split('T')[0];
                document.getElementById('date-picker').value = today;
                this.updateDashboardForDate(today);
            });
        }, 100);
    }
    
    loadRoutesPage() {
        const mainContent = document.getElementById('main-content');
        
        mainContent.innerHTML = `
            <div class="routes-container">
                <div class="routes-header">
                    <h1>Pune Route Management</h1>
                    <div class="routes-actions">
                        <button class="action-btn" id="add-route-btn">
                            <i class="fas fa-plus"></i> Add New Route
                        </button>
                    </div>
                </div>
                
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" id="route-search" placeholder="Search Pune routes, shops, or areas...">
                    <button id="search-btn">Search</button>
                </div>
                
                <!-- Route List View -->
                <div class="route-list-view" id="route-list-view">
                    <div class="route-list-header">
                        <h3>All Routes</h3>
                        <button class="action-btn small" id="toggle-view-btn">
                            <i class="fas fa-map-marker-alt"></i> Show on Map
                        </button>
                    </div>
                    <div class="route-list-container" id="route-list-container">
                        ${this.routes.map(route => `
                            <div class="route-list-item ${this.selectedRouteId === route.id ? 'active' : ''}" 
                                 data-route-id="${route.id}">
                                <div class="route-list-info">
                                    <div class="route-list-name">${route.name}</div>
                                    <div class="route-list-details">
                                        <span><i class="fas fa-store"></i> ${route.shops} shops</span>
                                        <span><i class="fas fa-road"></i> ${route.distance}</span>
                                        <span><i class="fas fa-clock"></i> ${route.duration}</span>
                                        <span class="status-${route.status}">${route.status}</span>
                                    </div>
                                    <div class="route-list-assignee">
                                        <i class="fas fa-user"></i>
                                        <span>${route.assignee || 'Unassigned'}</span>
                                        ${route.assigneeId ? `
                                            <button class="edit-assignee-btn" data-route-id="${route.id}" 
                                                    style="background: none; border: none; color: #3498db; cursor: pointer;">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                        ` : ''}
                                    </div>
                                </div>
                                <div class="route-list-actions">
                                    <button class="edit-btn" data-route-id="${route.id}">
                                        <i class="fas fa-edit"></i> Edit
                                    </button>
                                    <button class="btn btn-primary route-action-btn" data-action="navigate" data-route-id="${route.id}">
                                        <i class="fas fa-directions"></i> Navigate
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Map Full View with Sidebar -->
                <div class="map-full-view" id="map-full-view" style="display: none;">
                    <div class="map-with-sidebar">
                        <!-- Map Sidebar -->
                        <div class="map-sidebar">
                            <div class="route-selection-sidebar">
                                <div class="route-selection">
                                    <h4><i class="fas fa-route"></i> Select Route</h4>
                                    <select class="route-select" id="route-select-map">
                                        <option value="">All Routes</option>
                                        ${this.routes.map(route => `
                                            <option value="${route.id}">${route.name}</option>
                                        `).join('')}
                                    </select>
                                </div>
                            </div>
                            
                            <div class="map-shop-list">
                                <div class="map-shop-list-header">
                                    <h3>
                                        <i class="fas fa-store"></i>
                                        <span>Shops in: </span>
                                        <span class="route-name" id="current-route-name">All Routes</span>
                                        <span class="shop-count-badge" id="shop-count-badge"></span>
                                    </h3>
                                </div>
                                
                                <div class="shop-list-items" id="shop-list-items">
                                    <div class="no-shops-message">
                                        <i class="fas fa-store-slash"></i>
                                        <p>Select a route to view shops</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Map Container -->
                        <div class="map-container">
                            <div id="map" style="width: 100%; height: 100%; border-radius: 15px;"></div>
                            
                            <div class="map-overlay">
                                <div class="map-stats">
                                    <div class="map-stat">
                                        <div class="map-stat-value">${this.routes.length}</div>
                                        <div class="map-stat-label">Routes</div>
                                    </div>
                                    <div class="map-stat">
                                        <div class="map-stat-value">${this.getTotalShops()}</div>
                                        <div class="map-stat-label">Shops</div>
                                    </div>
                                    <div class="map-stat">
                                        <div class="map-stat-value">${this.getCompletedShops()}</div>
                                        <div class="map-stat-label">Completed</div>
                                    </div>
                                </div>
                                <div class="map-controls">
                                    <button class="map-control-btn" id="zoom-in" title="Zoom In">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                    <button class="map-control-btn" id="zoom-out" title="Zoom Out">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                    <button class="map-control-btn" id="locate-me" title="My Location">
                                        <i class="fas fa-crosshairs"></i>
                                    </button>
                                    <button class="map-control-btn" id="back-to-list" title="Back to List">
                                        <i class="fas fa-list"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize map when page loads (not lazy anymore)
        this.initMap();
        this.mapInitialized = true;
    }
    
    // FIXED: Proper map initialization
    initMap() {
        const mapElement = document.getElementById('map');
        if (!mapElement) {
            console.log('Map element not found yet, will initialize when map view is opened');
            return;
        }
        
        // Check if map is already initialized
        if (this.map) {
            console.log('Map already initialized');
            return;
        }
        
        try {
            console.log('Initializing map...');
            
            // Center on Pune
            const puneCenter = [18.5204, 73.8567];
            
            // Create map
            this.map = L.map('map', {
                center: puneCenter,
                zoom: 12,
                zoomControl: false // We'll add custom controls
            });
            
            // Add tile layer with error handling
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 18,
                errorTileUrl: 'https://via.placeholder.com/256/cccccc/999999?text=Map+Tile+Error'
            }).addTo(this.map);
            
            // Clear previous markers
            this.clearShopMarkers();
            
            // Add markers for ALL shops initially
            this.routes.forEach(route => {
                route.shopsList.forEach(shop => {
                    this.addShopMarker(shop, route);
                });
            });
            
            // Add user location marker
            const userIcon = L.divIcon({
                className: 'user-marker',
                html: `<div style="background-color: #3498db; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 15px rgba(52,152,219,0.7); display: flex; align-items: center; justify-content: center;">
                         <i class="fas fa-user" style="color: white; font-size: 14px;"></i>
                       </div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });
            
            L.marker([18.5314, 73.8446], { icon: userIcon })
                .addTo(this.map)
                .bindPopup('<strong>Your Location</strong><br>Shivaji Nagar, Pune');
            
            // Add Pune boundaries
            const puneBounds = [
                [18.40, 73.75],
                [18.65, 73.95]
            ];
            
            L.rectangle(puneBounds, {
                color: "#ff9933",
                weight: 2,
                fillOpacity: 0.05
            }).addTo(this.map);
            
            console.log('Map initialized successfully');
            
            // Update shop list initially (show all shops)
            this.updateShopList(null);
            
            // Force map to invalidate size (fix for hidden container)
            setTimeout(() => {
                if (this.map) {
                    this.map.invalidateSize();
                }
            }, 100);
            
        } catch (error) {
            console.error('Error initializing map:', error);
            this.showToast('Error loading map. Please refresh the page.', 'error');
            
            // Show error message on map container
            if (mapElement) {
                mapElement.innerHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #e74c3c; padding: 20px; text-align: center;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 20px;"></i>
                        <h3>Map Loading Error</h3>
                        <p>Please check your internet connection and refresh the page.</p>
                        <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer;">
                            <i class="fas fa-redo"></i> Refresh Page
                        </button>
                    </div>
                `;
            }
        }
    }
    
    // NEW: Add shop marker to map
    addShopMarker(shop, route) {
        if (!this.map) return;
        
        const markerColor = shop.status === 'completed' ? '#2ecc71' : 
                          shop.status === 'pending' ? '#f39c12' : '#e74c3c';
        
        const markerIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: ${markerColor}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 8px rgba(0,0,0,0.4); cursor: pointer; display: flex; align-items: center; justify-content: center;">
                     <i class="fas fa-store" style="color: white; font-size: 8px;"></i>
                   </div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
        
        const marker = L.marker([shop.lat, shop.lng], { 
            icon: markerIcon,
            shopId: shop.id,
            routeId: route.id
        })
            .addTo(this.map)
            .bindPopup(`
                <div style="min-width: 200px; padding: 10px;">
                    <h4 style="margin: 0 0 10px 0; color: #2c3e50;">${shop.name}</h4>
                    <p style="margin: 5px 0; font-size: 13px;"><strong>Type:</strong> ${shop.type}</p>
                    <p style="margin: 5px 0; font-size: 13px;"><strong>Status:</strong> <span style="color: ${markerColor}; font-weight: bold;">${shop.status}</span></p>
                    <p style="margin: 5px 0; font-size: 13px;"><strong>Contact:</strong> ${shop.contact}</p>
                    <p style="margin: 5px 0; font-size: 13px;"><strong>Sales:</strong> ${shop.sales || 'Pending'}</p>
                    <p style="margin: 5px 0; font-size: 13px;"><strong>Route:</strong> ${route.name}</p>
                    <button onclick="app.handleRouteAction('navigate', ${route.id})" 
                            style="margin-top: 10px; padding: 8px 12px; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer; width: 100%; font-size: 13px;">
                        <i class="fas fa-directions"></i> Navigate Here
                    </button>
                </div>
            `);
        
        // Store marker reference
        this.shopMarkers.push({
            marker: marker,
            shopId: shop.id,
            routeId: route.id,
            visible: true
        });
        
        // Add click event to focus on shop
        marker.on('click', () => {
            this.focusOnShop(shop.id, route.id);
        });
        
        return marker;
    }
    
    // NEW: Clear all shop markers
    clearShopMarkers() {
        if (this.shopMarkers.length > 0) {
            this.shopMarkers.forEach(markerData => {
                if (this.map && markerData.marker) {
                    this.map.removeLayer(markerData.marker);
                }
            });
            this.shopMarkers = [];
        }
    }
    
    // NEW: Update shop list in sidebar
    updateShopList(routeId) {
        const shopListItems = document.getElementById('shop-list-items');
        const currentRouteName = document.getElementById('current-route-name');
        const shopCountBadge = document.getElementById('shop-count-badge');
        
        if (!shopListItems) return;
        
        let shops = [];
        let routeName = 'All Routes';
        
        if (routeId) {
            const route = this.routes.find(r => r.id === routeId);
            if (route) {
                shops = route.shopsList;
                routeName = route.name;
            }
        } else {
            // Get all shops from all routes
            shops = this.routes.flatMap(route => 
                route.shopsList.map(shop => ({
                    ...shop,
                    routeId: route.id,
                    routeName: route.name
                }))
            );
        }
        
        // Update UI
        currentRouteName.textContent = routeName;
        shopCountBadge.textContent = shops.length > 0 ? `(${shops.length})` : '';
        
        if (shops.length === 0) {
            shopListItems.innerHTML = `
                <div class="no-shops-message">
                    <i class="fas fa-store-slash"></i>
                    <p>No shops found</p>
                </div>
            `;
            return;
        }
        
        // Group shops by status
        const completedShops = shops.filter(shop => shop.status === 'completed');
        const pendingShops = shops.filter(shop => shop.status === 'pending');
        
        // Sort shops by name
        const sortedShops = [...pendingShops, ...completedShops].sort((a, b) => a.name.localeCompare(b.name));
        
        shopListItems.innerHTML = sortedShops.map(shop => `
            <div class="shop-list-item ${shop.status}" 
                 data-shop-id="${shop.id}" 
                 data-route-id="${shop.routeId || routeId}">
                <div class="shop-item-icon ${shop.status}">
                    <i class="fas fa-store"></i>
                </div>
                <div class="shop-item-info">
                    <div class="shop-item-name">${shop.name}</div>
                    <div class="shop-item-details">
                        <div class="shop-item-detail">
                            <i class="fas fa-tag"></i>
                            <span>${shop.type}</span>
                        </div>
                        <div class="shop-item-detail">
                            <i class="fas fa-phone"></i>
                            <span>${shop.contact}</span>
                        </div>
                        ${shop.sales ? `
                        <div class="shop-item-detail">
                            <i class="fas fa-rupee-sign"></i>
                            <span>${shop.sales}</span>
                        </div>
                        ` : ''}
                    </div>
                    ${shop.routeName && !routeId ? `
                    <div class="shop-item-detail" style="margin-top: 5px; font-size: 11px; color: #3498db;">
                        <i class="fas fa-route"></i>
                        <span>${shop.routeName}</span>
                    </div>
                    ` : ''}
                    <div class="shop-item-action">
                        <button class="shop-navigate-btn" 
                                data-shop-id="${shop.id}" 
                                data-route-id="${shop.routeId || routeId}">
                            <i class="fas fa-directions"></i> Navigate
                        </button>
                    </div>
                </div>
                <div class="shop-status ${shop.status}">
                    ${shop.status === 'completed' ? 
                        '<i class="fas fa-check-circle" style="color: #2ecc71;"></i>' : 
                        '<i class="fas fa-clock" style="color: #f39c12;"></i>'}
                </div>
            </div>
        `).join('');
        
        // Update map markers visibility
        this.updateMapMarkersVisibility(routeId);
    }
    
    // NEW: Update map markers visibility based on route filter
    updateMapMarkersVisibility(routeId) {
        if (!this.map) return;
        
        this.shopMarkers.forEach(markerData => {
            const shouldBeVisible = !routeId || markerData.routeId === routeId;
            
            if (shouldBeVisible && !markerData.visible) {
                markerData.marker.addTo(this.map);
                markerData.visible = true;
            } else if (!shouldBeVisible && markerData.visible) {
                this.map.removeLayer(markerData.marker);
                markerData.visible = false;
            }
        });
    }
    
    // NEW: Filter shops by route
    filterShopsByRoute(routeId) {
        this.currentRouteFilter = routeId;
        this.updateShopList(routeId);
        
        // Zoom to route if a specific route is selected
        if (routeId) {
            const route = this.routes.find(r => r.id === routeId);
            if (route && route.shopsList.length > 0) {
                this.zoomToRoute(route);
            }
        } else {
            // Zoom to show all shops
            this.zoomToAllShops();
        }
    }
    
    // NEW: Zoom to show all shops
    zoomToAllShops() {
        if (!this.map) return;
        
        // Get bounds from all visible markers
        const visibleMarkers = this.shopMarkers.filter(m => m.visible);
        if (visibleMarkers.length === 0) {
            // Default to Pune bounds if no markers
            const puneBounds = [
                [18.40, 73.75],
                [18.65, 73.95]
            ];
            this.map.fitBounds(puneBounds);
            return;
        }
        
        const bounds = L.latLngBounds(visibleMarkers.map(m => m.marker.getLatLng()));
        this.map.fitBounds(bounds, { padding: [50, 50] });
        
        this.showToast(`Showing all shops (${visibleMarkers.length})`, 'info');
    }
    
    // NEW: Focus on specific shop
    focusOnShop(shopId, routeId) {
        if (!this.map) return;
        
        const markerData = this.shopMarkers.find(m => 
            m.shopId === shopId && m.routeId === routeId
        );
        
        if (markerData && markerData.visible) {
            // Fly to the marker
            this.map.flyTo(markerData.marker.getLatLng(), 16);
            
            // Open popup
            markerData.marker.openPopup();
            
            // Highlight the shop in the list
            this.highlightShopInList(shopId);
            
            this.showToast(`Focused on shop: ${this.getShopName(shopId, routeId)}`, 'info');
        }
    }
    
    // NEW: Get shop name
    getShopName(shopId, routeId) {
        if (routeId) {
            const route = this.routes.find(r => r.id === routeId);
            if (route) {
                const shop = route.shopsList.find(s => s.id === shopId);
                return shop ? shop.name : 'Unknown Shop';
            }
        }
        
        // Search in all routes
        for (const route of this.routes) {
            const shop = route.shopsList.find(s => s.id === shopId);
            if (shop) return shop.name;
        }
        
        return 'Unknown Shop';
    }
    
    // NEW: Highlight shop in list
    highlightShopInList(shopId) {
        const shopItems = document.querySelectorAll('.shop-list-item');
        shopItems.forEach(item => {
            item.classList.remove('highlighted');
            if (parseInt(item.dataset.shopId) === shopId) {
                item.classList.add('highlighted');
                item.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }
    
    selectRoute(routeId) {
        this.selectedRouteId = routeId;
        const route = this.routes.find(r => r.id === routeId);
        
        if (!route) return;
        
        // Update selected state in list
        document.querySelectorAll('.route-list-item').forEach(item => {
            item.classList.remove('active');
        });
        const selectedItem = document.querySelector(`[data-route-id="${routeId}"]`);
        if (selectedItem) {
            selectedItem.classList.add('active');
        }
        
        // If map view is active, filter by this route
        const mapView = document.getElementById('map-full-view');
        if (mapView && mapView.style.display === 'block') {
            document.getElementById('route-select-map').value = routeId;
            this.filterShopsByRoute(routeId);
        }
        
        this.showToast(`Selected route: ${route.name}`, 'info');
    }
    
    zoomToRoute(route) {
        if (!this.map || !route.shopsList.length) return;
        
        try {
            // Clear previous highlights
            if (this.routeLayers) {
                this.routeLayers.forEach(layer => this.map.removeLayer(layer));
            }
            
            this.routeLayers = [];
            
            // Create bounds for this route only
            const bounds = L.latLngBounds(route.shopsList.map(shop => [shop.lat, shop.lng]));
            this.map.fitBounds(bounds, { padding: [50, 50] });
            
            // Add polyline connecting shops in this route
            if (route.shopsList.length > 1) {
                const latLngs = route.shopsList.map(shop => [shop.lat, shop.lng]);
                const polyline = L.polyline(latLngs, {
                    color: route.color || '#3498db',
                    weight: 4,
                    opacity: 0.8,
                    dashArray: '10, 10'
                }).addTo(this.map);
                
                this.routeLayers.push(polyline);
            }
            
            this.showToast(`Zoomed to ${route.name} route`, 'success');
        } catch (error) {
            console.error('Error zooming to route:', error);
            this.showToast('Error displaying route', 'error');
        }
    }
    
    toggleRouteView() {
        const listView = document.getElementById('route-list-view');
        const mapView = document.getElementById('map-full-view');
        const toggleBtn = document.getElementById('toggle-view-btn');
        
        if (listView.style.display === 'none') {
            // Switch to list view
            listView.style.display = 'block';
            mapView.style.display = 'none';
            if (toggleBtn) {
                toggleBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i> Show on Map';
            }
        } else {
            // Switch to map view
            listView.style.display = 'none';
            mapView.style.display = 'block';
            if (toggleBtn) {
                toggleBtn.innerHTML = '<i class="fas fa-list"></i> Back to List';
            }
            
            // Fix map size when shown (important!)
            if (this.map) {
                setTimeout(() => {
                    this.map.invalidateSize();
                    
                    // If a route is selected, filter by it
                    if (this.selectedRouteId) {
                        document.getElementById('route-select-map').value = this.selectedRouteId;
                        this.filterShopsByRoute(this.selectedRouteId);
                    } else {
                        // Show all shops
                        this.updateShopList(null);
                    }
                }, 100);
            }
        }
    }
    
    handleRouteAction(action, routeId) {
        const route = this.routes.find(r => r.id === routeId);
        if (!route) return;
        
        switch(action) {
            case 'navigate':
                this.showToast(`Opening navigation to ${route.name}...`, 'info');
                setTimeout(() => {
                    this.showToast(`Navigation to ${route.name} started`, 'success');
                }, 1000);
                break;
        }
    }
    
    handleMapControl(action) {
        if (!this.map) {
            this.showToast('Map not initialized', 'error');
            return;
        }
        
        switch(action) {
            case 'zoom-in':
                this.map.zoomIn();
                break;
            case 'zoom-out':
                this.map.zoomOut();
                break;
            case 'locate-me':
                this.map.setView([18.5314, 73.8446], 15);
                this.showToast('Centered on your location', 'success');
                break;
            case 'back-to-list':
                this.toggleRouteView();
                break;
        }
    }
    
    // ... (rest of the methods remain exactly the same as before - openEditRouteModal, loadVisitsPage, etc.)
    openEditRouteModal(routeId) {
        const route = this.routes.find(r => r.id === routeId);
        if (!route) return;
        
        const modalHTML = `
            <div class="modal-overlay" id="edit-route-modal">
                <div class="modal-content" style="max-width: 600px;">
                    <div class="modal-header">
                        <h2><i class="fas fa-edit"></i> Edit Route</h2>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="edit-route-form">
                            <div class="form-section">
                                <h3>Route Information</h3>
                                <div class="form-grid">
                                    <div class="form-group">
                                        <label>Route Name</label>
                                        <input type="text" class="form-control" id="edit-route-name" value="${route.name}">
                                    </div>
                                    <div class="form-group">
                                        <label>Area</label>
                                        <input type="text" class="form-control" id="edit-route-area" value="${route.area}">
                                    </div>
                                    <div class="form-group">
                                        <label>Status</label>
                                        <select class="form-control select" id="edit-route-status">
                                            <option value="active" ${route.status === 'active' ? 'selected' : ''}>Active</option>
                                            <option value="pending" ${route.status === 'pending' ? 'selected' : ''}>Pending</option>
                                            <option value="completed" ${route.status === 'completed' ? 'selected' : ''}>Completed</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" id="cancel-edit-route">
                            Cancel
                        </button>
                        <button class="btn btn-primary" id="save-edit-route" data-route-id="${routeId}">
                            <i class="fas fa-save"></i> Save Changes
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('modals-container').innerHTML = modalHTML;
        
        document.getElementById('cancel-edit-route').addEventListener('click', () => {
            document.getElementById('edit-route-modal').remove();
        });
        
        document.querySelector('.modal-close').addEventListener('click', () => {
            document.getElementById('edit-route-modal').remove();
        });
        
        document.getElementById('save-edit-route').addEventListener('click', () => {
            route.name = document.getElementById('edit-route-name').value;
            route.area = document.getElementById('edit-route-area').value;
            route.status = document.getElementById('edit-route-status').value;
            this.showToast(`Route "${route.name}" updated!`, 'success');
            document.getElementById('edit-route-modal').remove();
            
            if (this.currentPage === 'routes') {
                this.loadRoutesPage();
            }
        });
        
        document.getElementById('edit-route-modal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('edit-route-modal')) {
                document.getElementById('edit-route-modal').remove();
            }
        });
    }
    
    loadVisitsPage() {
        const mainContent = document.getElementById('main-content');
        
        mainContent.innerHTML = `
            <div class="visits-container">
                <div class="visits-header">
                    <h1>My Visits</h1>
                    <button class="schedule-visit-btn" id="schedule-visit-btn">
                        <i class="fas fa-plus"></i> Schedule New Visit
                    </button>
                </div>
                
                <div class="visits-filters">
                    <button class="filter-btn active" data-filter="all">All Visits</button>
                    <button class="filter-btn" data-filter="today">Today</button>
                    <button class="filter-btn" data-filter="scheduled">Scheduled</button>
                </div>
                
                <div class="visits-grid" id="visits-grid">
                    ${this.scheduledVisits.map(visit => `
                        <div class="visit-card ${visit.status}" data-visit-id="${visit.id}">
                            <div class="visit-header">
                                <div class="visit-shop">
                                    <div class="shop-avatar">
                                        <i class="fas fa-store"></i>
                                    </div>
                                    <div class="shop-info">
                                        <h3>${visit.shopName}</h3>
                                        <p>${visit.routeName}</p>
                                    </div>
                                </div>
                                <div class="visit-status status-${visit.status}">
                                    ${visit.status}
                                </div>
                            </div>
                            
                            <div class="visit-details">
                                <div class="visit-detail">
                                    <span class="detail-label">Date & Time:</span>
                                    <span class="detail-value">${visit.date} at ${visit.time}</span>
                                </div>
                                <div class="visit-detail">
                                    <span class="detail-label">Purpose:</span>
                                    <span class="detail-value">${visit.purpose}</span>
                                </div>
                                <div class="visit-detail">
                                    <span class="detail-label">Priority:</span>
                                    <span class="detail-value priority-${visit.priority}">${visit.priority}</span>
                                </div>
                            </div>
                            
                            <div class="visit-actions">
                                <button class="visit-action-btn primary" data-action="start-visit" data-visit-id="${visit.id}">
                                    <i class="fas fa-play"></i> Start Visit
                                </button>
                                <button class="visit-action-btn secondary" data-action="cancel-visit" data-visit-id="${visit.id}">
                                    <i class="fas fa-times"></i> Cancel
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        document.getElementById('visits-badge').textContent = this.scheduledVisits.length;
    }
    
    loadCustomersPage() {
        const mainContent = document.getElementById('main-content');
        
        mainContent.innerHTML = `
            <div class="routes-container">
                <div class="routes-header">
                    <h1>Customer Management</h1>
                    <button class="action-btn" id="add-customer-btn">
                        <i class="fas fa-user-plus"></i> Add New Customer
                    </button>
                </div>
                
                <div class="customers-content">
                    <div class="customer-stats">
                        <div class="customer-stat">
                            <h3>Total Customers</h3>
                            <p>${this.customers.length}</p>
                        </div>
                        <div class="customer-stat">
                            <h3>Platinum</h3>
                            <p>${this.customers.filter(c => c.loyalty === 'Platinum').length}</p>
                        </div>
                        <div class="customer-stat">
                            <h3>Gold</h3>
                            <p>${this.customers.filter(c => c.loyalty === 'Gold').length}</p>
                        </div>
                        <div class="customer-stat">
                            <h3>Silver</h3>
                            <p>${this.customers.filter(c => c.loyalty === 'Silver').length}</p>
                        </div>
                    </div>
                
                    <div class="routes-grid">
                        ${this.customers.map(customer => `
                            <div class="customer-card" data-customer-id="${customer.id}">
                                <div class="customer-header">
                                    <h3>${customer.name}</h3>
                                    <div class="customer-loyalty loyalty-${customer.loyalty.toLowerCase()}">${customer.loyalty}</div>
                                </div>
                                <div class="customer-details">
                                    <div class="customer-detail">
                                        <span class="detail-label">Last Visit:</span>
                                        <span class="detail-value">${customer.lastVisit}</span>
                                    </div>
                                    <div class="customer-detail">
                                        <span class="detail-label">Contact:</span>
                                        <span class="detail-value">${customer.contact}</span>
                                    </div>
                                    <div class="customer-detail">
                                        <span class="detail-label">Potential:</span>
                                        <span class="detail-value">${customer.potential}</span>
                                    </div>
                                    <div class="customer-detail">
                                        <span class="detail-label">Total Value:</span>
                                        <span class="detail-value">${customer.totalValue}</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    loadOrdersPage() {
        const mainContent = document.getElementById('main-content');
        
        mainContent.innerHTML = `
            <div class="routes-container">
                <div class="routes-header">
                    <h1>Order Management</h1>
                </div>
                
                <div class="orders-stats">
                    <div class="order-stat">
                        <h3>Total Orders</h3>
                        <p>${this.orders.length}</p>
                    </div>
                    <div class="order-stat">
                        <h3>Delivered</h3>
                        <p>${this.orders.filter(o => o.status === 'delivered').length}</p>
                    </div>
                    <div class="order-stat">
                        <h3>Processing</h3>
                        <p>${this.orders.filter(o => o.status === 'processing').length}</p>
                    </div>
                    <div class="order-stat">
                        <h3>Total Value</h3>
                        <p>${this.getTotalRevenue()}</p>
                    </div>
                </div>
                
                <div class="orders-table-container">
                    <table class="orders-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Shop</th>
                                <th>Date</th>
                                <th>Items</th>
                                <th>Value</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.orders.map(order => `
                                <tr>
                                    <td>#${order.id}</td>
                                    <td style="font-weight: 600;">${order.shop}</td>
                                    <td>${order.date}</td>
                                    <td>${order.items}</td>
                                    <td style="font-weight: 600; color: #27ae60;">${order.value}</td>
                                    <td>
                                        <span class="status-${order.status}">${order.status}</span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        document.getElementById('orders-badge').textContent = this.orders.length;
    }
    
    loadReportsPage() {
        const mainContent = document.getElementById('main-content');
        
        mainContent.innerHTML = `
            <div class="routes-container">
                <div class="routes-header">
                    <h1>Reports & Insights</h1>
                </div>
                
                <div class="reports-grid">
                    <div class="report-card">
                        <div class="report-header">
                            <i class="fas fa-route"></i>
                            <h3>Route Reports</h3>
                        </div>
                        <div class="report-content">
                            <p>Detailed analysis of all routes and performance metrics</p>
                            <div class="report-stats">
                                <div class="report-stat">
                                    <span>Total Routes</span>
                                    <strong>${this.routes.length}</strong>
                                </div>
                                <div class="report-stat">
                                    <span>Avg. Efficiency</span>
                                    <strong>${this.getRouteEfficiency()}%</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="report-card">
                        <div class="report-header">
                            <i class="fas fa-chart-line"></i>
                            <h3>Sales Reports</h3>
                        </div>
                        <div class="report-content">
                            <p>Monthly sales performance and revenue analysis</p>
                            <div class="report-stats">
                                <div class="report-stat">
                                    <span>Total Revenue</span>
                                    <strong>${this.getTotalRevenue()}</strong>
                                </div>
                                <div class="report-stat">
                                    <span>Avg. Order</span>
                                    <strong>₹${Math.floor(this.getAverageOrderValue())}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="report-card">
                        <div class="report-header">
                            <i class="fas fa-users"></i>
                            <h3>Customer Reports</h3>
                        </div>
                        <div class="report-content">
                            <p>Customer behavior and loyalty analysis</p>
                            <div class="report-stats">
                                <div class="report-stat">
                                    <span>Total Customers</span>
                                    <strong>${this.customers.length}</strong>
                                </div>
                                <div class="report-stat">
                                    <span>Loyalty Rate</span>
                                    <strong>85%</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    loadSettingsPage() {
        const mainContent = document.getElementById('main-content');
        
        mainContent.innerHTML = `
            <div class="routes-container">
                <div class="routes-header">
                    <h1>Settings</h1>
                </div>
                
                <div class="settings-content">
                    <div class="form-section">
                        <h3>Profile Settings</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Full Name</label>
                                <input type="text" class="form-control" value="${this.user.name}">
                            </div>
                            <div class="form-group">
                                <label>Email Address</label>
                                <input type="email" class="form-control" value="${this.user.email}">
                            </div>
                            <div class="form-group">
                                <label>Phone Number</label>
                                <input type="tel" class="form-control" value="${this.user.phone}">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    loadHelpPage() {
        const mainContent = document.getElementById('main-content');
        
        mainContent.innerHTML = `
            <div class="routes-container">
                <div class="routes-header">
                    <h1>Help & Support</h1>
                </div>
                
                <div class="help-content">
                    <div style="text-align: center; margin-bottom: 40px;">
                        <i class="fas fa-question-circle" style="font-size: 60px; color: #3498db; margin-bottom: 20px;"></i>
                        <h2 style="color: #2c3e50; margin-bottom: 10px;">How can we help you?</h2>
                        <p style="color: #7f8c8d;">Contact our support team for assistance</p>
                    </div>
                    
                    <div style="text-align: center;">
                        <p><strong>Email:</strong> support@pune-routes.com</p>
                        <p><strong>Phone:</strong> +91 1800-123-4567</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    // ... (rest of the modal functions and utility functions remain the same)
    openAddRouteModal() {
        const modalHTML = `
            <div class="modal-overlay" id="add-route-modal">
                <div class="modal-content" style="max-width: 500px;">
                    <div class="modal-header">
                        <h2>Add New Route</h2>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label>Route Name</label>
                                <input type="text" class="form-control" placeholder="Enter route name">
                            </div>
                            <div class="form-group">
                                <label>Area</label>
                                <input type="text" class="form-control" placeholder="Enter area">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" id="cancel-add-route">Cancel</button>
                        <button class="btn btn-primary" id="save-add-route">Save</button>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('modals-container').innerHTML = modalHTML;
        
        document.getElementById('cancel-add-route').addEventListener('click', () => {
            document.getElementById('add-route-modal').remove();
        });
        
        document.querySelector('.modal-close').addEventListener('click', () => {
            document.getElementById('add-route-modal').remove();
        });
        
        document.getElementById('save-add-route').addEventListener('click', () => {
            const newRoute = {
                id: this.routes.length + 1,
                name: 'New Route',
                area: 'New Area',
                status: 'pending',
                shops: 0,
                completed: 0,
                distance: '0 km',
                duration: '0 hrs',
                progress: 0,
                color: this.getRandomColor(),
                assigneeId: null,
                assignee: 'Unassigned',
                shopsList: []
            };
            
            this.routes.push(newRoute);
            this.showToast('Route added successfully!', 'success');
            document.getElementById('add-route-modal').remove();
            
            if (this.currentPage === 'routes') {
                this.loadRoutesPage();
            }
        });
        
        document.getElementById('add-route-modal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('add-route-modal')) {
                document.getElementById('add-route-modal').remove();
            }
        });
    }
    
    openScheduleVisitModal() {
        const modalHTML = `
            <div class="modal-overlay" id="schedule-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Schedule New Visit</h2>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-section">
                                <h3>Visit Details</h3>
                                <div class="form-grid">
                                    <div class="form-group">
                                        <label>Select Shop</label>
                                        <select class="form-control select">
                                            <option>Select shop...</option>
                                            ${this.routes.flatMap(r => r.shopsList).map(s => 
                                                `<option value="${s.id}">${s.name}</option>`
                                            ).join('')}
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Date</label>
                                        <input type="date" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label>Time</label>
                                        <input type="time" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" id="cancel-schedule-btn">Cancel</button>
                        <button class="btn btn-primary" id="submit-schedule-btn">Schedule</button>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('modals-container').innerHTML = modalHTML;
        
        document.getElementById('cancel-schedule-btn').addEventListener('click', () => {
            document.getElementById('schedule-modal').remove();
        });
        
        document.querySelector('.modal-close').addEventListener('click', () => {
            document.getElementById('schedule-modal').remove();
        });
        
        document.getElementById('submit-schedule-btn').addEventListener('click', () => {
            const newVisit = {
                id: this.scheduledVisits.length + 1,
                shopId: 1,
                shopName: 'New Shop',
                routeId: 1,
                routeName: 'Test Route',
                date: '2024-03-20',
                time: '10:00',
                purpose: 'Sales Review',
                priority: 'medium',
                status: 'scheduled'
            };
            
            this.scheduledVisits.push(newVisit);
            this.showToast('Visit scheduled successfully!', 'success');
            document.getElementById('schedule-modal').remove();
            
            if (this.currentPage === 'visits') {
                this.loadVisitsPage();
            }
        });
    }
    
    handleVisitAction(action, visitId) {
        const visit = this.scheduledVisits.find(v => v.id === visitId);
        if (!visit) return;
        
        switch(action) {
            case 'start-visit':
                visit.status = 'in-progress';
                this.showToast(`Starting visit to ${visit.shopName}`, 'success');
                if (this.currentPage === 'visits') this.loadVisitsPage();
                break;
                
            case 'cancel-visit':
                if (confirm(`Cancel visit to ${visit.shopName}?`)) {
                    this.scheduledVisits = this.scheduledVisits.filter(v => v.id !== visitId);
                    this.showToast('Visit cancelled', 'success');
                    if (this.currentPage === 'visits') this.loadVisitsPage();
                    this.updateBadges();
                }
                break;
        }
    }
    
    initCharts() {
        // Visits Chart
        const visitsCtx = document.getElementById('visitsChart');
        if (visitsCtx) {
            this.charts.visits = new Chart(visitsCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Daily Visits',
                        data: this.analyticsData.dailyVisits,
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } }
                }
            });
        }
        
        // Revenue Chart
        const revenueCtx = document.getElementById('revenueChart');
        if (revenueCtx) {
            this.charts.revenue = new Chart(revenueCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Monthly Revenue (₹)',
                        data: this.analyticsData.monthlyRevenue,
                        backgroundColor: [
                            'rgba(46, 204, 113, 0.7)',
                            'rgba(52, 152, 219, 0.7)',
                            'rgba(155, 89, 182, 0.7)',
                            'rgba(241, 196, 15, 0.7)',
                            'rgba(230, 126, 34, 0.7)',
                            'rgba(231, 76, 60, 0.7)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } }
                }
            });
        }
        
        // Category Chart
        const categoryCtx = document.getElementById('categoryChart');
        if (categoryCtx) {
            this.charts.category = new Chart(categoryCtx, {
                type: 'doughnut',
                data: {
                    labels: this.analyticsData.productCategories.map(c => c.category),
                    datasets: [{
                        data: this.analyticsData.productCategories.map(c => c.value),
                        backgroundColor: [
                            '#3498db',
                            '#2ecc71',
                            '#9b59b6',
                            '#f1c40f',
                            '#e74c3c'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }
    
    updateBadges() {
        document.getElementById('routes-badge').textContent = this.routes.length;
        document.getElementById('visits-badge').textContent = this.scheduledVisits.length;
        document.getElementById('orders-badge').textContent = this.orders.length;
    }
    
    getTotalShops() {
        return this.routes.reduce((sum, route) => sum + route.shops, 0);
    }
    
    getCompletedShops() {
        return this.routes.reduce((sum, route) => sum + route.completed, 0);
    }
    
    getCompletionRate() {
        const total = this.getTotalShops();
        const completed = this.getCompletedShops();
        return total > 0 ? Math.round((completed / total) * 100) : 0;
    }
    
    getTotalRevenue() {
        const total = this.orders.reduce((sum, order) => {
            const value = parseInt(order.value.replace(/[^0-9]/g, ''));
            return sum + (isNaN(value) ? 0 : value);
        }, 0);
        return '₹' + total.toLocaleString('en-IN');
    }
    
    getAverageOrderValue() {
        const total = this.orders.reduce((sum, order) => {
            const value = parseInt(order.value.replace(/[^0-9]/g, ''));
            return sum + (isNaN(value) ? 0 : value);
        }, 0);
        return total / this.orders.length || 0;
    }
    
    getDailyOrders() {
        return this.orders.filter(order => order.date === '2024-03-15').length;
    }
    
    getRouteEfficiency() {
        return Math.floor(Math.random() * 15) + 80;
    }
    
    getRandomColor() {
        const colors = ['#FF9933', '#138808', '#8B4513', '#800080', '#3498db', '#2ecc71', '#e74c3c', '#f39c12'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            timeElement.textContent = timeString;
        }
    }
    
    updateNotificationBar() {
        const pendingVisits = this.getTotalShops() - this.getCompletedShops();
        const notificationText = document.getElementById('notification-text');
        if (notificationText) {
            notificationText.textContent = `${pendingVisits} pending visits in Pune`;
        }
    }
    
    performSearch() {
        const searchInput = document.getElementById('route-search');
        const query = searchInput ? searchInput.value.trim() : '';
        
        if (query === '') {
            this.showToast('Please enter a search term', 'error');
            return;
        }
        
        const results = this.routes.filter(route => 
            route.name.toLowerCase().includes(query.toLowerCase()) ||
            route.area.toLowerCase().includes(query.toLowerCase())
        );
        
        if (results.length === 0) {
            this.showToast(`No results found for "${query}"`, 'error');
        } else {
            this.showToast(`Found ${results.length} route(s)`, 'success');
        }
    }
    
    refreshNotifications() {
        this.showToast('Refreshing notifications...', 'info');
    }
    
    clearNotifications() {
        if (this.notifications.length === 0) {
            this.showToast('No notifications to clear', 'info');
            return;
        }
        
        this.notifications = [];
        this.updateNotificationBar();
        this.showToast('Notifications cleared', 'success');
    }
    
    showStatDetails(statType) {
        this.showToast(`Showing details for ${statType}`, 'info');
    }
    
    handleLogout() {
        if (confirm('Are you sure you want to logout?')) {
            this.showToast('Logging out...', 'info');
            setTimeout(() => {
                this.showToast('Logged out successfully!', 'success');
            }, 1500);
        }
    }
    
    simulateRealTimeUpdates() {
        if (Math.random() > 0.5) {
            const activeRoutes = this.routes.filter(r => r.status === 'active' && r.completed < r.shops);
            if (activeRoutes.length > 0) {
                const randomRoute = activeRoutes[Math.floor(Math.random() * activeRoutes.length)];
                const pendingShops = randomRoute.shopsList.filter(s => s.status === 'pending');
                
                if (pendingShops.length > 0) {
                    const randomShop = pendingShops[0];
                    randomShop.status = 'completed';
                    randomShop.sales = `₹${Math.floor(Math.random() * 50000) + 10000}`;
                    randomRoute.completed++;
                    randomRoute.progress = Math.round((randomRoute.completed / randomRoute.shops) * 100);
                    
                    this.updateNotificationBar();
                    
                    if (this.currentPage === 'home' || this.currentPage === 'routes') {
                        this.navigateTo(this.currentPage);
                    }
                    
                    this.showToast(`Visit to ${randomShop.name} completed!`, 'success');
                }
            }
        }
    }
    
    changeAnalyticsPeriod(period, button) {
        const periodBtns = document.querySelectorAll('.period-btn');
        periodBtns.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        this.showToast(`Showing analytics for ${period}`, 'info');
    }
    
    showToast(message, type = 'info') {
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 3000);
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    window.app = new PuneRouteManagerWeb();
});