import { createGlobalStyle } from 'styled-components';

export const ModuleStyles = createGlobalStyle`
/* ActiveCall */
.ActiveCall__card {
  border: 2px solid #22c55e;
  border-radius: 12px;
  background: #ffffff;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(34, 197, 94, 0.12);
}

/* Dashboard */
.Dashboard__page { padding: 24px; background: #f9fafb; }
.Dashboard__pageHeader { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.Dashboard__kpiGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
.Dashboard__kpiCard { background: white; border-radius: 8px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.Dashboard__chartsRow { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 24px; }
.Dashboard__chartCard { flex: 1 1 300px; background: white; border-radius: 8px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.Dashboard__lineChart, .Dashboard__barChart { width: 100%; height: auto; }
.Dashboard__sparkline { width: 100%; height: 56px; }
.Dashboard__activityCard, .Dashboard__goalCard, .Dashboard__operatorSection { background: white; border-radius: 8px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 16px; }


.ActiveCall__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  background: rgba(34, 197, 94, 0.04);
  border-bottom: 1px solid rgba(34, 197, 94, 0.2);
}

.ActiveCall__headerLeft {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
}

.ActiveCall__phoneIcon {
  color: #22c55e;
}

.ActiveCall__title {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}

.ActiveCall__timer {
  font-size: 13px;
  font-weight: 600;
  color: white;
  background: #22c55e;
  padding: 4px 12px;
  border-radius: 20px;
}

.ActiveCall__body {
  padding: 20px;
}

.ActiveCall__debtorRow {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.ActiveCall__avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #334155;
  color: white;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.ActiveCall__debtorName {
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
}

.ActiveCall__details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 16px;
}

.ActiveCall__detailItem {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #64748b;
}

.ActiveCall__divider {
  height: 1px;
  background: #e2e8f0;
  margin: 16px 0;
}

.ActiveCall__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: #e2e8f0;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.ActiveCall__statItem {
  background: #ffffff;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
}

.ActiveCall__statLabel {
  font-size: 11px;
  color: #94a3b8;
}

.ActiveCall__statValue {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}

.ActiveCall__green {
  color: #22c55e;
}

.ActiveCall__red {
  color: #ef4444;
}

.ActiveCall__resultSection {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
}

.ActiveCall__resultLabel {
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
}

.ActiveCall__resultBtns {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  width: 100%;
}

.ActiveCall__resultBtn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s ease;
  flex: 1;
  min-width: 100px;
  border: none;
}
.ActiveCall__resultBtn:hover {
  transform: translateY(-1px);
}

.ActiveCall__resultPaid {
  background: #22c55e;
  color: white;
}
.ActiveCall__resultPaid:hover {
  background: #16a34a;
}

.ActiveCall__resultWrong {
  background: transparent;
  color: #64748b;
  border: 1px solid #e2e8f0;
}
.ActiveCall__resultWrong:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.ActiveCall__resultProblem {
  background: transparent;
  color: #ef4444;
  border: 1px solid #ef4444;
}
.ActiveCall__resultProblem:hover {
  background: #fee2e2;
}

/* CallQueue */
.CallQueue__queue {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 0;
  overflow: hidden;
}

.CallQueue__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px 8px;
}

.CallQueue__headerLeft {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
}

.CallQueue__headerIcon {
  color: #22c55e;
}

.CallQueue__title {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}

.CallQueue__count {
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
}

.CallQueue__subtitle {
  font-size: 12px;
  color: #94a3b8;
  padding: 0 20px 14px;
}

.CallQueue__list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
}

.CallQueue__item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 14px;
  padding: 14px 20px;
  border-top: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}
.CallQueue__item:hover {
  background: #f8fafc;
}

.CallQueue__itemNumber {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  flex-shrink: 0;
}

.CallQueue__itemInfo {
  flex: 1;
  min-width: 0;
}

.CallQueue__itemTop {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.CallQueue__itemName {
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
}

.CallQueue__riskTag {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
}

.CallQueue__risk_high {
  color: #ef4444;
  background: #fee2e2;
}

.CallQueue__risk_medium {
  color: #f59e0b;
  background: #fef3c7;
}

.CallQueue__risk_low {
  color: #22c55e;
  background: #dcfce7;
}

.CallQueue__itemSub {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 3px;
}

.CallQueue__itemRight {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.CallQueue__itemDebt {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 1px;
}

.CallQueue__debtLabel {
  font-size: 11px;
  color: #94a3b8;
}

.CallQueue__debtValue {
  font-size: 14px;
  font-weight: 700;
  color: #ef4444;
}

.CallQueue__callBtn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 6px;
  background: #22c55e;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.CallQueue__callBtn:hover:not(:disabled) {
  background: #16a34a;
  transform: translateY(-1px);
}
.CallQueue__callBtn:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

/* Header */
.Header__header {
  height: 64px;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 50;
  gap: 16px;
}

.Header__search {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 8px 14px;
  flex: 1;
  max-width: 480px;
  transition: all 0.2s ease;
}
.Header__search:focus-within {
  border-color: #94a3b8;
  background: #ffffff;
}

.Header__searchInput {
  border: none;
  outline: none;
  background: transparent;
  font-size: 13.5px;
  color: #0f172a;
  width: 100%;
}
.Header__searchInput::placeholder {
  color: #94a3b8;
}

.Header__actions {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
}

.Header__langSelect {
  min-width: 70px;
}
.Header__langSelect .ant-select-selector {
  border-radius: 6px !important;
  font-size: 13px !important;
  font-weight: 600 !important;
}

.Header__notifBtn {
  position: relative;
  width: 38px;
  height: 38px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: transparent;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #64748b;
  transition: all 0.2s ease;
}
.Header__notifBtn:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.Header__badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 18px;
  height: 18px;
  background: #ef4444;
  color: white;
  font-size: 10px;
  font-weight: 700;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 2px solid white;
}

.Header__userWrapper {
  position: relative;
}

.Header__userInfo {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 10px;
  transition: all 0.2s ease;
}
.Header__userInfo:hover {
  background: #f1f5f9;
}

.Header__userInfoActive {
  background: #f1f5f9;
}

.Header__dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 200px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  z-index: 200;
  overflow: hidden;
  animation: dropdownIn 0.15s ease;
}

@keyframes dropdownIn {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.Header__dropdownHeader {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
}

.Header__dropdownAvatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #334155;
  color: white;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.Header__dropdownName {
  font-size: 13.5px;
  font-weight: 600;
  color: #0f172a;
}

.Header__dropdownRole {
  font-size: 11px;
  color: #94a3b8;
  margin-top: 1px;
}

.Header__dropdownDivider {
  height: 1px;
  background: #e2e8f0;
  margin: 0;
}

.Header__dropdownItem {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 11px 16px;
  background: transparent;
  border: none;
  font-size: 13.5px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}
.Header__dropdownItem:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.Header__dropdownItemDanger {
  color: #ef4444;
}
.Header__dropdownItemDanger:hover {
  background: rgba(239, 68, 68, 0.07);
  color: #ef4444;
}

.Header__avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #334155;
  color: white;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.Header__userDetails {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1px;
}

.Header__userName {
  font-size: 13.5px;
  font-weight: 600;
  color: #0f172a;
}

.Header__userRole {
  font-size: 11px;
  color: #94a3b8;
}

/* Sidebar */
.Sidebar__sidebar {
  width: 240px;
  min-width: 240px;
  height: 100vh;
  background: #1a2535;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  overflow: hidden;
}

.Sidebar__brand {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  padding: 20px 20px 24px;
  border-bottom: 1px solid #2a3650;
}

.Sidebar__brandIcon {
  width: 36px;
  height: 36px;
  background: rgba(34, 197, 94, 0.15);
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.Sidebar__brandName {
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
}

.Sidebar__brandSub {
  font-size: 11px;
  color: #94a3b8;
  margin-top: 2px;
}

.Sidebar__nav {
  flex: 1;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 4px;
  overflow-y: auto;
}

.Sidebar__navItem {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  color: #94a3b8;
  font-size: 13.5px;
  font-weight: 500;
  transition: all 0.2s ease;
  text-decoration: none;
}
.Sidebar__navItem:hover {
  background: #243048;
  color: #cbd5e1;
}
.Sidebar__navItem.Sidebar__active {
  background: #2d3a52;
  color: #ffffff;
}
.Sidebar__navItem.Sidebar__active .Sidebar__navIcon {
  color: #22c55e;
}

.Sidebar__navIcon {
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.Sidebar__footer {
  padding: 16px 20px;
  font-size: 11px;
  color: #2a3650;
  border-top: 1px solid #2a3650;
  text-align: center;
}

/* StatsPanel */
.StatsPanel__panel {
  width: 280px;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 20px;
}
@media (max-width: 767px) {
  .StatsPanel__panel {
    width: 100%;
    min-width: 0;
  }
}

.StatsPanel__section {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 14px;
}

.StatsPanel__sectionTitle {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.StatsPanel__totalRow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.StatsPanel__totalLabel {
  font-size: 13px;
  color: #64748b;
}

.StatsPanel__totalValue {
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
}

.StatsPanel__progressBar {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.StatsPanel__progressFill {
  height: 100%;
  background: #0f172a;
  border-radius: 4px;
  transition: width 0.6s ease;
}

.StatsPanel__statsList {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 10px;
}

.StatsPanel__statRow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #64748b;
}

.StatsPanel__statLeft {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
}

.StatsPanel__iconGreen {
  color: #22c55e;
}

.StatsPanel__iconRed {
  color: #ef4444;
}

.StatsPanel__iconGray {
  color: #94a3b8;
}

.StatsPanel__iconYellow {
  color: #f59e0b;
}

.StatsPanel__numGreen {
  font-weight: 700;
  color: #22c55e;
}

.StatsPanel__numRed {
  font-weight: 700;
  color: #ef4444;
}

.StatsPanel__numGray {
  font-weight: 700;
  color: #64748b;
}

.StatsPanel__efficiencyCard {
  background: #22c55e;
  border-radius: 8px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 12px;
}

.StatsPanel__efficiencyHeader {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  color: white;
  font-size: 13px;
  font-weight: 700;
}

.StatsPanel__efficiencyStats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.StatsPanel__effStat {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2px;
}

.StatsPanel__effValue {
  font-size: 16px;
  font-weight: 800;
  color: white;
}

.StatsPanel__effLabel {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.75);
}

.StatsPanel__aiCard {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 6px;
}

.StatsPanel__aiCardHeader {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
}

.StatsPanel__aiCardTitle {
  font-size: 12.5px;
  font-weight: 700;
  color: #0f172a;
}

.StatsPanel__aiCardDesc {
  font-size: 12px;
  color: #64748b;
  line-height: 1.5;
}

/* MainLayout */
.MainLayout__layout {
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.MainLayout__wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 240px;
  min-width: 0;
  overflow: hidden;
}

.MainLayout__main {
  flex: 1;
  overflow-y: auto;
  background: #f1f5f9;
}

/* AIAnalysis */
.AIAnalysis__page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 24px;
  padding: 28px;
}

.AIAnalysis__pageHeader {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
}

.AIAnalysis__pageTitle {
  font-size: 26px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.5px;
}

.AIAnalysis__pageSubtitle {
  font-size: 13.5px;
  color: #94a3b8;
  margin: 0;
}

.AIAnalysis__kpiGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
@media (min-width: 768px) and (max-width: 1023px) {
  .AIAnalysis__kpiGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 767px) {
  .AIAnalysis__kpiGrid {
    grid-template-columns: 1fr;
  }
}

.AIAnalysis__kpiCard {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 22px 20px 18px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  transition: all 0.2s ease;
}
.AIAnalysis__kpiCard:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.AIAnalysis__kpiIcon {
  width: 44px;
  height: 44px;
  border-radius: 11px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin-bottom: 4px;
}

.AIAnalysis__kpiValue {
  font-size: 28px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.5px;
  line-height: 1;
}

.AIAnalysis__kpiLabel {
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
}

.AIAnalysis__kpiSub {
  font-size: 11.5px;
  color: #94a3b8;
  line-height: 1.4;
}

.AIAnalysis__chartsRow {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
@media (max-width: 767px) {
  .AIAnalysis__chartsRow {
    grid-template-columns: 1fr;
  }
}

.AIAnalysis__chartCard {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 22px 24px;
}

.AIAnalysis__cardTitle {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.AIAnalysis__cardSub {
  font-size: 12px;
  color: #94a3b8;
  margin: 4px 0 0;
}

.AIAnalysis__pieWrap {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 12px 0 8px;
}

.AIAnalysis__piesvg {
  width: 100%;
  max-width: 240px;
  height: auto;
  display: block;
  overflow: visible;
}

.AIAnalysis__pieLegendRow {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 10px 0 14px;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 14px;
}

.AIAnalysis__legendChip {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #64748b;
}

.AIAnalysis__legendDot {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  display: inline-block;
  flex-shrink: 0;
}

.AIAnalysis__riskStats {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 10px;
}

.AIAnalysis__riskStatRow {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}

.AIAnalysis__riskDot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.AIAnalysis__riskStatLabel {
  flex: 1;
  font-size: 13px;
  color: #64748b;
}

.AIAnalysis__riskStatCount {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}

.AIAnalysis__barsvg {
  width: 100%;
  height: auto;
  display: block;
  margin: 12px 0 8px;
  overflow: visible;
}

.AIAnalysis__avgSection {
  border-top: 1px solid #e2e8f0;
  padding-top: 16px;
  margin-top: 8px;
}

.AIAnalysis__avgLabel {
  font-size: 12.5px;
  color: #94a3b8;
  margin-bottom: 4px;
}

.AIAnalysis__avgValue {
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 8px;
}

.AIAnalysis__avgTrack {
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
}

.AIAnalysis__avgFill {
  height: 100%;
  background: #0f172a;
  border-radius: 3px;
}

.AIAnalysis__priorityCard {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 22px 24px;
}

.AIAnalysis__priorityHeader {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 20px;
}
.AIAnalysis__priorityHeader svg {
  flex-shrink: 0;
  margin-top: 2px;
}

.AIAnalysis__priorityList {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 10px;
}

.AIAnalysis__priorityRow {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  background: #ef4444;
  border-radius: 10px;
  padding: 16px 20px;
  min-height: 68px;
  transition: all 0.2s ease;
}
.AIAnalysis__priorityRow:hover {
  background: #dc2626;
}

.AIAnalysis__priorityRank {
  font-size: 15px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.8);
  width: 22px;
  flex-shrink: 0;
}

.AIAnalysis__priorityInfo {
  flex: 1;
  min-width: 0;
}

.AIAnalysis__priorityName {
  font-size: 14px;
  font-weight: 700;
  color: white;
}

.AIAnalysis__priorityMeta {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.75);
  margin-top: 2px;
  font-family: "SF Mono", "Fira Code", monospace;
}

.AIAnalysis__priorityRight {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
}

.AIAnalysis__priorityQolgan {
  font-size: 10.5px;
  color: rgba(255, 255, 255, 0.7);
}

.AIAnalysis__recsCard {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 22px 24px;
}

.AIAnalysis__recsHeader {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}

.AIAnalysis__recsList {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 12px;
}

.AIAnalysis__recItem {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 18px;
  border-radius: 10px;
  border: 1px solid transparent;
  transition: all 0.2s ease;
}
.AIAnalysis__recItem:hover {
  transform: translateX(2px);
}

.AIAnalysis__recIcon {
  width: 38px;
  height: 38px;
  border-radius: 9px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin-top: 1px;
}

.AIAnalysis__recTitle {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
}

.AIAnalysis__recDesc {
  font-size: 12.5px;
  color: #64748b;
  line-height: 1.55;
}

/* CallCenter */
.CallCenter__page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 24px;
  padding: 28px 28px 40px;
  min-height: 100%;
}

.CallCenter__pageHeader {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
}

.CallCenter__pageTitle {
  font-size: 26px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}

.CallCenter__pageSubtitle {
  font-size: 14px;
  color: #94a3b8;
  margin: 0;
}

.CallCenter__content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 24px;
}
@media (max-width: 767px) {
  .CallCenter__content {
    flex-direction: column;
  }
}

.CallCenter__main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 20px;
}

/* CitizenDetails */
.CitizenDetails__page {
  padding: 28px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 18px;
}

.CitizenDetails__loading {
  padding: 96px;
  text-align: center;
}

.CitizenDetails__empty {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 48px;
  color: #94a3b8;
  text-align: center;
}

.CitizenDetails__heroCard,
.CitizenDetails__card {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 24px;
}

.CitizenDetails__heroCard {
  display: grid;
  grid-template-columns: minmax(280px, 1fr) 2fr;
  gap: 32px;
  align-items: center;
}

.CitizenDetails__identity {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 18px;
}
.CitizenDetails__identity h1 {
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 800;
  color: #0f172a;
}

.CitizenDetails__avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #17264a;
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: 800;
  flex-shrink: 0;
}

.CitizenDetails__badges {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
}

.CitizenDetails__status {
  color: #ef4444;
  font-size: 12px;
  font-weight: 600;
}

.CitizenDetails__category {
  padding: 3px 8px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
}

.CitizenDetails__heroGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(180px, 1fr));
  gap: 20px 32px;
}

.CitizenDetails__infoItem {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
}
.CitizenDetails__infoItem svg {
  color: #94a3b8;
  margin-top: 2px;
}
.CitizenDetails__infoItem span {
  display: block;
  color: #94a3b8;
  font-size: 12px;
  margin-bottom: 4px;
}
.CitizenDetails__infoItem strong {
  color: #0f172a;
  font-size: 14px;
}

.CitizenDetails__contentGrid {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(320px, 0.9fr);
  gap: 22px;
}

.CitizenDetails__mainColumn,
.CitizenDetails__sideColumn {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 22px;
}

.CitizenDetails__cardTitle {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 26px;
}

.CitizenDetails__financeGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
  margin-bottom: 24px;
}
.CitizenDetails__financeGrid span {
  display: block;
  color: #94a3b8;
  font-size: 12px;
  margin-bottom: 8px;
}
.CitizenDetails__financeGrid strong {
  color: #0f172a;
  font-size: 22px;
}

.CitizenDetails__red {
  color: #ef4444 !important;
}

.CitizenDetails__green {
  color: #16a34a !important;
}

.CitizenDetails__progressHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #64748b;
  font-size: 13px;
  margin-bottom: 8px;
}
.CitizenDetails__progressHeader strong {
  color: #0f172a;
}

.CitizenDetails__progressTrack {
  height: 12px;
  border-radius: 999px;
  background: #d9dbe1;
  overflow: hidden;
  margin-bottom: 24px;
}

.CitizenDetails__progressFill {
  height: 100%;
  background: #111827;
}

.CitizenDetails__moneyRows {
  border-top: 1px solid #e2e8f0;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 22px;
}
.CitizenDetails__moneyRows div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}
.CitizenDetails__moneyRows span {
  color: #64748b;
  font-size: 13px;
}
.CitizenDetails__moneyRows strong {
  color: #0f172a;
}

.CitizenDetails__timeline {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
}

.CitizenDetails__timelineItem {
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr) auto;
  gap: 14px;
  padding: 16px 0;
  border-bottom: 1px solid #e2e8f0;
}
.CitizenDetails__timelineItem:last-child {
  border-bottom: none;
}
.CitizenDetails__timelineItem strong {
  display: block;
  color: #0f172a;
  margin-bottom: 6px;
}
.CitizenDetails__timelineItem p {
  margin: 0;
  color: #64748b;
  font-size: 13px;
  line-height: 1.45;
}
.CitizenDetails__timelineItem time {
  color: #94a3b8;
  font-size: 12px;
}

.CitizenDetails__timelineIcon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #64748b;
}

.CitizenDetails__muted {
  color: #94a3b8;
  font-size: 12px;
}

.CitizenDetails__donutWrap {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 18px 0 24px;
}

.CitizenDetails__donut {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.CitizenDetails__donut div {
  width: 78px;
  height: 78px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
}

.CitizenDetails__sideDivider {
  height: 1px;
  background: #e2e8f0;
  margin: 8px 0 20px;
}

.CitizenDetails__riskRow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.CitizenDetails__riskRow span {
  color: #64748b;
  font-size: 13px;
}
.CitizenDetails__riskRow strong {
  color: #ef4444;
  font-size: 12px;
}

.CitizenDetails__callButton,
.CitizenDetails__smsButton {
  width: 100%;
  height: 36px;
  border-radius: 7px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  cursor: pointer;
}

.CitizenDetails__callButton {
  border: none;
  background: #2fb463;
  color: #fff;
  margin-bottom: 8px;
}

.CitizenDetails__smsButton {
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #0f172a;
}

.CitizenDetails__statRows {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 16px;
}
.CitizenDetails__statRows div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}
.CitizenDetails__statRows span {
  color: #64748b;
  font-size: 13px;
}
.CitizenDetails__statRows strong {
  color: #0f172a;
}

@media (max-width: 1100px) {
  .CitizenDetails__heroCard,
  .CitizenDetails__contentGrid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 720px) {
  .CitizenDetails__page {
    padding: 18px;
  }
  .CitizenDetails__heroGrid,
  .CitizenDetails__financeGrid {
    grid-template-columns: 1fr;
  }
  .CitizenDetails__timelineItem {
    grid-template-columns: 36px minmax(0, 1fr);
  }
  .CitizenDetails__timelineItem time {
    grid-column: 2;
  }
}

/* Citizens */
.Citizens__page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 20px;
  padding: 28px;
}

.Citizens__pageHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 12px;
}

.Citizens__pageTitle {
  font-size: 26px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.5px;
}

.Citizens__pageSubtitle {
  font-size: 13.5px;
  color: #94a3b8;
  margin: 4px 0 0;
}

.Citizens__headerKpi {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.Citizens__kpiPill {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  color: #64748b;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 6px 12px;
  border-radius: 20px;
}
.Citizens__addBtn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 7px;
  padding: 9px 18px;
  background: #0f172a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.Citizens__addBtn:hover {
  background: #334155;
  transform: translateY(-1px);
}
.Citizens__kpiPill strong {
  color: #0f172a;
}

.Citizens__kpiRed {
  color: #ef4444;
  background: #fee2e2;
  border-color: rgba(239, 68, 68, 0.25);
}
.Citizens__kpiRed strong {
  color: #ef4444;
}

.Citizens__filterPanel {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 14px;
}

.Citizens__filterTitle {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}

.Citizens__filterRow {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.Citizens__searchBox {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 9px 14px;
  flex: 1;
  min-width: 260px;
  transition: all 0.2s ease;
}
.Citizens__searchBox:focus-within {
  border-color: #94a3b8;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.12);
}

.Citizens__searchInput {
  border: none;
  outline: none;
  font-size: 13px;
  color: #0f172a;
  background: transparent;
  width: 100%;
}
.Citizens__searchInput::placeholder {
  color: #94a3b8;
}

.Citizens__clearSearch {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  padding: 0 2px;
}
.Citizens__clearSearch:hover {
  color: #0f172a;
}

.Citizens__filterSelect {
  min-width: 180px !important;
}
.Citizens__filterSelect .ant-select-selector {
  height: 38px !important;
  border-radius: 8px !important;
  font-size: 13px !important;
  border-color: #e2e8f0 !important;
  background: #f1f5f9 !important;
}

.Citizens__filterMeta {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #94a3b8;
  padding-top: 2px;
}
.Citizens__filterMeta strong {
  color: #0f172a;
}

.Citizens__sortBtn {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 7px;
  background: #ffffff;
  color: #64748b;
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.Citizens__sortBtn:hover {
  border-color: #94a3b8;
  color: #0f172a;
}

.Citizens__tableWrap {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  overflow-x: auto;
}

.Citizens__table {
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
}
.Citizens__table th {
  text-align: left;
  padding: 11px 16px;
  font-size: 11.5px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  white-space: nowrap;
}
.Citizens__table td {
  padding: 13px 16px;
  font-size: 13px;
  color: #64748b;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: middle;
}

.Citizens__thRight {
  text-align: right !important;
}

.Citizens__thJshshir {
  min-width: 120px;
}

.Citizens__row {
  transition: background 0.15s ease;
}
.Citizens__row:hover td {
  background: #f8fafc;
}
.Citizens__row:last-child td {
  border-bottom: none;
}

.Citizens__jshshir {
  font-family: "SF Mono", "Fira Code", monospace;
  font-size: 12px !important;
  color: #94a3b8 !important;
  letter-spacing: 0.3px;
}

.Citizens__nameCell {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
}

.Citizens__fullName {
  font-size: 13.5px;
  font-weight: 700;
  color: #0f172a;
}

.Citizens__categoryTag {
  font-size: 10.5px;
  font-weight: 500;
  color: #64748b;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  padding: 2px 8px;
  border-radius: 4px;
}

.Citizens__regionCell {
  color: #3b82f6 !important;
  font-weight: 500;
}

.Citizens__phoneCell {
  font-size: 12.5px !important;
  letter-spacing: 0.2px;
  white-space: nowrap;
}

.Citizens__debtCell {
  text-align: right;
  font-weight: 700 !important;
  color: #0f172a !important;
  white-space: nowrap;
}

.Citizens__balanceCell {
  text-align: right;
  white-space: nowrap;
  font-weight: 600 !important;
}

.Citizens__zeroBal {
  color: #22c55e;
  font-weight: 700;
}

.Citizens__redBal {
  color: #ef4444;
  font-weight: 600;
}

.Citizens__statusTag {
  display: inline-block;
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  white-space: nowrap;
}

.Citizens__statusActive {
  background: #dbeafe;
  color: #2563eb;
}

.Citizens__statusProblem {
  background: #fee2e2;
  color: #ef4444;
}

.Citizens__statusPaid {
  background: #dcfce7;
  color: #16a34a;
}

.Citizens__statusOverdue {
  background: #fef3c7;
  color: #b45309;
}

.Citizens__riskTag {
  display: inline-block;
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
}

.Citizens__riskHigh {
  background: #fee2e2;
  color: #ef4444;
}

.Citizens__riskMedium {
  background: #fef3c7;
  color: #b45309;
}

.Citizens__riskLow {
  background: #dcfce7;
  color: #16a34a;
}

.Citizens__actionBtns {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
}
.Citizens__editBtn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 7px;
  background: #f8fafc;
  color: #334155;
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}
.Citizens__editBtn:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}
.Citizens__queueBtn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border: 1px solid #dcfce7;
  border-radius: 7px;
  background: #f0fdf4;
  color: #16a34a;
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}
.Citizens__queueBtn:hover {
  background: #dcfce7;
  border-color: #bdf8d4;
}
.Citizens__viewBtn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 7px;
  background: #ffffff;
  color: #64748b;
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}
.Citizens__viewBtn:hover {
  background: #0f172a;
  color: white;
  border-color: #0f172a;
}

.Citizens__empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 60px 20px;
  color: #94a3b8;
  font-size: 14px;
}

.Citizens__pagination {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  flex-wrap: wrap;
  gap: 10px;
}

.Citizens__pageInfo {
  font-size: 12.5px;
  color: #94a3b8;
}

.Citizens__pageButtons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
}

.Citizens__pageBtn {
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid #e2e8f0;
  border-radius: 7px;
  background: #ffffff;
  color: #64748b;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
}
.Citizens__pageBtn:hover:not(:disabled) {
  border-color: #94a3b8;
  color: #0f172a;
}
.Citizens__pageBtn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.Citizens__pageBtnActive {
  background: #0f172a;
  border-color: #0f172a;
  color: white;
}
.Citizens__pageBtnActive:hover {
  background: #1e293b;
  border-color: #1e293b;
  color: white;
}

/* Dashboard */
.Dashboard__page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 24px;
  padding: 28px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.Dashboard__pageHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 12px;
}

.Dashboard__pageTitle {
  font-size: 26px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.5px;
}

.Dashboard__pageSubtitle {
  font-size: 13.5px;
  color: #94a3b8;
  margin: 4px 0 0;
}

.Dashboard__headerMeta {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.Dashboard__liveTag {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #16a34a;
  background: #dcfce7;
  padding: 5px 10px;
  border-radius: 20px;
}

.Dashboard__liveDot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  animation: pulse 1.8s ease infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.85);
  }
}
.Dashboard__dateBadge {
  font-size: 12px;
  color: #64748b;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  padding: 5px 10px;
  border-radius: 20px;
}

.Dashboard__kpiGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
@media (min-width: 768px) and (max-width: 1023px) {
  .Dashboard__kpiGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 767px) {
  .Dashboard__kpiGrid {
    grid-template-columns: 1fr;
  }
}

.Dashboard__kpiCard {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 20px 20px 14px;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;
}
.Dashboard__kpiCard:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.Dashboard__kpi_green {
  border-top: 3px solid #22c55e;
}

.Dashboard__kpi_blue {
  border-top: 3px solid #3b82f6;
}

.Dashboard__kpi_orange {
  border-top: 3px solid #f97316;
}

.Dashboard__kpi_teal {
  border-top: 3px solid #0ea5e9;
}

.Dashboard__kpiTop {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.Dashboard__kpiIconWrap {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  background: #f1f5f9;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #64748b;
}

.Dashboard__kpi_green .Dashboard__kpiIconWrap {
  background: #dcfce7;
  color: #16a34a;
}

.Dashboard__kpi_blue .Dashboard__kpiIconWrap {
  background: #dbeafe;
  color: #2563eb;
}

.Dashboard__kpi_orange .Dashboard__kpiIconWrap {
  background: #fff7ed;
  color: #ea580c;
}

.Dashboard__kpi_teal .Dashboard__kpiIconWrap {
  background: #e0f2fe;
  color: #0369a1;
}

.Dashboard__kpiBadge {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 2px;
  font-size: 11.5px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 12px;
}

.Dashboard__badgeUp {
  background: #dcfce7;
  color: #16a34a;
}

.Dashboard__badgeDown {
  background: #fee2e2;
  color: #ef4444;
}

.Dashboard__kpiValue {
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.5px;
  line-height: 1.1;
}

.Dashboard__kpiLabel {
  font-size: 12.5px;
  font-weight: 600;
  color: #64748b;
  margin-top: 4px;
}

.Dashboard__kpiSub {
  font-size: 11px;
  color: #94a3b8;
  margin-top: 2px;
  margin-bottom: 10px;
}

.Dashboard__sparkline {
  width: 100%;
  height: 36px;
  display: block;
}

.Dashboard__chartsRow {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
@media (max-width: 767px) {
  .Dashboard__chartsRow {
    grid-template-columns: 1fr;
  }
}

.Dashboard__chartCard {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 20px;
  overflow: hidden;
}

.Dashboard__chartHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.Dashboard__cardTitle {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.Dashboard__cardSub {
  font-size: 12px;
  color: #94a3b8;
  margin: 3px 0 0;
}

.Dashboard__cardHeaderRow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.Dashboard__chartLegend {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
}

.Dashboard__legendItem {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  color: #64748b;
}

.Dashboard__legendDotDark {
  width: 10px;
  height: 3px;
  border-radius: 2px;
  background: #1e293b;
  display: inline-block;
}

.Dashboard__legendDotGreen {
  width: 10px;
  height: 3px;
  border-radius: 2px;
  background: #22c55e;
  display: inline-block;
}

.Dashboard__zoneLegend {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  flex-shrink: 0;
}

.Dashboard__zoneItem {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: #64748b;
}

.Dashboard__zoneDot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.Dashboard__lineChart {
  width: 100%;
  height: auto;
  display: block;
  overflow: visible;
}

.Dashboard__barChart {
  width: 100%;
  height: auto;
  display: block;
  overflow: visible;
}

.Dashboard__bottomRow {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 20px;
}
@media (max-width: 767px) {
  .Dashboard__bottomRow {
    grid-template-columns: 1fr;
  }
}

.Dashboard__activityCard {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 20px;
}

.Dashboard__viewAll {
  font-size: 12px;
  font-weight: 600;
  color: #16a34a;
  background: #dcfce7;
  border: none;
  padding: 5px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.Dashboard__viewAll:hover {
  background: #c8f7d6;
}

.Dashboard__activityList {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 0;
}

.Dashboard__activityItem {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  padding: 11px 0;
  border-bottom: 1px solid #e2e8f0;
}
.Dashboard__activityItem:last-child {
  border-bottom: none;
}

.Dashboard__activityAvatar {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.Dashboard__statusCall {
  background: #dcfce7;
  color: #16a34a;
}

.Dashboard__statusPaid {
  background: #dbeafe;
  color: #2563eb;
}

.Dashboard__statusMiss {
  background: #f1f5f9;
  color: #94a3b8;
}

.Dashboard__statusProblem {
  background: #fee2e2;
  color: #ef4444;
}

.Dashboard__activityContent {
  flex: 1;
  min-width: 0;
}

.Dashboard__activityName {
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.Dashboard__activityAction {
  font-size: 11.5px;
  color: #94a3b8;
  margin-top: 2px;
}

.Dashboard__activityTimePill {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  font-size: 10.5px;
  color: #94a3b8;
  white-space: nowrap;
  background: #f1f5f9;
  padding: 3px 7px;
  border-radius: 10px;
  flex-shrink: 0;
}

.Dashboard__goalCard {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 20px;
}

.Dashboard__goalPctBadge {
  font-size: 13px;
  font-weight: 800;
  color: #16a34a;
  background: #dcfce7;
  padding: 4px 10px;
  border-radius: 20px;
}

.Dashboard__goalNumbers {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 12px;
}

.Dashboard__goalCurrent {
  font-size: 24px;
  font-weight: 800;
  color: #0f172a;
}

.Dashboard__goalSep {
  font-size: 16px;
  color: #94a3b8;
}

.Dashboard__goalTarget {
  font-size: 14px;
  color: #94a3b8;
  font-weight: 500;
}

.Dashboard__goalTrack {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.Dashboard__goalFill {
  height: 100%;
  background: linear-gradient(90deg, #16a34a, #22c55e);
  border-radius: 4px;
  transition: width 0.8s ease;
}

.Dashboard__goalSubLine {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  font-size: 11.5px;
  color: #94a3b8;
  margin-bottom: 20px;
}

.Dashboard__goalStats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  border-top: 1px solid #e2e8f0;
  padding-top: 16px;
  margin-bottom: 20px;
}

.Dashboard__gsStat {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  text-align: center;
}

.Dashboard__gsIcon {
  width: 28px;
  height: 28px;
  border-radius: 7px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 4px;
}

.Dashboard__gsGreen {
  background: #dcfce7;
  color: #16a34a;
}

.Dashboard__gsRed {
  background: #fee2e2;
  color: #ef4444;
}

.Dashboard__gsGray {
  background: #f1f5f9;
  color: #94a3b8;
}

.Dashboard__gsValue {
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
}

.Dashboard__gsLabel {
  font-size: 10.5px;
  color: #94a3b8;
  text-align: center;
}

.Dashboard__operatorSection {
  border-top: 1px solid #e2e8f0;
  padding-top: 16px;
}

.Dashboard__opRow {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.Dashboard__opRow:last-child {
  margin-bottom: 0;
}

.Dashboard__opAvatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #334155;
  color: white;
  font-size: 10px;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.Dashboard__opInfo {
  flex: 1;
  min-width: 0;
}

.Dashboard__opName {
  font-size: 12px;
  font-weight: 600;
  color: #0f172a;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 4px;
}

.Dashboard__opBar {
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  overflow: hidden;
}

.Dashboard__opFill {
  height: 100%;
  background: #22c55e;
  border-radius: 2px;
}

.Dashboard__opPct {
  font-size: 11.5px;
  font-weight: 700;
  color: #16a34a;
  flex-shrink: 0;
}

.Dashboard__regionSection {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 24px;
}

.Dashboard__regionGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-top: 4px;
}
@media (min-width: 768px) and (max-width: 1023px) {
  .Dashboard__regionGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 767px) {
  .Dashboard__regionGrid {
    grid-template-columns: 1fr;
  }
}

.Dashboard__regionCard {
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  padding: 14px;
  transition: all 0.2s ease;
  cursor: default;
}
.Dashboard__regionCard:hover {
  transform: translateY(-2px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.Dashboard__region_red {
  border-color: rgba(239, 68, 68, 0.35);
  background: rgba(239, 68, 68, 0.03);
}

.Dashboard__region_orange {
  border-color: rgba(249, 115, 22, 0.35);
  background: rgba(249, 115, 22, 0.03);
}

.Dashboard__region_green {
  border-color: rgba(34, 197, 94, 0.35);
  background: rgba(34, 197, 94, 0.03);
}

.Dashboard__regionHeader {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
}

.Dashboard__regionName {
  font-size: 13.5px;
  font-weight: 700;
  color: #0f172a;
}

.Dashboard__regionBody {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 4px;
  margin-bottom: 10px;
}

.Dashboard__regionRow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.Dashboard__regionKey {
  font-size: 11.5px;
  color: #94a3b8;
}

.Dashboard__regionVal {
  font-size: 13px;
  font-weight: 700;
}

.Dashboard__regionDebtors {
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
}

.Dashboard__regionBarTrack {
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  overflow: hidden;
}

.Dashboard__regionBarFill {
  height: 100%;
  border-radius: 2px;
  opacity: 0.75;
  transition: width 0.6s ease;
}

/* Login */
.Login__page {
  min-height: 100vh;
  background: #f1f5f9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
}

.Login__container {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 24px;
}

.Login__brand {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.Login__brandIcon {
  width: 44px;
  height: 44px;
  background: rgba(34, 197, 94, 0.12);
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.Login__brandName {
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
}

.Login__brandSub {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 1px;
}

.Login__card {
  border-radius: 12px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}
.Login__card .ant-card-body {
  padding: 32px !important;
}

.Login__title {
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 6px;
  text-align: center;
}

.Login__subtitle {
  font-size: 13.5px;
  color: #94a3b8;
  text-align: center;
  margin: 0 0 28px;
}

.Login__form .ant-form-item-label > label {
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
}
.Login__form .ant-form-item {
  margin-bottom: 18px;
}

.Login__input {
  border-radius: 8px !important;
}

.Login__submitItem {
  margin-bottom: 0 !important;
  margin-top: 8px;
}

.Login__submitBtn {
  height: 44px !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  border-radius: 8px !important;
  background: #22c55e !important;
  border-color: #22c55e !important;
}
.Login__submitBtn:hover {
  background: #16a34a !important;
  border-color: #16a34a !important;
}

.Login__footer {
  text-align: center;
  font-size: 12px;
  color: #94a3b8;
  margin: 0;
}

.Login__hint {
  text-align: center;
  font-size: 12px;
  color: #94a3b8;
  margin: 16px 0 0;
  padding: 10px 12px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px dashed #e2e8f0;
}

/* Reports */
.Reports__page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 24px;
  padding: 28px;
}

.Reports__pageHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
}

.Reports__pageTitle {
  font-size: 26px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.5px;
}

.Reports__pageSubtitle {
  font-size: 13.5px;
  color: #94a3b8;
  margin: 4px 0 0;
}

.Reports__headerActions {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}

.Reports__dateBtn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 7px;
  padding: 9px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #ffffff;
  color: #64748b;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.Reports__dateBtn:hover {
  border-color: #94a3b8;
  color: #0f172a;
}

.Reports__exportBtn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 7px;
  padding: 9px 18px;
  border: none;
  border-radius: 8px;
  background: #22c55e;
  color: white;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.Reports__exportBtn:hover {
  background: #16a34a;
}

.Reports__kpiGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
@media (min-width: 768px) and (max-width: 1023px) {
  .Reports__kpiGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 767px) {
  .Reports__kpiGrid {
    grid-template-columns: 1fr;
  }
}

.Reports__kpiCard {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 6px;
  transition: all 0.2s ease;
}
.Reports__kpiCard:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.Reports__kpiTop {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 4px;
}

.Reports__kpiIcon {
  width: 44px;
  height: 44px;
  border-radius: 11px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.Reports__kpiLabel {
  font-size: 12.5px;
  color: #94a3b8;
}

.Reports__kpiValue {
  font-size: 26px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.5px;
  line-height: 1.1;
}

.Reports__kpiDelta {
  font-size: 12px;
  font-weight: 500;
}

.Reports__deltaUp {
  color: #22c55e;
}

.Reports__deltaDown {
  color: #ef4444;
}

.Reports__cardTitle {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.Reports__cardSub {
  font-size: 12px;
  color: #94a3b8;
  margin: 3px 0 0;
}

.Reports__statusCard {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 22px 24px;
}

.Reports__statusGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-top: 18px;
}
@media (min-width: 768px) and (max-width: 1023px) {
  .Reports__statusGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 767px) {
  .Reports__statusGrid {
    grid-template-columns: 1fr;
  }
}

.Reports__statusItem {
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 8px;
}

.Reports__statusRow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.Reports__statusLabel {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}

.Reports__statusBadge {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: 800;
  flex-shrink: 0;
}

.Reports__statusFoiz {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 12.5px;
  color: #94a3b8;
}

.Reports__statusTrack {
  height: 5px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
}

.Reports__statusFill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.6s ease;
}

.Reports__chartsRow {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
@media (max-width: 767px) {
  .Reports__chartsRow {
    grid-template-columns: 1fr;
  }
}

.Reports__chartCard {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 22px 24px;
  overflow: hidden;
}

.Reports__linesvg {
  width: 100%;
  height: auto;
  display: block;
  margin: 16px 0 8px;
  overflow: visible;
}

.Reports__hbarsvg {
  width: 100%;
  height: auto;
  display: block;
  margin: 16px 0 0;
  overflow: visible;
}

.Reports__lineLegend {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding-top: 10px;
  border-top: 1px solid #e2e8f0;
}

.Reports__legendItem {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #64748b;
}

.Reports__legendLine {
  width: 24px;
  height: 3px;
  border-radius: 2px;
  display: inline-block;
}

.Reports__tableCard {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.Reports__tableHeader {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 18px 22px 16px;
  border-bottom: 1px solid #e2e8f0;
}

.Reports__tableWrap {
  overflow-x: auto;
}

.Reports__table {
  width: 100%;
  border-collapse: collapse;
  min-width: 640px;
}
.Reports__table th {
  text-align: left;
  padding: 11px 20px;
  font-size: 11.5px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  white-space: nowrap;
}
.Reports__table td {
  padding: 15px 20px;
  font-size: 13.5px;
  color: #64748b;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: middle;
}

.Reports__thRight {
  text-align: right !important;
}

.Reports__tdRight {
  text-align: right !important;
}

.Reports__row {
  transition: background 0.15s ease;
}
.Reports__row:hover td {
  background: #f8fafc;
}
.Reports__row:last-child td {
  border-bottom: none;
}

.Reports__regionName {
  font-size: 14px !important;
  font-weight: 700 !important;
  color: #0f172a !important;
}

.Reports__debtPct {
  color: #ef4444 !important;
  font-weight: 700 !important;
}

.Reports__ratePct {
  color: #22c55e !important;
  font-weight: 700 !important;
}

.Reports__statusBadgeTable {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
}

.Reports__sHigh {
  color: #ef4444;
  background: #fee2e2;
}

.Reports__sMid {
  color: #b45309;
  background: #fef3c7;
}

.Reports__sGood {
  color: #16a34a;
  background: #dcfce7;
}

.Reports__exportCard {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 22px 24px;
}

.Reports__exportHeader {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}

.Reports__exportBtns {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.Reports__exportFormatBtn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 7px;
  padding: 9px 18px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #ffffff;
  color: #64748b;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.Reports__exportFormatBtn:hover {
  background: #0f172a;
  color: white;
  border-color: #0f172a;
}

/* Users */
.Users__page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 24px;
  padding: 28px;
}

.Users__pageHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
}

.Users__pageTitle {
  font-size: 26px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.5px;
}

.Users__pageSubtitle {
  font-size: 13.5px;
  color: #94a3b8;
  margin: 4px 0 0;
}

.Users__kpiGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
@media (min-width: 768px) and (max-width: 1023px) {
  .Users__kpiGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 767px) {
  .Users__kpiGrid {
    grid-template-columns: 1fr;
  }
}

.Users__kpiCard {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 20px 22px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  transition: all 0.2s ease;
}
.Users__kpiCard:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.Users__kpiLeft {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 6px;
}

.Users__kpiLabel {
  font-size: 12.5px;
  color: #94a3b8;
  font-weight: 500;
}

.Users__kpiValue {
  font-size: 28px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.5px;
  line-height: 1;
}

.Users__kpiIcon {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.Users__tableCard {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.Users__tableHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 18px 22px 16px;
  border-bottom: 1px solid #e2e8f0;
}

.Users__tableTitle {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.Users__addBtn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 7px;
  padding: 9px 18px;
  background: #0f172a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.Users__addBtn:hover {
  background: #334155;
}

.Users__tableWrap {
  overflow-x: auto;
}

.Users__table {
  width: 100%;
  border-collapse: collapse;
  min-width: 820px;
}
.Users__table th {
  text-align: left;
  padding: 11px 18px;
  font-size: 11.5px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  white-space: nowrap;
}
.Users__table td {
  padding: 14px 18px;
  font-size: 13px;
  color: #64748b;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: middle;
}

.Users__row {
  transition: background 0.15s ease;
}
.Users__row:hover td {
  background: #f8fafc;
}
.Users__row:last-child td {
  border-bottom: none;
}

.Users__userCell {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
}

.Users__avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #334155;
  color: white;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.Users__userName {
  font-size: 13.5px;
  font-weight: 700;
  color: #0f172a;
}

.Users__userEmail {
  font-size: 11.5px;
  color: #94a3b8;
  margin-top: 2px;
}

.Users__roleBadge {
  display: inline-block;
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
}

.Users__roleAdmin {
  background: #f3e8ff;
  color: #7c3aed;
}

.Users__roleManager {
  background: #dbeafe;
  color: #2563eb;
}

.Users__roleOperator {
  background: #dcfce7;
  color: #16a34a;
}

.Users__roleAnalyst {
  background: #fef3c7;
  color: #d97706;
}

.Users__regionCell {
  color: #64748b !important;
  font-size: 13px !important;
}

.Users__statusToggleBtn {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.Users__activeLabel {
  font-size: 13px;
  font-weight: 600;
  color: #16a34a;
}

.Users__inactiveLabel {
  font-size: 13px;
  font-weight: 600;
  color: #94a3b8;
}

.Users__toggle {
  width: 40px;
  height: 22px;
  border-radius: 11px;
  position: relative;
  flex-shrink: 0;
  transition: background 0.2s ease;
}

.Users__toggleOn {
  background: #0f172a;
}

.Users__toggleOff {
  background: #cbd5e1;
}

.Users__toggleThumb {
  position: absolute;
  top: 3px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  transition: left 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.Users__toggleOn .Users__toggleThumb {
  left: 21px;
}

.Users__toggleOff .Users__toggleThumb {
  left: 3px;
}

.Users__permsRow {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.Users__permChip {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 500;
  color: #64748b;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  padding: 3px 9px;
  border-radius: 6px;
  white-space: nowrap;
}

.Users__editBtn {
  padding: 6px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 7px;
  background: #ffffff;
  color: #64748b;
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}
.Users__editBtn:hover {
  background: #0f172a;
  color: white;
  border-color: #0f172a;
}

.Users__matrixCard {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 22px 24px;
}

.Users__matrixHeader {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 20px;
}
.Users__matrixHeader svg {
  flex-shrink: 0;
  margin-top: 2px;
}

.Users__matrixSub {
  font-size: 12px;
  color: #94a3b8;
  margin: 3px 0 0;
}

.Users__matrixWrap {
  overflow-x: auto;
}

.Users__matrixTable {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}
.Users__matrixTable th {
  padding: 10px 16px;
  font-size: 11px;
  font-weight: 600;
  color: #94a3b8;
  text-align: center;
  border-bottom: 1px solid #e2e8f0;
}
.Users__matrixTable td {
  padding: 14px 16px;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: middle;
}

.Users__matrixUserCol {
  text-align: left !important;
  min-width: 200px;
}

.Users__matrixPermCol {
  min-width: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
}
.Users__matrixPermCol span {
  display: block;
  margin-top: 4px;
}

.Users__matrixRow:last-child td {
  border-bottom: none;
}
.Users__matrixRow:hover td {
  background: #f8fafc;
}
.Users__matrixRow {
  transition: background 0.15s ease;
}

.Users__matrixNameCell {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px;
}

.Users__mName {
  font-size: 13.5px;
  font-weight: 700;
  color: #0f172a;
}

.Users__matrixToggleCell {
  text-align: center;
}
.Users__matrixToggleCell .Users__toggle {
  display: inline-flex;
}
.ActiveCall__resultGray { background: #f1f5f9; color: #64748b; border: 1px solid #e2e8f0; } .ActiveCall__resultGray:hover { background: #e2e8f0; color: #0f172a; }

.StatsPanel__iconYellow { color: #f59e0b; } .StatsPanel__numYellow { color: #f59e0b; font-weight: 700; font-size: 15px; }

.AIAnalysis__aiChatCard { background: white; border-radius: 12px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; padding: 24px; display: flex; flex-direction: column; gap: 16px; margin-top: 24px; }
.AIAnalysis__aiChatTitleRow { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.AIAnalysis__aiChatInput { width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1; outline: none; font-family: inherit; font-size: 14px; min-height: 100px; resize: vertical; }
.AIAnalysis__aiChatInput:focus { border-color: #3b82f6; box-shadow: 0 0 0 1px #3b82f6; }
.AIAnalysis__aiChatButton { padding: 8px 16px; background: #2563eb; color: white; font-weight: 500; border-radius: 8px; transition: background 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; width: max-content; border: none; cursor: pointer; }
.AIAnalysis__aiChatButton:hover { background: #1d4ed8; }
.AIAnalysis__aiChatButton:disabled { background: #93c5fd; cursor: not-allowed; }
.AIAnalysis__aiChatOutput { margin-top: 8px; padding: 16px; background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 8px; white-space: pre-wrap; font-size: 14px; color: #334155; }

/* CallQueue */
.CallQueue__emptyQueue {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 40px 16px;
  text-align: center;
  color: #94a3b8;
  font-size: 14px;
  font-weight: 500;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
  margin: 12px 0;
  user-select: none;
}

`;