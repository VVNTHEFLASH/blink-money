import { useAppSelector } from "@/store/hooks";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import DashboardScreen from "./wealth/dashboard";
export default function SaveScreen() {
  const router = useRouter();
  const { investmentOrders, holdings } = useAppSelector((state) => state.save);

  const sips = useMemo(() => {
    return [...investmentOrders, ...holdings];
  }, [investmentOrders, holdings]);

  useFocusEffect(
    useCallback(() => {
      if (sips.length <= 0) router.push("/wealth/sip");
      console.log(JSON.stringify(sips, null, 2));
    }, [sips]),
  );
  return <DashboardScreen />;
}
