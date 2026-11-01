import { NextResponse } from "next/server";
import { z } from "zod";

import { generateScottieResponse } from "@/lib/ai/scottie";
import { getEstateData } from "@/lib/db/estate-data";

const payloadSchema = z.object({
  query: z.string().min(1),
  propertyId: z.string().optional()
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = payloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }

  const estateData = await getEstateData();

  const response = generateScottieResponse(
    parsed.data.query,
    {
      propertyId: parsed.data.propertyId
    },
    {
      properties: estateData.properties,
      alerts: estateData.alerts,
      bankAccounts: estateData.bankAccounts,
      bills: estateData.bills,
      complianceItems: estateData.complianceItems,
      dailyScottieSummary: estateData.dailyScottieSummary
    }
  );

  return NextResponse.json(response);
}
