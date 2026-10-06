/**
 * FieldNet Belajar - Hash-Based Lightweight Router
 * Handles offline client-side routing smoothly in web, PWA, and Capacitor mobile wrappers.
 */

class Router {
  constructor() {
    this.routes = {};
    this.currentPath = '';
    this.currentHandler = null;
    this.params = {};
    window.addEventListener('hashchange', () => this._handleRoute());
  }

  add(pattern, handler) {
    this.routes[pattern] = handler;
    return this;
  }

  navigate(hash) {
    if (window.location.hash === hash) {
      this._handleRoute();
    } else {
      window.location.hash = hash;
    }
  }

  async _handleRoute() {
    let hash = window.location.hash.slice(1) || '/';
    if (!hash.startsWith('/')) {
      hash = '/' + hash;
    }

    // Match route with parameters (e.g. /lesson/:id)
    let matchedHandler = null;
    let matchedParams = {};

    for (const [pattern, handler] of Object.entries(this.routes)) {
      const paramNames = [];
      const regexPattern = pattern.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
        paramNames.push(key);
        return '([^/]+)';
      });
      const regex = new RegExp(`^${regexPattern}$`);
      const match = hash.match(regex);

      if (match) {
        matchedHandler = handler;
        paramNames.forEach((name, index) => {
          matchedParams[name] = decodeURIComponent(match[index + 1]);
        });
        break;
      }
    }

    if (!matchedHandler && this.routes['*']) {
      matchedHandler = this.routes['*'];
    }

    if (matchedHandler) {
      this.currentPath = hash;
      this.params = matchedParams;
      this.currentHandler = matchedHandler;
      
      // Update bottom nav active state
      this._updateNavUI(hash);

      try {
        await matchedHandler(matchedParams);
      } catch {
        // Silently recover if view handler fails
      }
    }
  }

  _updateNavUI(hash) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(el => {
      const target = el.getAttribute('href')?.replace('#', '');
      if (!target) return;
      if (
        (target === '/' && (hash === '/' || hash === '/dashboard')) ||
        (target !== '/' && hash.startsWith(target))
      ) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  init() {
    this._handleRoute();
  }
}

export const router = new Router();
