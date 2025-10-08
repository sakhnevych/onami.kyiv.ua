// Embed the static HTML pages into the websites //
document.querySelectorAll('.content-block').forEach(block => {
  const src = block.getAttribute('data-src');
  fetch(src)
  .then(res => res.text())
  .then(html => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    block.appendChild(wrapper);
  });
});


// Embed the sidebar HTML //
function attachArchiveToggles(root) {
  root.querySelectorAll('.archivedate > .toggle').forEach(toggle => {
    toggle.onclick = function (e) {
      e.preventDefault();
      const li = toggle.closest('li.archivedate');
      const expanded = li.classList.toggle('expanded');
      li.classList.toggle('collapsed', !expanded);

      // zippy
      const zippy = toggle.querySelector('.zippy');
      if (zippy) {
        if (expanded) {
          zippy.textContent = '▼ ';
          zippy.classList.add('toggle-open');
        } else {
          zippy.textContent = '► ';
          zippy.classList.remove('toggle-open');
        }
      }
    }
  });
}

<!-- Embedding and expansion script -->
document.querySelectorAll('.sidebar-block').forEach(block => {
  const src = block.getAttribute('data-src');
  const expandPath = block.getAttribute('data-expand-path');
  fetch(src)
  .then(res => res.text())
  .then(html => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    block.appendChild(wrapper);

    if (expandPath) {
      // Expand all parent li elements for the given path
      // 1. Find the a[href$=expandPath]
      // 2. Climb up to each .archivedate li and add "expanded" class, remove "collapsed"
      // 3. Change span.zippy to ▼ and class toggle-open

      const targetLink = wrapper.querySelector(`a[href$="${expandPath}"]`);
      if (targetLink) {
        let li = targetLink.closest('li.archivedate');
        while (li) {
          li.classList.add('expanded');
          li.classList.remove('collapsed');

          // Update zippy
          const zippy = li.querySelector('span.zippy');
          if (zippy) {
            zippy.textContent = '▼ ';
            zippy.classList.add('toggle-open');
          }

          // Climb up
          li = li.parentElement.closest('li.archivedate');
        }
      }
    }
    attachArchiveToggles(wrapper);
  });
});