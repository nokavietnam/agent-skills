#!/usr/bin/env node
// Installer for the blog-writing Kiro Agent Skills.
//
// Installs the skills straight into an AI agent's expected location so anyone
// can pick them up. Works for Kiro, Claude Code, Google Antigravity, Hermes,
// and Codex, in either "project" scope (current/target repo) or "global" scope
// (the user's home directory).
//
// The source of truth is .kiro/skills/<name>/SKILL.md. This script reads those
// skills directly (no build step needed) and writes them to the destination
// using the same category map the exporter uses.
//
// Usage:
//   node scripts/install-skills.mjs --agent <name> [options]
//
// Options:
//   --agent <a>     kiro | claude | antigravity | hermes | codex | all   (required)
//   --scope <s>     project (default) | global
//   --target <dir>  target directory for project scope (default: cwd)
//   --dry-run       print what would happen, write nothing
//   --force         overwrite existing skill files without prompting
//   --list          list available agents and skills, then exit
//   -h, --help      show help
//
// No third-party dependencies — Node stdlib only.

import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, ".kiro", "skills");

// ---------------------------------------------------------------------------
// Category map — kept in sync with scripts/export-skills.mjs (Hermes groups by
// category folder; other agents ignore it).
// ---------------------------------------------------------------------------
const CATEGORY = {
  "blog-foundations": "foundations",
  "blog-foundations-lite": "foundations",
  "blog-review": "foundations",
  "blog-ideation-seo": "strategy-seo",
  "title-headline-writing": "strategy-seo",
  "content-optimization-distribution": "strategy-seo",
  "ai-news-writing": "topic-writing",
  "backend-engineering-writing": "topic-writing",
  "ai-coding-tips-writing": "topic-writing",
  "system-design-writing": "interview-design-writing",
  "low-level-design-writing": "interview-design-writing",
  "dsa-writing": "interview-design-writing",
  "ml-system-design-writing": "interview-design-writing",
  "behavioral-interview-writing": "interview-design-writing",
  "ai-news-review": "topic-review",
  "backend-engineering-review": "topic-review",
  "ai-coding-tips-review": "topic-review",
  "system-design-review": "interview-design-review",
  "low-level-design-review": "interview-design-review",
  "dsa-review": "interview-design-review",
  "ml-system-design-review": "interview-design-review",
  "behavioral-interview-review": "interview-design-review",
  "tutorial-writing": "format",
  "listicle-comparison-writing": "format",
  "image-diagram-authoring": "craft",
  "code-snippet-standards": "craft",
  "image-diagram-review": "craft-review",
  "code-snippet-review": "craft-review",
  "wordpress-publishing": "output-format",
  "markdown-authoring": "output-format",
  "math-formula-authoring": "output-format",
};

const CATEGORY_LABEL = {
  foundations: "Nền tảng (dùng trước tiên)",
  "strategy-seo": "Chiến lược & SEO",
  "topic-writing": "Viết theo chủ đề",
  "interview-design-writing": "Viết phỏng vấn & thiết kế",
  "topic-review": "Review theo chủ đề",
  "interview-design-review": "Review phỏng vấn & thiết kế",
  format: "Dạng bài",
  craft: "Chuẩn trình bày (hình ảnh & code)",
  "craft-review": "Review trình bày (hình ảnh & code)",
  "output-format": "Định dạng đầu ra",
  misc: "Khác",
};

const CATEGORY_ORDER = [
  "foundations",
  "strategy-seo",
  "topic-writing",
  "interview-design-writing",
  "topic-review",
  "interview-design-review",
  "format",
  "craft",
  "craft-review",
  "output-format",
  "misc",
];

// ---------------------------------------------------------------------------
// Minimal front-matter parser (name + description).
// ---------------------------------------------------------------------------
function parseSkill(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error("Missing YAML front-matter");
  const [, fmText, body] = m;
  const fm = {};
  let currentKey = null;
  for (const line of fmText.split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (kv) {
      currentKey = kv[1];
      let val = kv[2].trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      fm[currentKey] = val;
    } else if (currentKey && line.trim()) {
      fm[currentKey] += " " + line.trim();
    }
  }
  return { name: fm.name, description: fm.description, body: body.replace(/^\r?\n/, ""), raw };
}

async function readAllSkills() {
  const entries = await fs.readdir(SRC_DIR, { withFileTypes: true });
  const skills = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const skillFile = path.join(SRC_DIR, e.name, "SKILL.md");
    let raw;
    try {
      raw = await fs.readFile(skillFile, "utf8");
    } catch {
      continue;
    }
    const parsed = parseSkill(raw);
    skills.push({
      name: e.name,
      description: parsed.description || "",
      body: parsed.body,
      category: CATEGORY[e.name] || "misc",
    });
  }
  skills.sort((a, b) => a.name.localeCompare(b.name));
  return skills;
}

function groupByCategory(skills) {
  const groups = new Map();
  for (const c of CATEGORY_ORDER) groups.set(c, []);
  for (const s of skills) {
    if (!groups.has(s.category)) groups.set(s.category, []);
    groups.get(s.category).push(s);
  }
  return [...groups.entries()].filter(([, arr]) => arr.length);
}

// ---------------------------------------------------------------------------
// Rendering helpers
// ---------------------------------------------------------------------------
function stdSkillFile(name, description, body) {
  return `---\nname: ${name}\ndescription: ${description}\n---\n\n${body.trimEnd()}\n`;
}

function hermesSkillFile(s) {
  const tags = CATEGORY_LABEL[s.category] || "Blog";
  const fm =
    `---\n` +
    `name: ${s.name}\n` +
    `description: ${s.description}\n` +
    `version: 1.0.0\n` +
    `license: MIT\n` +
    `metadata:\n` +
    `  hermes:\n` +
    `    tags: [Blog, ${JSON.stringify(tags)}]\n` +
    `---\n\n`;
  return fm + s.body.trimEnd() + "\n";
}

function codexAgentsMd(skills) {
  let md =
    `# AGENTS.md — Bộ skill viết & review blog kỹ thuật\n\n` +
    `Đây là chỉ dẫn cho Codex khi làm việc trong repo này. Mỗi mục dưới đây là một "skill":\n` +
    `một quy trình chuyên biệt kèm checklist. Khi yêu cầu của người dùng khớp phần **Khi nào dùng**,\n` +
    `hãy mở file skill tương ứng trong \`.codex/skills/<name>/SKILL.md\` và tuân theo hướng dẫn trong đó.\n\n` +
    `## Nguyên tắc chung\n\n` +
    `- Áp dụng skill nền tảng trước: \`blog-foundations\` khi viết, \`blog-review\` khi review.\n` +
    `- Luôn giữ tính chân thật & độ chính xác; xác thực đa nguồn; tra cứu thông tin mới nhất.\n` +
    `- Tránh đạo văn và rủi ro bị Google phạt (people-first content, E-E-A-T).\n\n` +
    `## Danh mục skill\n\n`;
  for (const [cat, arr] of groupByCategory(skills)) {
    md += `### ${CATEGORY_LABEL[cat]}\n\n`;
    for (const s of arr) {
      md += `- **${s.name}** — ${s.description}\n  - File: \`.codex/skills/${s.name}/SKILL.md\`\n`;
    }
    md += `\n`;
  }
  return md;
}

function antigravityIndex(skills) {
  let idx = `# Skills\n\nBộ skill viết & review blog kỹ thuật. Agent nạp skill phù hợp theo mô tả bên dưới.\n\n`;
  for (const [cat, arr] of groupByCategory(skills)) {
    idx += `## ${CATEGORY_LABEL[cat]}\n\n`;
    for (const s of arr) {
      idx += `- **${s.name}** (\`skills/${s.name}/SKILL.md\`) — ${s.description}\n`;
    }
    idx += `\n`;
  }
  return idx;
}

// ---------------------------------------------------------------------------
// Agent destination resolvers.
// Each returns { base, skillPath(name), extras: [{file, content}] }
//   base       : root folder that holds the skills (used for logging)
//   skillPath  : absolute path of a skill's SKILL.md
//   extras     : index / instruction files to also write
// ---------------------------------------------------------------------------
function resolveAgent(agent, scope, target, skills) {
  const home = os.homedir();
  const projectRoot = path.resolve(target);

  switch (agent) {
    case "kiro": {
      // Kiro reads skills from .kiro/skills/<name>/SKILL.md
      const root = scope === "global" ? path.join(home, ".kiro") : path.join(projectRoot, ".kiro");
      const base = path.join(root, "skills");
      return {
        base,
        skillPath: (name) => path.join(base, name, "SKILL.md"),
        render: (s) => stdSkillFile(s.name, s.description, s.body),
        extras: [],
      };
    }
    case "claude": {
      // Claude Code: .claude/skills/<name>/SKILL.md
      const root = scope === "global" ? path.join(home, ".claude") : path.join(projectRoot, ".claude");
      const base = path.join(root, "skills");
      return {
        base,
        skillPath: (name) => path.join(base, name, "SKILL.md"),
        render: (s) => stdSkillFile(s.name, s.description, s.body),
        extras: [],
      };
    }
    case "antigravity": {
      // Antigravity: .agent/skills/<name>/SKILL.md + .agent/skills.md index
      const root = scope === "global" ? path.join(home, ".agent") : path.join(projectRoot, ".agent");
      const base = path.join(root, "skills");
      return {
        base,
        skillPath: (name) => path.join(base, name, "SKILL.md"),
        render: (s) => stdSkillFile(s.name, s.description, s.body),
        extras: [{ file: path.join(root, "skills.md"), content: antigravityIndex(skills) }],
      };
    }
    case "hermes": {
      // Hermes: skills/<category>/<name>/SKILL.md with richer front-matter
      const base = scope === "global" ? path.join(home, ".hermes", "skills") : path.join(projectRoot, "skills");
      return {
        base,
        skillPath: (name) => {
          const s = skills.find((x) => x.name === name);
          return path.join(base, s.category, name, "SKILL.md");
        },
        render: (s) => hermesSkillFile(s),
        extras: [],
      };
    }
    case "codex": {
      // Codex: AGENTS.md index at root + .codex/skills/<name>/SKILL.md
      const root = scope === "global" ? path.join(home, ".codex") : projectRoot;
      const base = scope === "global" ? path.join(root, "skills") : path.join(projectRoot, ".codex", "skills");
      const agentsMd = scope === "global"
        ? path.join(home, ".codex", "AGENTS.md")
        : path.join(projectRoot, "AGENTS.md");
      return {
        base,
        skillPath: (name) => path.join(base, name, "SKILL.md"),
        render: (s) => stdSkillFile(s.name, s.description, s.body),
        extras: [{ file: agentsMd, content: codexAgentsMd(skills) }],
      };
    }
    default:
      throw new Error(`Unknown agent: ${agent}`);
  }
}

const ALL_AGENTS = ["kiro", "claude", "antigravity", "hermes", "codex"];

// ---------------------------------------------------------------------------
// CLI parsing
// ---------------------------------------------------------------------------
function parseArgs(argv) {
  const opts = { agent: null, scope: "project", target: process.cwd(), dryRun: false, force: false, list: false, help: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    switch (a) {
      case "--agent": opts.agent = argv[++i]; break;
      case "--scope": opts.scope = argv[++i]; break;
      case "--target": opts.target = argv[++i]; break;
      case "--dry-run": opts.dryRun = true; break;
      case "--force": opts.force = true; break;
      case "--list": opts.list = true; break;
      case "-h": case "--help": opts.help = true; break;
      default:
        console.error(`Unknown argument: ${a}`);
        opts.help = true;
    }
  }
  return opts;
}

const HELP = `Install blog-writing Agent Skills into an AI agent.

Usage:
  node scripts/install-skills.mjs --agent <name> [options]

Options:
  --agent <a>     kiro | claude | antigravity | hermes | codex | all  (required)
  --scope <s>     project (default) | global
  --target <dir>  target dir for project scope (default: current directory)
  --dry-run       show what would be written, change nothing
  --force         overwrite existing skill files
  --list          list available agents and skills, then exit
  -h, --help      show this help

Examples:
  node scripts/install-skills.mjs --list
  node scripts/install-skills.mjs --agent claude --scope global
  node scripts/install-skills.mjs --agent kiro --target ../my-blog-repo
  node scripts/install-skills.mjs --agent all --scope global --force
`;

async function pathExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function installForAgent(agent, opts, skills) {
  const resolved = resolveAgent(agent, opts.scope, opts.target, skills);
  console.log(`\n> ${agent} (${opts.scope}) -> ${resolved.base}`);
  let written = 0, skipped = 0;
  for (const s of skills) {
    const dest = resolved.skillPath(s.name);
    const exists = await pathExists(dest);
    if (exists && !opts.force) {
      console.log(`  skip (exists): ${path.relative(resolved.base, dest)}`);
      skipped++;
      continue;
    }
    if (opts.dryRun) {
      console.log(`  would write: ${path.relative(resolved.base, dest)}`);
      written++;
      continue;
    }
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, resolved.render(s), "utf8");
    written++;
  }
  for (const extra of resolved.extras) {
    if (opts.dryRun) {
      console.log(`  would write index: ${extra.file}`);
      continue;
    }
    await fs.mkdir(path.dirname(extra.file), { recursive: true });
    await fs.writeFile(extra.file, extra.content, "utf8");
    console.log(`  index: ${extra.file}`);
  }
  console.log(`  ${opts.dryRun ? "planned" : "installed"} ${written} skill(s)${skipped ? `, skipped ${skipped}` : ""}.`);
  return { written, skipped };
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) { console.log(HELP); return; }

  const skills = await readAllSkills();
  if (!skills.length) {
    console.error(`No skills found under ${SRC_DIR}`);
    process.exit(1);
  }

  if (opts.list) {
    console.log(`Available agents: ${ALL_AGENTS.join(", ")}, all\n`);
    console.log(`Skills (${skills.length}):`);
    for (const [cat, arr] of groupByCategory(skills)) {
      console.log(`\n  ${CATEGORY_LABEL[cat]}`);
      for (const s of arr) console.log(`    - ${s.name}`);
    }
    return;
  }

  if (!opts.agent) {
    console.error("Error: --agent is required. Use --list to see options or --help.\n");
    console.log(HELP);
    process.exit(1);
  }
  if (opts.scope !== "project" && opts.scope !== "global") {
    console.error(`Error: --scope must be "project" or "global" (got "${opts.scope}").`);
    process.exit(1);
  }

  const agents = opts.agent === "all" ? ALL_AGENTS : [opts.agent];
  for (const a of agents) {
    if (!ALL_AGENTS.includes(a)) {
      console.error(`Error: unknown agent "${a}". Valid: ${ALL_AGENTS.join(", ")}, all.`);
      process.exit(1);
    }
  }

  console.log(`Installing ${skills.length} skill(s) for: ${agents.join(", ")}`);
  if (opts.dryRun) console.log("(dry run — nothing will be written)");

  let totalWritten = 0;
  for (const a of agents) {
    const { written } = await installForAgent(a, opts, skills);
    totalWritten += written;
  }

  console.log(`\nDone. ${opts.dryRun ? "Planned" : "Installed"} ${totalWritten} skill file(s) across ${agents.length} agent(s).`);
  if (!opts.dryRun) {
    console.log("Tip: restart / reload your agent so it picks up the new skills.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
