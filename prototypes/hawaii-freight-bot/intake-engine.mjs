export const ROUTING = Object.freeze({
  HAWAII_OPTIONS: 'HAWAII_PURCHASE_OPTIONS',
  COMMERCIAL_REVIEW: 'COMMERCIAL_REVIEW',
  LOWER_48: 'LOWER_48_STANDARD',
  ALASKA_REVIEW: 'ALASKA_REVIEW',
  OTHER_REVIEW: 'OTHER_DESTINATION_REVIEW',
  HUMAN_REVIEW: 'HUMAN_REVIEW',
});

export const HANDOFF_REASONS = Object.freeze({
  COMMERCIAL_QUANTITY: 'COMMERCIAL_QUANTITY',
  DESTINATION_UNCLEAR: 'DESTINATION_UNCLEAR',
  FIRM_PRICE_REQUEST: 'FIRM_PRICE_REQUEST',
  CARRIER_OR_LEGAL_QUESTION: 'CARRIER_OR_LEGAL_QUESTION',
  PROFILE_MISSING_OR_STALE: 'PROFILE_MISSING_OR_STALE',
  NEIGHBOR_ISLAND_DETAIL: 'NEIGHBOR_ISLAND_DETAIL',
  USED_DAMAGED_DEFECTIVE: 'USED_DAMAGED_DEFECTIVE',
  PACKAGING_EXCEPTION: 'PACKAGING_EXCEPTION',
  PENDING_PARTNERSHIP: 'PENDING_PARTNERSHIP',
  NO_VERIFIED_RULE: 'NO_VERIFIED_RULE',
});

const HAWAII_ZIP_PREFIX = /^96(?:7|8)/;
const ALASKA_ZIP_PREFIX = /^99/;

export function normalizeIntake(input = {}) {
  const quantity = Number.parseInt(input.quantity, 10);
  const zip = String(input.destinationZip || '').trim();
  const state = String(input.destinationState || '').trim().toUpperCase();
  const island = String(input.hawaiiIsland || '').trim();

  return {
    intakeId: input.intakeId || null,
    sourceChannel: input.sourceChannel || 'offline-prototype',
    sourcePage: input.sourcePage || null,
    productId: input.productId || null,
    sku: input.sku || null,
    quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : null,
    destinationZip: zip || null,
    destinationState: state || inferState(zip),
    hawaiiIsland: island || null,
    customerName: clean(input.customerName),
    email: clean(input.email),
    phone: clean(input.phone),
    notes: clean(input.notes),
    asksFirmPrice: Boolean(input.asksFirmPrice),
    asksCarrierAcceptance: Boolean(input.asksCarrierAcceptance),
    asksShippingLegality: Boolean(input.asksShippingLegality),
    shipmentCondition: input.shipmentCondition || 'new',
    packagingException: Boolean(input.packagingException),
    dependsOnPendingPartnership: Boolean(input.dependsOnPendingPartnership),
  };
}

export function routeIntake(rawInput, context = {}) {
  const intake = normalizeIntake(rawInput);
  const missing = minimumMissingFields(intake);
  const audit = [];

  if (missing.length) {
    audit.push({ rule: 'minimum-intake', result: 'INCOMPLETE', fields: missing });
    return result('COLLECT_MORE', intake, {
      missing,
      publicMessage: nextQuestionFor(missing[0]),
      audit,
    });
  }

  const forcedHandoff = resolveForcedHandoff(intake, context);
  if (forcedHandoff) {
    audit.push({ rule: 'forced-handoff', result: forcedHandoff });
    return result(ROUTING.HUMAN_REVIEW, intake, {
      handoff: true,
      handoffReason: forcedHandoff,
      publicMessage: publicHandoffMessage(forcedHandoff),
      audit,
    });
  }

  if (intake.destinationState === 'HI') {
    if (intake.quantity >= 4) {
      audit.push({ rule: 'hawaii-quantity', result: '4_PLUS_COMMERCIAL_REVIEW' });
      return result(ROUTING.COMMERCIAL_REVIEW, intake, {
        handoff: true,
        handoffReason: HANDOFF_REASONS.COMMERCIAL_QUANTITY,
        publicMessage: 'Commercial quantity — freight review required. Request a commercial quote and our logistics team will review the next shipping step.',
        audit,
      });
    }

    if (!intake.hawaiiIsland && context.requireIslandForRouting !== false) {
      audit.push({ rule: 'hawaii-island', result: 'ISLAND_NEEDED' });
      return result('COLLECT_MORE', intake, {
        missing: ['hawaiiIsland'],
        publicMessage: 'Which Hawaii island or destination area is this shipping to?',
        audit,
      });
    }

    audit.push({ rule: 'hawaii-quantity', result: '1_TO_3_CONTROLLED_WORKFLOW' });
    return result(ROUTING.HAWAII_OPTIONS, intake, {
      publicMessage: 'Thanks — we have enough to check Hawaii availability and purchase options. Our logistics team will confirm the next shipping step before any freight commitment is made.',
      audit,
    });
  }

  if (intake.destinationState === 'AK') {
    audit.push({ rule: 'destination', result: 'ALASKA_REVIEW' });
    return result(ROUTING.ALASKA_REVIEW, intake, {
      handoff: true,
      publicMessage: 'Thanks — Alaska shipping requires a logistics review. We’ll use your product, quantity and destination to determine the next shipping step.',
      audit,
    });
  }

  if (isLower48(intake.destinationState)) {
    audit.push({ rule: 'destination', result: 'LOWER_48' });
    return result(ROUTING.LOWER_48, intake, {
      publicMessage: 'Thanks — we have the information needed to determine the next shipping step for your order.',
      audit,
    });
  }

  audit.push({ rule: 'destination', result: 'OTHER_REVIEW' });
  return result(ROUTING.OTHER_REVIEW, intake, {
    handoff: true,
    handoffReason: HANDOFF_REASONS.NO_VERIFIED_RULE,
    publicMessage: 'Thanks — this destination needs a logistics review before we can confirm shipping options.',
    audit,
  });
}

export function minimumMissingFields(intake) {
  const missing = [];
  if (!intake.productId && !intake.sku) missing.push('product');
  if (!intake.quantity) missing.push('quantity');
  if (!intake.destinationZip && !intake.destinationState) missing.push('destination');
  if (!intake.customerName) missing.push('customerName');
  if (!intake.email && !intake.phone) missing.push('contact');
  return missing;
}

function resolveForcedHandoff(intake, context) {
  if (intake.asksFirmPrice) return HANDOFF_REASONS.FIRM_PRICE_REQUEST;
  if (intake.asksCarrierAcceptance || intake.asksShippingLegality) return HANDOFF_REASONS.CARRIER_OR_LEGAL_QUESTION;
  if (['used', 'damaged', 'defective'].includes(String(intake.shipmentCondition).toLowerCase())) return HANDOFF_REASONS.USED_DAMAGED_DEFECTIVE;
  if (intake.packagingException) return HANDOFF_REASONS.PACKAGING_EXCEPTION;
  if (intake.dependsOnPendingPartnership) return HANDOFF_REASONS.PENDING_PARTNERSHIP;
  if (context.profileStatus && context.profileStatus !== 'verified') return HANDOFF_REASONS.PROFILE_MISSING_OR_STALE;
  return null;
}

function result(routingResult, intake, extra = {}) {
  return {
    intake: publicIntakeView(intake),
    routingResult,
    handoff: Boolean(extra.handoff),
    handoffReason: extra.handoffReason || null,
    missing: extra.missing || [],
    publicMessage: extra.publicMessage || '',
    audit: extra.audit || [],
  };
}

export function publicIntakeView(intake) {
  return {
    intakeId: intake.intakeId,
    sourceChannel: intake.sourceChannel,
    sourcePage: intake.sourcePage,
    productId: intake.productId,
    sku: intake.sku,
    quantity: intake.quantity,
    destinationZip: intake.destinationZip,
    destinationState: intake.destinationState,
    hawaiiIsland: intake.hawaiiIsland,
    customerName: intake.customerName,
    email: intake.email,
    phone: intake.phone,
    notes: intake.notes,
  };
}

function nextQuestionFor(field) {
  return ({
    product: 'What product or model are you interested in?',
    quantity: 'How many do you need?',
    destination: 'What ZIP code or state is the shipment going to?',
    customerName: 'What name should we put on the freight request?',
    contact: 'What email address or phone number should our team use to follow up?',
  })[field] || 'What information can you provide next?';
}

function publicHandoffMessage(reason) {
  if (reason === HANDOFF_REASONS.FIRM_PRICE_REQUEST) return 'A firm freight price needs a shipment-specific review. We’ll hand this to our logistics team for confirmation.';
  if (reason === HANDOFF_REASONS.CARRIER_OR_LEGAL_QUESTION) return 'Carrier acceptance and regulated-shipping questions require a shipment-specific logistics review. We’ll hand this to our team rather than guess.';
  return 'This shipment needs a logistics review before we can confirm the next step. Our team will take it from here.';
}

function inferState(zip) {
  if (!zip) return null;
  if (HAWAII_ZIP_PREFIX.test(zip)) return 'HI';
  if (ALASKA_ZIP_PREFIX.test(zip)) return 'AK';
  return null;
}

function isLower48(state) {
  return Boolean(state) && state !== 'HI' && state !== 'AK';
}

function clean(value) {
  const out = String(value || '').trim();
  return out || null;
}
