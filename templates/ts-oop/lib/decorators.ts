/* =========================================================
   🧠 ROUTING / COMPONENT CORE
========================================================= */

export function Initializeroute(routes: any[] = []) {
  return function (target: any) {
    if (!target.prototype.routes) {
      target.prototype.routes = [];
    }

    target.prototype.routes.push(...routes);
  };
}

export function Component(name?: string) {
  return function (target: any) {
    target.__componentName = name || target.name;
  };
}

export function RouteGuard(check: () => boolean) {
  return function (target: any) {
    target.__guard = check;
  };
}

/* =========================================================
   🧠 SINGLETON
========================================================= */

const singletonMap = new WeakMap();

export function Singleton() {
  return function (target: any) {
    return new Proxy(target, {
      construct(target, args, newTarget) {
        if (!singletonMap.has(target)) {
          singletonMap.set(target, new target(...args));
        }
        return singletonMap.get(target);
      }
    });
  };
}

/* =========================================================
   ⚡ LIFECYCLE
========================================================= */

export function Once() {
  return function (_target: any, _key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    let called = false;

    descriptor.value = function (...args: any[]) {
      if (called) return;
      called = true;
      return original.apply(this, args);
    };
  };
}

export function DelayInit() {
  return function (target: any) {
    return new Proxy(target, {
      construct(target, args) {
        const instance = new target(...args);

        setTimeout(() => {
          instance.init?.();
        }, 0);

        return instance;
      }
    });
  };
}

/* =========================================================
   ⚡ PERFORMANCE
========================================================= */

export function Debounce(ms: number) {
  return function (_target: any, _key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    let timeout: any;

    descriptor.value = function (...args: any[]) {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        original.apply(this, args);
      }, ms);
    };
  };
}

export function Throttle(ms: number) {
  return function (_target: any, _key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    let last = 0;

    descriptor.value = function (...args: any[]) {
      const now = Date.now();
      if (now - last < ms) return;

      last = now;
      return original.apply(this, args);
    };
  };
}

export function Memo() {
  return function (_target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    const cache = new Map();

    descriptor.value = function (...args: any[]) {
      const k = JSON.stringify(args);

      if (cache.has(k)) return cache.get(k);

      const result = original.apply(this, args);
      cache.set(k, result);

      return result;
    };
  };
}

/* =========================================================
   🧠 BIND / DEBUG
========================================================= */

export function Bind(_target: any, _key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;

  return {
    configurable: true,
    get() {
      return original.bind(this);
    }
  };
}

export function Log(label?: string) {
  return function (_target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log(`[${label ?? key}]`, args);
      return original.apply(this, args);
    };
  };
}

export function LogTime(label?: string) {
  return function (_target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const start = performance.now();

      const result = original.apply(this, args);

      const end = performance.now();

      console.log(`[${label ?? key}] took ${end - start}ms`);

      return result;
    };
  };
}

/* =========================================================
   💾 STATE PERSISTENCE
========================================================= */

export function Persist(key: string) {
  return function (target: any, propertyKey: string) {

    Object.defineProperty(target, propertyKey, {
      get() {
        const raw = localStorage.getItem(key);

        if (!raw) return null;

        try {
          return JSON.parse(raw);
        } catch {
          // fallback for plain strings like "light"
          return raw;
        }
      },
      set(newVal) {
        localStorage.setItem(key, JSON.stringify(newVal));
      },
      enumerable: true,
      configurable: true
    });
  };
}

/**
 * Auto-sync state version (enhanced Persist)
 */
export function StateSync(key: string) {
  return function (target: any, propertyKey: string) {
    let value = localStorage.getItem(key);
    value = value ? JSON.parse(value) : null;

    Object.defineProperty(target, propertyKey, {
      get() {
        return value;
      },
      set(newVal) {
        value = newVal;
        localStorage.setItem(key, JSON.stringify(newVal));
      },
      enumerable: true,
      configurable: true
    });
  };
}

/* =========================================================
   🎯 EVENTS
========================================================= */

export function Emit(eventName: string) {
  return function (_target: any, _key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const result = original.apply(this, args);

      window.dispatchEvent(
        new CustomEvent(eventName, { detail: result })
      );

      return result;
    };
  };
}

export function Listen(eventName: string) {
  return function (target: any, _key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    window.addEventListener(eventName, (e: any) => {
      original.call(target, e.detail);
    });
  };
}

/* =========================================================
   🧠 CONTROL FLOW
========================================================= */

export function Guard(check: () => boolean) {
  return function (_target: any, _key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (!check()) return;
      return original.apply(this, args);
    };
  };
}

export function Timeout(ms: number) {
  return function (_target: any, _key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
      return setTimeout(() => {
        original.apply(this, args);
      }, ms);
    };
  };
}