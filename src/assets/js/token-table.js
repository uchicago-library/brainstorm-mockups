// Progressive enhancement for the generated token tables.
// Without JS the tables still render and every value is readable; this only
// adds click-to-copy and live filtering on top.

(function () {
  "use strict";

  var COPIED_CLASS = "token-table__copy--copied";
  var FILTERED_CLASS = "token-table__row--filtered";
  var FEEDBACK_MS = 1200;

  // One delegated listener rather than a handler per cell: the tables are
  // large, and rows sit inside tab panels that are parsed up front.
  document.addEventListener("click", function (event) {
    var trigger = event.target.closest("[data-copy]");
    if (!trigger || !navigator.clipboard) return;

    navigator.clipboard.writeText(trigger.dataset.copy).then(function () {
      var previous = trigger.getAttribute("aria-label");
      trigger.classList.add(COPIED_CLASS);
      trigger.setAttribute("aria-label", trigger.dataset.copy + " copied");
      window.setTimeout(function () {
        trigger.classList.remove(COPIED_CLASS);
        if (previous) {
          trigger.setAttribute("aria-label", previous);
        } else {
          trigger.removeAttribute("aria-label");
        }
      }, FEEDBACK_MS);
    });
  });

  // Remember which tab was last open. Someone cross-referencing tokens against
  // their own stylesheet reloads this page repeatedly, and landing back on the
  // first tab every time is a small tax on exactly that use.
  var TAB_KEY = "ucl-ds.token-tables.tab";

  // localStorage throws rather than returning null when storage is blocked, so
  // both directions are guarded and simply do nothing on failure.
  function readStoredTab() {
    try {
      return window.localStorage.getItem(TAB_KEY);
    } catch (error) {
      return null;
    }
  }

  function storeTab(id) {
    try {
      window.localStorage.setItem(TAB_KEY, id);
    } catch (error) {
      /* storage unavailable; the tab simply will not persist */
    }
  }

  var tabs = document.querySelectorAll('[data-bs-toggle="tab"]');

  if (tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener("shown.bs.tab", function () {
        storeTab(tab.id);
      });
    });

    var stored = readStoredTab();
    // Only restore a tab that still exists and is not already open — tab ids
    // change when sections are renamed, and a stale id must not blank the page.
    if (stored) {
      var target = document.getElementById(stored);
      if (target && target.matches('[data-bs-toggle="tab"]') && !target.classList.contains("active")) {
        // Going through the data-api rather than the Tab constructor keeps this
        // a no-op if Bootstrap's JS failed to load.
        target.click();
      }
    }
  }

  var input = document.querySelector("[data-token-search]");
  if (!input) return;

  var totalLabel = document.querySelector("[data-token-total]");

  // Filtering spans every panel, not just the visible one. A search scoped to
  // the active tab silently hides matches that exist one tab away, so the
  // per-tab badge becomes the signal for where the hits are.
  function filter() {
    var query = input.value.trim().toLowerCase();
    var matched = 0;
    var total = 0;

    document.querySelectorAll(".tab-pane").forEach(function (panel) {
      var panelMatched = 0;

      panel.querySelectorAll(".token-table__row").forEach(function (row) {
        var hit = !query || row.textContent.toLowerCase().indexOf(query) !== -1;
        row.classList.toggle(FILTERED_CLASS, !hit);
        total += 1;
        if (hit) {
          panelMatched += 1;
          matched += 1;
        }
      });

      // Hide a section whose rows have all been filtered out, so the page does
      // not fill with empty headings.
      panel.querySelectorAll("[data-token-section]").forEach(function (section) {
        var visible = section.querySelectorAll(
          ".token-table__row:not(." + FILTERED_CLASS + ")"
        ).length;
        section.hidden = visible === 0;
      });

      var badge = document.querySelector(
        '[data-token-count="' + panel.id.replace(/^panel-/, "") + '"]'
      );
      if (badge) {
        badge.textContent = query
          ? panelMatched
          : badge.dataset.tokenTotalCount;
        badge.classList.toggle("token-badge--empty", Boolean(query) && panelMatched === 0);
      }
    });

    if (totalLabel) {
      totalLabel.textContent = query ? matched + " of " + total + " match" : "";
    }
  }

  input.addEventListener("input", filter);
})();
