# Deployment checklist

Two Render services deploy from this repo's `main` branch:

| Service | Type | Root dir | URL |
|---|---|---|---|
| `personal-site-web` | Static site | `apps/web` | https://jessicalrobertson.com |
| `personal-site` | Web service | `apps/api` | https://api.jessicalrobertson.com |

## Before merging to main

- [ ] `npm run build:web` and `npm run build:api` both succeed locally
- [ ] `npm run lint` (apps/web) is clean
- [ ] Any new required env var is added to `apps/api/.env.example` and to the
      table below, and set on the `personal-site` service in Render

## Render settings to keep in sync

- [ ] **Auto-deploy trigger**: `personal-site-web` deploys on every commit.
      `personal-site` is set to deploy only when GitHub status checks pass —
      since this repo has no CI configured (see #28), that condition is
      never met and it silently never redeploys. Either switch it to
      "on commit" in the Render dashboard, or land #28 first.
- [ ] After any deploy of `personal-site`, confirm the deployed commit SHA
      (Render dashboard → service → latest deploy) matches `git rev-parse
      HEAD` on main. Auto-deploy can silently stall (see above).
- [ ] `NODE_ENV=production` is set on `personal-site` — this is required for
      the CORS allowlist (`ALLOWED_ORIGINS`, see below) to actually apply.

## Required/expected environment variables (`personal-site` service)

| Var | Required | Notes |
|---|---|---|
| `NODE_ENV` | prod | must be `production` for CORS restriction to apply |
| `PORT` | no | Render sets this automatically |
| `RESEND_API_KEY` | no | omit to run contact form in log-only mode (no email sent) |
| `CONTACT_TO_EMAIL` | no | defaults to jessicarobertson627@gmail.com |
| `CONTACT_FROM_EMAIL` | no | defaults to onboarding@resend.dev |
| `GITHUB_USERNAME` | no | defaults to jrobertson627 |
| `TELEMETRY_ADMIN_KEY` | no | omit to disable `/api/telemetry/summary` |
| `ALLOWED_ORIGINS` | no | comma-separated; defaults to the production domain |

`apps/api/src/config/env.ts` validates all of these at process startup with
zod and exits with a clear error if one is malformed — check Render's deploy
logs first if a deploy comes up unhealthy.

## Porkbun DNS (jessicalrobertson.com)

Should already exist; re-verify with `list_dns_records` after any change:

- `ALIAS` on the apex → `personal-site-web-tnfr.onrender.com`
- `CNAME` on `*` → `personal-site-web-tnfr.onrender.com`
- `CNAME` on `api` → `personal-site-3hmy.onrender.com`
- Two `TXT` records on `_acme-challenge` (Render's cert validation — don't
  remove while a custom domain + cert is active)

## Post-deploy smoke test

```bash
curl -s https://jessicalrobertson.com | grep -q "Jessica Robertson" && echo "frontend OK"
curl -s https://api.jessicalrobertson.com/health
curl -s https://jessicalrobertson.com/api/github/profile
```

The last one should return `{"success":true,...}` — if it 404s, the API
deploy didn't actually match the frontend (see auto-deploy trigger note
above).
