import { Download } from "lucide-react";

import { ComplianceBoard } from "@/components/dashboard/compliance-board";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { getEstateData } from "@/lib/db/estate-data";

export default async function CompliancePage() {
  const data = await getEstateData();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cross-Border Compliance"
        description="AI-driven obligation mapping across jurisdictions, residency requirements, and property-level legal timelines."
        actions={
          <Button variant="outline">
            <Download className="size-4" /> Export calendar
          </Button>
        }
      />
      <ComplianceBoard items={data.complianceItems} properties={data.properties} />
    </div>
  );
}
