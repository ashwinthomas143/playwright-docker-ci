# playwright-docker-ci

A small Playwright/TypeScript suite that runs the same way in three places:
on your machine, inside a Docker container, and in GitHub Actions. The tests
are deliberately few (Playwright's public TodoMVC demo); the point is the
packaging and CI wiring.

## What's here
- `Dockerfile`: built on the official `mcr.microsoft.com/playwright` image
  (browsers and system deps included). The image tag must match the
  `@playwright/test` version in `package.json`; both are pinned to 1.63.0.
- `docker-compose.yml`: one command to run the suite in a container, with
  reports written back to the host.
- `.github/workflows/ci.yml`: two jobs, `native` (runs on the runner) and
  `docker` (builds the image and runs the same tests inside it), each
  uploading its HTML report.

## Run it
```bash
npm ci
npx playwright install chromium
npm test                 # local

docker compose run --rm tests   # in a container (needs Docker)
```

## Verification status (keep this honest)
- Local run: 4 of 4 tests pass (2026-09-25).
- Docker build and container run: **not yet verified.** Docker was not
  installed on the author's machine when this was written. The `docker`
  job in CI is the first real check; this line changes when it goes green.

## Why these choices
- Official Playwright image instead of installing browsers into a base
  Node image: fewer moving parts, and Microsoft keeps the system
  dependencies current.
- `npm ci` in its own layer before copying source, so dependency
  installation is cached until `package*.json` changes.
- `ipc: host` / `--ipc=host`: Chromium can crash in containers with the
  default small shared memory.
- Retries and `forbidOnly` only when `CI` is set, so local runs stay fast
  and honest.

License: MIT
