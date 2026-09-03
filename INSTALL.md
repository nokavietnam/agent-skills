# Cài đặt bộ skill cho mọi người dùng

Bộ skill viết & review blog này có thể cài trực tiếp vào AI agent của bạn để cả nhóm cùng dùng. Installer đọc skill gốc từ `.kiro/skills/` và ghi vào đúng vị trí mà từng agent mong đợi — không cần build trước.

Hỗ trợ 5 agent: **Kiro, Claude Code, Google Antigravity, Hermes, Codex**.

## Yêu cầu

- **Node.js** (v16 trở lên) có trên `PATH`. Kiểm tra: `node --version`.
- Đã `git clone` (hoặc tải) repo này về máy.

## Cách nhanh nhất

Chạy từ thư mục gốc của repo.

**Windows (PowerShell):**

```powershell
# Xem trước các agent và skill có thể cài
.\install.ps1 -List

# Cài toàn cục cho Claude Code (dùng cho mọi dự án)
.\install.ps1 -Agent claude -Scope global

# Cài vào một dự án cụ thể (theo project)
.\install.ps1 -Agent kiro -Target ..\my-blog-repo
```

**macOS / Linux (bash):**

```bash
chmod +x install.sh   # chỉ cần lần đầu

./install.sh --list
./install.sh --agent claude --scope global
./install.sh --agent kiro --target ../my-blog-repo
```

Cả hai wrapper chỉ gọi lại installer Node bên dưới. Bạn cũng có thể chạy thẳng:

```bash
node scripts/install-skills.mjs --agent all --scope global
```

## Chọn agent

| Agent | Giá trị `--agent` | Vị trí cài (project scope) |
| --- | --- | --- |
| Kiro | `kiro` | `<target>/.kiro/skills/<name>/SKILL.md` |
| Claude Code | `claude` | `<target>/.claude/skills/<name>/SKILL.md` |
| Google Antigravity | `antigravity` | `<target>/.agent/skills/<name>/SKILL.md` + `.agent/skills.md` |
| Hermes | `hermes` | `<target>/skills/<category>/<name>/SKILL.md` |
| Codex | `codex` | `<target>/.codex/skills/<name>/SKILL.md` + `AGENTS.md` |
| Tất cả | `all` | cài cho cả 5 agent |

## Chọn scope

- `--scope project` (mặc định): cài vào thư mục dự án (mặc định là thư mục hiện tại, hoặc `--target <dir>`). Dùng khi muốn skill đi kèm một repo cụ thể.
- `--scope global`: cài vào thư mục người dùng (`~`) để mọi dự án đều dùng được.

Vị trí global theo từng agent:

| Agent | Vị trí cài (global scope) |
| --- | --- |
| Kiro | `~/.kiro/skills/` |
| Claude Code | `~/.claude/skills/` |
| Antigravity | `~/.agent/skills/` + `~/.agent/skills.md` |
| Hermes | `~/.hermes/skills/` |
| Codex | `~/.codex/skills/` + `~/.codex/AGENTS.md` |

## Các tùy chọn khác

| Tùy chọn (Node) | PowerShell | Ý nghĩa |
| --- | --- | --- |
| `--agent <a>` | `-Agent <a>` | Agent đích (bắt buộc trừ khi dùng `--list`) |
| `--scope <s>` | `-Scope <s>` | `project` (mặc định) hoặc `global` |
| `--target <dir>` | `-Target <dir>` | Thư mục đích cho project scope (mặc định: thư mục hiện tại) |
| `--dry-run` | `-DryRun` | In ra những gì sẽ ghi, không thay đổi file |
| `--force` | `-Force` | Ghi đè skill đã tồn tại (mặc định sẽ bỏ qua) |
| `--list` | `-List` | Liệt kê agent và skill rồi thoát |

Mặc định installer **không ghi đè** file đã tồn tại (in `skip (exists)`). Muốn cập nhật lên bản mới, thêm `--force` / `-Force`.

## Ví dụ đầy đủ

```bash
# Xem trước sẽ cài gì cho Codex ở scope global mà không ghi ra đĩa
node scripts/install-skills.mjs --agent codex --scope global --dry-run

# Cài cho tất cả agent ở global và ghi đè bản cũ
node scripts/install-skills.mjs --agent all --scope global --force

# Cài Antigravity vào một repo khác
node scripts/install-skills.mjs --agent antigravity --target /path/to/team-repo
```

## Sau khi cài

- Khởi động lại / reload agent để nó nạp skill mới.
- Agent sẽ tự kích hoạt skill khi yêu cầu của bạn khớp phần mô tả (`description`) trong front-matter, hoặc bạn gọi skill theo tên tùy agent.
- Bắt đầu bằng skill nền tảng: `blog-foundations` (khi viết) và `blog-review` (khi review).

## Cập nhật khi skill thay đổi

Skill gốc nằm ở `.kiro/skills/`. Khi có bản mới:

```bash
git pull
node scripts/install-skills.mjs --agent <agent> --scope <scope> --force
```

> Lưu ý: `install-skills.mjs` cài trực tiếp vào agent. Nếu chỉ muốn sinh bản xuất trong thư mục `export/` (để copy tay hoặc kiểm tra), dùng `node scripts/export-skills.mjs`.
