const ATTR_DISPLAY = 'sidebar-display';
const $sidebar = document.getElementById('sidebar');
const $trigger = document.getElementById('sidebar-trigger');
const $close = document.getElementById('sidebar-close');
const $mask = document.getElementById('mask');

class SidebarUtil {
  static #isExpanded = false;

  static toggle() {
    this.#isExpanded = !this.#isExpanded;
    document.body.toggleAttribute(ATTR_DISPLAY, this.#isExpanded);
    $sidebar.classList.toggle('z-2', this.#isExpanded);
    $mask.classList.toggle('d-none', !this.#isExpanded);
  }

  static close() {
    if (this.#isExpanded) {
      this.toggle();
    }
  }
}

export function initSidebar() {
  $trigger.onclick = $mask.onclick = () => SidebarUtil.toggle();
  $close.onclick = () => SidebarUtil.close();
}
