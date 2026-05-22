import { useEffect, useState } from "react";

// React hook that bumps a counter whenever the user changes any default
// unit. Components that render formatted quantities outside UnitInput
// (stability bar, canvas overlays, flight summary, motors table) call this
// so they re-format with the new preferred unit immediately.
export function useUnitPref(): number {
  const [n, setN] = useState(0);
  useEffect(() => {
    const bump = () => setN((x) => x + 1);
    window.addEventListener("opsrocket-units-changed", bump);
    return () => window.removeEventListener("opsrocket-units-changed", bump);
  }, []);
  return n;
}
