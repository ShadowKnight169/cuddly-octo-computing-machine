# PocketDex — free Pokémon TCG Pocket collection tracker

A mobile-friendly, fan-made web app. **No subscriptions, accounts, tracking, hosting bills or build tools required.** Designed to be deployed to GitHub Pages.

## Features

- Track owned copies of every card; filter missing, owned, extras, rarity and expansion.
- Mark priority missing cards (a personal chase list, not a trade list) and compare pack options.
- Compare estimated missing-card pull opportunities by booster set and pack type using community slot/rarity percentages.
- Quick-add cards from a booster in one operation.
- Create and edit 20-card decks, with owned-copy/missing-copy checks.
- English/Spanish interface.
- Local browser storage and manual JSON backup/restore.
- Installable Progressive Web App with an offline-capable shell and cached catalog after the first online load.
- Refresh the catalog from the community database when new sets come out.

## Publish on GitHub Pages — no coding required

1. Create a **new public GitHub repository** named, for example, `pocketdex`. Keep it separate from any existing project.
2. Upload **all of the unzipped files and the `assets` folder** to the repository's root, preserving paths.
3. In that repository open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
5. Visit `https://YOUR-USERNAME.github.io/pocketdex/` once Pages has deployed.
6. On iPhone, open the website in **Safari → Share → Add to Home Screen**.

You can also serve it locally from the unzipped folder using `python -m http.server 8000`, then open `http://localhost:8000/` in your browser. Avoid opening `index.html` as a `file://` URL, which restricts storage and service workers in some browsers.

## Collection-completion mode: no trading

This tracker does **not** contain a trading feature or recommend trading. Your completion progress counts only cards that you mark as owned. Use the pack advisor to prioritize booster packs; track promos and event rewards by adding them to your collection when you obtain them. Some promotional cards may no longer be obtainable, so 100% of every card ever released may not currently be possible.

## Important limitations

- **First launch must be online.** The card database and images are loaded from community-maintained public GitHub repositories. On subsequent launches, the service worker and IndexedDB preserve the app shell and most recently fetched catalog, but card images are *not* all cached offline.
- **Your collection lives only in this browser/device.** Export a backup under Settings, especially before clearing Safari data. No automatic cross-device syncing or login is implemented.
- **Card names currently remain in English** because the upstream card list is English. Interface labels and selected set names translate to Spanish when available.
- **Pack advisor results are estimates, not official odds or a full pack simulator.** It uses community pull-rate tables and, for each card slot, assumes cards of the same rarity within a pack are equally likely. It approximates independent slots and includes community listed rare-pack rates. Some sets, events, promotional mechanics and specific pack restrictions may behave differently. Pack rankings do *not* establish that a pack is available to open in-game today.
- Promo sets are tracked but excluded from the standard booster-pack advisor.
- Deck builder tracks **exact print IDs**. It does not import public decklists or automatically substitute alternate art prints.
- The project does not use or bypass any paid access features of `ptcgp-tracker.com`.

## Data credits and rights

- Card list, expansions, pack associations, and community pull rates: [flibustier/pokemon-tcg-pocket-database](https://github.com/flibustier/pokemon-tcg-pocket-database) (MIT-licensed).
- Card image URLs: [PocketDecks/pokemon-tcg-pocket-cards](https://github.com/PocketDecks/pokemon-tcg-pocket-cards); card art belongs to Pokémon's respective rights holders. No card images are shipped in this ZIP.
- This app is **unofficial, non-commercial fan software** and is not endorsed by or affiliated with Nintendo, The Pokémon Company, Game Freak, Creatures, or DeNA.

For the open-source upstream license, see their [LICENSE](https://github.com/flibustier/pokemon-tcg-pocket-database/blob/main/LICENSE). All original PocketDex application code in this ZIP is released under the MIT License (see `LICENSE`).

## Data storage and backup format

- Saved collection: `localStorage` key `pocketdex.v1`.
- Cached catalog: IndexedDB `pocketdex-catalog`; service worker `pocketdex-data-v1`.
- Export: versioned `PocketDex` JSON file holding owned card counts, wishlist IDs, decks, and language setting.
- Restore replaces local data and validates the file shape and copy counts.

To make changes, edit `index.html`, `styles.css` and `app.js`. No `npm install` required.
