# agent-skills

Bộ **Kiro Agent Skills** giúp AI trở thành người viết blog kỹ thuật chuyên nghiệp — bao trọn vòng đời một bài viết: **nghiên cứu chủ đề/SEO → viết → review → đóng gói → tối ưu & phân phối**, với mục tiêu tạo nội dung chất lượng và tăng traffic tự nhiên.

Chủ đề bao phủ: tin tức AI, kỹ thuật Backend, tips lập trình với AI, và các chủ đề phỏng vấn/thiết kế (System Design, Low-Level Design, DSA, ML System Design, Behavioral).

## Điểm nổi bật

- **26 skill** phối hợp theo cặp đối xứng **viết ↔ review**, cùng các skill chiến lược SEO, dạng bài, và định dạng đầu ra.
- **Tính chân thật & độ chính xác lên hàng đầu**: không bịa đặt, xác thực đa nguồn, luôn tra cứu thông tin mới nhất tại thời điểm viết.
- **Chuẩn mở Agent Skills** (`SKILL.md` + front-matter `name`/`description`) — tự kích hoạt khi yêu cầu khớp mô tả.
- **Xuất sang 4 agent**: Claude Code, Google Antigravity, Hermes, Codex.

## Cài đặt nhanh

Để cả nhóm cùng dùng, cài bộ skill thẳng vào AI agent của bạn (Kiro, Claude Code, Antigravity, Hermes, Codex). Cần **Node.js** và chạy từ gốc repo:

```powershell
# Windows (PowerShell)
.\install.ps1 -List                          # xem agent & skill có thể cài
.\install.ps1 -Agent claude -Scope global    # cài toàn cục cho Claude Code
```

```bash
# macOS / Linux
./install.sh --list
./install.sh --agent claude --scope global
```

Cài cho tất cả agent một lần: `node scripts/install-skills.mjs --agent all --scope global`.

Hướng dẫn đầy đủ (chọn agent, project vs global scope, `--force`, `--dry-run`) xem tại [`INSTALL.md`](INSTALL.md).

## Cấu trúc thư mục

```
agent-skills/
├── .kiro/
│   ├── skills/        # 26 skill gốc (nguồn chân lý) + README chi tiết
│   ├── steering/      # Context & quy ước dự án
│   └── hooks/         # Hook tự động (vd: export lại khi lưu skill)
├── content/
│   └── posts/         # Bài viết mẫu
├── export/            # Bản xuất tự động cho 4 agent (KHÔNG sửa tay)
│   ├── claude/        # Claude Code  → .claude/skills/<name>/SKILL.md
│   ├── antigravity/   # Antigravity  → .agent/skills/<name>/SKILL.md + skills.md
│   ├── hermes/        # Hermes       → skills/<category>/<name>/SKILL.md
│   └── codex/         # Codex        → AGENTS.md + .codex/skills/<name>/SKILL.md
├── scripts/
│   ├── export-skills.mjs   # Sinh lại toàn bộ export/ (Node stdlib)
│   └── install-skills.mjs  # Cài skill thẳng vào agent (Node stdlib)
├── install.ps1             # Wrapper cài đặt cho Windows (PowerShell)
├── install.sh              # Wrapper cài đặt cho macOS/Linux (bash)
└── INSTALL.md              # Hướng dẫn cài đặt đầy đủ
```

## Danh sách skill

**Nền tảng** (dùng đầu tiên): `blog-foundations` (viết), `blog-review` (review).

**Chiến lược & SEO**: `blog-ideation-seo`, `title-headline-writing`, `content-optimization-distribution`.

**Viết theo chủ đề**: `ai-news-writing`, `backend-engineering-writing`, `ai-coding-tips-writing`, `system-design-writing`, `low-level-design-writing`, `dsa-writing`, `ml-system-design-writing`, `behavioral-interview-writing`.

**Review theo chủ đề** (đối xứng với skill viết): `ai-news-review`, `backend-engineering-review`, `ai-coding-tips-review`, `system-design-review`, `low-level-design-review`, `dsa-review`, `ml-system-design-review`, `behavioral-interview-review`.

**Dạng bài**: `tutorial-writing`, `listicle-comparison-writing`.

**Định dạng đầu ra**: `wordpress-publishing`, `markdown-authoring`, `math-formula-authoring`.

> Danh mục đầy đủ, mô tả từng skill và ví dụ prompt kích hoạt xem tại [`.kiro/skills/README.md`](.kiro/skills/README.md).

## Quy trình đầy đủ

```
1. Nghiên cứu   → blog-ideation-seo   (chọn chủ đề có nhu cầu + Content Brief)
2. Viết         → blog-foundations + skill chủ đề + skill dạng bài
3. Tiêu đề      → title-headline-writing
4. Review       → blog-review + skill review chuyên biệt
5. Đóng gói     → wordpress-publishing / markdown-authoring
6. Tăng traffic → content-optimization-distribution (refresh, internal link, phân phối)
```

## Xuất skills cho agent khác

`export/` được **sinh tự động** từ `.kiro/skills/`. Đừng sửa tay trong `export/` — sửa skill gốc rồi chạy lại:

```bash
node scripts/export-skills.mjs
```

Hướng dẫn cài cho từng agent (Claude Code, Antigravity, Hermes, Codex) xem tại [`export/README.md`](export/README.md).

## Đóng góp / thêm skill mới

Khi thêm một skill viết/nội dung mới, luôn làm đủ 3 việc trong cùng lần:

1. Tạo **skill review đi kèm** (`<tên>-review`) kế thừa `blog-review`, soi đúng checklist mà skill viết yêu cầu.
2. Cập nhật [`.kiro/skills/README.md`](.kiro/skills/README.md) (cây thư mục, bảng skill, ví dụ prompt).
3. Chạy lại `node scripts/export-skills.mjs` để sinh lại `export/`.

## License

Xem [LICENSE](LICENSE).
