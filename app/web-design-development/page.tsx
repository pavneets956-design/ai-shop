import LandingTemplate from "@/components/LandingTemplate";
import { webDesignService } from "@/lib/data/studioServices";
import { landingMetadata } from "@/lib/seo";
export const metadata = { ...landingMetadata("money", webDesignService), title: { absolute: webDesignService.title } };
export default function Page() {
  return <LandingTemplate type="money" content={webDesignService} />;
}
