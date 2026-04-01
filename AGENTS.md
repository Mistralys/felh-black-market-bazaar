# AGENTS.md — Black Market Bazaar

> **Purpose:** Operating manual for AI agents entering this codebase.
> Read this file first. Follow its directives. No exceptions.

---

## 1. Project Overview

**Black Market Bazaar (BMB)** is a content mod for the PC game *Elemental: Reforged* (formerly *Fallen Enchantress: Legendary Heroes*). It adds new items, spells, and clothing pieces via XML data files. This repository is the development workspace — it is not a compiled application.

---

## 2. Project Manifest — Start Here

**Location:** `docs/agents/project-manifest/`

The manifest is the canonical documentation source. Read it before touching any XML file.

| Document | Path | Purpose |
|---|---|---|
| Manifest README | `docs/agents/project-manifest/README.md` | Section index and per-task reading guide |
| Constraints & Conventions | `docs/agents/project-manifest/constraints.md` | All mandatory rules: naming, encoding, failure protocol, Reforged breaking changes |
| XML Patterns | `docs/agents/project-manifest/xml-patterns.md` | BMB XML patterns: GameModifier, prerequisites, rarity, art definitions |
| Game Data Reference | `docs/agents/project-manifest/game-data-reference.md` | Base game XML schemas, GameCore file inventory, entry element structures |
| Localization | `docs/agents/project-manifest/localization.md` | Localization system, TXT_BMB_* key conventions, multi-line text, `.str` files |
| Build Pipeline | `docs/agents/project-manifest/build-pipeline.md` | Build script architecture, data flows, module API surface |
| Tech Stack | `docs/agents/project-manifest/tech-stack.md` | Runtime, game target, build tools, content inventory, workspace layout |
| File Tree | `docs/agents/project-manifest/file-tree.md` | Annotated project directory structure |
| Project README | `README.md` | High-level mod description and history |
| Local Workspace | `local-workspace.md` | Multi-root workspace disk paths |
| Research Notes | `docs/agents/research/` | Compatibility research documents |
| Plans | `docs/agents/plans/` | Agent work plans (dated directories) |
| Implementation History | `docs/agents/implementation-history/` | Archived implementation plans and synthesis documents |

### Quick Start Workflow

1. **Read** `docs/agents/project-manifest/README.md` — get oriented (section index + per-task reading guide).
2. **Read** `docs/agents/project-manifest/constraints.md` — internalize all mandatory rules before making any changes.
3. **Read** `docs/agents/project-manifest/xml-patterns.md` — understand BMB XML patterns.
4. **Read** `docs/agents/project-manifest/game-data-reference.md` — understand base game XML schemas.
5. **Reference** specific XML files only after completing steps 1–4.

---

## 3. Manifest Maintenance Rules

When you change code, update the corresponding manifest documents:

| Change Made | Documents to Update |
|---|---|
| New item / weapon / armor / clothing added | Create `xml/<subfolder>/<InternalName>/fragment.xml` + `en.xml`, `Mods/README.md` (file inventory & counts), `docs/agents/project-manifest/xml-patterns.md` (if new pattern) |
| New spell or ability added | Create `xml/<subfolder>/<InternalName>/fragment.xml` + `en.xml`, `Mods/README.md`, `docs/agents/project-manifest/xml-patterns.md` |
| New unit added | Create `xml/units/<InternalName>/fragment.xml` + `en.xml`, `Mods/README.md` |
| New translation added | Add `<lang>.xml` to existing entry directories in `xml/<subfolder>/<InternalName>/` |
| New XML fragment subfolder added | `Mods/README.md` (file inventory table), `scripts/lib/merge-xml.mjs` (MERGE_CONFIG), `Mods/module-context.yaml`, `context.yaml` |
| Icon or texture added | `Mods/src/Gfx/Black Market Bazaar Icons/` (place file), `Mods/README.md` (update counts if noted) |
| String table entry added | `Mods/src/Data/BMB.str` |
| Base game override changed | Add/edit fragment in `xml/core-items-mods/`, `Mods/README.md` (compatibility section) |
| Naming convention changed | `docs/agents/project-manifest/constraints.md` |
| Game data schema discovered | `docs/agents/project-manifest/game-data-reference.md` |
| New Reforged breaking change found | `docs/agents/project-manifest/game-data-reference.md`, `docs/agents/project-manifest/constraints.md` |
| Directory restructured | `context.yaml`, relevant `module-context.yaml` files, `docs/agents/project-manifest/file-tree.md` |
| New `npm run` script or menu item added | `README.md` (Script Runner — Available menu items table), `docs/agents/project-manifest/tech-stack.md` (Build Tools table), `AGENTS.md` (Project Stats Build Tool row if applicable) |

---

## 4. Efficiency Rules — Search Smart

- **Finding files?** Check `docs/agents/project-manifest/file-tree.md` FIRST.
- **Editing item/spell/unit content?** Edit `xml/<subfolder>/<InternalName>/fragment.xml` — NOT the monolithic files in `Mods/src/Data/GameCore/` (those are generated).
- **Editing English text?** Edit `xml/<subfolder>/<InternalName>/en.xml` — NOT the localization files in `Mods/src/Data/Localization/` (those are generated).
- **Understanding XML schemas?** Check `docs/agents/project-manifest/game-data-reference.md` FIRST.
- **Implementation patterns & conventions?** Check `docs/agents/project-manifest/xml-patterns.md` FIRST.
- **Reforged compatibility rules?** Check `docs/agents/project-manifest/constraints.md` FIRST.
- **Localization patterns?** Check `docs/agents/project-manifest/localization.md` FIRST.
- **Only then** read source XML fragment files in `xml/`.

Do NOT scan all XML files to discover structure. The manifest already documents it.
Do NOT edit monolithic XML files in `Mods/src/Data/GameCore/` directly — they are generated from `xml/` fragments during `npm run build`.
Do NOT edit localization XML files in `Mods/src/Data/Localization/` directly — they are generated from `xml/<category>/<Name>/en.xml` (and other `<lang>.xml`) files during `npm run build`.

---

## 5. Failure Protocol & Decision Matrix

| Scenario | Action | Priority |
|---|---|---|
| Ambiguous XML schema requirement | Use most restrictive interpretation; check base game `GameCore/` files for precedent | MUST |
| Manifest/code conflict | Trust manifest, flag code for fix | MUST |
| Missing documentation | Flag gap, do not invent facts | MUST |
| Untested code path | Proceed with caution, add note for in-game smoke test | SHOULD |
| `InternalName` collision uncertainty | Search ALL BMB XML files for the name before using it | MUST |
| Unsure about Reforged compatibility | Check `docs/agents/project-manifest/constraints.md`; do not guess | MUST |
| New consumable item added | Verify `HideInHiergamenon=1` is present if `IsUsable=1` and no `CanBeEquipped` | MUST |
| New non-weapon equipment added | Do NOT include `Skeleton` in `SupportedUnitModelType` | MUST |
| New ability for item-granted use | Do NOT add `AbilityBonusType`; omit it entirely | MUST |
| File encoding unclear | Always use UTF-8 (no BOM); never ISO-8859-1 | MUST |

---

## 6. Key Conventions

See `docs/agents/project-manifest/constraints.md` for all naming conventions (InternalName prefix), file encoding rules, art file naming, and script OS-independence requirements.

---

## 7. Project Stats

| Property | Value |
|---|---|
| **Language** | XML (game data definitions) |
| **Game** | Elemental: Reforged (Steam) |
| **Original Game** | Fallen Enchantress: Legendary Heroes |
| **Mod Format** | Loose XML files + PNG/DDS assets |
| **Encoding** | UTF-8 (no BOM) |
| **Architecture** | Per-entry XML directories with co-located translation files; `InternalName` cross-references |
| **Package Manager** | npm |
| **Test Framework** | Manual in-game smoke testing |
| **Build Tool** | `npm run build` (see `docs/agents/project-manifest/build-pipeline.md`) |

See `docs/agents/project-manifest/tech-stack.md` for the full build tool inventory, shared modules, and content counts.

---

## 8. Workspace Layout

This is a **multi-root workspace** with three folders:

| Folder | Purpose |
|---|---|
| `felh-black-market-bazaar/` | Mod development (this repository) |
| `ElementalReforged/` (My Documents) | User mod deployment target |
| `Elemental Reforged/` (Steam) | Base game install; read-only reference for `data/` |

See `local-workspace.md` for full disk paths. See `docs/agents/project-manifest/file-tree.md` for the annotated directory structure.
