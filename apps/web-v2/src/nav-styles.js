export const navStyles = `
.nav-menu { position: relative; }
.nav-menu summary {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
  color: #e8f0f3;
  font-size: 15px;
  font-weight: 850;
  cursor: pointer;
  user-select: none;
}
.nav-menu summary::-webkit-details-marker { display: none; }
.nav-menu summary:hover,
.nav-menu summary:focus-visible,
.nav-menu[data-active="true"] summary { color: var(--cyan); }
.nav-caret { color: #d7e8ed; font-size: 15px; transition: transform .16s ease; }
.nav-menu[open] .nav-caret { transform: rotate(180deg); }
.nav-link::after,
.nav-dropdown a::after { content: none !important; display: none !important; }
.nav-dropdown {
  position: absolute;
  top: calc(100% + 18px);
  left: 50%;
  width: 330px;
  transform: translateX(-50%);
  display: grid;
  padding: 10px;
  border: 1px solid rgba(49,198,231,.23);
  background: #03131d;
  box-shadow: 0 24px 60px rgba(0,0,0,.46);
}
.nav-dropdown a {
  display: grid;
  gap: 3px;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(49,198,231,.12);
}
.nav-dropdown a:last-child { border-bottom: 0; }
.nav-dropdown a:hover,
.nav-dropdown a:focus-visible { background: rgba(49,198,231,.07); color: var(--cyan); }
.nav-dropdown strong { font-size: 14px; }
.nav-dropdown small { color: #98adb7; font-size: 11px; font-weight: 600; line-height: 1.35; }

@media (max-width: 1040px) {
  .nav-menu { width: 100%; }
  .nav-menu summary {
    min-height: 48px;
    padding: 0 14px;
    border-bottom: 1px solid rgba(49,198,231,.12);
  }
  .nav-caret { margin-left: auto; }
  .nav-dropdown {
    position: static;
    width: auto;
    transform: none;
    padding: 0 8px 8px 24px;
    border: 0;
    box-shadow: none;
    background: #03131d;
  }
  .nav-dropdown a { min-height: 52px; padding: 10px 14px; }
  .nav-dropdown small { display: block; }
}
`;
