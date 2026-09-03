#!/usr/bin/env node
// Export Kiro skills (.kiro/skills/<name>/SKILL.md) to formats consumable by
// other AI agents: Claude Code, Google Antigravity, Hermes Agent, and Codex.
//
// All four converge on the "Agent Skills" open standard (a SKILL.md file with
// YAML front-matter: name + description). The differences are directory
// location and, for Codex, a preference for a single AGENTS.md index.
//
// This script is the single source of truth for the export. Re-run it whenever
// the skills change:  node scripts/export-skills.mjs
//
// No third-party dependencies — Node stdlib only.

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, ".kiro", "skills");
const OUT_DIR = path.join(ROOT, "export");

// ---------------------------------------------------------------------------
// Category map (used to group skills for Hermes and for index docs).
// ---------------------------------------------------------------------------
const CATEGORY = {
  "blog-foundations": "foundations",
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
  "wordpress-publishing": "output-format",
  "markdown-authoring": "output-format",
  "math-formula-authoring": "output-format",
};

// ---------------------------------------------------------------------------
// Minimal front-matter parser (name + description are simple scalars).
// ---------------------------------------------------------------------------
function parseSkill(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error("Missing YAML front-matter");
  const [, fmText, body] = m;
  const fm = {};
  const lines = fmText.split(/\r?\n/);
  let currentKey = null;
  for (const line of lines) {
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
      // folded continuation line
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
      continue; // directory without a SKILL.md
    }
    const parsed = parseSkill(raw);
    if (parsed.name !== e.name) {
      console.warn(
        `  ! warn: dir "${e.name}" != front-matter name "${parsed.name}" — using dir name`
      );
    }
    skills.push({
      dir: e.name,
      name: e.name,
      description: parsed.description || "",
      body: parsed.body,
      raw: parsed.raw,
      category: CATEGORY[e.name] || "misc",
    });
  }
  skills.sort((a, b) => a.name.localeCompare(b.name));
  return skills;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
async function rmrf(dir) {
  await fs.rm(dir, { recursive: true, force: true });
}
async function writeFile(file, content) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, content, "utf8");
}
function stdSkillFile(name, description, body) {
  // Canonical Agent Skills format: front-matter (name + description) + body.
  return `---\nname: ${name}\ndescription: ${description}\n---\n\n${body.trimEnd()}\n`;
}
const CATEGORY_LABEL = {
  foundations: "Nền tảng (dùng trước tiên)",
  "strategy-seo": "Chiến lược & SEO",
  "topic-writing": "Viết theo chủ đề",
  "interview-design-writing": "Viết phỏng vấn & thiết kế",
  "topic-review": "Review theo chủ đề",
  "interview-design-review": "Review phỏng vấn & thiết kế",
  format: "Dạng bài",
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
  "output-format",
  "misc",
];
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
// 1) Claude Code  ->  export/claude/.claude/skills/<name>/SKILL.md
//    Exact Agent Skills standard. Copy SKILL.md verbatim.
// ---------------------------------------------------------------------------
async function exportClaude(skills) {
  const base = path.join(OUT_DIR, "claude", ".claude", "skills");
  await rmrf(path.join(OUT_DIR, "claude"));
  for (const s of skills) {
    await writeFile(path.join(base, s.name, "SKILL.md"), stdSkillFile(s.name, s.description, s.body));
  }
  return skills.length;
}

// ---------------------------------------------------------------------------
// 2) Antigravity -> export/antigravity/.agent/skills/<name>/SKILL.md
//    + .agent/skills.md index. Uses the portable SKILL.md convention.
// ---------------------------------------------------------------------------
async function exportAntigravity(skills) {
  const agentDir = path.join(OUT_DIR, "antigravity", ".agent");
  const base = path.join(agentDir, "skills");
  await rmrf(path.join(OUT_DIR, "antigravity"));
  for (const s of skills) {
    await writeFile(path.join(base, s.name, "SKILL.md"), stdSkillFile(s.name, s.description, s.body));
  }
  // skills.md index that Antigravity reads to discover skills.
  let idx = `# Skills\n\nBộ skill viết & review blog kỹ thuật. Agent nạp skill phù hợp theo mô tả bên dưới.\n\n`;
  for (const [cat, arr] of groupByCategory(skills)) {
    idx += `## ${CATEGORY_LABEL[cat]}\n\n`;
    for (const s of arr) {
      idx += `- **${s.name}** (\`skills/${s.name}/SKILL.md\`) — ${s.description}\n`;
    }
    idx += `\n`;
  }
  await writeFile(path.join(agentDir, "skills.md"), idx);
  return skills.length;
}

// ---------------------------------------------------------------------------
// 3) Hermes Agent -> export/hermes/skills/<category>/<name>/SKILL.md
//    SKILL.md standard + Hermes front-matter (version/author/license/metadata).
// ---------------------------------------------------------------------------
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
async function exportHermes(skills) {
  const base = path.join(OUT_DIR, "hermes", "skills");
  await rmrf(path.join(OUT_DIR, "hermes"));
  for (const s of skills) {
    await writeFile(path.join(base, s.category, s.name, "SKILL.md"), hermesSkillFile(s));
  }
  return skills.length;
}

// ---------------------------------------------------------------------------
// 4) Codex -> export/codex/AGENTS.md (index) + .codex/skills/<name>/SKILL.md
//    AGENTS.md is Codex's primary instruction file; we also mirror the
//    portable skills so newer Codex skill discovery can pick them up.
// ---------------------------------------------------------------------------
async function exportCodex(skills) {
  await rmrf(path.join(OUT_DIR, "codex"));
  const base = path.join(OUT_DIR, "codex", ".codex", "skills");
  for (const s of skills) {
    await writeFile(path.join(base, s.name, "SKILL.md"), stdSkillFile(s.name, s.description, s.body));
  }
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
  await writeFile(path.join(OUT_DIR, "codex", "AGENTS.md"), md);
  return skills.length;
}

// ---------------------------------------------------------------------------
// Top-level export README
// ---------------------------------------------------------------------------
async function writeExportReadme(skills) {
  const total = skills.length;
  const md = `# Bản xuất skills cho các agent khác

Thư mục này được **sinh tự động** từ \`.kiro/skills/\` bằng \`scripts/export-skills.mjs\`.
Đừng sửa tay trong \`export/\`; hãy sửa skill gốc rồi chạy lại:

\`\`\`bash
node scripts/export-skills.mjs
\`\`\`

Tổng số skill xuất ra: **${total}**. Cả 4 định dạng đều dựa trên chuẩn mở
**Agent Skills** (\`SKILL.md\` + front-matter \`name\`/\`description\`), khác nhau ở
vị trí thư mục và (với Codex) có thêm \`AGENTS.md\` tổng hợp.

## Cài cho từng agent

### Claude Code (\`export/claude/\`)
Chép nội dung vào dự án hoặc cấu hình người dùng:
- Theo dự án: chép \`export/claude/.claude\` vào gốc repo đích → \`.claude/skills/<name>/SKILL.md\`.
- Toàn cục: chép các thư mục skill vào \`~/.claude/skills/\`.
Claude tự nạp skill khi mô tả khớp, hoặc gọi \`/<name>\`.

### Google Antigravity (\`export/antigravity/\`)
- Chép \`export/antigravity/.agent\` vào gốc repo đích.
- \`.agent/skills/<name>/SKILL.md\` chứa skill; \`.agent/skills.md\` là chỉ mục để agent khám phá.

### Hermes Agent (\`export/hermes/\`)
- Chép nội dung \`export/hermes/skills/\` vào thư mục \`skills/\` của Hermes (giữ theo nhóm category).
- Front-matter đã bổ sung \`version\`, \`license\`, \`metadata.hermes.tags\` cho phù hợp Hermes.
- Kiểm tra nhanh: \`hermes chat --toolsets skills -q "dùng skill blog-foundations"\`.

### Codex (\`export/codex/\`)
- \`AGENTS.md\`: đặt ở gốc repo đích để Codex đọc tự động lúc bắt đầu phiên.
- \`.codex/skills/<name>/SKILL.md\`: bản skill đầy đủ để Codex mở khi cần theo chỉ dẫn trong \`AGENTS.md\`.

## Danh sách skill

`;
  let list = "";
  for (const [cat, arr] of groupByCategory(skills)) {
    list += `### ${CATEGORY_LABEL[cat]}\n\n`;
    for (const s of arr) list += `- \`${s.name}\` — ${s.description}\n`;
    list += `\n`;
  }
  await writeFile(path.join(OUT_DIR, "README.md"), md + list);
}

// ---------------------------------------------------------------------------
async function main() {
  const skills = await readAllSkills();
  if (!skills.length) {
    console.error("No skills found under .kiro/skills/");
    process.exit(1);
  }
  console.log(`Found ${skills.length} skills.`);
  const c = await exportClaude(skills);
  console.log(`  claude:      ${c} skills`);
  const a = await exportAntigravity(skills);
  console.log(`  antigravity: ${a} skills`);
  const h = await exportHermes(skills);
  console.log(`  hermes:      ${h} skills`);
  const x = await exportCodex(skills);
  console.log(`  codex:       ${x} skills`);
  await writeExportReadme(skills);
  console.log(`Export written to ${path.relative(ROOT, OUT_DIR)}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
