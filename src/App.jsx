import React, { useState } from 'react';
import { 
  Truck, Sprout, ShieldCheck, MapPin, Search, DollarSign, 
  ShoppingCart, Building2, CheckCircle, Wrench, 
  Calculator, UserCheck, Star, ArrowRight, Package, AlertCircle 
} from 'lucide-react';

export default function AgriUSMarketplace() {
  const [activeTab, setActiveTab] = useState('home');
  const [currency, setCurrency] = useState('USD');
  const [exchangeRates] = useState({ USD: 1, EUR: 0.92, SAR: 3.75, DZD: 134.5, AED: 3.67 });
  const [searchQuery, setSearchQuery] = useState('');
  
  const [platformCommission, setPlatformCommission] = useState(3.5);
  const [activeVendorsCount, setActiveVendorsCount] = useState(124);
  const [monthlyOrders, setMonthlyOrders] = useState(450);
  const averageOrderValue = 12500;

  const estimatedMonthlyRevenue = Math.round((monthlyOrders * averageOrderValue) * (platformCommission / 100) + (activeVendorsCount * 199));

  const [equipmentList, setEquipmentList] = useState([
    {
      id: 1,
      title: "John Deere 8R 370 Row-Crop Tractor",
      category: "Tractors & Heavy Machinery",
      price: 285000,
      location: "Iowa, US (ZIP: 50309)",
      condition: "Certified Used (320 Hours)",
      seller: "Midwest Farm Solutions",
      verified: true,
      image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb26978?auto=format&fit=crop&w=800&q=80",
      shippingWeight: "24,500 lbs (Heavy Freight)"
    },
    {
      id: 2,
      title: "DJI Agras T40 Agricultural Spraying Drone",
      category: "Precision Ag & Drones",
      price: 22500,
      location: "California, US (ZIP: 90210)",
      condition: "Brand New",
      seller: "AgriTech Innovations LLC",
      verified: true,
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
      shippingWeight: "140 lbs (Standard Freight)"
    },
    {
      id: 3,
      title: "Valmont Pivot Irrigation System (1/4 Mile)",
      category: "Irrigation & Water Systems",
      price: 45000,
      location: "Texas, US (ZIP: 75201)",
      condition: "New Kit",
      seller: "Texas Hydro & Irrigation",
      verified: false,
      image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80",
      shippingWeight: "8,200 lbs (Heavy Freight)"
    }
  ]);

  const [cart, setCart] = useState([]);
  const [buyerZip, setBuyerZip] = useState('');
  const [freightCost, setFreightCost] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('deposit_cod');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newEq, setNewEq] = useState({
    title: '', category: 'Tractors & Heavy Machinery', price: '', location: '', condition: 'Brand New', seller: '', shippingWeight: ''
  });

  const formatPrice = (usdAmount) => {
    const converted = usdAmount * exchangeRates[currency];
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(converted);
  };

  const handleAddEquipment = (e) => {
    e.preventDefault();
    if (!newEq.title || !newEq.price) return;
    const item = {
      id: equipmentList.length + 1,
      ...newEq,
      price: Number(newEq.price),
      verified: true,
      image: "https://images.unsplash.com/photo-1589923188653-ba6fc58dcf48?auto=format&fit=crop&w=800&q=80"
    };
    setEquipmentList([item, ...equipmentList]);
    setNewEq({ title: '', category: 'Tractors & Heavy Machinery', price: '', location: '', condition: 'Brand New', seller: '', shippingWeight: '' });
    setActiveTab('market');
    alert('Listing added successfully! Your Verified Status granted you 3 Free Listings.');
  };

  const calculateFreight = () => {
    if (!buyerZip) {
      alert('Please enter your US ZIP Code first.');
      return;
    }
    const simulatedCost = Math.floor(Math.random() * 800) + 350;
    setFreightCost(simulatedCost);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* Top Trust Banner */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Verified US Farmers & Dealers Network | 3 Free Listings with Profile Verification</span>
        </div>
        <div>
          <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-emerald-800 text-white rounded px-2 py-0.5 text-xs border border-emerald-700"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="SAR">SAR (ر.س)</option>
            <option value="AED">AED (د.إ)</option>
            <option value="DZD">DZD (دج)</option>
          </select>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="bg-emerald-600 text-white p-2 rounded-xl flex items-center justify-center shadow-md">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-emerald-900">AgriUS<span className="text-amber-600">Market</span></h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">US Agricultural & Machinery Hub</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 font-medium text-sm">
            <button onClick={() => setActiveTab('home')} className={`hover:text-emerald-600 transition ${activeTab === 'home' ? 'text-emerald-600 font-bold' : ''}`}>Home</button>
            <button onClick={() => setActiveTab('market')} className={`hover:text-emerald-600 transition ${activeTab === 'market' ? 'text-emerald-600 font-bold' : ''}`}>Machinery Store</button>
            <button onClick={() => setActiveTab('sell')} className={`hover:text-emerald-600 transition ${activeTab === 'sell' ? 'text-emerald-600 font-bold' : ''}`}>List Equipment (Free)</button>
            <button onClick={() => setActiveTab('admin')} className={`hover:text-emerald-600 transition text-amber-600 font-bold ${activeTab === 'admin' ? 'underline' : ''}`}>Owner & Revenue</button>
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative bg-slate-100 hover:bg-slate-200 p-2.5 rounded-full transition"
            >
              <ShoppingCart className="w-5 h-5 text-slate-700" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('sell')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow transition flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4" /> Get Verified (3 Free)
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'home' && (
          <div className="space-y-12">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-8 md:p-14 shadow-xl">
              <div className="relative z-10 max-w-2xl space-y-4">
                <span className="bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase">US Agricultural Equipment B2B & B2C</span>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">The Ultimate Marketplace for American Agriculture</h2>
                <p className="text-slate-300 text-sm md:text-base">Buy and sell heavy tractors, precision drones, irrigation systems, and farm supplies directly from verified US dealers with secure Pay on Delivery & Freight Integration.</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button onClick={() => setActiveTab('market')} className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl shadow transition flex items-center gap-2">
                    Browse Equipment <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'market' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {equipmentList.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div>
                    <div className="relative h-48 bg-slate-100 overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <span className="absolute bottom-3 right-3 bg-slate-900/80 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                      <div className="flex items-center gap-1 text-slate-500 text-xs">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 pt-0 border-t border-slate-100 mt-2">
                    <button 
                      onClick={() => { setCart([...cart, item]); setIsModalOpen(true); }}
                      className="w-full mt-3 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" /> Request Quote / Buy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sell' && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="text-center space-y-2">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">Seller Verification Program</span>
              <h2 className="text-2xl font-black">List Your Equipment Free</h2>
              <p className="text-slate-500 text-sm">Verify your US Farm or Dealer ID and get <strong className="text-emerald-600">3 Free Listings</strong>.</p>
            </div>
            <form onSubmit={handleAddEquipment} className="space-y-4">
              <input 
                type="text" required placeholder="Equipment Title" 
                value={newEq.title} onChange={(e) => setNewEq({...newEq, title: e.target.value})}
                className="w-full p-3 border rounded-xl text-sm"
              />
              <input 
                type="number" required placeholder="Price (USD)" 
                value={newEq.price} onChange={(e) => setNewEq({...newEq, price: e.target.value})}
                className="w-full p-3 border rounded-xl text-sm"
              />
              <input 
                type="text" required placeholder="Location & ZIP" 
                value={newEq.location} onChange={(e) => setNewEq({...newEq, location: e.target.value})}
                className="w-full p-3 border rounded-xl text-sm"
              />
              <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-xl shadow">
                Submit & Claim 3 Free Listings
              </button>
            </form>
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg space-y-4">
            <h2 className="text-2xl font-black">Platform Revenue & Owner Dashboard</h2>
            <div className="bg-emerald-600 p-4 rounded-xl text-center">
              <span className="text-xs uppercase tracking-widest block">Estimated Monthly Income</span>
              <span className="text-3xl font-black">{formatPrice(estimatedMonthlyRevenue)}</span>
            </div>
          </div>
        )}
      </main>

      {/* Checkout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 space-y-4">
            <h3 className="font-bold text-lg flex items-center justify-between">
              <span>Checkout & Freight</span>
              <button onClick={() => setIsModalOpen(false)}>✕</button>
            </h3>
            {cart.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm border-b pb-2">
                <span>{item.title}</span>
                <span className="font-bold text-emerald-600">{formatPrice(item.price)}</span>
              </div>
            ))}
            <div className="bg-slate-50 p-3 rounded-xl space-y-2">
              <label className="text-xs font-bold uppercase">US Heavy Freight (ZIP Code)</label>
              <div className="flex gap-2">
                <input 
                  type="text" placeholder="ZIP Code" value={buyerZip} onChange={(e) => setBuyerZip(e.target.value)}
                  className="flex-1 p-2 border rounded-lg text-sm"
                />
                <button onClick={calculateFreight} className="bg-slate-900 text-white text-xs px-4 py-2 rounded-lg">Calculate</button>
              </div>
              {freightCost && <p className="text-xs text-emerald-700 font-bold">Estimated Freight: ${freightCost} USD</p>}
            </div>
            <button onClick={() => { alert('Order placed successfully via Pay on Delivery!'); setCart([]); setIsModalOpen(false); }} className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl shadow">
              Confirm Secure Order
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
