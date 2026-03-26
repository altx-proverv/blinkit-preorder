import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const StarIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" className="w-3 h-3" style={{width:"12px",height:"12px"}} fill={filled ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth={1.5}>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

const SpinnerIcon = () => (
  <motion.svg
    viewBox="0 0 24 24"
    className="w-5 h-5"
    animate={{ rotate: 360 }}
    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
  >
    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" fill="none" />
    <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
  </motion.svg>
);

const PulsingDot = ({ color = "#22c55e" }) => (
  <span className="relative flex h-2.5 w-2.5">
    <motion.span
      className="absolute inline-flex h-full w-full rounded-full opacity-75"
      style={{ backgroundColor: color }}
      animate={{ scale: [1, 2, 1], opacity: [0.75, 0, 0.75] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
    <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: color }} />
  </span>
);

const stages = ["idle", "sheet", "processing", "confirmed", "toast"];

export default function BlinkitPreorderCard() {
  const [stage, setStage] = useState("idle");
  const [sheetVisible, setSheetVisible] = useState(false);

  const handlePreorder = () => {
    setSheetVisible(true);
    setStage("sheet");
  };

  const handleConfirm = () => {
    setSheetVisible(false);
    setStage("processing");

    setTimeout(() => setStage("confirmed"), 2200);
    setTimeout(() => setStage("toast"), 3200);
    setTimeout(() => setStage("done"), 6500);
  };

  const reset = () => {
    setStage("idle");
    setSheetVisible(false);
  };

  const isConfirmed = stage === "confirmed" || stage === "toast" || stage === "done";
  const showToast = stage === "toast";

  return (
    <div
      className="relative flex items-center justify-center min-h-screen"
      style={{
        background: "linear-gradient(135deg, #f8f9fa 0%, #eef0f3 100%)",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      {/* Ambient background blobs */}
      <div
        className="absolute top-20 left-10 w-40 h-40 rounded-full opacity-20 blur-3xl"
        style={{ background: "#00b140" }}
      />
      <div
        className="absolute bottom-20 right-10 w-56 h-56 rounded-full opacity-10 blur-3xl"
        style={{ background: "#0066cc" }}
      />

      {/* Card */}
      <motion.div
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        style={{
          width: 220,
          background: "white",
          border: "1px solid rgba(0,0,0,0.06)",
        }}
        animate={isConfirmed ? { boxShadow: "0 0 0 2px #22c55e, 0 20px 60px rgba(34,197,94,0.2)" } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* OOS badge */}
        {!isConfirmed && (
          <div
            className="absolute top-2.5 left-2.5 z-10 text-white text-xs font-semibold px-2 py-0.5 rounded-md"
            style={{ background: "rgba(30,30,30,0.82)", backdropFilter: "blur(6px)", fontSize: 10.5 }}
          >
            Out of stock
          </div>
        )}

        {/* Reserved badge */}
        <AnimatePresence>
          {isConfirmed && (
            <motion.div
              initial={{ scale: 0, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 text-white text-xs font-bold px-2.5 py-1 rounded-xl"
              style={{ background: "linear-gradient(135deg, #16a34a, #15803d)", fontSize: 10.5 }}
            >
              <PulsingDot color="white" />
              Reserved & Confirmed
            </motion.div>
          )}
        </AnimatePresence>

        {/* Heart icon */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(4px)" }}>
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="#aaa" strokeWidth={2}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
        </div>

        {/* Product Image Area */}
        <div
          className="flex items-center justify-center pt-10 pb-4"
          style={{ background: "linear-gradient(180deg, #f5f9ff 0%, #eef4ff 100%)", minHeight: 160 }}
        >
          {/* Mock product bottle illustration */}
          <div className="relative flex flex-col items-center">
            <motion.div
              animate={isConfirmed ? { y: [0, -4, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="relative rounded-2xl flex flex-col items-center justify-center shadow-lg overflow-hidden"
                style={{
                  width: 72,
                  height: 105,
                  background: "linear-gradient(160deg, #1a3c6e 0%, #0f2648 100%)",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-6 rounded-t-2xl opacity-60"
                  style={{ background: "linear-gradient(180deg, #2d5aa0, transparent)" }}
                />
                <div className="flex flex-col items-center gap-0.5 px-2 py-1 text-center">
                  <span style={{ fontSize: 6.5, color: "#90b8ff", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
                    Sids Farm
                  </span>
                  <div
                    className="w-10 h-px my-0.5 opacity-40"
                    style={{ background: "#90b8ff" }}
                  />
                  <span style={{ fontSize: 8.5, color: "white", fontWeight: 800, lineHeight: 1.1, textTransform: "uppercase" }}>
                    HIGH
                  </span>
                  <span style={{ fontSize: 8.5, color: "white", fontWeight: 800, lineHeight: 1.1, textTransform: "uppercase" }}>
                    PROTEIN
                  </span>
                  <span style={{ fontSize: 7, color: "#90b8ff", fontWeight: 600, textTransform: "uppercase" }}>
                    MILK
                  </span>
                  <div
                    className="mt-1.5 rounded-full flex items-center justify-center"
                    style={{ width: 28, height: 28, background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(144,184,255,0.4)" }}
                  >
                    <span style={{ fontSize: 9, color: "white", fontWeight: 800, lineHeight: 1 }}>25g</span>
                  </div>
                  <span style={{ fontSize: 5.5, color: "#90b8ff", marginTop: 1 }}>Protein</span>
                </div>
              </div>
            </motion.div>

            {/* Processing overlay */}
            <AnimatePresence>
              {stage === "processing" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(2px)" }}
                >
                  <SpinnerIcon />
                  <span className="text-xs font-semibold mt-1.5" style={{ color: "#374151", fontSize: 9 }}>
                    Processing...
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Card Body */}
        <div className="px-3 pb-3">
          {/* Meta chips */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ background: "#00b140" }} />
              <span style={{ fontSize: 10, color: "#374151", fontWeight: 600 }}>250 ml</span>
            </div>
            <div
              className="rounded-full px-2 py-0.5 text-xs font-semibold"
              style={{ background: "#f0f7ff", color: "#2563eb", fontSize: 9.5 }}
            >
              25g Protein
            </div>
          </div>

          {/* Product name */}
          <p style={{ fontSize: 13, fontWeight: 700, color: "#111827", lineHeight: 1.3, marginBottom: 4 }}>
            Sids Farm High Protein Milk Bottle
          </p>

          {/* Stars */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4].map((i) => <StarIcon key={i} filled />)}
              <StarIcon filled={false} />
            </div>
            <span style={{ fontSize: 10, color: "#6b7280" }}>(375)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span style={{ fontSize: 16, fontWeight: 800, color: "#111827" }}>₹95</span>
            <span style={{ fontSize: 11, color: "#9ca3af", textDecoration: "line-through" }}>MRP ₹99</span>
          </div>

          {/* CTA Button */}
          <AnimatePresence mode="wait">
            {!isConfirmed ? (
              <motion.button
                key="preorder-btn"
                onClick={handlePreorder}
                disabled={stage === "processing"}
                className="w-full rounded-xl font-bold text-white text-sm py-2.5 flex items-center justify-center gap-2"
                style={{
                  background: stage === "processing"
                    ? "linear-gradient(135deg, #9ca3af, #6b7280)"
                    : "linear-gradient(135deg, #00b140 0%, #009933 100%)",
                  boxShadow: stage === "processing" ? "none" : "0 4px 15px rgba(0,177,64,0.35)",
                  fontSize: 12,
                  transition: "all 0.2s",
                }}
                whileHover={{ scale: 1.02, boxShadow: "0 6px 20px rgba(0,177,64,0.45)" }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
              >
                {stage === "processing" ? (
                  <>
                    <SpinnerIcon />
                    <span>Processing Payment</span>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Pre-order for Next Stock
                  </>
                )}
              </motion.button>
            ) : (
              <motion.div
                key="confirmed-state"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="w-full rounded-xl py-2.5 flex items-center justify-center gap-2 font-bold text-white text-sm"
                style={{
                  background: "linear-gradient(135deg, #15803d, #166534)",
                  boxShadow: "0 4px 15px rgba(21,128,61,0.4)",
                  fontSize: 12,
                }}
              >
                <CheckIcon />
                Queue Position: #4
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reset */}
          {(stage === "done") && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={reset}
              className="w-full mt-2 text-center text-xs text-gray-400 hover:text-gray-600 transition-colors"
              style={{ fontSize: 10 }}
            >
              ↺ Reset demo
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Bottom Sheet */}
      <AnimatePresence>
        {sheetVisible && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-20"
              style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setSheetVisible(false); setStage("idle"); }}
            />

            {/* Sheet */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-30 mx-auto rounded-t-3xl p-6"
              style={{
                background: "white",
                maxWidth: 480,
                boxShadow: "0 -20px 60px rgba(0,0,0,0.18)",
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
            >
              {/* Handle */}
              <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: "#e5e7eb" }} />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "linear-gradient(135deg, #dcfce7, #bbf7d0)" }}
              >
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#16a34a" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>

              <h3 style={{ fontSize: 20, fontWeight: 800, color: "#111827", textAlign: "center", marginBottom: 8 }}>
                Reserve Your Bottle
              </h3>

              <p style={{ fontSize: 14, color: "#6b7280", textAlign: "center", lineHeight: 1.6, marginBottom: 20 }}>
                We'll charge you now and deliver the moment it's back.{" "}
                <span style={{ color: "#111827", fontWeight: 600 }}>You're #4 in the queue</span>{" "}
                for this area.
              </p>

              {/* Queue visual */}
              <div
                className="rounded-2xl p-4 mb-5 flex items-center gap-4"
                style={{ background: "linear-gradient(135deg, #f0fdf4, #dcfce7)", border: "1.5px solid #86efac" }}
              >
                <div className="flex -space-x-2">
                  {["#fbbf24", "#60a5fa", "#f87171"].map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white" style={{ background: c }}>
                      {i + 1}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white" style={{ background: "#00b140" }}>
                    4
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#15803d" }}>You're next after 3 people</p>
                  <p style={{ fontSize: 11, color: "#16a34a" }}>Estimated restock: tonight</p>
                </div>
              </div>

              {/* Price summary */}
              <div className="flex items-center justify-between mb-5 px-1">
                <span style={{ fontSize: 13, color: "#6b7280" }}>Sids Farm High Protein · 250ml</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: "#111827" }}>₹95</span>
              </div>

              {/* Confirm button */}
              <motion.button
                onClick={handleConfirm}
                className="w-full rounded-2xl py-4 text-white font-bold text-base flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #00b140 0%, #009933 100%)",
                  boxShadow: "0 8px 25px rgba(0,177,64,0.4)",
                  fontSize: 15,
                }}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,177,64,0.5)" }}
                whileTap={{ scale: 0.97 }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                Confirm & Pay ₹95
              </motion.button>

              <p style={{ fontSize: 11, color: "#9ca3af", textAlign: "center", marginTop: 12 }}>
                Secure payment · Full refund if not delivered within 48h
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="fixed top-6 left-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              x: "-50%",
              maxWidth: 320,
            }}
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          >
            <div
              className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #16a34a, #15803d)" }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="white" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "white" }}>You're in the queue! 🎉</p>
              <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>
                Estimated delivery: <span style={{ color: "#86efac", fontWeight: 600 }}>Tomorrow morning</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
