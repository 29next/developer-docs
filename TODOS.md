# TODOS

## Infrastructure

### Evaluate Richer Search For User Docs After Launch

**What:** Evaluate whether the migrated user-docs portal should move from built-in/local Fumadocs search to Algolia or another richer search stack after launch.

**Why:** Local search is the right launch choice for the GitBook exit, but real usage may show search-quality or corpus-size limits that justify a stronger search system later.

**Context:** The launch plan intentionally keeps search simple to reduce migration risk before the April 24, 2026 GitBook deadline. After cutover, review actual search quality, zero-result behavior, and corpus growth before deciding whether to invest in richer indexing infrastructure.

**Effort:** M
**Priority:** P3
**Depends on:** Successful user-docs launch and at least 2 weeks of real usage data


## Completed

### Create A Lightweight DESIGN.md After Migration Stabilizes
**Status:** Completed 2026-04-02
**What was done:** Created `design-system/DESIGN.md` with full token documentation, content channel scoping (docs vs marketing vs app UI), accessibility section, cross-property consistency rules, and token architecture. Shared token files created in `design-system/tokens/`. Automated audit script at `design-system/audit.sh` (25/25 passing). Root `DESIGN.md` updated as pointer to canonical location.

### Evaluate Shared Docs-Shell Synchronization After Migration
**Status:** Completed 2026-04-02
**What was done:** Created `design-system/` directory at workspace root with shared tokens (`tokens/base.css`, `tokens/dark.css`, `tokens/light.css`, `tokens/typography.css`), a Fumadocs bridge (`fumadocs-bridge.css`), and guides alias mapping (`guides-aliases.css`). All three repos now reference the shared design system as canonical source. TOC width aligned (300px -> 320px), border radius aligned, JetBrains Mono added to Fumadocs repos, accessibility fixes applied. Automated audit enforces consistency.
