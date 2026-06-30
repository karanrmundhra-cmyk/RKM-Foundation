// "Where your money goes" — RKMF-010.
// Founder-stated commitment (95% to the cause, 5% admin). This is a TARGET
// allocation, not audited financials — worded as a commitment, never as a
// verified past-year figure. Replace/extend once audited financials exist.
export function AllocationStrip({ hi = false }: { hi?: boolean }) {
  return (
    <div className="mt-5 border-t border-ink/10 pt-5">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-ink/55">
        {hi ? "आपका पैसा कहाँ जाता है" : "Where your money goes"}
      </p>
      <div
        className="mt-2.5 flex h-2.5 w-full overflow-hidden rounded-full"
        role="img"
        aria-label={hi ? "95 प्रतिशत पशु देखभाल पर, 5 प्रतिशत प्रशासन पर" : "95 percent to animal care, 5 percent to admin"}
      >
        <span className="w-[95%] bg-copper" />
        <span className="w-[5%] bg-ink/25" />
      </div>
      <div className="mt-2 flex items-center justify-between text-[11px] text-ink/60">
        <span><strong className="text-copper-dark">95%</strong> {hi ? "पशु देखभाल" : "Animal care"}</span>
        <span><strong className="text-ink/70">5%</strong> {hi ? "प्रशासन" : "Admin"}</span>
      </div>
      <p className="mt-2 text-[11px] leading-snug text-ink/55">
        {hi
          ? "हमारी प्रतिबद्धता: हर ₹100 में से ₹95 सीधे पशुओं की देखभाल — भोजन, इलाज और आश्रय — पर जाते हैं।"
          : "Our commitment: ₹95 of every ₹100 goes directly to animal care — food, treatment, and shelter."}
      </p>
    </div>
  );
}
