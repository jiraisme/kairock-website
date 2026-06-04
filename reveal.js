/* KaiRock — 極簡淡入上浮 scroll reveal
   在 <head> 同步載入：先加 .has-reveal 讓目標區塊在首次繪製即隱藏（避免閃爍），
   待 DOM 就緒後用 IntersectionObserver 於進場時淡入。 */
(function () {
  var html = document.documentElement;

  // 不支援 IO 或使用者偏好減少動態 → 完全不啟用，內容維持正常顯示
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;

  var LIST = '.sec-hdr,.sec-label,.svc-intro,.svc-cta-h,.values-hdr,.t-hdr,.proc-hdr,.about-wrap,.view-all,.intro-p,.founder-p,.stat-box-l,.svc-card,.pcard-wrap,.v-card,.svc-item,.detail-block,.pg-card,.pstep,.tc,.c-blk,.fg';

  // 在 body 解析前就加上 class，使對應 CSS 立即生效（首屏即隱藏，無 FOUC）
  html.classList.add('has-reveal');

  function init() {
    var els = document.querySelectorAll(LIST);

    // 同一父層內的元素加上漸進延遲，形成輕微錯落
    var seen = new Map();
    els.forEach(function (el) {
      var p = el.parentNode;
      var i = seen.get(p) || 0;
      el.style.transitionDelay = (Math.min(i, 6) * 0.07) + 's';
      seen.set(p, i + 1);
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    els.forEach(function (el) { io.observe(el); });
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
