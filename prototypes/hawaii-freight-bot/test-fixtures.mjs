import assert from 'node:assert/strict';
import { routeIntake, ROUTING } from './intake-engine.mjs';
import { assertNoPrivateLeak, createFreightProfile, publicProfileView } from './freight-profiles.mjs';

const base = {
  sku: 'SK48V100N',
  destinationState: 'HI',
  destinationZip: '96819',
  hawaiiIsland: 'Oahu',
  customerName: 'Test Customer',
  email: 'customer@example.com',
};

const cases = [
  {
    name: 'Hawaii quantity 1 routes to controlled options',
    input: { ...base, quantity: 1 },
    expected: ROUTING.HAWAII_OPTIONS,
  },
  {
    name: 'Hawaii quantity 3 routes to controlled options',
    input: { ...base, quantity: 3 },
    expected: ROUTING.HAWAII_OPTIONS,
  },
  {
    name: 'Hawaii quantity 4 routes to commercial review',
    input: { ...base, quantity: 4 },
    expected: ROUTING.COMMERCIAL_REVIEW,
  },
  {
    name: 'Unknown Hawaii island collects one routing-changing question',
    input: { ...base, quantity: 1, hawaiiIsland: '' },
    expected: 'COLLECT_MORE',
  },
  {
    name: 'Firm freight price request fails closed to human review',
    input: { ...base, quantity: 1, asksFirmPrice: true },
    expected: ROUTING.HUMAN_REVIEW,
  },
  {
    name: 'Carrier/legal question fails closed to human review',
    input: { ...base, quantity: 1, asksCarrierAcceptance: true },
    expected: ROUTING.HUMAN_REVIEW,
  },
  {
    name: 'Stale freight profile fails closed',
    input: { ...base, quantity: 1 },
    context: { profileStatus: 'stale' },
    expected: ROUTING.HUMAN_REVIEW,
  },
  {
    name: 'Used battery movement fails closed',
    input: { ...base, quantity: 1, shipmentCondition: 'used' },
    expected: ROUTING.HUMAN_REVIEW,
  },
  {
    name: 'Lower 48 remains distinct from Hawaii workflow',
    input: { ...base, quantity: 1, destinationState: 'CO', destinationZip: '80903', hawaiiIsland: '' },
    expected: ROUTING.LOWER_48,
  },
];

for (const fixture of cases) {
  const output = routeIntake(fixture.input, fixture.context);
  assert.equal(output.routingResult, fixture.expected, fixture.name);
  assertNoPrivateLeak(output);
}

const profile = createFreightProfile({
  profileId: 'SOK-48-1',
  sku: 'SK48V100N',
  quantity: 1,
  public: { brand: 'SOK Energy', model: 'SK48V100N' },
  private: {
    supplier: 'SOK',
    expectedFreightCost: 999.99,
    primaryTransport: 'INTERNAL_ONLY',
    internalNotes: ['Never expose this'],
  },
  verification: { status: 'verified', source: 'management-reconciled fixture' },
});

const safeProfile = publicProfileView(profile);
assert.equal(safeProfile.expectedFreightCost, undefined);
assert.equal(safeProfile.primaryTransport, undefined);
assertNoPrivateLeak(safeProfile);

console.log(`PASS: ${cases.length} routing fixtures + private-data boundary checks`);
