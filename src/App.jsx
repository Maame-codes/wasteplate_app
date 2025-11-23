import React, { useState } from 'react';
// IMPORT ICONS
import { 
    LayoutGrid, 
    BarChart3, 
    Settings, 
    HelpCircle, 
    Mail, 
    Leaf, 
    TrendingDown, 
    Clock, 
    Lightbulb,
    Menu,
    X
} from 'lucide-react';

// IMPORT YOUR LOGO
import wastePlateLogo from './assets/logo.png';

// --- SIMULATED INVENTORY DATA ---
const INVENTORY_ITEMS = [
    { name: "Banana", cost: 0.25 },
    { name: "Apple", cost: 0.35 },
    { name: "Lettuce", cost: 1.50 },
    { name: "Coffee Grounds", cost: 0.10 },
    { name: "Burger Patty", cost: 0.85 },
    { name: "Milk (Gallon)", cost: 3.20 },
    { name: "Bread Loaf", cost: 2.10 },
];

// --- SIDEBAR COMPONENT ---
function Sidebar({ isMobileOpen, closeMobileMenu, activePage, setActivePage }) {
    return (
        <>
            {/* Mobile Overlay */}
            <div 
                className={`sidebar-overlay ${isMobileOpen ? 'open' : ''}`} 
                onClick={closeMobileMenu}
            ></div>

            {/* Sidebar Content */}
            <aside className={`sidebar ${isMobileOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <img src={wastePlateLogo} alt="WastePlate Logo" className="sidebar-logo" />
                    <h2 className="sidebar-brand">WastePlate</h2>
                </div>

                <nav className="sidebar-nav">
                    <button 
                        className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
                        onClick={() => { setActivePage('dashboard'); closeMobileMenu(); }}
                    >
                        <LayoutGrid size={20} className="icon" /> Dashboard
                    </button>
                    <button 
                        className={`nav-item ${activePage === 'reports' ? 'active' : ''}`}
                        onClick={() => { setActivePage('reports'); closeMobileMenu(); }}
                    >
                        <BarChart3 size={20} className="icon" /> Reports
                    </button>
                    <button 
                        className={`nav-item ${activePage === 'inventory' ? 'active' : ''}`}
                        onClick={() => { setActivePage('inventory'); closeMobileMenu(); }}
                    >
                        <Settings size={20} className="icon" /> Inventory Setup
                    </button>
                    <button 
                        className={`nav-item ${activePage === 'faqs' ? 'active' : ''}`}
                        onClick={() => { setActivePage('faqs'); closeMobileMenu(); }}
                    >
                        <HelpCircle size={20} className="icon" /> FAQs
                    </button>
                    <button 
                        className={`nav-item ${activePage === 'contact' ? 'active' : ''}`}
                        onClick={() => { setActivePage('contact'); closeMobileMenu(); }}
                    >
                        <Mail size={20} className="icon" /> Contact
                    </button>
                </nav>

                <footer className="sidebar-footer">
                    <p>&copy; 2025 WastePlate.<br/>Measure waste. Multiply profit.</p>
                </footer>
            </aside>
        </>
    );
}

// --- DASHBOARD COMPONENTS ---

function TotalLossCard({ totalLoss }) {
    return (
        <div className="total-loss-card">
            <div className="loss-icon-wrapper">
                <TrendingDown size={24} color="#DC2626" />
            </div>
            <div className="loss-info">
                <span className="loss-label">TOTAL LOSS</span>
                <span className="loss-amount text-red">${totalLoss.toFixed(2)}</span>
            </div>
        </div>
    );
}

function LogForm({ inventoryItems, onLogSubmit }) {
    const [formData, setFormData] = useState({ itemName: '', quantity: 1, reason: '', unitCost: 0.00 });
    const [displayCost, setDisplayCost] = useState('$0.00');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: id === 'quantity' ? parseFloat(value) : value }));
    };

    const handleItemNameChange = (e) => {
        const val = e.target.value;
        setFormData(prev => ({ ...prev, itemName: val }));
        const found = inventoryItems.find(i => i.name === val);
        if (found) {
            setFormData(prev => ({ ...prev, unitCost: found.cost }));
            setDisplayCost(`$${found.cost.toFixed(2)}`);
        } else {
            setFormData(prev => ({ ...prev, unitCost: 0.00 }));
            setDisplayCost('$0.00');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.unitCost === 0.00 || !formData.reason || !formData.itemName) {
            alert("Please complete all fields.");
            return;
        }
        const newLog = {
            id: Date.now(),
            itemName: formData.itemName,
            quantity: formData.quantity,
            unitCost: formData.unitCost,
            reason: formData.reason,
            totalLoss: formData.quantity * formData.unitCost,
            timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        };
        onLogSubmit(newLog);
        setFormData({ itemName: '', quantity: 1, reason: '', unitCost: 0.00 });
        setDisplayCost('$0.00');
    };

    return (
        <div className="card form-card">
            <h3 className="card-title green-text">
                <Leaf size={20} className="mr-2" /> Log New Waste
            </h3>
            <form onSubmit={handleSubmit} className="log-form">
                <div className="form-group">
                    <label htmlFor="itemName">Item Name</label>
                    <input type="text" id="itemName" value={formData.itemName} onChange={handleItemNameChange} list="item-suggestions" placeholder="e.g. Banana" className="input-control" />
                    <datalist id="item-suggestions">
                        {inventoryItems.map(item => <option key={item.name} value={item.name} />)}
                    </datalist>
                </div>
                <div className="form-group small">
                    <label htmlFor="quantity">Qty</label>
                    <input type="number" id="quantity" min="1" value={formData.quantity} onChange={handleChange} className="input-control" />
                </div>
                <div className="form-group small">
                    <label htmlFor="unitCost">Unit Cost ($)</label>
                    <input type="text" id="unitCost" readOnly value={displayCost} className="input-control readonly" />
                </div>
                <div className="form-group">
                    <label htmlFor="reason">Reason</label>
                    <select id="reason" value={formData.reason} onChange={handleChange} className="input-control">
                        <option value="" disabled>Select reason </option>
                        <option value="Prep Error">Prep Error</option>
                        <option value="Expiration">Expiration</option>
                        <option value="Overstocked">Overstocked</option>
                    </select>
                </div>
                <button type="submit" className="btn-submit">+ LOG WASTE</button>
            </form>
        </div>
    );
}

function SummaryStats({ itemsLogged, qtyWasted, riskLevel }) {
    return (
        <div className="stats-grid">
            <div className="stat-card">
                <span className="stat-value green-text">{itemsLogged}</span>
                <span className="stat-label">ITEMS LOGGED</span>
            </div>
            <div className="stat-card">
                <span className="stat-value gray-text">{qtyWasted}</span>
                <span className="stat-label">QTY WASTED</span>
            </div>
            <div className="stat-card risk-card">
                <span className="stat-value orange-text">{riskLevel}</span>
                <span className="stat-label orange-text">RISK LEVEL</span>
            </div>
        </div>
    );
}

function TodaysLog({ logs }) {
    return (
        <div className="card log-list-card">
            <h3 className="card-title">
                <Clock size={20} className="mr-2 text-gray-500" /> Today's Log
            </h3>
            <div className="table-wrapper">
                <table className="log-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Loss</th>
                            <th>Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.length === 0 ? (
                            <tr><td colSpan="4" className="empty-message">No waste logged yet today.</td></tr>
                        ) : (
                            logs.map(log => (
                                <tr key={log.id}>
                                    <td>{log.itemName}</td>
                                    <td>{log.quantity}</td>
                                    <td className="text-red">${log.totalLoss.toFixed(2)}</td>
                                    <td>{log.reason}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function TipCard() {
    return (
        <div className="tip-card">
            <p className="tip-header">
                <Lightbulb size={18} className="mr-2 fill-blue-600 text-blue-600" /> Tip of the day
            </p>
            <p className="tip-text">Check inventory expiration dates before starting prep to reduce spoilage waste.</p>
        </div>
    );
}

function Dashboard({ wasteLogs, addLogEntry }) {
    const cumulativeLoss = wasteLogs.reduce((sum, log) => sum + log.totalLoss, 0);
    const itemsLogged = wasteLogs.length;
    const qtyWasted = wasteLogs.reduce((sum, log) => sum + log.quantity, 0);
    const riskLevel = cumulativeLoss > 100 ? 'High' : (cumulativeLoss > 0 ? 'Low' : '-');

    return (
        <div className="dashboard-container">
            <header className="page-header">
                <div className="header-titles">
                    <h1>Dashboard</h1>
                    <p>Track your kitchen efficiency today.</p>
                </div>
                <div className="header-action">
                    <TotalLossCard totalLoss={cumulativeLoss} />
                </div>
            </header>

            <div className="dashboard-content">
                <div className="left-column">
                    <LogForm inventoryItems={INVENTORY_ITEMS} onLogSubmit={addLogEntry} />
                    <SummaryStats itemsLogged={itemsLogged} qtyWasted={qtyWasted} riskLevel={riskLevel} />
                </div>
                <div className="right-column">
                    <TodaysLog logs={wasteLogs} />
                    <TipCard />
                </div>
            </div>
        </div>
    );
}

// --- MAIN APP ---
export default function WastePlateApp() {
    const [activePage, setActivePage] = useState('dashboard');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [wasteLogs, setWasteLogs] = useState([]);

    const addLogEntry = (newLog) => setWasteLogs(prev => [newLog, ...prev]);

    return (
        <div className="app-wrapper">
            {/* Hamburger Button (Mobile Only) */}
            <button className="hamburger-btn" onClick={() => setIsMobileOpen(true)}>
                <Menu size={24} />
            </button>

            <Sidebar 
                isMobileOpen={isMobileOpen} 
                closeMobileMenu={() => setIsMobileOpen(false)} 
                activePage={activePage}
                setActivePage={setActivePage}
            />

            <main className="main-layout">
                {activePage === 'dashboard' && <Dashboard wasteLogs={wasteLogs} addLogEntry={addLogEntry} />}
                {activePage !== 'dashboard' && (
                    <div className="placeholder-page">
                        <h1>{activePage.charAt(0).toUpperCase() + activePage.slice(1)}</h1>
                        <p>This section is under construction.</p>
                    </div>
                )}
            </main>
        </div>
    );
}