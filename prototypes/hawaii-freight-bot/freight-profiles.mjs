export function createFreightProfile(input = {}) {
  return {
    profileId: required(input.profileId, 'profileId'),
    sku: required(input.sku, 'sku'),
    quantity: Number(input.quantity || 1),
    public: {
      brand: input.public?.brand || null,
      model: input.public?.model || null,
      approvedSpecifications: input.public?.approvedSpecifications || {},
      purchaseMode: input.public?.purchaseMode || 'freight-review',
    },
    private: {
      supplier: input.private?.supplier || null,
      cartonDimensions: input.private?.cartonDimensions || null,
      grossWeight: input.private?.grossWeight || null,
      netWeight: input.private?.netWeight || null,
      palletConfiguration: input.private?.palletConfiguration || null,
      sdsStatus: input.private?.sdsStatus || 'unknown',
      un38_3Status: input.private?.un38_3Status || 'unknown',
      packagingRequirements: input.private?.packagingRequirements || [],
      originHandoff: input.private?.originHandoff || null,
      primaryTransport: input.private?.primaryTransport || null,
      backupTransport: input.private?.backupTransport || null,
      expectedFreightCost: input.private?.expectedFreightCost ?? null,
      historicalActualCost: input.private?.historicalActualCost ?? null,
      internalNotes: input.private?.internalNotes || [],
    },
    verification: {
      status: input.verification?.status || 'pending',
      source: input.verification?.source || null,
      verifiedAt: input.verification?.verifiedAt || null,
      expiresAt: input.verification?.expiresAt || null,
    },
  };
}

export function publicProfileView(profile) {
  return {
    profileId: profile.profileId,
    sku: profile.sku,
    quantity: profile.quantity,
    ...profile.public,
    verificationStatus: profile.verification.status,
  };
}

export function assertNoPrivateLeak(value) {
  const serialized = JSON.stringify(value).toLowerCase();
  const forbidden = [
    'expectedfreightcost', 'historicalactualcost', 'dealer cost', 'margin',
    'supplier payment', 'internalnotes', 'primarytransport', 'backuptransport',
  ];
  const leaked = forbidden.filter((token) => serialized.includes(token));
  if (leaked.length) throw new Error(`Private freight data leak detected: ${leaked.join(', ')}`);
  return true;
}

function required(value, name) {
  if (!value) throw new Error(`${name} is required`);
  return value;
}
