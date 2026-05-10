(function () {
  'use strict';

  // ============================================================
  // SIDEBAR TOGGLE (mobile)
  // ============================================================
  var sidebar = document.getElementById('sidebar');
  var sidebarToggle = document.getElementById('sidebar-toggle');
  var sidebarOverlay = document.getElementById('sidebar-overlay');

  function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
  }

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function () {
      if (sidebar.classList.contains('open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  // ============================================================
  // COLLAPSIBLE NAV SECTIONS
  // ============================================================
  var navToggles = document.querySelectorAll('.nav-section-toggle');
  navToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var section = this.parentElement;
      section.classList.toggle('collapsed');
    });
  });

  // ============================================================
  // TABLE OF CONTENTS (auto-generated)
  // ============================================================
  var tocContainer = document.getElementById('toc');
  var article = document.querySelector('.content article');

  if (tocContainer && article) {
    var headings = article.querySelectorAll('h2, h3');
    if (headings.length > 2) {
      var tocHtml = '<div class="toc-title">On this page</div><ul>';
      headings.forEach(function (heading, index) {
        var id = heading.id || 'section-' + index;
        heading.id = id;
        var indent = heading.tagName === 'H3' ? '<li style="padding-left:16px">' : '<li>';
        tocHtml += indent + '<a href="#' + id + '">' + heading.textContent + '</a></li>';
      });
      tocHtml += '</ul>';
      tocContainer.innerHTML = tocHtml;
    }
  }

  // ============================================================
  // BACK TO TOP
  // ============================================================
  var backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================================
  // SEARCH
  // ============================================================
  var searchData = null;
  var searchInput = document.getElementById('search-input');
  var searchResults = document.getElementById('search-results');
  var selectedIndex = -1;

  // Load search index
  var baseUrl = document.querySelector('link[rel="stylesheet"]');
  var siteBase = '';
  if (baseUrl) {
    var href = baseUrl.getAttribute('href');
    var match = href.match(/^(\/[^/]+)\//);
    if (match) siteBase = match[1];
  }

  fetch(siteBase + '/search.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      searchData = data.filter(function (item) {
        return item && item.title && item.content && item.content.trim().length > 0;
      });
    })
    .catch(function (err) { console.error('Search index load failed:', err); });

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function getSnippet(content, query, contextLen) {
    contextLen = contextLen || 80;
    var lower = content.toLowerCase();
    var qLower = query.toLowerCase();
    var idx = lower.indexOf(qLower);
    if (idx === -1) return '';

    var start = Math.max(0, idx - contextLen);
    var end = Math.min(content.length, idx + query.length + contextLen);
    var snippet = '';
    if (start > 0) snippet += '...';
    var raw = content.substring(start, end);
    var regex = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    snippet += escapeHtml(raw).replace(regex, '<mark>$1</mark>');
    if (end < content.length) snippet += '...';
    return snippet;
  }

  function performSearch(query) {
    if (!searchData || query.length < 2) {
      searchResults.classList.remove('active');
      searchResults.innerHTML = '';
      selectedIndex = -1;
      return;
    }

    var qLower = query.toLowerCase();
    var results = [];

    for (var i = 0; i < searchData.length; i++) {
      var item = searchData[i];
      var titleMatch = item.title.toLowerCase().indexOf(qLower) !== -1;
      var contentMatch = item.content.toLowerCase().indexOf(qLower) !== -1;

      if (titleMatch || contentMatch) {
        var score = 0;
        if (titleMatch) score += 10;
        if (contentMatch) {
          var cnt = 0, pos = 0, cLower = item.content.toLowerCase();
          while ((pos = cLower.indexOf(qLower, pos)) !== -1) { cnt++; pos += qLower.length; }
          score += cnt;
        }
        results.push({ item: item, score: score, titleMatch: titleMatch });
      }
    }

    results.sort(function (a, b) { return b.score - a.score; });
    selectedIndex = -1;

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-meta">No results for "' + escapeHtml(query) + '"</div>';
      searchResults.classList.add('active');
      return;
    }

    var html = '<div class="search-meta">' + results.length + ' result' + (results.length > 1 ? 's' : '') + '</div>';
    var limit = Math.min(results.length, 12);

    for (var j = 0; j < limit; j++) {
      var r = results[j];
      var snippet = getSnippet(r.item.content, query);
      var titleHtml = escapeHtml(r.item.title).replace(
        new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'),
        '<mark>$1</mark>'
      );
      html += '<a href="' + r.item.url + '" class="search-result-item" data-idx="' + j + '">'
        + '<div class="search-result-title">' + titleHtml + '</div>'
        + '<div class="search-result-path">' + escapeHtml(r.item.url) + '</div>'
        + (snippet ? '<div class="search-result-snippet">' + snippet + '</div>' : '')
        + '</a>';
    }

    if (results.length > limit) {
      html += '<div class="search-meta">... and ' + (results.length - limit) + ' more</div>';
    }
    html += '<div class="search-hint"><kbd>\u2191</kbd> <kbd>\u2193</kbd> navigate \u00b7 <kbd>Enter</kbd> open \u00b7 <kbd>Esc</kbd> close</div>';

    searchResults.innerHTML = html;
    searchResults.classList.add('active');
  }

  function updateSelection() {
    var items = searchResults.querySelectorAll('.search-result-item');
    items.forEach(function (el, i) {
      el.classList.toggle('selected', i === selectedIndex);
    });
    if (selectedIndex >= 0 && items[selectedIndex]) {
      items[selectedIndex].scrollIntoView({ block: 'nearest' });
    }
  }

  if (searchInput) {
    var debounceTimer;
    searchInput.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        performSearch(searchInput.value.trim());
      }, 150);
    });

    searchInput.addEventListener('keydown', function (e) {
      var items = searchResults.querySelectorAll('.search-result-item');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (selectedIndex < items.length - 1) { selectedIndex++; updateSelection(); }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (selectedIndex > 0) { selectedIndex--; updateSelection(); }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedIndex >= 0 && items[selectedIndex]) {
          window.location.href = items[selectedIndex].getAttribute('href');
        }
      } else if (e.key === 'Escape') {
        searchResults.classList.remove('active');
        searchInput.blur();
      }
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.header-search')) {
        searchResults.classList.remove('active');
      }
    });

    // Re-show on focus
    searchInput.addEventListener('focus', function () {
      if (searchInput.value.trim().length >= 2 && searchResults.innerHTML) {
        searchResults.classList.add('active');
      }
    });

    // "/" shortcut to focus search
    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && document.activeElement !== searchInput &&
          document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  // ============================================================
  // ACTIVE NAV HIGHLIGHTING
  // ============================================================
  var currentPath = window.location.pathname;
  var navLinks = document.querySelectorAll('.nav-section-items a');
  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && currentPath.indexOf(href) !== -1) {
      link.classList.add('active');
      // Ensure parent section is expanded
      var section = link.closest('.nav-section');
      if (section) section.classList.remove('collapsed');
    }
  });

})();
