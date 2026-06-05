import { redirect } from "next/navigation";

// Old marketplace product detail → solutions.
export default function ProductDetailRedirect() {
  redirect("/solutions");
}
