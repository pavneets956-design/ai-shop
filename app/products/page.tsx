import { redirect } from "next/navigation";

// The old marketplace is now /solutions (AI services, not products).
export default function ProductsRedirect() {
  redirect("/solutions");
}
