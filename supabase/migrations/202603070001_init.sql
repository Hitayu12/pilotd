-- Pilotd initial schema

create extension if not exists "pgcrypto";

create type occupancy_status as enum ('occupied', 'vacant', 'short_term');
create type property_status as enum ('stable', 'attention', 'at_risk');
create type risk_severity as enum ('low', 'medium', 'high', 'critical');
create type compliance_status as enum ('upcoming', 'due_soon', 'overdue', 'completed');
create type account_status as enum ('healthy', 'warning', 'dormant_risk');
create type transaction_direction as enum ('inflow', 'outflow');
create type transaction_category as enum ('rent', 'tax', 'utility', 'maintenance', 'insurance', 'other');
create type bill_type as enum ('utility', 'tax', 'maintenance', 'insurance');
create type bill_status as enum ('scheduled', 'unpaid', 'paid', 'overdue');
create type maintenance_category as enum ('plumbing', 'electrical', 'hvac', 'general');
create type maintenance_status as enum ('open', 'in_progress', 'resolved');
create type device_type as enum ('camera', 'hvac', 'lock', 'sensor');
create type device_status as enum ('online', 'offline', 'degraded');
create type alert_type as enum ('compliance', 'banking', 'billing', 'monitoring', 'maintenance');
create type notification_category as enum ('compliance', 'finance', 'monitoring', 'ai');
create type ai_role as enum ('user', 'assistant');
create type ai_action_status as enum ('queued', 'completed', 'needs_review');

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  home_base text,
  citizenships text[] not null default '{}',
  tax_residency text[] not null default '{}',
  plan text not null default 'Starter',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists jurisdictions (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  country text not null,
  region text,
  regulatory_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  jurisdiction_id uuid references jurisdictions(id),
  name text not null,
  city text not null,
  region text,
  country text not null,
  property_type text not null,
  occupancy occupancy_status not null,
  status property_status not null default 'stable',
  monthly_cash_flow numeric(12,2) not null default 0,
  currency text not null default 'USD',
  next_due_item text,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists compliance_rules (
  id uuid primary key default gen_random_uuid(),
  jurisdiction_id uuid not null references jurisdictions(id) on delete cascade,
  rule_name text not null,
  category text not null,
  applies_to text[] not null default '{}',
  cadence text,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists property_compliance_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  property_id uuid not null references properties(id) on delete cascade,
  compliance_rule_id uuid references compliance_rules(id),
  title text not null,
  due_date date not null,
  status compliance_status not null default 'upcoming',
  risk risk_severity not null default 'low',
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists bank_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  property_id uuid references properties(id) on delete set null,
  bank_name text not null,
  account_nickname text not null,
  currency text not null,
  balance numeric(14,2) not null default 0,
  status account_status not null default 'healthy',
  months_inactive int not null default 0,
  last_transaction_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  property_id uuid references properties(id) on delete set null,
  account_id uuid references bank_accounts(id) on delete set null,
  amount numeric(14,2) not null,
  currency text not null,
  direction transaction_direction not null,
  category transaction_category not null,
  description text,
  transaction_date date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists bills (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  property_id uuid not null references properties(id) on delete cascade,
  bill_type bill_type not null,
  vendor text not null,
  amount numeric(14,2) not null,
  currency text not null,
  due_date date not null,
  status bill_status not null,
  autopay_enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists maintenance_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  property_id uuid not null references properties(id) on delete cascade,
  category maintenance_category not null,
  title text not null,
  priority risk_severity not null,
  status maintenance_status not null,
  logged_at date not null,
  eta date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists smart_devices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  property_id uuid not null references properties(id) on delete cascade,
  device_type device_type not null,
  label text not null,
  status device_status not null default 'online',
  last_heartbeat timestamptz,
  anomaly_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists alerts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  property_id uuid references properties(id) on delete set null,
  alert_type alert_type not null,
  title text not null,
  description text,
  severity risk_severity not null,
  read boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  alert_id uuid references alerts(id) on delete set null,
  title text not null,
  body text not null,
  category notification_category not null,
  severity risk_severity not null,
  read boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ai_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  property_id uuid references properties(id) on delete set null,
  title text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ai_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  conversation_id uuid not null references ai_conversations(id) on delete cascade,
  role ai_role not null,
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ai_actions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  property_id uuid references properties(id) on delete set null,
  title text not null,
  status ai_action_status not null default 'queued',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists integrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  provider text not null,
  integration_type text not null,
  status text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists user_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references profiles(id) on delete cascade,
  notification_email boolean not null default true,
  notification_sms boolean not null default true,
  daily_briefing_time text not null default '08:30',
  locale text not null default 'en-US',
  theme text not null default 'system',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_properties_user_id on properties(user_id);
create index if not exists idx_properties_jurisdiction_id on properties(jurisdiction_id);
create index if not exists idx_property_compliance_items_user_property on property_compliance_items(user_id, property_id);
create index if not exists idx_property_compliance_items_due_date on property_compliance_items(due_date);
create index if not exists idx_bank_accounts_user_id on bank_accounts(user_id);
create index if not exists idx_transactions_user_date on transactions(user_id, transaction_date desc);
create index if not exists idx_bills_user_due_date on bills(user_id, due_date);
create index if not exists idx_smart_devices_property_id on smart_devices(property_id);
create index if not exists idx_alerts_user_created_at on alerts(user_id, created_at desc);
create index if not exists idx_notifications_user_created_at on notifications(user_id, created_at desc);
create index if not exists idx_ai_conversations_user_id on ai_conversations(user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_profiles_updated_at before update on profiles for each row execute function set_updated_at();
create trigger trg_jurisdictions_updated_at before update on jurisdictions for each row execute function set_updated_at();
create trigger trg_properties_updated_at before update on properties for each row execute function set_updated_at();
create trigger trg_compliance_rules_updated_at before update on compliance_rules for each row execute function set_updated_at();
create trigger trg_property_compliance_items_updated_at before update on property_compliance_items for each row execute function set_updated_at();
create trigger trg_bank_accounts_updated_at before update on bank_accounts for each row execute function set_updated_at();
create trigger trg_transactions_updated_at before update on transactions for each row execute function set_updated_at();
create trigger trg_bills_updated_at before update on bills for each row execute function set_updated_at();
create trigger trg_maintenance_events_updated_at before update on maintenance_events for each row execute function set_updated_at();
create trigger trg_smart_devices_updated_at before update on smart_devices for each row execute function set_updated_at();
create trigger trg_alerts_updated_at before update on alerts for each row execute function set_updated_at();
create trigger trg_notifications_updated_at before update on notifications for each row execute function set_updated_at();
create trigger trg_ai_conversations_updated_at before update on ai_conversations for each row execute function set_updated_at();
create trigger trg_ai_messages_updated_at before update on ai_messages for each row execute function set_updated_at();
create trigger trg_ai_actions_updated_at before update on ai_actions for each row execute function set_updated_at();
create trigger trg_integrations_updated_at before update on integrations for each row execute function set_updated_at();
create trigger trg_user_preferences_updated_at before update on user_preferences for each row execute function set_updated_at();

alter table profiles enable row level security;
alter table properties enable row level security;
alter table property_compliance_items enable row level security;
alter table bank_accounts enable row level security;
alter table transactions enable row level security;
alter table bills enable row level security;
alter table maintenance_events enable row level security;
alter table smart_devices enable row level security;
alter table alerts enable row level security;
alter table notifications enable row level security;
alter table ai_conversations enable row level security;
alter table ai_messages enable row level security;
alter table ai_actions enable row level security;
alter table integrations enable row level security;
alter table user_preferences enable row level security;
alter table jurisdictions enable row level security;
alter table compliance_rules enable row level security;

create policy "Profiles are viewable by owner" on profiles
for select using (auth.uid() = auth_user_id);

create policy "Profiles are creatable by owner" on profiles
for insert with check (auth.uid() = auth_user_id);

create policy "Profiles are updatable by owner" on profiles
for update using (auth.uid() = auth_user_id);

create policy "Jurisdictions are readable by authenticated users" on jurisdictions
for select to authenticated using (true);

create policy "Compliance rules are readable by authenticated users" on compliance_rules
for select to authenticated using (true);

create policy "Properties owner access" on properties
for all using (
  exists (
    select 1 from profiles p where p.id = properties.user_id and p.auth_user_id = auth.uid()
  )
) with check (
  exists (
    select 1 from profiles p where p.id = properties.user_id and p.auth_user_id = auth.uid()
  )
);

create policy "Property compliance owner access" on property_compliance_items
for all using (
  exists (
    select 1 from profiles p where p.id = property_compliance_items.user_id and p.auth_user_id = auth.uid()
  )
) with check (
  exists (
    select 1 from profiles p where p.id = property_compliance_items.user_id and p.auth_user_id = auth.uid()
  )
);

create policy "Bank account owner access" on bank_accounts
for all using (
  exists (
    select 1 from profiles p where p.id = bank_accounts.user_id and p.auth_user_id = auth.uid()
  )
) with check (
  exists (
    select 1 from profiles p where p.id = bank_accounts.user_id and p.auth_user_id = auth.uid()
  )
);

create policy "Transactions owner access" on transactions
for all using (
  exists (
    select 1 from profiles p where p.id = transactions.user_id and p.auth_user_id = auth.uid()
  )
) with check (
  exists (
    select 1 from profiles p where p.id = transactions.user_id and p.auth_user_id = auth.uid()
  )
);

create policy "Bills owner access" on bills
for all using (
  exists (
    select 1 from profiles p where p.id = bills.user_id and p.auth_user_id = auth.uid()
  )
) with check (
  exists (
    select 1 from profiles p where p.id = bills.user_id and p.auth_user_id = auth.uid()
  )
);

create policy "Maintenance owner access" on maintenance_events
for all using (
  exists (
    select 1 from profiles p where p.id = maintenance_events.user_id and p.auth_user_id = auth.uid()
  )
) with check (
  exists (
    select 1 from profiles p where p.id = maintenance_events.user_id and p.auth_user_id = auth.uid()
  )
);

create policy "Smart devices owner access" on smart_devices
for all using (
  exists (
    select 1 from profiles p where p.id = smart_devices.user_id and p.auth_user_id = auth.uid()
  )
) with check (
  exists (
    select 1 from profiles p where p.id = smart_devices.user_id and p.auth_user_id = auth.uid()
  )
);

create policy "Alerts owner access" on alerts
for all using (
  exists (
    select 1 from profiles p where p.id = alerts.user_id and p.auth_user_id = auth.uid()
  )
) with check (
  exists (
    select 1 from profiles p where p.id = alerts.user_id and p.auth_user_id = auth.uid()
  )
);

create policy "Notifications owner access" on notifications
for all using (
  exists (
    select 1 from profiles p where p.id = notifications.user_id and p.auth_user_id = auth.uid()
  )
) with check (
  exists (
    select 1 from profiles p where p.id = notifications.user_id and p.auth_user_id = auth.uid()
  )
);

create policy "AI conversations owner access" on ai_conversations
for all using (
  exists (
    select 1 from profiles p where p.id = ai_conversations.user_id and p.auth_user_id = auth.uid()
  )
) with check (
  exists (
    select 1 from profiles p where p.id = ai_conversations.user_id and p.auth_user_id = auth.uid()
  )
);

create policy "AI messages owner access" on ai_messages
for all using (
  exists (
    select 1 from profiles p where p.id = ai_messages.user_id and p.auth_user_id = auth.uid()
  )
) with check (
  exists (
    select 1 from profiles p where p.id = ai_messages.user_id and p.auth_user_id = auth.uid()
  )
);

create policy "AI actions owner access" on ai_actions
for all using (
  exists (
    select 1 from profiles p where p.id = ai_actions.user_id and p.auth_user_id = auth.uid()
  )
) with check (
  exists (
    select 1 from profiles p where p.id = ai_actions.user_id and p.auth_user_id = auth.uid()
  )
);

create policy "Integrations owner access" on integrations
for all using (
  exists (
    select 1 from profiles p where p.id = integrations.user_id and p.auth_user_id = auth.uid()
  )
) with check (
  exists (
    select 1 from profiles p where p.id = integrations.user_id and p.auth_user_id = auth.uid()
  )
);

create policy "User preferences owner access" on user_preferences
for all using (
  exists (
    select 1 from profiles p where p.id = user_preferences.user_id and p.auth_user_id = auth.uid()
  )
) with check (
  exists (
    select 1 from profiles p where p.id = user_preferences.user_id and p.auth_user_id = auth.uid()
  )
);
