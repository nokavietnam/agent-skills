---
inclusion: always
---

# Bối cảnh dự án: Bộ Skills viết Blog cho AI

> File steering này lưu context của dự án để mọi session (kể cả session mới) nắm được ngay. Đây là **ghi chú dự án**, không phải chỉ thị ghi đè hành vi cốt lõi của Kiro.

## Dự án là gì

Workspace `agent-skills` chứa một **bộ Kiro skills** giúp AI trở thành người viết blog kỹ thuật chuyên nghiệp, phủ trọn vòng đời một bài: **nghiên cứu/SEO → viết → review → đóng gói → tối ưu & phân phối**. Blog tập trung: tin tức AI, kỹ thuật Backend, tips lập trình với AI, và các chủ đề phỏng vấn/thiết kế (System Design, LLD, DSA, ML System Design, Behavioral).

Mục tiêu người dùng: (1) AI viết blog chuyên nghiệp; (2) tăng lượng truy cập (traffic) cho blog.

## Quy ước & cấu trúc

- Mỗi skill là một thư mục dưới `.kiro/skills/<tên>/SKILL.md`.
- Front-matter mỗi skill: `name` + `description` (dùng để Kiro tự kích hoạt khi yêu cầu khớp mô tả).
- Viết bằng **tiếng Việt**, giữ nguyên thuật ngữ tiếng Anh phổ biến trong giới dev.
- Có `README.md` tổng quan tại `.kiro/skills/README.md` — cập nhật nó mỗi khi thêm/sửa skill.
- Các skill chuyên biệt **kế thừa** skill nền tảng: skill viết kế thừa `blog-foundations`; skill review kế thừa `blog-review`.

## Quy tắc BẮT BUỘC khi thêm skill mới

Mỗi khi tạo một skill mới, luôn thực hiện đủ 3 việc sau trong cùng lần làm (không được bỏ sót):

1. **Tạo skill review đi kèm.** Với mỗi skill **viết/nội dung** mới (ví dụ `<tên>-writing` hoặc một skill chủ đề/dạng bài), tạo ngay skill review tương ứng `<tên>-review` kế thừa `blog-review`, soi đúng các checklist mà skill viết đó yêu cầu (cặp đối xứng viết ↔ review).
   - Ngoại lệ: skill vốn đã là skill review, hoặc skill hạ tầng/định dạng đầu ra thuần túy (ví dụ `markdown-authoring`, `wordpress-publishing`) thì không cần tạo review riêng — nêu rõ lý do khi bỏ qua.
2. **Cập nhật `.kiro/skills/README.md`** — thêm vào cây thư mục, bảng skill tương ứng, và ví dụ prompt kích hoạt (cho cả skill mới lẫn skill review đi kèm).
3. **Cập nhật thư mục export** — chạy lại `node scripts/export-skills.mjs` để sinh lại `export/` cho cả 4 agent (Claude Code, Antigravity, Hermes, Codex). Nếu skill mới thuộc nhóm category chưa có, thêm nó vào `CATEGORY` trong `scripts/export-skills.mjs` trước khi chạy.

> Tóm tắt: **skill viết mới ⇒ luôn kèm skill review + cập nhật README + chạy lại export.**

## Danh sách skill hiện có (26 skill + README)

**Nền tảng**
- `blog-foundations` — nền tảng viết (dùng đầu tiên khi viết).
- `blog-review` — nền tảng review (dùng đầu tiên khi review).

**Chủ đề — viết** (kế thừa `blog-foundations`)
- `ai-news-writing`, `backend-engineering-writing`, `ai-coding-tips-writing`
- `system-design-writing`, `low-level-design-writing`, `dsa-writing`, `ml-system-design-writing`, `behavioral-interview-writing`

**Chủ đề — review** (kế thừa `blog-review`) — mỗi skill viết chủ đề đều có review đi kèm
- `ai-news-review`, `backend-engineering-review`, `ai-coding-tips-review`
- `system-design-review`, `low-level-design-review`, `dsa-review`, `ml-system-design-review`, `behavioral-interview-review`

**Dạng bài (format)** — chồng lên skill chủ đề
- `tutorial-writing`, `listicle-comparison-writing`

**Chiến lược & SEO (tăng traffic)**
- `blog-ideation-seo` (trước khi viết), `title-headline-writing`, `content-optimization-distribution` (sau khi xuất bản)

**Định dạng đầu ra**
- `wordpress-publishing`, `markdown-authoring`, `math-formula-authoring`

## Nguyên tắc cốt lõi đã thống nhất (đã nhúng trong các skill)

Người dùng đã yêu cầu và các skill đã phản ánh những nguyên tắc sau — giữ nhất quán khi tạo/sửa skill:

1. **Tính chân thật & độ chính xác là trên hết** (mục 0 của `blog-foundations`): không bịa đặt, không suy diễn quá dữ liệu, không viết sai lệch; phân biệt sự thật / suy luận / quan điểm; nêu mức độ chắc chắn.
2. **Xác thực đa nguồn:** dữ kiện quan trọng kiểm qua ≥ 2 nguồn độc lập, ưu tiên nguồn gốc/chính thức.
3. **Luôn dùng thông tin mới nhất tại thời điểm viết:** bắt buộc web search cho phiên bản/giá/tính năng/số liệu; không tin trí nhớ model; đối chiếu mốc thời gian với ngày hiện tại.
4. **SEO & tránh bị Google phạt** (mục 5b): people-first content, giá trị gốc, tránh scaled content abuse, thể hiện E-E-A-T, không clickbait/nhồi từ khóa.
5. **Chống đạo văn** (mục 6b): viết bằng lời của mình, trích dẫn có ngoặc kép + nguồn, ghi công, cẩn trọng đạo văn code/license.
6. **Trade-off & code chạy được** cho bài kỹ thuật; **sơ đồ Mermaid** cho kiến trúc/luồng.

## Cặp đối xứng viết ↔ review

Mỗi skill review kiểm tra chính các checklist mà skill viết yêu cầu. `blog-review` có quy trình 8 trục, phân loại 🔴 Blocker / 🟡 Nên sửa / 🟢 Gợi ý, và format báo cáo chuẩn (kèm đánh giá: độ chính xác, rủi ro SEO/spam, rủi ro đạo văn).

## Xuất skills cho agent khác

- Bộ skill được xuất sang 4 định dạng agent trong thư mục `export/`, sinh tự động bằng `scripts/export-skills.mjs` (Node stdlib, không phụ thuộc ngoài).
- Cả 4 đều dựa trên chuẩn mở **Agent Skills** (`SKILL.md` + front-matter `name`/`description`):
  - **Claude Code** → `export/claude/.claude/skills/<name>/SKILL.md` (nguyên format).
  - **Antigravity** → `export/antigravity/.agent/skills/<name>/SKILL.md` + `.agent/skills.md` (chỉ mục).
  - **Hermes** → `export/hermes/skills/<category>/<name>/SKILL.md` (thêm front-matter `version`/`license`/`metadata.hermes.tags`).
  - **Codex** → `export/codex/AGENTS.md` (chỉ mục tổng hợp) + `.codex/skills/<name>/SKILL.md`.
- **Đừng sửa tay trong `export/`.** Sửa skill gốc trong `.kiro/skills/` rồi chạy lại script.

## Việc còn có thể làm tiếp (gợi ý, chưa làm)

- Hook `PostFileSave`/`Stop` để nhắc chạy checklist xác thực hoặc kiểm đạo văn, và nhắc chạy lại export sau khi sửa skill.
- Skill SEO kỹ thuật cấp site (schema/structured data, sitemap, tốc độ tải) — nằm ngoài phạm vi nội dung.

## Khi tiếp tục dự án trong session mới

- Đọc `.kiro/skills/README.md` để nắm ảnh tổng quan cập nhật nhất.
- Khi thêm skill mới: theo đúng cấu trúc thư mục + front-matter, kế thừa skill nền tảng phù hợp, rồi làm đủ **quy tắc BẮT BUỘC khi thêm skill mới** ở trên (tạo skill review đi kèm + cập nhật README + chạy lại `node scripts/export-skills.mjs`).
- Giữ nhất quán 6 nguyên tắc cốt lõi ở trên.
