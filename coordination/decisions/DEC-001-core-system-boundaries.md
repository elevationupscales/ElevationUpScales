# DEC-001 — Elevation 4.3 Core System Boundaries

**Date:** 2026-08-28  
**Authority:** Owner / Master Coordination  
**Status:** ACTIVE

## Decision

The following system boundaries are permanent unless explicitly superseded:

1. **Elevation Store and Elevation Marketplace are separate systems.** Store inventory is company retail inventory; Marketplace is independent/community seller inventory.
2. **Catalog Manager is the commerce product source of truth.** Hawaii Lithium, RV Store, Lithium Store, future Solar Builder product hooks, and other retail surfaces must reference Catalog products rather than create duplicate product databases.
3. **Hawaii Lithium is a Store/Lithium workflow.** It is not a normal restoration/project lead workflow and not a Marketplace seller workflow.
4. **Technician Portal is a separate system from the public Website/Admin deployment.** Do not mix Portal routes/auth/code into Website work unless explicitly authorized.
5. **Production promotion follows the controlling handoff gate.** A build authorization does not automatically authorize production promotion.
6. **Current accepted production and newest explicit owner/management decisions outrank older handoff intent.**

## Why It Matters

These boundaries prevent duplicate data sources, contradictory workflows, accidental public claims, and workers rebuilding systems that already exist.

## Applies To

- Website / Deployment
- Store / Catalog / Inventory
- Hawaii Lithium
- Marketplace
- Solar Builder
- Mission Control / Admin
- Portal

## Does Not Mean

- systems cannot exchange references or analytics;
- Mission Control cannot surface summaries from other systems;
- Solar Builder cannot later recommend Catalog products;
- Marketplace cannot generate service leads.

It means each business object retains one authoritative source of truth and one primary operating workflow.
