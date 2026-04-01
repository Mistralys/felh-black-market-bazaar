# Black Market Bazaar — Project Manifest

> **Canonical source of truth for AI agents and contributors.**
> Read these documents before working on any part of the codebase.

---

## Section Index

| Section | File | Contents |
|---|---|---|
| **Tech Stack & Patterns** | [`tech-stack.md`](tech-stack.md) | Runtime, game target, frameworks, build tools, package manager, architecture overview |
| **File Tree** | [`file-tree.md`](file-tree.md) | Annotated project directory structure with descriptions of non-obvious folders |
| **Game Data Reference** | [`game-data-reference.md`](game-data-reference.md) | Base game XML schemas, GameCore file inventory, entry element structures, Reforged additions |
| **Localization** | [`localization.md`](localization.md) | Full localization system: base game format, BMB per-entry translation files, TXT_BMB_* key conventions, multi-line text, `.str` files |
| **XML Patterns** | [`xml-patterns.md`](xml-patterns.md) | Modding XML patterns: GameModifier, prerequisites, rarity, art definitions, unit stats reference |
| **Build Pipeline** | [`build-pipeline.md`](build-pipeline.md) | Build script architecture, data flows (fragment → merge → translate → verify → deploy), module API surface |
| **Constraints & Conventions** | [`constraints.md`](constraints.md) | All mandatory rules: naming conventions, encoding, Reforged breaking changes, deprecations, failure protocol |

---

## How to Use This Manifest

1. **New to the project?** Read [`tech-stack.md`](tech-stack.md) and [`file-tree.md`](file-tree.md) first for orientation.
2. **Adding new content?** Read [`constraints.md`](constraints.md) for naming rules and mandatory tags, then [`xml-patterns.md`](xml-patterns.md) for GameModifier and art definition patterns.
3. **Working on localization?** Read [`localization.md`](localization.md) for the full translation workflow.
4. **Modifying build scripts?** Read [`build-pipeline.md`](build-pipeline.md) for the pipeline architecture and module API.
5. **Researching base game schemas?** Read [`game-data-reference.md`](game-data-reference.md) for GameCore file inventory and element schemas.

---

## Consolidation Notes

This manifest consolidates content previously spread across:

- `docs/game-data/README.md` → [`game-data-reference.md`](game-data-reference.md)
- `docs/game-data/localization.md` → [`localization.md`](localization.md)
- `docs/modding-guide/README.md` → [`constraints.md`](constraints.md), [`localization.md`](localization.md), [`xml-patterns.md`](xml-patterns.md)
- `AGENTS.md` (§ Failure Protocol, § Key Conventions) → [`constraints.md`](constraints.md)
- `Mods/README.md` → [`file-tree.md`](file-tree.md), [`tech-stack.md`](tech-stack.md)
