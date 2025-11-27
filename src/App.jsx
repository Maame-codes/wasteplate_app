import React, { useState } from "react";
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
  LogOut,
  Lock,
  UserPlus,
  X,
  ChevronRight,
  Search,
  User,
} from "lucide-react";

// IMPORT YOUR LOGO
import wastePlateLogo from "./assets/logo.png";

// --- SIMULATED DATA ---
const INVENTORY_ITEMS = [
  { name: "Banana", cost: 0.25, stock: "High" },
  { name: "Apple", cost: 0.35, stock: "Medium" },
  { name: "Lettuce", cost: 1.5, stock: "Low" },
  { name: "Coffee Grounds", cost: 0.1, stock: "High" },
  { name: "Burger Patty", cost: 0.85, stock: "Medium" },
  { name: "Milk (Gallon)", cost: 3.2, stock: "Low" },
  { name: "Bread Loaf", cost: 2.1, stock: "High" },
];

// --- SIDEBAR COMPONENT ---
function Sidebar({
  isMobileOpen,
  closeMobileMenu,
  activePage,
  setActivePage,
  isLoggedIn,
  handleLogout,
}) {
  const NavItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => {
        setActivePage(id);
        closeMobileMenu();
      }}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group
                ${
                  activePage === id
                    ? "bg-primary-50 text-primary-700 shadow-sm ring-1 ring-primary-200"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
    >
      <Icon
        size={20}
        className={
          activePage === id
            ? "text-primary-600"
            : "text-slate-400 group-hover:text-slate-600"
        }
      />
      <span className="font-medium text-sm">{label}</span>
      {activePage === id && (
        <ChevronRight size={16} className="ml-auto text-primary-400" />
      )}
    </button>
  );

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden
                ${
                  isMobileOpen
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
        onClick={closeMobileMenu}
      />

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-72 bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 ease-out flex flex-col
                ${
                  isMobileOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0`}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            <img
              src={wastePlateLogo}
              alt="Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-bold tracking-tight text-slate-800">
              WastePlate
            </span>
          </div>
          {/* Only show X on mobile, clicking it closes menu */}
          <button
            onClick={closeMobileMenu}
            className="lg:hidden text-slate-400 hover:text-slate-600 p-1"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {isLoggedIn ? (
            <>
              <div className="px-4 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Analytics
              </div>
              <NavItem id="dashboard" icon={LayoutGrid} label="Dashboard" />
              <NavItem id="reports" icon={BarChart3} label="Reports" />
              <NavItem id="inventory" icon={Settings} label="Inventory" />
            </>
          ) : (
            <div className="p-4 bg-primary-50 rounded-xl mb-6 border border-primary-100">
              <h4 className="font-semibold text-primary-800 mb-1 flex items-center gap-2">
                <User size={16} /> Welcome Chef!
              </h4>
              <p className="text-xs text-primary-600 mb-3">
                Please log in to manage your kitchen.
              </p>
              <button
                onClick={() => {
                  setActivePage("login");
                  closeMobileMenu();
                }}
                className="w-full py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded shadow-sm transition-colors"
              >
                Access Dashboard
              </button>
            </div>
          )}

          <div className="px-4 mt-8 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Support
          </div>
          <NavItem id="faqs" icon={HelpCircle} label="FAQs" />
          <NavItem id="contact" icon={Mail} label="Contact Support" />

          {!isLoggedIn && (
            <>
              <div className="my-4 border-t border-slate-100"></div>
              <NavItem id="login" icon={Lock} label="Log In" />
              <NavItem id="signup" icon={UserPlus} label="Sign Up" />
            </>
          )}
        </nav>

        <div className="p-4 border-t border-slate-200 bg-slate-50">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
            >
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          ) : (
            <p className="text-xs text-center text-slate-400">Guest Mode</p>
          )}
          <p className="mt-4 text-xs text-center text-slate-400">
            © 2025 WastePlate v1.0
          </p>
        </div>
      </aside>
    </>
  );
}

// --- DASHBOARD WIDGETS ---

const MetricCard = ({ label, value, icon: Icon, colorClass, trend }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
          {label}
        </p>
        <h3 className={`text-2xl font-extrabold mt-1 ${colorClass}`}>
          {value}
        </h3>
      </div>
      <div
        className={`p-2 rounded-lg ${
          colorClass === "text-red-500" ? "bg-red-50" : "bg-primary-50"
        }`}
      >
        <Icon size={20} className={colorClass} />
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center text-xs font-medium text-slate-500">
        <span className="text-red-500 mr-1">↑ 12%</span> vs last week
      </div>
    )}
  </div>
);

const LogForm = ({ inventoryItems, onLogSubmit }) => {
  const [formData, setFormData] = useState({
    itemName: "",
    quantity: "",
    reason: "",
    unitCost: 0.0,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "quantity" ? parseFloat(value) : value,
    }));
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, itemName: val }));
    const found = inventoryItems.find((i) => i.name === val);
    setFormData((prev) => ({ ...prev, unitCost: found ? found.cost : 0.0 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.unitCost || !formData.reason || !formData.itemName)
      return alert("Please fill all fields");

    onLogSubmit({
      id: Date.now(),
      ...formData,
      totalLoss: formData.quantity * formData.unitCost,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
    setFormData({ itemName: "", quantity: "", reason: "", unitCost: 0.0 });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Leaf size={18} className="text-primary-500" /> Log New Waste
        </h3>
      </div>
      <form onSubmit={handleSubmit} className="p-6 grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2 relative">
          <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">
            Item Name
          </label>
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-3 text-slate-400"
            />
            <input
              type="text"
              list="items"
              value={formData.itemName}
              onChange={handleSearch}
              placeholder="Search inventory..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm"
            />
          </div>
          <datalist id="items">
            {inventoryItems.map((i) => (
              <option key={i.name} value={i.name} />
            ))}
          </datalist>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">
            Unit Cost
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-slate-400">$</span>
            <input
              type="text"
              readOnly
              value={formData.unitCost.toFixed(2)}
              className="w-full pl-7 pr-4 py-2.5 bg-slate-100 border border-transparent rounded-lg text-slate-500 cursor-not-allowed text-sm font-medium"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">
            Reason
          </label>
          <select
            id="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm appearance-none"
          >
            <option value="" disabled>
              Select a reason...
            </option>
            <option>Prep Error</option>
            <option>Expiration</option>
            <option>Spillage</option>
          </select>
        </div>

        <button
          type="submit"
          className="md:col-span-2 w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg shadow-md shadow-primary-500/30 transition-all transform active:scale-95 flex justify-center items-center gap-2"
        >
          <span>Add to Log</span>
          <TrendingDown size={18} />
        </button>
      </form>
    </div>
  );
};

const LogTable = ({ logs }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
    <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
      <h3 className="font-bold text-slate-800 flex items-center gap-2">
        <Clock size={18} className="text-primary-500" /> Recent Activity
      </h3>
      <span className="text-xs font-medium text-slate-400 px-2 py-1 bg-slate-100 rounded-md">
        {logs.length} entries
      </span>
    </div>
    <div className="overflow-auto flex-1">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50 sticky top-0">
          <tr>
            <th className="px-6 py-3 font-bold">Item</th>
            <th className="px-6 py-3 font-bold">Qty</th>
            <th className="px-6 py-3 font-bold">Loss</th>
            <th className="px-6 py-3 font-bold">Reason</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {logs.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="px-6 py-8 text-center text-slate-400 italic"
              >
                No waste logged yet today.
              </td>
            </tr>
          ) : (
            logs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-3 font-medium text-slate-700">
                  {log.itemName}
                </td>
                <td className="px-6 py-3 text-slate-600">{log.quantity}</td>
                <td className="px-6 py-3 font-bold text-red-500">
                  -${log.totalLoss.toFixed(2)}
                </td>
                <td className="px-6 py-3">
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium border border-slate-200">
                    {log.reason}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

// --- PAGES ---

function Dashboard({ wasteLogs, addLogEntry, inventoryItems }) {
  const cumulativeLoss = wasteLogs.reduce((sum, log) => sum + log.totalLoss, 0);
  const itemsLogged = wasteLogs.length;

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <header className="flex justify-between items-end pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Overview of today's kitchen efficiency.
          </p>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Date
          </p>
          <p className="font-medium text-slate-700">
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          label="Total Financial Loss"
          value={`$${cumulativeLoss.toFixed(2)}`}
          icon={TrendingDown}
          colorClass="text-red-500"
          trend={true}
        />
        <MetricCard
          label="Items Wasted"
          value={itemsLogged}
          icon={LayoutGrid}
          colorClass="text-slate-700"
        />
        <div className="bg-gradient-to-br from-primary-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg shadow-primary-500/30 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-primary-100 text-xs font-bold uppercase tracking-wider">
                Status
              </p>
              <h3 className="text-2xl font-extrabold mt-1">On Track</h3>
            </div>
            <Leaf className="text-primary-200" />
          </div>
          <p className="text-sm text-primary-100 mt-4 opacity-90">
            Your waste is 5% lower than yesterday. Keep it up!
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <LogForm inventoryItems={inventoryItems} onLogSubmit={addLogEntry} />
        </div>
        <div className="lg:col-span-2 h-full">
          <LogTable logs={wasteLogs} />
        </div>
      </div>
    </div>
  );
}

// --- NEW PAGES (Tailwind Styled) ---

function ReportsPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <header className="pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Reports & Insights
        </h1>
        <p className="text-slate-500 mt-1">
          Visualizing your kitchen's financial performance.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Financial Loss Chart Placeholder */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-primary-500" /> Financial Loss
            by Item
          </h3>
          <div className="h-64 flex items-end justify-between px-4 pb-2 border-b border-slate-100 space-x-2">
            {[80, 60, 45, 30, 90].map((h, i) => (
              <div
                key={i}
                className="w-full bg-primary-100 rounded-t-md relative group hover:bg-primary-200 transition-colors cursor-pointer"
              >
                <div
                  className="absolute bottom-0 w-full bg-primary-500 rounded-t-md transition-all duration-1000 ease-out"
                  style={{ height: `${h}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm p-2 bg-red-50 rounded text-red-700 font-medium">
              <span>1. Milk (Spoilage)</span>
              <span>$195.00</span>
            </div>
            <div className="flex justify-between text-sm p-2 bg-slate-50 rounded text-slate-600">
              <span>2. Sirloin Steak</span>
              <span>$145.00</span>
            </div>
          </div>
        </div>

        {/* Waste Breakdown Placeholder */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Leaf size={18} className="text-primary-500" /> Waste by Reason
          </h3>
          <div className="h-48 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border-8 border-primary-100 border-t-primary-500 border-r-orange-400 rotate-45"></div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary-500"></span>
              <span className="text-slate-600">Prep Error (45%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-400"></span>
              <span className="text-slate-600">Expiration (30%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InventorySetupPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <header className="flex justify-between items-end pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Inventory Setup
          </h1>
          <p className="text-slate-500 mt-1">
            Manage standard unit costs and stock levels.
          </p>
        </div>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm">
          + Add Item
        </button>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-bold">Item Name</th>
              <th className="px-6 py-4 font-bold">Stock Status</th>
              <th className="px-6 py-4 font-bold">Cost Per Unit</th>
              <th className="px-6 py-4 font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {INVENTORY_ITEMS.map((item, index) => (
              <tr key={index} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-700">
                  {item.name}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold
                                        ${
                                          item.stock === "High"
                                            ? "bg-green-100 text-green-700"
                                            : item.stock === "Medium"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                  >
                    {item.stock}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600 font-mono">
                  ${item.cost.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary-600 hover:text-primary-800 font-medium text-xs uppercase tracking-wide">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FAQsPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-10 max-w-3xl">
      <header className="pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
      </header>
      <div className="space-y-4">
        {[
          {
            q: "How do I calculate unit cost?",
            a: "Divide the total price of a bulk case by the number of usable units inside.",
          },
          {
            q: "Can I export my data?",
            a: "Yes, go to the Reports tab and click 'Export CSV'.",
          },
          {
            q: "Is my data secure?",
            a: "Absolutely. Your data is stored privately and accessible only by you.",
          },
        ].map((faq, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-primary-200 transition-colors"
          >
            <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-2">
              <HelpCircle size={18} className="text-primary-500" /> {faq.q}
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed pl-7">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <header className="pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Contact Support
        </h1>
        <p className="text-slate-500 mt-1">
          We're here to help you multiply your profit.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl border border-primary-100 text-center">
          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-primary-600">
            <Mail size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            Email Support
          </h3>
          <p className="text-slate-500 mb-6 text-sm">
            For urgent technical issues, reach us directly.
          </p>
          <a
            href="mailto:support@wasteplate.com"
            className="text-lg font-bold text-primary-600 hover:text-primary-700 hover:underline"
          >
            support@wasteplate.com
          </a>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Send a Message</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                placeholder="you@restaurant.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                Message
              </label>
              <textarea
                rows="4"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                placeholder="How can we help?"
              ></textarea>
            </div>
            <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors text-sm">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function LoginPage({ onLoginSuccess, switchToSignup }) {
  return (
    <div className="flex items-center justify-center min-h-[80vh] animate-fade-in">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-primary-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
          <p className="text-slate-500 text-sm mt-1">
            Sign in to access your kitchen analytics.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLoginSuccess();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Email Address
            </label>
            <input
              type="email"
              defaultValue="chef@wasteplate.com"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Password
            </label>
            <input
              type="password"
              defaultValue="password"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
            />
          </div>
          <button className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-primary-500/30 mt-2 text-sm">
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center text-xs text-slate-400">
          Don't have an account?{" "}
          <button
            onClick={switchToSignup}
            className="text-primary-600 font-bold hover:underline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

function SignupPage({ onSignupSuccess, switchToLogin }) {
  return (
    <div className="flex items-center justify-center min-h-[80vh] animate-fade-in">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="text-blue-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Create Account</h2>
          <p className="text-slate-500 text-sm mt-1">
            Start tracking your waste today.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSignupSuccess();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Jane Doe"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="jane@restaurant.com"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
          </div>
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-500/30 mt-2 text-sm">
            Create Account
          </button>
        </form>
        <div className="mt-6 text-center text-xs text-slate-400">
          Already have an account?{" "}
          <button
            onClick={switchToLogin}
            className="text-blue-600 font-bold hover:underline"
          >
            Log In
          </button>
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

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setActivePage("dashboard");
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setActivePage("login");
  };
  const addLogEntry = (newLog) => setWasteLogs((prev) => [newLog, ...prev]);

  const renderPage = () => {
    if (!isLoggedIn) {
      if (activePage === "faqs") return <FAQsPage />;
      if (activePage === "contact") return <ContactPage />;
      if (activePage === "signup")
        return (
          <SignupPage
            onSignupSuccess={handleLoginSuccess}
            switchToLogin={() => setActivePage("login")}
          />
        );
      return (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          switchToSignup={() => setActivePage("signup")}
        />
      );
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
    <div className="flex min-h-screen bg-white font-sans text-slate-900">
      <Sidebar
        isMobileOpen={isMobileOpen}
        closeMobileMenu={() => setIsMobileOpen(false)}
        activePage={activePage}
        setActivePage={setActivePage}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <img src={wastePlateLogo} alt="Logo" className="w-8 h-8" />
            <span className="font-bold text-slate-800">WastePlate</span>
          </div>
          <button
            onClick={() => setIsMobileOpen(true)}
            className="text-slate-600 hover:text-primary-600 p-2 rounded-md hover:bg-slate-100 transition-colors"
          >
            <Menu size={24} />
          </button>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-8 relative max-w-7xl mx-auto w-full">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
