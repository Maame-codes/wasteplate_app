import React, { useState, useEffect } from "react";
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
  LogOut, // New icon for logout
  Lock, // New icon for login page
  User, // New icon for user info
} from "lucide-react";

// --- FIREBASE IMPORTS & SETUP (CRUCIAL) ---
// Note: These imports are necessary for Firebase functionality
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  addDoc,
  onSnapshot,
  collection,
  query,
} from "firebase/firestore"; // Removed unused imports

// Global variables for Firebase configuration (Mandatory for Canvas environment)
// NOTE: We are using a dummy app ID and config for local testing, replace with actual credentials when deploying securely
const appId =
  typeof __app_id !== "undefined" ? __app_id : "default-wasteplate-app-id";
const firebaseConfig =
  typeof __firebase_config !== "undefined" ? JSON.parse(__firebase_config) : {};
const initialAuthToken =
  typeof __initial_auth_token !== "undefined" ? __initial_auth_token : null;

// Initialize Firebase services
const app =
  Object.keys(firebaseConfig).length > 0 ? initializeApp(firebaseConfig) : null;
const db = app ? getFirestore(app) : null;
const auth = app ? getAuth(app) : null;

// --- SIMULATED INVENTORY DATA ---
const INVENTORY_ITEMS = [
  { name: "Banana", cost: 0.25 },
  { name: "Apple", cost: 0.35 },
  { name: "Lettuce", cost: 1.5 },
  { name: "Coffee Grounds", cost: 0.1 },
  { name: "Burger Patty", cost: 0.85 },
  { name: "Milk (Gallon)", cost: 3.2 },
  { name: "Bread Loaf", cost: 2.1 },
];

// --- LOGO (Loaded from assets) ---
import wastePlateLogo from "./assets/logo.png";

// --- SIDEBAR COMPONENT (Updated with Login/Logout buttons) ---
function Sidebar({
  isMobileOpen,
  closeMobileMenu,
  activePage,
  setActivePage,
  isLoggedIn,
  handleLogout,
}) {
  return (
    <>
      <div
        className={`sidebar-overlay ${isMobileOpen ? "open" : ""}`}
        onClick={closeMobileMenu}
      ></div>
      <aside className={`sidebar ${isMobileOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img
            src={wastePlateLogo}
            alt="WastePlate Logo"
            className="sidebar-logo"
          />
          <h2 className="sidebar-brand">WastePlate</h2>
        </div>

        <nav className="sidebar-nav">
          {isLoggedIn && (
            // Navigation for Logged-In Users
            <>
              <button
                className={`nav-item ${
                  activePage === "dashboard" ? "active" : ""
                }`}
                onClick={() => {
                  setActivePage("dashboard");
                  closeMobileMenu();
                }}
              >
                <LayoutGrid size={20} className="icon" /> Dashboard
              </button>
              <button
                className={`nav-item ${
                  activePage === "reports" ? "active" : ""
                }`}
                onClick={() => {
                  setActivePage("reports");
                  closeMobileMenu();
                }}
              >
                <BarChart3 size={20} className="icon" /> Reports
              </button>
              <button
                className={`nav-item ${
                  activePage === "inventory" ? "active" : ""
                }`}
                onClick={() => {
                  setActivePage("inventory");
                  closeMobileMenu();
                }}
              >
                <Settings size={20} className="icon" /> Inventory Setup
              </button>
            </>
          )}
          {/* General Links (Always visible) */}
          <button
            className={`nav-item ${activePage === "faqs" ? "active" : ""}`}
            onClick={() => {
              setActivePage("faqs");
              closeMobileMenu();
            }}
          >
            <HelpCircle size={20} className="icon" /> FAQs
          </button>
          <button
            className={`nav-item ${activePage === "contact" ? "active" : ""}`}
            onClick={() => {
              setActivePage("contact");
              closeMobileMenu();
            }}
          >
            <Mail size={20} className="icon" /> Contact
          </button>
        </nav>

        <footer className="sidebar-footer">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="nav-item logout-btn">
              <LogOut size={20} className="icon" /> Log Out
            </button>
          ) : (
            <button
              className="nav-item login-btn"
              onClick={() => {
                setActivePage("login");
                closeMobileMenu();
              }}
            >
              <Lock size={20} className="icon" /> Log In
            </button>
          )}
          <p>
            &copy; 2025 WastePlate.
            <br />
            Measure waste. Multiply profit.
          </p>
        </footer>
      </aside>
    </>
  );
}

// --- LOGIN PAGE COMPONENT ---
function LoginPage({ onLoginSuccess }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // --- Demo Login Logic ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Simulate successful login with demo credentials
    if (email === "chef@wasteplate.com" && password === "password") {
      try {
        if (auth) {
          // Use anonymous sign-in to satisfy Firebase security rules
          await signInAnonymously(auth);
          setMessage("Login Successful! Redirecting to Dashboard...");
          onLoginSuccess();
        }
      } catch (error) {
        setMessage(`Firebase Error: ${error.message}`);
      }
    } else {
      setMessage(
        "Invalid credentials. Use email: chef@wasteplate.com, password: password"
      );
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <div className="login-header">
          <Lock size={32} className="login-icon" />
          <h2 className="login-title">Chef Login</h2>
          <p className="login-subtitle">Access your restaurant's data.</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email (Demo: chef@wasteplate.com)</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-control"
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password (Demo: password)</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-control"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="button-primary-green btn-login"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
        {message && (
          <p
            className={`login-message ${
              message.startsWith("Firebase") ? "text-red" : "green-text"
            }`}
          >
            {message}
          </p>
        )}

        <p className="demo-note">
          Note: This uses simulated credentials and Firebase Anonymous Auth for
          demo purposes.
        </p>
      </div>
    </div>
  );
}

// --- DASHBOARD COMPONENTS (Rest of the code remains the same) ---
// NOTE: Components below have been simplified or remain as placeholders from the previous steps.

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
  const [formData, setFormData] = useState({
    itemName: "",
    quantity: 1,
    reason: "",
    unitCost: 0.0,
  });
  const [displayCost, setDisplayCost] = useState("$0.00");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "quantity" ? parseFloat(value) : value,
    }));
  };

  const handleItemNameChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, itemName: val }));
    const found = inventoryItems.find((i) => i.name === val);
    if (found) {
      setFormData((prev) => ({ ...prev, unitCost: found.cost }));
      setDisplayCost(`$${found.cost.toFixed(2)}`);
    } else {
      setFormData((prev) => ({ ...prev, unitCost: 0.0 }));
      setDisplayCost("$0.00");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.unitCost === 0.0 || !formData.reason || !formData.itemName) {
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
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    onLogSubmit(newLog);
    setFormData({ itemName: "", quantity: 1, reason: "", unitCost: 0.0 });
    setDisplayCost("$0.00");
  };

  return (
    <div className="card form-card">
      <h3 className="card-title green-text">
        <Leaf size={20} className="mr-2" /> Log New Waste
      </h3>
      <form onSubmit={handleSubmit} className="log-form">
        <div className="form-group">
          <label htmlFor="itemName">Item Name</label>
          <input
            type="text"
            id="itemName"
            value={formData.itemName}
            onChange={handleItemNameChange}
            list="item-suggestions"
            placeholder="e.g. Banana"
            className="input-control"
          />
          <datalist id="item-suggestions">
            {inventoryItems.map((item) => (
              <option key={item.name} value={item.name} />
            ))}
          </datalist>
        </div>
        <div className="form-group small">
          <label htmlFor="quantity">Qty</label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            className="input-control"
          />
        </div>
        <div className="form-group small">
          <label htmlFor="unitCost">Unit Cost ($)</label>
          <input
            type="text"
            id="unitCost"
            readOnly
            value={displayCost}
            className="input-control readonly"
          />
        </div>
        <div className="form-group">
          <label htmlFor="reason">Reason</label>
          <select
            id="reason"
            value={formData.reason}
            onChange={handleChange}
            className="input-control"
          >
            <option value="" disabled>
              Select reason ⌄
            </option>
            <option value="Prep Error">Prep Error</option>
            <option value="Expiration">Expiration</option>
            <option value="Overstocked">Overstocked</option>
          </select>
        </div>
        <button type="submit" className="btn-submit">
          + LOG WASTE
        </button>
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
              <tr>
                <td colSpan="4" className="empty-message">
                  No waste logged yet today.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
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
        <Lightbulb size={18} className="mr-2 fill-blue-600 text-blue-600" /> Tip
        of the day
      </p>
      <p className="tip-text">
        Check inventory expiration dates before starting prep to reduce spoilage
        waste.
      </p>
    </div>
  );
}

function Dashboard({ wasteLogs, addLogEntry }) {
  const cumulativeLoss = wasteLogs.reduce((sum, log) => sum + log.totalLoss, 0);
  const itemsLogged = wasteLogs.length;
  const qtyWasted = wasteLogs.reduce((sum, log) => sum + log.quantity, 0);
  const riskLevel =
    cumulativeLoss > 100 ? "High" : cumulativeLoss > 0 ? "Low" : "-";

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
          <SummaryStats
            itemsLogged={itemsLogged}
            qtyWasted={qtyWasted}
            riskLevel={riskLevel}
          />
        </div>
        <div className="right-column">
          <TodaysLog logs={wasteLogs} />
          <TipCard />
        </div>
      </div>
    </div>
  );
}

// --- REPORTS PAGE (Final Content) ---
function ReportsPage() {
  return (
    <div className="page-content reports-page">
      <header className="page-header-simple">
        <h1>Reports & Insights</h1>
        <p>Identify costly trends and optimize your menu/inventory.</p>
      </header>
      <div className="dashboard-content">
        <div className="left-column">
          <div className="card report-section" style={{ minHeight: "300px" }}>
            <h3 className="card-title">
              <BarChart3 size={20} className="mr-2" /> Top 5 Wasted Items
              (Financial Loss)
            </h3>
            <div className="text-sm text-gray-500 italic">
              [Data visualization placeholder: This is where a bar chart showing
              loss by item would go.]
            </div>
          </div>
          <div className="card report-section" style={{ minHeight: "300px" }}>
            <h3 className="card-title">
              <Clock size={20} className="mr-2" /> Waste by Time of Day
            </h3>
            <div className="text-sm text-gray-500 italic">
              [Data visualization placeholder: This would show a graph of waste
              peaks by hour (e.g., peak waste at 9 AM prep time).]
            </div>
          </div>
        </div>
        <div className="right-column">
          <div className="card report-section" style={{ minHeight: "300px" }}>
            <h3 className="card-title">
              <Leaf size={20} className="mr-2" /> Waste by Reason Breakdown
            </h3>
            <div className="text-sm text-gray-500 italic">
              [Data visualization placeholder: Pie Chart showing breakdown by
              reason: Prep Error, Expiration, etc.]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- INVENTORY SETUP PAGE (Final Content) ---
function InventorySetupPage() {
  return (
    <div className="page-content inventory-page">
      <header className="page-header-simple">
        <h1>Inventory Setup</h1>
        <p>Manage your standard unit costs for accurate loss tracking.</p>
      </header>
      <div className="card">
        <h3 className="card-title">
          <Settings size={20} className="mr-2" /> Current Item Costs
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Editing this list ensures your profit loss calculations are accurate.
        </p>
        <div className="table-wrapper">
          <table className="log-table">
            <thead>
              <tr>
                <th className="table-th">Item Name</th>
                <th className="table-th">Cost Per Unit</th>
                <th className="table-th">Action</th>
              </tr>
            </thead>
            <tbody>
              {INVENTORY_ITEMS.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>${item.cost.toFixed(2)}</td>
                  <td>
                    <button className="text-red-loss text-sm font-medium">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- FAQs PAGE (Final Content) ---
function FAQsPage() {
  const faqs = [
    {
      q: "What is the Unit Cost?",
      a: "The Unit Cost is the actual cost your restaurant pays to procure one unit of the item (e.g., one banana, one pound of flour, one bottle of milk). We use this to calculate true financial loss.",
    },
    {
      q: "How do I get my data off the app?",
      a: "In the Reports section, there will be an option to export your data as a CSV file for external accounting or analysis.",
    },
    {
      q: "How often should staff log waste?",
      a: "Waste should be logged immediately as it occurs—whether it's spoilage, a prep mistake, or a customer return—to ensure maximum data accuracy.",
    },
  ];

  return (
    <div className="page-content faqs-page">
      <header className="page-header-simple">
        <h1>Frequently Asked Questions (FAQs)</h1>
      </header>
      <div className="card space-y-4">
        {faqs.map((item, index) => (
          <div key={index} className="border-b pb-3">
            <h4 className="font-semibold text-lg green-text mb-1 flex items-center">
              <HelpCircle size={18} className="mr-2" /> {item.q}
            </h4>
            <p className="text-gray-600 pl-6">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- CONTACT PAGE (Final Content) ---
function ContactPage() {
  return (
    <div className="page-content contact-page">
      <header className="page-header-simple">
        <h1>Contact Support</h1>
        <p>We are here to help you multiply your profit.</p>
      </header>
      <div className="card contact-card text-center">
        <Mail size={32} className="mx-auto mb-4" />
        <p className="font-medium">
          For immediate assistance, please email us:
        </p>
        <p className="text-lg font-bold green-text">support@wasteplate.com</p>
        <div className="mt-6 border-t pt-4">
          <p className="text-sm text-gray-500">
            Or use the form below for general inquiries (form placeholder).
          </p>
        </div>
      </div>
    </div>
  );
}

// --- MAIN APP COMPONENT ---
export default function WastePlateApp() {
  const [activePage, setActivePage] = useState("login");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [wasteLogs, setWasteLogs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // --- AUTHENTICATION EFFECT ---
  useEffect(() => {
    if (auth) {
      const unsub = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLoggedIn(true);
          setActivePage("dashboard");
        } else {
          setIsLoggedIn(false);
          setActivePage("login");
        }
      });
      // Attempt to sign in with custom token if available (Canvas environment requirement)
      if (initialAuthToken) {
        signInWithCustomToken(auth, initialAuthToken).catch(console.error);
      } else if (Object.keys(firebaseConfig).length > 0) {
        // Optional: For standard testing outside canvas, use anonymous sign in
        // signInAnonymously(auth).catch(console.error);
      }
      return () => unsub(); // Cleanup subscription
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setActivePage("dashboard");
  };

  const handleLogout = () => {
    if (auth) {
      signOut(auth)
        .then(() => {
          setIsLoggedIn(false);
          setActivePage("login");
        })
        .catch(console.error);
    }
  };

  const addLogEntry = (newLog) => setWasteLogs((prev) => [newLog, ...prev]);
  const toggleMenu = () => setIsMobileOpen(!isMobileOpen);

  const renderPage = () => {
    if (!isLoggedIn && activePage !== "faqs" && activePage !== "contact") {
      return <LoginPage onLoginSuccess={handleLoginSuccess} />;
    }

    switch (activePage) {
      case "dashboard":
        return (
          <Dashboard
            wasteLogs={wasteLogs}
            addLogEntry={addLogEntry}
            inventoryItems={INVENTORY_ITEMS}
          />
        );
      case "reports":
        return <ReportsPage />;
      case "inventory":
        return <InventorySetupPage />;
      case "faqs":
        return <FAQsPage />;
      case "contact":
        return <ContactPage />;
      case "login":
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
      default:
        return (
          <Dashboard
            wasteLogs={wasteLogs}
            addLogEntry={addLogEntry}
            inventoryItems={INVENTORY_ITEMS}
          />
        );
    }
  };

  return (
    <div className="app-wrapper">
      {/* Hamburger Button (Mobile Only) */}
      <button className="hamburger-btn" onClick={toggleMenu}>
        <Menu size={24} />
      </button>

      <Sidebar
        isMobileOpen={isMobileOpen}
        closeMobileMenu={() => setIsMobileOpen(false)}
        activePage={activePage}
        setActivePage={setActivePage}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />

      <main className="main-layout">{renderPage()}</main>
    </div>
  );
}
