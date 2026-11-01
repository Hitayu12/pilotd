#!/usr/bin/env bash
set -euo pipefail

if ! command -v psql >/dev/null 2>&1; then
  echo "psql not found. Install PostgreSQL client tools first." >&2
  exit 1
fi

if [[ -z "${SUPABASE_DB_URL:-}" ]]; then
  echo "SUPABASE_DB_URL is required, for example:" >&2
  echo "postgresql://postgres:<password>@db.<project-ref>.supabase.co:5432/postgres" >&2
  exit 1
fi

for migration in supabase/migrations/*.sql; do
  echo "Applying ${migration}"
  psql "${SUPABASE_DB_URL}" -f "${migration}"
done
psql "${SUPABASE_DB_URL}" -f supabase/seed.sql

echo "Pilotd schema + seed applied."
