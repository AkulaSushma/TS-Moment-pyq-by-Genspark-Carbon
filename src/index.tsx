import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/cloudflare-workers';
import { apiRouter } from './routes/api';

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use('/api/*', cors());
app.route('/api', apiRouter);

app.use('/static/*', serveStatic({ root: './' }));
app.use('/exports/*', serveStatic({ root: './' }));

app.get('/health', (c) => c.json({ status: 'ok', system: 'Telangana Movement Learning Intelligence System (1948–2014)' }));

app.get('*', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Telangana Movement Learning Intelligence System (1948–2014) | TGPRB SI & Constable Mastery</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/css/all.min.css" rel="stylesheet">
  <link href="/static/styles.css" rel="stylesheet" />
</head>
<body class="notebook-surface text-slate-900 antialiased selection:bg-amber-200 selection:text-slate-900">
  <div id="app-root" class="min-h-screen flex flex-col">
    <!-- Initial Documentary Loading Screen -->
    <main class="flex-1 flex items-center justify-center p-8">
      <div class="max-w-lg w-full bg-white/90 border-2 border-amber-900/20 rounded-2xl p-8 shadow-xl text-center">
        <div class="w-14 h-14 mx-auto mb-4 rounded-xl bg-amber-900 text-amber-50 flex items-center justify-center text-2xl animate-pulse">
          <i class="fas fa-landmark"></i>
        </div>
        <h1 class="font-editorial text-2xl font-bold text-slate-900 mb-2">Telangana Movement Learning Intelligence System</h1>
        <p class="text-sm text-slate-600 mb-4">Loading Verified 1948–2014 Historical Knowledge Graph, 9 Official TSLPRB Papers & Adaptive Memory Engine…</p>
        <div class="w-full bg-amber-100 h-2 rounded-full overflow-hidden">
          <div class="bg-amber-800 h-full w-2/3 animate-pulse"></div>
        </div>
      </div>
    </main>
  </div>
  <script src="/static/app.js" defer></script>
</body>
</html>`);
});

export default app;
