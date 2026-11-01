import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { PropertyDirectory } from "@/components/dashboard/property-directory";
import { getEstateData } from "@/lib/db/estate-data";

export default async function PropertiesPage() {
  const data = await getEstateData();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Properties"
        description="Track occupancy, obligations, and operating health across every jurisdiction in your portfolio."
        actions={<Button>Add property</Button>}
      />
      <PropertyDirectory properties={data.properties} />
    </div>
  );
}
