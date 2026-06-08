import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Shield, CheckCircle2, AlertCircle, Lock,
  ChevronRight, ChevronDown, Smartphone, CreditCard,
  Building2, Wallet, RefreshCw, ArrowLeft
} from 'lucide-react';
import raambowLogo from '../../assets/raambowlogo.png';

/* ─── helpers ─────────────────────────────────────────────────── */
const GST_RATE = 0.18;
const fmt = (n) => new Intl.NumberFormat('en-IN').format(Math.round(n));

/* ─── UPI app logos (emoji stand-ins — replace with real SVGs later) */
const UPI_APPS = [
  { id: 'gpay',    label: 'Google Pay', emoji: '🟢' },
  { id: 'phonepe', label: 'PhonePe',    emoji: '🟣' },
  { id: 'paytm',   label: 'Paytm',      emoji: '🔵' },
  { id: 'bhim',    label: 'BHIM',       emoji: '🇮🇳' },
];

const BANKS = [
  'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank',
  'Kotak Mahindra Bank', 'Punjab National Bank', 'Bank of Baroda', 'Canara Bank',
];

const WALLETS = ['PhonePe', 'Paytm', 'Amazon Pay', 'MobiKwik', 'Freecharge'];

/* ─── Razorpay-style Tab ─────────────────────────────────────── */
const TABS = [
  { id: 'upi',        label: 'UPI',         Icon: Smartphone  },
  { id: 'card',       label: 'Card',         Icon: CreditCard  },
  { id: 'netbanking', label: 'Net Banking',  Icon: Building2   },
  { id: 'wallet',     label: 'Wallet',       Icon: Wallet      },
];

/* ─── RZP Blue button ────────────────────────────────────────── */
const RzpBtn = ({ children, onClick, disabled, loading }) => (
  <button
    onClick={onClick}
    disabled={disabled || loading}
    className="w-full py-3.5 rounded-lg bg-[#2d64bc] hover:bg-[#1d54ac] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors duration-200 shadow-md"
  >
    {loading
      ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      : children}
  </button>
);

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
const PaymentModal = ({ plan, user, onClose, onSuccess }) => {
  const base  = plan.price;
  const gst   = Math.round(base * GST_RATE);
  const total = base + gst;

  /* steps: 'pay' | 'processing' | 'success' */
  const [step,          setStep]          = useState('pay');
  const [tab,           setTab]           = useState('upi');
  const [upiMode,       setUpiMode]       = useState('id');   // 'id' | 'app'
  const [upiId,         setUpiId]         = useState('');
  const [selectedApp,   setSelectedApp]   = useState(null);
  const [cardNum,       setCardNum]       = useState('');
  const [cardName,      setCardName]      = useState('');
  const [expiry,        setExpiry]        = useState('');
  const [cvv,           setCvv]           = useState('');
  const [selectedBank,  setSelectedBank]  = useState('');
  const [selectedWallet,setSelectedWallet]= useState('');
  const [error,         setError]         = useState('');
  const [loading,       setLoading]       = useState(false);

  const fmtCard = v => v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
  const fmtExp  = v => { const d=v.replace(/\D/g,'').slice(0,4); return d.length>2?d.slice(0,2)+'/'+d.slice(2):d; };

  const validate = () => {
    if (tab === 'upi') {
      if (upiMode === 'id' && !upiId.includes('@')) return setError('Enter a valid UPI ID  (e.g. name@okaxis)'), false;
      if (upiMode === 'app' && !selectedApp)         return setError('Please select a UPI app.'), false;
    }
    if (tab === 'card') {
      if (cardNum.replace(/\s/g,'').length < 16) return setError('Enter a valid 16-digit card number.'), false;
      if (!cardName)                              return setError('Enter cardholder name.'), false;
      if (expiry.length < 5)                     return setError('Enter expiry as MM/YY.'), false;
      if (cvv.length < 3)                        return setError('Enter a valid CVV.'), false;
    }
    if (tab === 'netbanking' && !selectedBank) return setError('Select your bank.'), false;
    if (tab === 'wallet'     && !selectedWallet) return setError('Select a wallet.'), false;
    return true;
  };

  const pay = () => {
    setError('');
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep('processing'); }, 400);
    setTimeout(() => setStep('success'), 2800);
  };

  // success auto-dismiss handled by user clicking CTA

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={e => e.target === e.currentTarget && step !== 'processing' && step !== 'success' && onClose()}
    >
      <motion.div
        className="w-full max-w-[820px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
        style={{ maxHeight: '92vh' }}
        initial={{ scale: 0.93, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.93, y: 24, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
      >

        {/* ══════════ LEFT PANEL — Order Summary ══════════ */}
        <div className="md:w-[300px] shrink-0 bg-[#1a1a2e] text-white flex flex-col p-6 relative overflow-hidden">
          {/* decorative circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#2d64bc]/20 pointer-events-none" />
          <div className="absolute -bottom-12 -left-8  w-48 h-48 rounded-full bg-[#2d64bc]/10 pointer-events-none" />

          {/* brand */}
          <div className="flex items-center gap-2.5 mb-6 relative z-10">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center p-1">
              <img src={raambowLogo} alt="RaamBow" className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="font-black text-sm leading-tight">RaamBow Academy</p>
              <p className="text-[9px] text-white/50 font-mono tracking-wider uppercase">Secure Checkout</p>
            </div>
          </div>

          {/* plan info */}
          <div className="relative z-10 flex-1 space-y-4">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <p className="text-[9px] text-white/50 font-bold uppercase tracking-widest">Plan</p>
              <p className="font-black text-base leading-tight">{plan.name}</p>
              <p className="text-xs text-white/60">{plan.duration}</p>
            </div>

            {/* price breakdown */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-white/60 text-xs">
                <span>Subtotal</span><span>₹{fmt(base)}</span>
              </div>
              <div className="flex justify-between text-white/60 text-xs">
                <span>GST (18%)</span><span>₹{fmt(gst)}</span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex justify-between font-black text-base">
                <span>Total</span><span>₹{fmt(total)}</span>
              </div>
            </div>

            {/* what's included */}
            <div className="space-y-1.5">
              <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest">Includes</p>
              {plan.includes.slice(0, 4).map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-white/70">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* secure badge */}
          <div className="flex items-center gap-1.5 mt-4 relative z-10 text-white/30 text-[9px]">
            <Shield className="w-3 h-3" />
            256-bit SSL · Powered by Razorpay
          </div>
        </div>

        {/* ══════════ RIGHT PANEL — Payment Form ══════════ */}
        <div className="flex-1 flex flex-col overflow-y-auto">

          {/* header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 shrink-0">
            <div>
              <p className="font-black text-slate-900 text-base">Complete Payment</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Paying as <span className="font-bold text-slate-600">{user?.email || 'you'}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* ── PROCESSING ── */}
          {step === 'processing' && (
            <div className="flex-1 flex flex-col items-center justify-center gap-5 py-12 px-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-slate-100" />
                <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-t-[#2d64bc] animate-spin" />
              </div>
              <div className="text-center space-y-1">
                <p className="font-black text-slate-800">Processing your payment…</p>
                <p className="text-xs text-slate-400">Do not close this window</p>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                <Shield className="w-3 h-3" /> Secured by Razorpay
              </div>
            </div>
          )}

          {/* ── SUCCESS ── */}
          {step === 'success' && (
            <div className="flex-1 flex flex-col items-center justify-center gap-5 py-10 px-6 text-center">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center shadow-lg shadow-emerald-100"
              >
                <CheckCircle2 className="w-11 h-11 text-emerald-500" />
              </motion.div>
              <motion.div initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2 }} className="space-y-1">
                <h3 className="font-black text-xl text-slate-900">Payment Successful! 🎉</h3>
                <p className="text-sm text-slate-500">₹{fmt(total)} paid · <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded-full">RZP{Date.now().toString().slice(-8)}</span></p>
              </motion.div>
              <motion.div initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.3 }} className="w-full max-w-xs bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-left space-y-1">
                <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Membership Activated</p>
                <p className="font-black text-slate-800">{plan.name}</p>
                <p className="text-xs text-slate-500">Access unlocked · {plan.duration}</p>
              </motion.div>
              <motion.button
                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}
                onClick={onSuccess}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-black text-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-100 transition-all"
              >
                Go to Dashboard <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          )}

          {/* ── CHECKOUT ── */}
          {step === 'pay' && (
            <div className="flex-1 px-6 py-5 space-y-5">

              {/* Tabs */}
              <div className="flex border-b border-slate-200 gap-1">
                {TABS.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    onClick={() => { setTab(id); setError(''); }}
                    className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-b-2 -mb-px cursor-pointer transition-all ${
                      tab === id
                        ? 'border-[#2d64bc] text-[#2d64bc]'
                        : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                ))}
              </div>

              {/* ── UPI ── */}
              {tab === 'upi' && (
                <div className="space-y-4">
                  {/* toggle between UPI ID and App */}
                  <div className="flex gap-2">
                    {[{ id:'id', label:'Enter UPI ID' }, { id:'app', label:'Pay via App' }].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setUpiMode(opt.id)}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold border cursor-pointer transition-all ${
                          upiMode === opt.id
                            ? 'bg-[#2d64bc]/10 border-[#2d64bc] text-[#2d64bc]'
                            : 'border-slate-200 text-slate-500 hover:border-slate-300'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  {upiMode === 'id' && (
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">UPI ID</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="yourname@okaxis"
                          value={upiId}
                          onChange={e => setUpiId(e.target.value)}
                          className="flex-1 px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#2d64bc] focus:ring-4 focus:ring-[#2d64bc]/10 outline-none text-sm font-semibold"
                        />
                        <button
                          onClick={pay}
                          className="px-4 py-2.5 rounded-lg bg-[#2d64bc] hover:bg-[#1d54ac] text-white font-bold text-xs cursor-pointer transition-colors"
                        >
                          Verify
                        </button>
                      </div>
                      <p className="text-[9px] text-slate-400">Supports GPay, PhonePe, Paytm, BHIM and all UPI apps</p>
                    </div>
                  )}

                  {upiMode === 'app' && (
                    <div className="grid grid-cols-2 gap-2.5">
                      {UPI_APPS.map(app => (
                        <button
                          key={app.id}
                          onClick={() => setSelectedApp(app.id)}
                          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border cursor-pointer transition-all ${
                            selectedApp === app.id
                              ? 'border-[#2d64bc] bg-[#2d64bc]/5'
                              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <span className="text-xl">{app.emoji}</span>
                          <span className="text-xs font-bold text-slate-700">{app.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── CARD ── */}
              {tab === 'card' && (
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="1234  5678  9012  3456"
                        value={cardNum}
                        onChange={e => setCardNum(fmtCard(e.target.value))}
                        className="w-full pl-3.5 pr-12 py-2.5 rounded-lg border border-slate-200 focus:border-[#2d64bc] focus:ring-4 focus:ring-[#2d64bc]/10 outline-none text-sm font-mono font-semibold"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                        <span className="text-xs">💳</span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="AS ON CARD"
                      value={cardName}
                      onChange={e => setCardName(e.target.value.toUpperCase())}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#2d64bc] focus:ring-4 focus:ring-[#2d64bc]/10 outline-none text-sm font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        value={expiry}
                        onChange={e => setExpiry(fmtExp(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#2d64bc] focus:ring-4 focus:ring-[#2d64bc]/10 outline-none text-sm font-mono font-semibold"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">CVV</label>
                      <input
                        type="password"
                        placeholder="•••"
                        maxLength={4}
                        value={cvv}
                        onChange={e => setCvv(e.target.value.replace(/\D/g,'').slice(0,4))}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#2d64bc] focus:ring-4 focus:ring-[#2d64bc]/10 outline-none text-sm font-mono font-semibold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ── NET BANKING ── */}
              {tab === 'netbanking' && (
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Choose Your Bank</label>
                  <div className="grid grid-cols-2 gap-2">
                    {BANKS.map(b => (
                      <button
                        key={b}
                        onClick={() => setSelectedBank(b)}
                        className={`text-left px-3 py-2.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
                          selectedBank === b
                            ? 'border-[#2d64bc] bg-[#2d64bc]/5 text-[#2d64bc]'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── WALLET ── */}
              {tab === 'wallet' && (
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Select Wallet</label>
                  <div className="grid grid-cols-3 gap-2">
                    {WALLETS.map(w => (
                      <button
                        key={w}
                        onClick={() => setSelectedWallet(w)}
                        className={`py-3 rounded-xl border text-[11px] font-black cursor-pointer transition-all ${
                          selectedWallet === w
                            ? 'border-[#2d64bc] bg-[#2d64bc]/5 text-[#2d64bc]'
                            : 'border-slate-200 text-slate-500 hover:border-slate-300'
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity:0, y:-6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                    className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-600 font-semibold"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />{error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pay CTA */}
              <RzpBtn onClick={pay} loading={loading}>
                <Lock className="w-3.5 h-3.5" />
                Pay ₹{fmt(total)}
              </RzpBtn>

              {/* footer */}
              <div className="flex items-center justify-center gap-1.5 text-slate-300 text-[9px] font-semibold pt-1">
                <Shield className="w-3 h-3" />
                100% Secure Payments · Razorpay
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentModal;
