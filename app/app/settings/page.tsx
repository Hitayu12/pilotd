import { SettingsPanel } from "@/components/dashboard/settings-panel";
import { getEstateData } from "@/lib/db/estate-data";

export default async function SettingsPage() {
  const data = await getEstateData();
  return <SettingsPanel user={data.user} />;
}
