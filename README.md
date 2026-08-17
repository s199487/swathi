# SpecBusiness Platform Skeleton

Full-stack scaffold covering the four opportunity branches (franchise, dealer,
associate, job) described in the requirement doc: registration, profiles,
requirement posting, rule-based matching, applications/enquiries, and a
minimal workshop module.

This is a skeleton, not a finished product. It runs, migrates, and the
matching engine returns real scores against a real database, verified before
packaging. What it doesn't have yet: file upload validation, company
verification workflow beyond a status field, payment integration, the admin
dashboard UI (Django admin is enabled and usable at `/admin/` in the
meantime), and production security hardening (HTTPS, rate limiting on auth
endpoints, etc).

## Structure

```
backend/    Django REST API
frontend/   Next.js app
docker-compose.yml   Postgres for local dev
```

## Backend setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # venv\Scripts\activate on Windows
pip install -r requirements.txt

cp .env.example .env             # edit SECRET_KEY at minimum

# start Postgres (or point .env at your own instance)
docker compose -f ../docker-compose.yml up -d

python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

API root: `http://localhost:8000/api/`
Django admin: `http://localhost:8000/admin/`

### Key endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/auth/register/` | POST | Register (individual/company/admin via `user_type`) |
| `/api/auth/login/` | POST | Get JWT access/refresh tokens |
| `/api/auth/me/` | GET | Current user |
| `/api/profiles/individual/` | GET/PATCH | Individual profile |
| `/api/profiles/company/` | GET/PATCH | Company profile |
| `/api/requirements/` | GET/POST | List/create requirements, filter by `opportunity_type`, `location`, `industry`, `posted_by_type` |
| `/api/matching/requirement/<id>/` | GET | Explainable match list for a requirement you own |
| `/api/applications/` | GET/POST | Apply/enquire/save against a requirement |
| `/api/workshops/` | GET/POST | Workshop CRUD |
| `/api/workshops/registrations/` | GET/POST | Workshop registration |

### Design notes worth knowing before extending this

- **One `Requirement` model covers all four branches** (franchise, dealer,
  associate, job), distinguished by `opportunity_type` and `posted_by_type`.
  This avoids four near-duplicate tables today. Split it later only if the
  branches diverge enough in fields or lifecycle to justify it, don't split
  preemptively.
- **Matching is rule-based and explainable on purpose.** `matching/services.py`
  compares only fields present on both sides and returns a breakdown per
  factor (location, industry, investment/salary range, skills overlap).
  Missing data is excluded from the score, not counted as a mismatch. This
  was a deliberate choice against black-box "AI match" percentages that can't
  be justified to a user who asks why they got a low score.
- **Verification is a status field, not a workflow**, `CompanyProfile.verification_status`
  defaults to `pending`. There's no document upload or admin approval flow
  yet, only the field to build on.
- **Passwords are hashed by Django's `set_password()`**, never stored plain.

## Frontend setup

```bash
cd frontend
npm install
cp .env.local.example .env.local   # point at your backend URL
npm run dev
```

Runs at `http://localhost:3000`. Pages included: landing, register (type
selection → individual/company forms), login, dashboard, post-a-requirement,
opportunity listing with filters, and a matches view that shows the score
breakdown per factor, not just a bare percentage.

## What's deliberately not built yet

Per the earlier discussion: workshops and "Our Helping Hands" are scoped
minimally or not at all here. Workshops has a working model and API only, no
frontend pages, since it's not core to validating the matching concept. Our
Helping Hands isn't represented anywhere, its requirements were never
defined. Payment, SMS/WhatsApp notifications, and the admin dashboard UI
(beyond Django's built-in admin) are also out of scope for this skeleton.

If you're testing this before showing it to anyone, run one full flow
manually first: register a company, post a franchise requirement, register
an individual, post a matching requirement, then check
`/api/matching/requirement/<id>/` returns a real score. That exact flow was
tested against a live server before this was packaged, so it works as
described, but it's worth re-confirming after any changes you make.
