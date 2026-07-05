# Database Schema Snapshot — 5 July 2026 (v1.5.0)

_Generated from the LIVE production database (information_schema) at ecosystem closeout. Authoritative structure reference for restore/rebuild. Migration history in Supabase: m1_compliance_spine · m1_fix_audit_trigger · harden_function_search_path · m2_content_spine · m2_fix_impact_bucket_listing · m2b_subscriber · m3_portal_rls · m4_vault_bucket. All ecosystem tables carry data-ownership COMMENTs in the DB itself._

## Functions
`allocate_receipt_no(fy)` (gapless receipt numbering) · `indian_fy` · `donation_guard` · `forbid_mutation` · `touch_updated_at` · `write_audit` (→ `audit_trail`)

## RLS
All tables RLS-enabled. `anon`: zero policies. `authenticated`: `donor_self_read` · `donation_self_read` · `receipt_self_read` (own rows by verified JWT email). Everything else: service-key only.

## Storage buckets
`impact` (public, no listing policy) · `receipts` (private) · `vault` (private)

## Tables

**fund** — fund_id uuid PK · name text NN · type text 'general' · active bool true · created_at tz

**donor** — donor_id uuid PK · full_name text NN · name_as_per_pan · email · mobile · pan · donor_type enum 'individual' · company_name · cin · address_line/city/state/pincode · country 'IN' · residency_declared bool false · consent jsonb {sms,email,whatsapp:false} · consent_updated_at · compliance_state enum 'pending_pan' · last_pan_reminder_at · dedup_merged_into uuid · source · created_at/updated_at

**donation** — donation_id uuid PK · donor_id uuid NN→donor · channel enum · gross_amount_paise bigint NN · gateway_fee_paise bigint 0 · net_amount_paise · currency 'INR' · received_date date · financial_year · status enum 'initiated' · payment_mode enum · payment_ref · subscription_id · subscription_cycle · instrument_ref · fund_id uuid NN→fund · campaign_ref · eighty_g_eligible bool true · tenbd_includable bool false · compliance_state enum 'pending_pan' · receipt_id uuid · corrects_donation_id · entered_by/verified_by/notes · created_at/updated_at

**subscription** — subscription_id uuid PK · donor_id uuid NN · provider_subscription_id · amount_paise bigint NN · status 'created' · mandate_type · cycles_completed int 0 · next_charge_at/last_dunning_at · created_at/updated_at

**payment_event** — event_id uuid PK · provider 'razorpay' · provider_event_id text NN UNIQUE (idempotency) · event_type NN · signature_valid bool NN · payload jsonb NN · donation_id · received_at

**receipt** — receipt_id uuid PK · receipt_no text NN (gapless) · donation_id uuid NN · type enum · financial_year NN · pdf_path (receipts/ bucket) · sha256 · issued_at · supersedes uuid

**receipt_sequence** — financial_year PK · last_no int 0

**compliance_event** — id uuid PK · donor_id NN · donation_id · field/old_value/new_value · via NN · actor · created_at

**foreign_flag** — flag_id uuid PK · donor_id · donation_id · indicator NN · detail · disposition 'blocked' · created_at

**audit_trail** — entry_id bigint PK · actor (jwt-derived default) · entity · entity_id · action · old_row/new_row jsonb · at

**update** — update_id uuid PK · month text NN UNIQUE (YYYY-MM) · status 'draft' (draft→preview_sent→approved→sending→sent|skipped) · subject_en/hi · intro_en/hi · totals jsonb · recipient_count · created_at/updated_at/approved_at/sent_at

**story** — story_id uuid PK · update_id NN→update CASCADE · animal_name NN · note_en NN · note_hi · sort int 0 · created_at

**story_photo** — photo_id uuid PK · story_id NN→story CASCADE · storage_path NN (impact/) · email_path · width/height · alt '' · created_at

**email_send** — send_id uuid PK · update_id NN · email NN · **UNIQUE(update_id,email)** (double-send impossible) · donor_id · lang 'en' · status 'queued' (queued→sent→delivered|bounced|complained|failed) · provider_id · error · opened_at/clicked_at · created_at/updated_at

**suppression** — email PK · reason (unsubscribed|bounced|complained|manual) · created_at

**subscriber** — email PK · lang 'en' · source · created_at

**action_token** — token_hash PK (sha256; raw never stored) · purpose (approve_update|skip_update) · subject_id uuid NN · expires_at NN (72h) · consumed_at · created_at

**staff** — email PK · role 'owner' · added_by · created_at

**document** — document_id uuid PK · title NN · category (legal|compliance|vendor|sop|brand|board|other) · tags text[] · storage_path NN (vault/) · version int 1 · supersedes_id→document · uploaded_by · notes · created_at · published_path (impact/published/ copy)
