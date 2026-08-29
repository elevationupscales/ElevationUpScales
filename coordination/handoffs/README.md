# Elevation 4.3 Handoffs

Store active and historical approved worker instructions here.

Every handoff should name:
- authoritative parent SHA
- objective
- authorized scope
- parked/non-scope work
- acceptance tests
- production authorization state
- required receipt

Use `HANDOFF_TEMPLATE.md` for new work.

When a handoff is superseded, do not delete its history; mark the newer handoff as controlling in `/ELEVATION_4_3_MASTER_STATUS.md`.
