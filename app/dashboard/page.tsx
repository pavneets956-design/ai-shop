import { redirect } from "next/navigation";

// next.config.js owns the permanent redirect; no fictional product/sales data.
export default function RetiredMarketplaceDashboard() {
  redirect("/shop");
}
