(function () {
  function setupSearch(inputId, emptyId) {
    var input = document.getElementById(inputId);
    if (!input) {
      return;
    }

    var items = Array.prototype.slice.call(document.querySelectorAll("[data-search-item]"));
    var empty = document.getElementById(emptyId);

    function applySearch() {
      var query = input.value.trim().toLowerCase();
      var visibleCount = 0;

      items.forEach(function (item) {
        var text = (item.getAttribute("data-search") || item.textContent || "").toLowerCase();
        var matched = query === "" || text.indexOf(query) !== -1;
        item.hidden = !matched;
        if (matched) {
          visibleCount += 1;
        }
      });

      if (empty) {
        empty.hidden = visibleCount !== 0;
      }
    }

    input.addEventListener("input", applySearch);
    applySearch();
  }

  function setupAbstracts() {
    var toggles = Array.prototype.slice.call(document.querySelectorAll("[data-abstract-toggle]"));

    toggles.forEach(function (toggle) {
      var targetId = toggle.getAttribute("aria-controls");
      var target = document.getElementById(targetId);
      if (!target) {
        return;
      }

      toggle.addEventListener("click", function () {
        var expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        target.hidden = expanded;
        toggle.textContent = expanded ? "Show abstract" : "Hide abstract";
      });
    });
  }

  setupSearch("research-search", "research-empty");
  setupSearch("notes-search", "notes-empty");
  setupAbstracts();
}());
