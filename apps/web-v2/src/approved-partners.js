export const APPROVED_PARTNERS = Object.freeze([
  {
    id: 'sok',
    name: 'SOK Energy',
    relationship: 'AUTHORIZED_DEALER',
    priority: 'CORE',
    catalogState: 'ACTIVE_PRODUCTS'
  },
  {
    id: 'renogy',
    name: 'Renogy',
    relationship: 'APPROVED_DEALER_PARTNER',
    priority: 'CORE',
    catalogState: 'ACTIVE_EXPANSION'
  },
  {
    id: 'sungoldpower',
    name: 'SunGoldPower',
    relationship: 'APPROVED_DISTRIBUTOR',
    priority: 'CORE',
    catalogState: 'ACTIVE_EXPANSION'
  },
  {
    id: 'winegard',
    name: 'Winegard',
    relationship: 'APPROVED_RESELLER',
    priority: 'CORE',
    catalogState: 'NAME_ONLY'
  },
  {
    id: 'phocos',
    name: 'Phocos',
    relationship: 'DEALER_RESELLER_ACCOUNT_ACTIVE',
    priority: 'CORE_SOLAR_SUPPORT',
    catalogState: 'NAME_ONLY'
  },
  {
    id: 'kingboss',
    name: 'Kingboss',
    relationship: 'B2B_WHOLESALE_APPROVED',
    priority: 'SECONDARY',
    catalogState: 'NAME_ONLY_HELD'
  },
  {
    id: 'vevor',
    name: 'VEVOR',
    relationship: 'ACTIVE_DIRECT_COMMERCIAL_RELATIONSHIP',
    priority: 'BACK_BURNER',
    catalogState: 'MAINTAIN_ONLY'
  }
]);

export const APPROVED_PARTNER_NAMES = Object.freeze(APPROVED_PARTNERS.map(({ name }) => name));
