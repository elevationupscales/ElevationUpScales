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
    relationship: 'AUTHORIZED_DEALER',
    priority: 'CORE',
    catalogState: 'ACTIVE_EXPANSION'
  },
  {
    id: 'sungoldpower',
    name: 'SunGoldPower',
    relationship: 'AUTHORIZED_DEALER',
    priority: 'CORE',
    catalogState: 'ACTIVE_EXPANSION'
  },
  {
    id: 'winegard',
    name: 'Winegard',
    relationship: 'AUTHORIZED_DEALER',
    priority: 'CORE',
    catalogState: 'NAME_ONLY'
  },
  {
    id: 'phocos',
    name: 'Phocos',
    relationship: 'AUTHORIZED_DEALER',
    priority: 'CORE_SOLAR_SUPPORT',
    catalogState: 'NAME_ONLY'
  },
  {
    id: 'kingboss',
    name: 'Kingboss',
    relationship: 'AUTHORIZED_DEALER',
    priority: 'SECONDARY',
    catalogState: 'NAME_ONLY_HELD'
  },
  {
    id: 'vevor',
    name: 'VEVOR',
    relationship: 'AUTHORIZED_DEALER',
    priority: 'BACK_BURNER',
    catalogState: 'MAINTAIN_ONLY'
  }
]);

export const APPROVED_PARTNER_NAMES = Object.freeze(APPROVED_PARTNERS.map(({ name }) => name));
