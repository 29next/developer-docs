/**
 * Builds static preview pages for playground examples.
 * Run before `next dev` / `next build` — wired into the "dev" and "build" npm scripts.
 *
 * Input:  content/playground/<category>/<file>.html
 * Output: public/preview/<slug(category)>/<file>.html
 *
 * Each source file starts with a `<!-- key: value -->` front-matter block; only
 * `layout` matters here (title/description/order are consumed by lib/playground
 * at runtime). The body is wrapped in a self-contained HTML document that:
 *   - loads the SDK from jsDelivr (or a custom sdkHost)
 *   - sets window.nextConfig from defaults, overridable via URL params
 *   - supports `?code=<lz-string>` to swap the example body at runtime (used
 *     by the playground "Share" link and live edits)
 *
 * Layout handling mirrors lib/playground/utils.ts wrapLayout/buildIframeHtml:
 *   - `center`    — wraps body in .playground-wrapper with flex centering
 *   - `full_page` — writes userHtml verbatim (no wrapper, no config script)
 *   - anything else (incl. missing/`full`) — no wrapper div, no layout styles
 *
 * NOTE: Default config values below must stay in sync with
 * lib/playground/constants.ts → DEFAULT_CONFIG.
 */

import {
  readdirSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  rmSync,
  existsSync,
} from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PLAYGROUND_DIR = join(ROOT, 'content/playground');
const OUTPUT_DIR = join(ROOT, 'public/preview');

const DEFAULTS = {
  sdkHost: '',
  sdkVersion: 'latest',
  debugger: false,
};

const LAYOUT_STYLES = {
  center:
    'display: flex; align-items: center; justify-content: center; min-height: 100vh;',
};

// ── Utilities ───────────────────────────────────────────────────────────────

function slugCategory(category) {
  return category
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-/]/g, '');
}

function parseFrontmatter(raw) {
  const match = raw.match(/^<!--\s*([\s\S]*?)-->/);
  if (!match) return { meta: {}, code: raw.trim() };

  const meta = {};
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const value = line.slice(colon + 1).trim();
    if (key) meta[key] = value;
  }
  return { meta, code: raw.slice(match[0].length).trim() };
}

function wrapLayout(html, layout) {
  const style = LAYOUT_STYLES[layout];
  if (!style) return html;
  return `<div class="playground-wrapper" style="${style}">${html}</div>`;
}

function renderPreview(userHtml, layout) {
  if (layout === 'full_page') return userHtml;

  const defaults = JSON.stringify(DEFAULTS);

  return `<!DOCTYPE html>
<html lang="en" style="background: transparent !important;">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light dark">
  <style>body { background: transparent !important; margin: 0; }</style>
  <script src="https://unpkg.com/lz-string@1.5.0/libs/lz-string.min.js"></script>
  <script>
    (function () {
      var params = new URLSearchParams(window.location.search);
      var defaults = ${defaults};
      var pick = function (k) { return params.has(k) ? params.get(k) : defaults[k]; };

      var sdkHost = pick('sdkHost');
      var debugFlag = params.get('debug') === 'true';
      var cfg = {
        sdkHost: sdkHost || '',
        debug: debugFlag || !!sdkHost,
        debugger: params.has('debugger') ? params.get('debugger') === 'true' : !!defaults.debugger,
      };
      window.nextConfig = cfg;

      var sdkVersion = pick('sdkVersion');
      var sdkUrl = sdkHost
        ? sdkHost.replace(/\\/$/, '') + '/loader.js'
        : (!sdkVersion || sdkVersion === 'latest')
          ? 'https://cdn.jsdelivr.net/gh/NextCommerceCo/campaign-cart@latest/dist/loader.js'
          : 'https://cdn.jsdelivr.net/gh/NextCommerceCo/campaign-cart@v' + sdkVersion + '/dist/loader.js';

      // If ?code=... is supplied, LZString-decompress it and swap into the
      // playground wrapper (falls back to document.body when no wrapper).
      function applyCodeOverride() {
        var encoded = params.get('code');
        if (!encoded || !window.LZString) return;
        var decoded = window.LZString.decompressFromEncodedURIComponent(encoded);
        if (!decoded) return;
        var host = document.querySelector('.playground-wrapper') || document.body;
        host.innerHTML = decoded;
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyCodeOverride);
      } else {
        applyCodeOverride();
      }

      var s = document.createElement('script');
      s.type = 'module';
      s.src = sdkUrl;
      document.head.appendChild(s);
    })();
  </script>
</head>
<body data-next-sdk-loading="true">
  ${wrapLayout(userHtml, layout)}
</body>
</html>`;
}

// ── Build ───────────────────────────────────────────────────────────────────

function build() {
  if (!existsSync(PLAYGROUND_DIR)) {
    console.warn(`[build-preview] ${PLAYGROUND_DIR} not found — skipping.`);
    return;
  }

  if (existsSync(OUTPUT_DIR)) rmSync(OUTPUT_DIR, { recursive: true });
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const categories = readdirSync(PLAYGROUND_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== 'flows')
    .map((d) => d.name);

  let count = 0;
  for (const category of categories) {
    const catDir = join(PLAYGROUND_DIR, category);
    const outDir = join(OUTPUT_DIR, slugCategory(category));
    mkdirSync(outDir, { recursive: true });

    const files = readdirSync(catDir).filter((f) => f.endsWith('.html'));
    for (const file of files) {
      const raw = readFileSync(join(catDir, file), 'utf-8');
      const { meta, code } = parseFrontmatter(raw);
      const html = renderPreview(code, meta.layout ?? '');
      writeFileSync(join(outDir, file), html);
      count++;
    }
  }

  console.log(`[build-preview] wrote ${count} preview page(s) to public/preview/`);
}

build();
