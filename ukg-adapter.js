/* ukg-adapter.js
   Couche d’intégration future. Elle ne modifie pas la matrice d’attribution actuelle.
   Le navigateur appelle uniquement votre proxy sécurisé, jamais UKG directement.
*/
(function () {
  async function fetchLiveSchedule({ weekStart, signal } = {}) {
    const cfg = window.UKG_CONFIG || {};
    if (!cfg.enabled || !cfg.proxyUrl) return { enabled: false, rows: [], fetchedAt: null };
    const url = new URL(cfg.proxyUrl, window.location.href);
    if (weekStart) url.searchParams.set('weekStart', weekStart);
    const response = await fetch(url, { signal, headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`UKG proxy HTTP ${response.status}`);
    const payload = await response.json();
    return { enabled: true, rows: payload.rows || payload.data || [], fetchedAt: payload.fetchedAt || new Date().toISOString(), source: cfg.sourceName };
  }
  window.UKGAdapter = { fetchLiveSchedule };
})();
