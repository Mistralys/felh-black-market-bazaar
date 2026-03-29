import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { XMLParser } from 'fast-xml-parser';
import { success, error, info, step } from './lib/output.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const GAMECORE_DIR = path.join(PROJECT_ROOT, 'Mods', 'src', 'Data', 'GameCore');
const OUTPUT_FILE = path.join(PROJECT_ROOT, 'docs', 'references', 'items.md');

// ─── XML source files (order determines section order) ──────
const SOURCE_FILES = [
  { file: 'BMB_Weapons.xml', id: 'weapons' },
  { file: 'BMB_Armor.xml', id: 'armor' },
  { file: 'BMB_Items.xml', id: 'items' },
  { file: 'BMB_Clothes.xml', id: 'clothes' },
];

// ─── XML parser ──────────────────────────────────────────────
// Tags that can appear more than once inside a single <GameItemType>.
const ARRAY_TAGS = new Set([
  'Type', 'GameModifier', 'Prereq', 'GameItemTypeModelPack',
  'SupportedUnitModelType', 'GameItemTypeModel', 'AttackSFX',
  'EquipSFX', 'SFX',
]);

const parser = new XMLParser({
  ignoreAttributes: false,
  ignoreDeclaration: true,
  attributeNamePrefix: '@_',
  isArray: (name) => ARRAY_TAGS.has(name),
});

// ─── Stat name formatting ────────────────────────────────────
const STAT_LABELS = {
  UnitStat_Attack_Pierce: 'Attack',
  UnitStat_Attack_Fire: 'Fire Attack',
  UnitStat_Attack_Cold: 'Cold Attack',
  UnitStat_Attack_Lightning: 'Lightning Attack',
  UnitStat_Attack_Poison: 'Poison Attack',
  UnitStat_Attack_Death: 'Death Attack',
  UnitStat_Attack_Spirit: 'Spirit Attack',
  UnitStat_Attack_Boost: 'Attack Bonus',
  UnitStat_Defense_Pierce: 'Defense',
  UnitStat_Defense_Fire: 'Fire Defense',
  UnitStat_Defense_Cold: 'Cold Defense',
  UnitStat_Defense_Lightning: 'Lightning Defense',
  UnitStat_Defense_Poison: 'Poison Defense',
  UnitStat_Defense_Death: 'Death Defense',
  UnitStat_Defense_Spirit: 'Spirit Defense',
  UnitStat_HP: 'Hit Points',
  UnitStat_Mana: 'Mana',
  UnitStat_MagicPower: 'Spell Power',
  UnitStat_CombatSpeed: 'Combat Speed',
  UnitStat_Initiative: 'Initiative',
  UnitStat_Accuracy: 'Accuracy',
  UnitStat_Dodge: 'Dodge',
  UnitStat_Sight: 'Sight',
  UnitStat_Moves: 'Movement',
  UnitStat_Spell_Mastery: 'Spell Mastery',
  UnitStat_SpellResistance: 'Spell Resistance',
  UnitStat_CriticalChance: 'Critical Chance',
  UnitStat_CriticalDamage: 'Critical Damage',
  UnitStat_BackswingChance: 'Backswing Chance',
  UnitStat_BashChance: 'Bash Chance',
  UnitStat_CounterattackChance: 'Counterattack Chance',
  UnitStat_Swashbuckle: 'Swashbuckle',
  UnitStat_Level: 'Level',
};

function formatStatName(raw) {
  if (STAT_LABELS[raw]) return STAT_LABELS[raw];
  // Fallback: strip prefix and insert spaces before capitals
  return raw
    .replace(/^UnitStat_/, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2');
}

// ─── Effect formatting ───────────────────────────────────────
function formatEffects(modifiers) {
  if (!modifiers || modifiers.length === 0) return '—';

  const parts = [];
  for (const mod of modifiers) {
    const attr = mod.Attribute;
    const provides = mod.Provides;

    if (attr === 'AdjustUnitStat' && mod.StrVal && mod.Value !== undefined) {
      // If there's a Provides field with richer context, prefer it
      if (provides && attr === 'AdjustUnitStat' && (mod.StrVal2 || String(provides).length > 30)) {
        parts.push(provides);
      } else {
        const sign = mod.Value >= 0 ? '+' : '';
        parts.push(`${sign}${mod.Value} ${formatStatName(mod.StrVal)}`);
      }
    } else if (provides) {
      parts.push(provides);
    }
    // Skip modifiers with no Provides and no AdjustUnitStat pattern
  }

  return parts.length > 0 ? parts.join('; ') : '—';
}

// ─── Parse a single XML file ─────────────────────────────────
async function parseItemFile(filePath) {
  const xml = await readFile(filePath, 'utf-8');
  const doc = parser.parse(xml);
  const rawItems = doc?.GameItemTypes?.GameItemType;
  if (!rawItems) return [];

  const items = Array.isArray(rawItems) ? rawItems : [rawItems];
  return items.map((item) => {
    const types = item.Type ? (Array.isArray(item.Type) ? item.Type : [item.Type]) : [];
    const modifiers = item.GameModifier ?? [];
    return {
      internalName: item['@_InternalName'] ?? '',
      displayName: item.DisplayName ?? item['@_InternalName'] ?? '(unknown)',
      description: item.Description ?? '',
      types,
      subtype: item.Subtype ?? null,
      shopValue: item.ShopValue ?? null,
      rarity: item.RarityDisplay ?? null,
      heroOnly: item.HeroOnly === 1 || item.HeroOnly === '1',
      isUsable: item.IsUsable === 1 || item.IsUsable === '1',
      canBeEquipped: item.CanBeEquipped === 1 || item.CanBeEquipped === '1',
      weaponUpgradeType: item.WeaponUpgradeType ?? null,
      effects: formatEffects(modifiers),
    };
  });
}

// ─── Categorisation ──────────────────────────────────────────
// Each category: { key, title, anchor, items[] }
function categorise(allSources) {
  const categories = [];

  // --- Weapons ---
  const weaponSource = allSources.find((s) => s.id === 'weapons');
  if (weaponSource) {
    categories.push({
      key: 'weapons',
      title: 'Weapons',
      anchor: 'weapons',
      items: weaponSource.items.slice(),
    });
  }

  // --- Armor (sub-categorised by slot) ---
  const armorSource = allSources.find((s) => s.id === 'armor');
  if (armorSource) {
    const slotOrder = [
      { types: ['Head'], title: 'Head', anchor: 'armor--head' },
      { types: ['Torso'], title: 'Torso', anchor: 'armor--torso' },
      { types: ['Forearms'], title: 'Forearms', anchor: 'armor--forearms' },
      { types: ['LowerBody', 'Lowerbody'], title: 'Legs', anchor: 'armor--legs' },
      { types: ['Boots'], title: 'Boots', anchor: 'armor--boots' },
      { types: ['Defense'], title: 'Shields & Defense', anchor: 'armor--shields--defense' },
      { types: ['Surcoat'], title: 'Cloaks & Surcoats', anchor: 'armor--cloaks--surcoats' },
    ];

    const placed = new Set();
    for (const slot of slotOrder) {
      const matching = armorSource.items.filter((item) => {
        if (placed.has(item.internalName)) return false;
        // Match on the first Type element (primary slot)
        return item.types.length > 0 && slot.types.includes(item.types[0]);
      });
      matching.forEach((m) => placed.add(m.internalName));
      if (matching.length > 0) {
        categories.push({
          key: `armor-${slot.anchor}`,
          title: slot.title,
          anchor: slot.anchor,
          items: matching,
          isSubsection: true,
          parentTitle: 'Armor',
        });
      }
    }

    // Catch-all for armor items that didn't match any slot
    const uncategorised = armorSource.items.filter((item) => !placed.has(item.internalName));
    if (uncategorised.length > 0) {
      categories.push({
        key: 'armor-other',
        title: 'Other Armor',
        anchor: 'armor--other',
        items: uncategorised,
        isSubsection: true,
        parentTitle: 'Armor',
      });
    }
  }

  // --- Items: split into Accessories and Consumables ---
  const itemSource = allSources.find((s) => s.id === 'items');
  if (itemSource) {
    const accessories = itemSource.items.filter((item) => item.canBeEquipped);
    const consumables = itemSource.items.filter((item) => item.isUsable && !item.canBeEquipped);
    // Anything else (shouldn't happen, but just in case)
    const other = itemSource.items.filter(
      (item) => !item.canBeEquipped && !(item.isUsable && !item.canBeEquipped)
    );

    if (accessories.length > 0) {
      categories.push({
        key: 'accessories',
        title: 'Accessories',
        anchor: 'accessories',
        items: accessories,
      });
    }
    if (consumables.length > 0) {
      categories.push({
        key: 'consumables',
        title: 'Consumables',
        anchor: 'consumables',
        items: consumables,
      });
    }
    if (other.length > 0) {
      categories.push({
        key: 'items-other',
        title: 'Other Items',
        anchor: 'other-items',
        items: other,
      });
    }
  }

  // --- Clothing ---
  const clothesSource = allSources.find((s) => s.id === 'clothes');
  if (clothesSource) {
    categories.push({
      key: 'clothing',
      title: 'Clothing',
      anchor: 'clothing',
      items: clothesSource.items.slice(),
    });
  }

  // Sort items alphabetically within each category
  for (const cat of categories) {
    cat.items.sort((a, b) => a.displayName.localeCompare(b.displayName));
  }

  return categories;
}

// ─── Markdown helpers ────────────────────────────────────────
function escapeCell(text) {
  return String(text).replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function buildItemTable(items) {
  const lines = [];
  lines.push('| Name | Rarity | Value | Effects |');
  lines.push('|---|---|---|---|');
  for (const item of items) {
    const name = escapeCell(item.displayName);
    const rarity = item.rarity && item.rarity !== 'Nil' ? item.rarity : '—';
    const value = item.shopValue != null ? String(item.shopValue) : '—';
    const effects = escapeCell(item.effects);
    lines.push(`| ${name} | ${rarity} | ${value} | ${effects} |`);
  }
  return lines.join('\n');
}

// ─── Markdown generation ─────────────────────────────────────
function generateMarkdown(categories) {
  const totalItems = categories.reduce((sum, c) => sum + c.items.length, 0);
  const lines = [];

  // Header
  lines.push('# Black Market Bazaar — Item Reference');
  lines.push('');
  lines.push('> Auto-generated by `npm run reference`. Do not edit manually.');
  lines.push('');
  lines.push(`**${totalItems} items** across ${categories.filter((c) => !c.isSubsection).length} categories.`);
  lines.push('');

  // Table of Contents
  lines.push('## Table of Contents');
  lines.push('');

  let currentParent = null;
  for (const cat of categories) {
    if (cat.isSubsection) {
      if (cat.parentTitle !== currentParent) {
        // Calculate total items for this parent group
        const parentTotal = categories
          .filter((c) => c.parentTitle === cat.parentTitle)
          .reduce((sum, c) => sum + c.items.length, 0);
        lines.push(`- **${cat.parentTitle}** (${parentTotal})`);
        currentParent = cat.parentTitle;
      }
      lines.push(`  - [${cat.title} (${cat.items.length})](#${cat.anchor})`);
    } else {
      currentParent = null;
      lines.push(`- [${cat.title} (${cat.items.length})](#${cat.anchor})`);
    }
  }

  lines.push('');
  lines.push('---');
  lines.push('');

  // Sections
  currentParent = null;
  for (const cat of categories) {
    if (cat.isSubsection) {
      if (cat.parentTitle !== currentParent) {
        lines.push(`## ${cat.parentTitle}`);
        lines.push('');
        currentParent = cat.parentTitle;
      }
      lines.push(`### ${cat.title}`);
    } else {
      currentParent = null;
      lines.push(`## ${cat.title}`);
    }
    lines.push('');
    lines.push(buildItemTable(cat.items));
    lines.push('');
  }

  return lines.join('\n');
}

// ─── Main entry point ────────────────────────────────────────
export async function generateReference() {
  info('Parsing XML source files...');

  const allSources = [];
  for (const src of SOURCE_FILES) {
    const filePath = path.join(GAMECORE_DIR, src.file);
    step(`  ${src.file}`);
    const items = await parseItemFile(filePath);
    allSources.push({ id: src.id, items });
  }

  const totalParsed = allSources.reduce((sum, s) => sum + s.items.length, 0);
  info(`Parsed ${totalParsed} items from ${SOURCE_FILES.length} files.`);

  step('Categorising items...');
  const categories = categorise(allSources);

  step('Generating Markdown...');
  const markdown = generateMarkdown(categories);

  const outputDir = path.dirname(OUTPUT_FILE);
  await mkdir(outputDir, { recursive: true });
  await writeFile(OUTPUT_FILE, markdown, 'utf-8');

  console.log('');
  success(`Reference written to: ${path.relative(PROJECT_ROOT, OUTPUT_FILE)}`);
}

// ─── Direct invocation guard ─────────────────────────────────
const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isMain) {
  generateReference().catch((err) => {
    error('Unexpected error: ' + err.message);
    process.exit(1);
  });
}
