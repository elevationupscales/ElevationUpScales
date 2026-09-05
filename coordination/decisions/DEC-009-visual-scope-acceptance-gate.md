# Elevation 4.3 — Durable Decision Record

**Decision ID:** DEC-009  
**Date:** 2026-09-05  
**Owner / Authority:** Casey Young / Management  
**Status:** ACTIVE

---

## Decision

Visual-design work must be accepted as a separate release dimension from functional, technical, security, route, content-presence and commerce regression testing.

When a task includes an owner-approved visual reference, that reference is an **acceptance artifact**, not merely inspiration.

A release may be technically PASS while visual scope is FAIL. A worker must not report the overall task complete when the requested visual scope has not been proven.

For visual/branding/merchandising work, production promotion requires a dedicated **VISUAL ACCEPTANCE GATE** in addition to normal technical gates.

## Why It Matters

WEB-COM-0905-01 demonstrated that static tests can prove headings, links, route behavior and scripts while still missing the owner-approved visual hierarchy, image depth, merchandising quality and brand treatment.

Without a separate gate, workers can unintentionally translate requests such as "use this as the visual reference," "upgrade the merchandising," or "showcase the products" into copy changes, extra cards or minor CSS treatments and still call the work complete.

This decision prevents functional green status from masking a visual-scope miss.

## Applies To

- Website visual upgrades
- Homepage redesign/presentation work
- Product merchandising
- Product galleries
- Brand/presentation-layer work
- Owner-provided visual references
- Campaign landing pages
- Store/category visual systems
- Mobile visual hierarchy changes
- Any task using language such as redesign, visual upgrade, presentation, premium, showcase, gallery, branding, match this look, visual reference, or merchandising

## Visual Acceptance Gate

Before implementation, the worker must extract and record:

- visual hierarchy requirements;
- exact approved identity/logo/brand assets;
- required product/media emphasis;
- spacing/readability requirements;
- CTA hierarchy;
- icon/use-case communication requirements where applicable;
- pages/sections included in the visual scope;
- pages/sections explicitly excluded.

Before calling the task complete, the worker must provide evidence covering:

1. **Reference fidelity** — each material characteristic of the approved reference has an implemented counterpart or an explicit reason why it does not apply.
2. **Actual media usage** — approved images/assets are visibly used where required; asset existence alone is not acceptance.
3. **Desktop review** — representative screenshots or equivalent visual evidence.
4. **Mobile review** — representative screenshots or equivalent visual evidence.
5. **CTA hierarchy** — dominant and secondary actions remain visually understandable.
6. **Information density** — the implementation has not converted a simple visual reference into unnecessary text/card complexity.
7. **Brand fidelity** — no invented, redrawn, approximated or unapproved logo/identity treatment.
8. **Owner/Management review** — required when the owner supplied or specifically approved the visual reference.

## Reporting Rule

Workers must report the dimensions separately:

- FUNCTIONAL: PASS / FAIL / NOT VERIFIED
- TECHNICAL: PASS / FAIL / NOT VERIFIED
- SECURITY / COMMERCE: PASS / FAIL / NOT VERIFIED
- VISUAL SCOPE: PASS / FAIL / NOT VERIFIED
- OWNER VISUAL ACCEPTANCE: PASS / HOLD / NOT REQUIRED

A task is not "PASS" if any required dimension is FAIL or NOT VERIFIED.

## Does Not Mean

- Visual work may bypass security, payment, pricing, MAP, Hawaii, supplier-data or production controls.
- Every small CSS/content fix requires owner review.
- Workers should reproduce an approved reference pixel-for-pixel when the brief says to transfer principles rather than exact composition.
- Workers may invent new logos or brand assets to satisfy a visual requirement.
- Visual acceptance authorizes production by itself.

## Supersedes

- Any informal practice that treated static text/route checks as sufficient proof of a requested visual redesign or merchandising upgrade.

## Superseded By

- None.

## Implementation Notes

- Record a visual acceptance checklist in the controlling handoff or work definition before coding.
- When a reference image exists, save its role in the handoff as `VISUAL REFERENCE — CONTROLLING`.
- Preview workflows should include reviewable visual evidence where practical.
- Technical automation may support visual review, but it does not replace owner/management visual judgment for owner-directed presentation work.
- Operations should HOLD production acceptance when visual scope is materially unproven even if functional tests are green.
