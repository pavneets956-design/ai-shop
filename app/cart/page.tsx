import { redirect } from "next/navigation";

// next.config.js owns the permanent redirect; this is a defensive fallback.
export default function RetiredCartPage() {
  redirect("/shop");
}
