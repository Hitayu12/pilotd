-- Pilotd demo seed data

insert into profiles (
  id,
  full_name,
  email,
  home_base,
  citizenships,
  tax_residency,
  plan
)
values (
  '11111111-1111-1111-1111-111111111111',
  'Ariana Shah',
  'ariana@example.com',
  'Jersey City, New Jersey',
  array['United States', 'India'],
  array['United States'],
  'Portfolio'
)
on conflict (id) do nothing;

insert into jurisdictions (id, code, country, region, regulatory_notes)
values
  ('20000000-0000-0000-0000-000000000001', 'US-TX', 'United States', 'Texas', 'County property tax and local utility obligations'),
  ('20000000-0000-0000-0000-000000000002', 'PT-LIS', 'Portugal', 'Lisbon', 'Portuguese rental tax and municipal filings'),
  ('20000000-0000-0000-0000-000000000003', 'IN-MH', 'India', 'Maharashtra', 'Municipal declarations and utility compliance')
on conflict (code) do nothing;

insert into properties (
  id,
  user_id,
  jurisdiction_id,
  name,
  city,
  region,
  country,
  property_type,
  occupancy,
  status,
  monthly_cash_flow,
  currency,
  next_due_item,
  image_url
)
values
  (
    '30000000-0000-0000-0000-000000000001',
    '11111111-1111-1111-1111-111111111111',
    '20000000-0000-0000-0000-000000000001',
    'South Congress Townhome',
    'Austin',
    'Texas',
    'United States',
    'Townhome',
    'occupied',
    'attention',
    3200,
    'USD',
    'Camera 2 offline remediation',
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994'
  ),
  (
    '30000000-0000-0000-0000-000000000002',
    '11111111-1111-1111-1111-111111111111',
    '20000000-0000-0000-0000-000000000002',
    'Alfama River View Flat',
    'Lisbon',
    'Lisbon',
    'Portugal',
    'Apartment',
    'short_term',
    'at_risk',
    2680,
    'EUR',
    'Rental tax filing due in 12 days',
    'https://images.unsplash.com/photo-1460317442991-0ec209397118'
  ),
  (
    '30000000-0000-0000-0000-000000000003',
    '11111111-1111-1111-1111-111111111111',
    '20000000-0000-0000-0000-000000000003',
    'Bandra Seaview Residence',
    'Mumbai',
    'Maharashtra',
    'India',
    'Condo',
    'vacant',
    'attention',
    1510,
    'USD',
    'Water utility bill overdue',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa'
  )
on conflict (id) do nothing;

insert into compliance_rules (id, jurisdiction_id, rule_name, category, applies_to, cadence, description)
values
  (
    '40000000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000002',
    'Portuguese rental tax filing',
    'tax',
    array['landlord', 'investor'],
    'monthly',
    'Submit estimated rental tax and supporting income statements'
  ),
  (
    '40000000-0000-0000-0000-000000000002',
    '20000000-0000-0000-0000-000000000001',
    'County property tax prepayment',
    'tax',
    array['landlord', 'investor'],
    'annual',
    'Optional discounted prepayment window'
  ),
  (
    '40000000-0000-0000-0000-000000000003',
    '20000000-0000-0000-0000-000000000003',
    'Municipal occupancy declaration',
    'compliance',
    array['owner'],
    'quarterly',
    'Report occupancy changes for municipal records'
  )
on conflict (id) do nothing;

insert into property_compliance_items (
  id,
  user_id,
  property_id,
  compliance_rule_id,
  title,
  due_date,
  status,
  risk,
  description
)
values
  (
    '50000000-0000-0000-0000-000000000001',
    '11111111-1111-1111-1111-111111111111',
    '30000000-0000-0000-0000-000000000002',
    '40000000-0000-0000-0000-000000000001',
    'Portuguese rental tax filing',
    '2026-03-19',
    'due_soon',
    'high',
    'Estimated rental tax of €1,240 due. U.S. reporting dependency detected.'
  ),
  (
    '50000000-0000-0000-0000-000000000002',
    '11111111-1111-1111-1111-111111111111',
    '30000000-0000-0000-0000-000000000002',
    null,
    'Foreign rental income reporting package',
    '2026-04-15',
    'upcoming',
    'medium',
    'Cross-check Portugal income and account activity for U.S. filing.'
  ),
  (
    '50000000-0000-0000-0000-000000000003',
    '11111111-1111-1111-1111-111111111111',
    '30000000-0000-0000-0000-000000000003',
    '40000000-0000-0000-0000-000000000003',
    'Municipal occupancy declaration',
    '2026-03-28',
    'upcoming',
    'medium',
    'Vacant status requires municipal declaration update.'
  ),
  (
    '50000000-0000-0000-0000-000000000004',
    '11111111-1111-1111-1111-111111111111',
    '30000000-0000-0000-0000-000000000001',
    '40000000-0000-0000-0000-000000000002',
    'County property tax prepayment window',
    '2026-03-24',
    'upcoming',
    'low',
    'Optional early payment with discount.'
  )
on conflict (id) do nothing;

insert into bank_accounts (
  id,
  user_id,
  property_id,
  bank_name,
  account_nickname,
  currency,
  balance,
  status,
  months_inactive,
  last_transaction_at
)
values
  (
    '60000000-0000-0000-0000-000000000001',
    '11111111-1111-1111-1111-111111111111',
    '30000000-0000-0000-0000-000000000002',
    'Banco Atlântico',
    'Lisbon Operations',
    'EUR',
    4680,
    'dormant_risk',
    10,
    '2025-05-08'
  ),
  (
    '60000000-0000-0000-0000-000000000002',
    '11111111-1111-1111-1111-111111111111',
    '30000000-0000-0000-0000-000000000003',
    'Axis Bank',
    'Mumbai Reserve',
    'INR',
    109200,
    'warning',
    7,
    '2025-08-26'
  ),
  (
    '60000000-0000-0000-0000-000000000003',
    '11111111-1111-1111-1111-111111111111',
    '30000000-0000-0000-0000-000000000001',
    'Chase',
    'Austin Operating',
    'USD',
    7310,
    'healthy',
    1,
    '2026-02-27'
  )
on conflict (id) do nothing;

insert into transactions (
  id,
  user_id,
  property_id,
  account_id,
  amount,
  currency,
  direction,
  category,
  description,
  transaction_date
)
values
  (
    '70000000-0000-0000-0000-000000000001',
    '11111111-1111-1111-1111-111111111111',
    '30000000-0000-0000-0000-000000000001',
    '60000000-0000-0000-0000-000000000003',
    3900,
    'USD',
    'inflow',
    'rent',
    'March rent received',
    '2026-03-01'
  ),
  (
    '70000000-0000-0000-0000-000000000002',
    '11111111-1111-1111-1111-111111111111',
    '30000000-0000-0000-0000-000000000002',
    '60000000-0000-0000-0000-000000000001',
    125,
    'EUR',
    'outflow',
    'utility',
    'Water utility payment',
    '2026-02-18'
  ),
  (
    '70000000-0000-0000-0000-000000000003',
    '11111111-1111-1111-1111-111111111111',
    '30000000-0000-0000-0000-000000000003',
    '60000000-0000-0000-0000-000000000002',
    2880,
    'INR',
    'outflow',
    'maintenance',
    'Security system servicing',
    '2026-01-10'
  )
on conflict (id) do nothing;

insert into bills (
  id,
  user_id,
  property_id,
  bill_type,
  vendor,
  amount,
  currency,
  due_date,
  status,
  autopay_enabled
)
values
  (
    '80000000-0000-0000-0000-000000000001',
    '11111111-1111-1111-1111-111111111111',
    '30000000-0000-0000-0000-000000000003',
    'utility',
    'Mumbai Water Board',
    9800,
    'INR',
    '2026-03-04',
    'overdue',
    false
  ),
  (
    '80000000-0000-0000-0000-000000000002',
    '11111111-1111-1111-1111-111111111111',
    '30000000-0000-0000-0000-000000000002',
    'tax',
    'Autoridade Tributária',
    1240,
    'EUR',
    '2026-03-19',
    'unpaid',
    false
  ),
  (
    '80000000-0000-0000-0000-000000000003',
    '11111111-1111-1111-1111-111111111111',
    '30000000-0000-0000-0000-000000000001',
    'utility',
    'Austin Energy',
    260,
    'USD',
    '2026-03-12',
    'scheduled',
    true
  )
on conflict (id) do nothing;

insert into maintenance_events (
  id,
  user_id,
  property_id,
  category,
  title,
  priority,
  status,
  logged_at,
  eta
)
values
  (
    '90000000-0000-0000-0000-000000000001',
    '11111111-1111-1111-1111-111111111111',
    '30000000-0000-0000-0000-000000000001',
    'hvac',
    'Diagnose HVAC energy anomaly',
    'high',
    'in_progress',
    '2026-03-06',
    '2026-03-09'
  ),
  (
    '90000000-0000-0000-0000-000000000002',
    '11111111-1111-1111-1111-111111111111',
    '30000000-0000-0000-0000-000000000003',
    'plumbing',
    'Leak reported in utility closet',
    'medium',
    'open',
    '2026-03-05',
    '2026-03-10'
  ),
  (
    '90000000-0000-0000-0000-000000000003',
    '11111111-1111-1111-1111-111111111111',
    '30000000-0000-0000-0000-000000000002',
    'general',
    'Quarterly fire safety inspection',
    'low',
    'resolved',
    '2026-02-25',
    null
  )
on conflict (id) do nothing;

insert into smart_devices (
  id,
  user_id,
  property_id,
  device_type,
  label,
  status,
  last_heartbeat,
  anomaly_note
)
values
  (
    'a0000000-0000-0000-0000-000000000001',
    '11111111-1111-1111-1111-111111111111',
    '30000000-0000-0000-0000-000000000001',
    'camera',
    'Front Gate Camera 2',
    'offline',
    '2026-03-06T02:14:00Z',
    'No heartbeat for 14 hours'
  ),
  (
    'a0000000-0000-0000-0000-000000000002',
    '11111111-1111-1111-1111-111111111111',
    '30000000-0000-0000-0000-000000000001',
    'hvac',
    'Main HVAC Controller',
    'degraded',
    '2026-03-07T10:00:00Z',
    'Energy usage up 34% week-over-week'
  ),
  (
    'a0000000-0000-0000-0000-000000000003',
    '11111111-1111-1111-1111-111111111111',
    '30000000-0000-0000-0000-000000000002',
    'lock',
    'Unit Entry Lock',
    'online',
    '2026-03-07T13:20:00Z',
    null
  )
on conflict (id) do nothing;

insert into alerts (
  id,
  user_id,
  property_id,
  alert_type,
  title,
  description,
  severity,
  read,
  created_at
)
values
  (
    'b0000000-0000-0000-0000-000000000001',
    '11111111-1111-1111-1111-111111111111',
    '30000000-0000-0000-0000-000000000002',
    'compliance',
    'Lisbon rental tax filing due in 12 days',
    'Scottie marked this as high priority due to cross-border reporting impact.',
    'high',
    false,
    '2026-03-07T09:00:00Z'
  ),
  (
    'b0000000-0000-0000-0000-000000000002',
    '11111111-1111-1111-1111-111111111111',
    '30000000-0000-0000-0000-000000000002',
    'banking',
    'Operating account inactivity detected',
    '10 months since last qualifying activity. Dormancy risk is rising.',
    'critical',
    false,
    '2026-03-07T08:10:00Z'
  ),
  (
    'b0000000-0000-0000-0000-000000000003',
    '11111111-1111-1111-1111-111111111111',
    '30000000-0000-0000-0000-000000000003',
    'billing',
    'Water utility bill is overdue',
    'Payment missed on March 4. Late fees may apply.',
    'high',
    false,
    '2026-03-06T15:00:00Z'
  ),
  (
    'b0000000-0000-0000-0000-000000000004',
    '11111111-1111-1111-1111-111111111111',
    '30000000-0000-0000-0000-000000000001',
    'monitoring',
    'Camera 2 offline',
    'No heartbeat for 14 hours. Security coverage gap detected.',
    'medium',
    true,
    '2026-03-07T04:00:00Z'
  )
on conflict (id) do nothing;

insert into notifications (
  id,
  user_id,
  alert_id,
  title,
  body,
  category,
  severity,
  read,
  created_at
)
values
  (
    'c0000000-0000-0000-0000-000000000001',
    '11111111-1111-1111-1111-111111111111',
    'b0000000-0000-0000-0000-000000000001',
    'Compliance deadline approaching',
    'Portuguese rental tax filing is due March 19.',
    'compliance',
    'high',
    false,
    '2026-03-07T09:00:00Z'
  ),
  (
    'c0000000-0000-0000-0000-000000000002',
    '11111111-1111-1111-1111-111111111111',
    'b0000000-0000-0000-0000-000000000002',
    'Dormancy risk elevated',
    'Lisbon operations account has 10 months inactivity.',
    'finance',
    'critical',
    false,
    '2026-03-07T08:10:00Z'
  ),
  (
    'c0000000-0000-0000-0000-000000000003',
    '11111111-1111-1111-1111-111111111111',
    'b0000000-0000-0000-0000-000000000004',
    'Monitoring incident',
    'Austin gate camera is offline.',
    'monitoring',
    'medium',
    true,
    '2026-03-07T04:00:00Z'
  )
on conflict (id) do nothing;

insert into ai_conversations (id, user_id, property_id, title)
values
  (
    'd0000000-0000-0000-0000-000000000001',
    '11111111-1111-1111-1111-111111111111',
    null,
    'Portfolio morning review'
  ),
  (
    'd0000000-0000-0000-0000-000000000002',
    '11111111-1111-1111-1111-111111111111',
    '30000000-0000-0000-0000-000000000002',
    'Lisbon risk check'
  )
on conflict (id) do nothing;

insert into ai_messages (id, user_id, conversation_id, role, content, created_at)
values
  (
    'e0000000-0000-0000-0000-000000000001',
    '11111111-1111-1111-1111-111111111111',
    'd0000000-0000-0000-0000-000000000001',
    'assistant',
    'Morning update: Lisbon has a tax filing due in 12 days, Mumbai has one overdue utility bill, and Austin has one monitoring outage.',
    '2026-03-07T09:01:00Z'
  ),
  (
    'e0000000-0000-0000-0000-000000000002',
    '11111111-1111-1111-1111-111111111111',
    'd0000000-0000-0000-0000-000000000002',
    'user',
    'Do I have any tax obligations coming up for Lisbon?',
    '2026-03-07T10:01:00Z'
  ),
  (
    'e0000000-0000-0000-0000-000000000003',
    '11111111-1111-1111-1111-111111111111',
    'd0000000-0000-0000-0000-000000000002',
    'assistant',
    'Yes. Portuguese rental tax is estimated at €1,240 due in 12 days and should be aligned with U.S. foreign income reporting.',
    '2026-03-07T10:01:06Z'
  )
on conflict (id) do nothing;

insert into ai_actions (id, user_id, property_id, title, status, created_at)
values
  (
    'f0000000-0000-0000-0000-000000000001',
    '11111111-1111-1111-1111-111111111111',
    '30000000-0000-0000-0000-000000000002',
    'Prepared Lisbon tax filing checklist',
    'completed',
    '2026-03-07T09:08:00Z'
  ),
  (
    'f0000000-0000-0000-0000-000000000002',
    '11111111-1111-1111-1111-111111111111',
    '30000000-0000-0000-0000-000000000003',
    'Drafted reminder for Mumbai overdue utility',
    'needs_review',
    '2026-03-07T09:20:00Z'
  )
on conflict (id) do nothing;

insert into integrations (id, user_id, provider, integration_type, status, metadata)
values
  (
    '01000000-0000-0000-0000-000000000001',
    '11111111-1111-1111-1111-111111111111',
    'Plaid',
    'banking',
    'connected',
    '{"accounts": 3}'::jsonb
  ),
  (
    '01000000-0000-0000-0000-000000000002',
    '11111111-1111-1111-1111-111111111111',
    'Nest',
    'iot',
    'connected',
    '{"devices": 2}'::jsonb
  )
on conflict (id) do nothing;

insert into user_preferences (id, user_id, notification_email, notification_sms, daily_briefing_time, locale, theme)
values (
  '02000000-0000-0000-0000-000000000001',
  '11111111-1111-1111-1111-111111111111',
  true,
  true,
  '08:30',
  'en-US',
  'system'
)
on conflict (id) do nothing;
