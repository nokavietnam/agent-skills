# Bản xuất skills cho các agent khác

Thư mục này được **sinh tự động** từ `.kiro/skills/` bằng `scripts/export-skills.mjs`.
Đừng sửa tay trong `export/`; hãy sửa skill gốc rồi chạy lại:

```bash
node scripts/export-skills.mjs
```

Tổng số skill xuất ra: **26**. Cả 4 định dạng đều dựa trên chuẩn mở
**Agent Skills** (`SKILL.md` + front-matter `name`/`description`), khác nhau ở
vị trí thư mục và (với Codex) có thêm `AGENTS.md` tổng hợp.

## Cài cho từng agent

### Claude Code (`export/claude/`)
Chép nội dung vào dự án hoặc cấu hình người dùng:
- Theo dự án: chép `export/claude/.claude` vào gốc repo đích → `.claude/skills/<name>/SKILL.md`.
- Toàn cục: chép các thư mục skill vào `~/.claude/skills/`.
Claude tự nạp skill khi mô tả khớp, hoặc gọi `/<name>`.

### Google Antigravity (`export/antigravity/`)
- Chép `export/antigravity/.agent` vào gốc repo đích.
- `.agent/skills/<name>/SKILL.md` chứa skill; `.agent/skills.md` là chỉ mục để agent khám phá.

### Hermes Agent (`export/hermes/`)
- Chép nội dung `export/hermes/skills/` vào thư mục `skills/` của Hermes (giữ theo nhóm category).
- Front-matter đã bổ sung `version`, `license`, `metadata.hermes.tags` cho phù hợp Hermes.
- Kiểm tra nhanh: `hermes chat --toolsets skills -q "dùng skill blog-foundations"`.

### Codex (`export/codex/`)
- `AGENTS.md`: đặt ở gốc repo đích để Codex đọc tự động lúc bắt đầu phiên.
- `.codex/skills/<name>/SKILL.md`: bản skill đầy đủ để Codex mở khi cần theo chỉ dẫn trong `AGENTS.md`.

## Danh sách skill

### Nền tảng (dùng trước tiên)

- `blog-foundations` — Nền tảng dùng chung cho mọi bài blog kỹ thuật — giọng văn, cấu trúc bài, chuẩn SEO, quy tắc trích dẫn nguồn, và formatting Markdown. Kích hoạt skill này TRƯỚC khi viết bất kỳ bài blog nào (tin tức AI, kỹ thuật Backend, tips lập trình với AI). Các skill viết chuyên biệt đều kế thừa các quy tắc ở đây.
- `blog-review` — Nền tảng review bài blog kỹ thuật trước khi xuất bản — quy trình review, tiêu chí chấm, phân loại mức độ nghiêm trọng của lỗi, và format báo cáo review chuẩn. Kích hoạt khi người dùng muốn review, biên tập, kiểm tra, hoặc góp ý một bài blog. Các skill review chuyên biệt (tin tức, Backend, tips AI) kế thừa từ đây.

### Chiến lược & SEO

- `blog-ideation-seo` — Nghiên cứu ý tưởng và từ khóa trước khi viết blog — tìm chủ đề có nhu cầu tìm kiếm thật, xác định search intent, phân tích đối thủ, xây topic cluster để tăng traffic tự nhiên. Kích hoạt khi người dùng muốn brainstorm chủ đề, nghiên cứu từ khóa, lập kế hoạch nội dung, hoặc hỏi "viết về gì để có traffic". Kế thừa quy tắc từ blog-foundations.
- `content-optimization-distribution` — Tăng traffic cho blog sau khi xuất bản — cập nhật/làm mới bài cũ (content refresh), tối ưu internal linking và topic cluster, cải thiện bài đang tụt hạng, và phân phối bài qua các kênh. Kích hoạt khi người dùng muốn tăng traffic, tối ưu bài đã có, làm mới nội dung cũ, hoặc lập kế hoạch phân phối. Kế thừa quy tắc từ blog-foundations.
- `title-headline-writing` — Viết tiêu đề và meta title cho blog để tăng tỷ lệ nhấp (CTR) trên Google và mạng xã hội mà không clickbait — công thức tiêu đề, tối ưu độ dài, đặt từ khóa, và tạo nhiều biến thể để chọn. Kích hoạt khi người dùng muốn đặt/tối ưu tiêu đề, headline, hoặc meta title. Kế thừa quy tắc từ blog-foundations.

### Viết theo chủ đề

- `ai-coding-tips-writing` — Viết bài blog về tips & tricks lập trình với sự hỗ trợ của AI — prompt engineering cho code, workflow với AI coding agent (Copilot, Cursor, Kiro, Claude Code...), review code do AI sinh, và tăng năng suất khi pair-programming với AI. Kích hoạt khi người dùng muốn viết bài mẹo, hướng dẫn, hoặc chia sẻ workflow lập trình bằng AI. Kế thừa quy tắc từ skill blog-foundations.
- `ai-news-writing` — Viết bài blog tin tức về AI — cập nhật model mới, sản phẩm, nghiên cứu, sự kiện ngành AI. Kích hoạt khi người dùng muốn viết bài tin tức, tổng hợp, hoặc phân tích một sự kiện/thông báo liên quan tới AI. Kế thừa quy tắc từ skill blog-foundations và bổ sung quy trình kiểm chứng nguồn cho tin tức.
- `backend-engineering-writing` — Viết bài blog kỹ thuật về lập trình Backend — API design, database, caching, message queue, kiến trúc hệ thống, concurrency, performance, observability. Kích hoạt khi người dùng muốn viết bài hướng dẫn, phân tích, hoặc chia sẻ kinh nghiệm kỹ thuật Backend. Kế thừa quy tắc từ skill blog-foundations và bổ sung chuẩn về code example, sơ đồ kiến trúc, và giải thích trade-offs.

### Viết phỏng vấn & thiết kế

- `behavioral-interview-writing` — Viết bài về phỏng vấn hành vi (Behavioral Interview) — chuẩn bị câu trả lời theo phương pháp STAR, các câu hỏi thường gặp (leadership, conflict, failure), cách kể chuyện chân thật và thuyết phục cho phỏng vấn kỹ thuật. Kích hoạt khi người dùng muốn viết bài về behavioral interview, STAR method, hoặc soft skills phỏng vấn. Kế thừa quy tắc từ blog-foundations.
- `dsa-writing` — Viết bài về cấu trúc dữ liệu & giải thuật (DSA) — giải thích thuật toán, lời giải bài toán coding (LeetCode-style), phân tích độ phức tạp, luyện phỏng vấn coding. Kích hoạt khi người dùng muốn viết bài về data structures, algorithms, lời giải bài toán, hoặc big-O. Kế thừa quy tắc từ blog-foundations.
- `low-level-design-writing` — Viết bài về thiết kế cấp thấp (Low-Level Design / LLD) — thiết kế hướng đối tượng, class diagram, design pattern, SOLID, thiết kế API/class cho một chức năng (ví dụ: parking lot, thang máy, splitwise). Kích hoạt khi người dùng muốn viết bài LLD, OOP design, design pattern, hoặc luyện phỏng vấn LLD. Kế thừa quy tắc từ blog-foundations.
- `ml-system-design-writing` — Viết bài về thiết kế hệ thống ML (ML System Design) — thiết kế hệ thống machine learning end-to-end (recommendation, search ranking, feed, fraud detection), chuẩn bị phỏng vấn ML system design. Kích hoạt khi người dùng muốn viết bài ML system design, MLOps, pipeline dữ liệu/mô hình, hoặc thiết kế hệ thống ML. Kế thừa quy tắc từ blog-foundations.
- `system-design-writing` — Viết bài về thiết kế hệ thống (System Design) — thiết kế hệ thống quy mô lớn, chuẩn bị phỏng vấn system design, phân tích kiến trúc (URL shortener, news feed, chat, rate limiter...). Kích hoạt khi người dùng muốn viết bài system design, kiến trúc phân tán, scalability, hoặc luyện phỏng vấn SD. Kế thừa quy tắc từ blog-foundations.

### Review theo chủ đề

- `ai-coding-tips-review` — Review bài blog tips & tricks lập trình với AI trước khi xuất bản — tập trung tính kiểm chứng được của mẹo, ví dụ prompt trước/sau, việc nêu rủi ro của AI (hallucination, bảo mật, review), và tính trung lập với công cụ. Kích hoạt khi người dùng muốn review/kiểm tra một bài tips lập trình với AI. Kế thừa quy trình từ skill blog-review.
- `ai-news-review` — Review bài blog tin tức AI trước khi xuất bản — tập trung kiểm chứng nguồn chính thức, tính chính xác của benchmark/số liệu, mốc thời gian, và phát hiện clickbait. Kích hoạt khi người dùng muốn review/kiểm tra một bài tin tức AI. Kế thừa quy trình từ skill blog-review.
- `backend-engineering-review` — Review bài blog kỹ thuật Backend trước khi xuất bản — tập trung tính đúng đắn và an toàn của code example, độ chính xác kỹ thuật, sự đầy đủ của trade-offs, và điều kiện đo của benchmark. Kích hoạt khi người dùng muốn review/kiểm tra một bài kỹ thuật Backend. Kế thừa quy trình từ skill blog-review.

### Review phỏng vấn & thiết kế

- `behavioral-interview-review` — Review bài blog phỏng vấn hành vi (Behavioral Interview) trước khi xuất bản — soi tính chân thật (không khuyến khích bịa thành tích), cấu trúc STAR đầy đủ, ví dụ mẫu được đánh dấu rõ, câu trả lời cụ thể tập trung ngôi "tôi", và lời khuyên có tính hành động. Kích hoạt khi người dùng muốn review/kiểm tra một bài behavioral interview hoặc kỹ năng mềm phỏng vấn. Kế thừa quy trình từ skill blog-review.
- `dsa-review` — Review bài blog cấu trúc dữ liệu & giải thuật (DSA) trước khi xuất bản — soi tính đúng và chạy được của code, độ chính xác của phân tích độ phức tạp, sự đầy đủ của edge cases, có trực giác và dry-run, và đi từ brute-force đến tối ưu. Kích hoạt khi người dùng muốn review/kiểm tra một bài DSA hoặc lời giải bài toán coding. Kế thừa quy trình từ skill blog-review.
- `low-level-design-review` — Review bài blog thiết kế cấp thấp (Low-Level Design / LLD) trước khi xuất bản — soi việc bắt đầu từ yêu cầu, chất lượng class diagram, dùng design pattern đúng chỗ, tuân SOLID, code minh họa chạy được, và khả năng mở rộng. Kích hoạt khi người dùng muốn review/kiểm tra một bài LLD hoặc OOP design. Kế thừa quy trình từ skill blog-review.
- `ml-system-design-review` — Review bài blog thiết kế hệ thống ML (ML System Design) trước khi xuất bản — soi việc bắt đầu từ bài toán nghiệp vụ, đóng khung ML, chống data leakage và training–serving skew, chọn metric đúng (offline/online, A/B test), giám sát drift, và độ chính xác khái niệm ML. Kích hoạt khi người dùng muốn review/kiểm tra một bài ML System Design. Kế thừa quy trình từ skill blog-review.
- `system-design-review` — Review bài blog thiết kế hệ thống (System Design) trước khi xuất bản — soi tính đúng của yêu cầu, capacity estimation, sơ đồ kiến trúc, độ đầy đủ của trade-offs, và độ chính xác của khái niệm lý thuyết (CAP, consistency). Kích hoạt khi người dùng muốn review/kiểm tra một bài System Design. Kế thừa quy trình từ skill blog-review.

### Dạng bài

- `listicle-comparison-writing` — Viết bài dạng danh sách (listicle "N cách/công cụ/mẹo...") và bài so sánh (comparison "X vs Y") cho blog kỹ thuật — cấu trúc mỗi mục nhất quán, tiêu chí so sánh khách quan, bảng so sánh, và khuyến nghị theo ngữ cảnh. Kích hoạt khi người dùng muốn viết listicle, roundup, hoặc so sánh công nghệ/công cụ. Kế thừa quy tắc từ blog-foundations.
- `tutorial-writing` — Viết bài hướng dẫn từng bước (how-to / tutorial) cho blog kỹ thuật — cấu trúc theo bước, phần prerequisites, code chạy được và kiểm chứng, xử lý lỗi thường gặp, và tối ưu để xếp hạng cho từ khóa "cách/how to". Kích hoạt khi người dùng muốn viết hướng dẫn, tutorial, hoặc bài how-to. Kế thừa quy tắc từ blog-foundations.

### Định dạng đầu ra

- `markdown-authoring` — Xuất bài blog ra file Markdown theo tùy chỉnh của người dùng — chọn flavor (GitHub Flavored Markdown, MDX, Hugo, Docusaurus, Jekyll, Obsidian), cấu hình front-matter, mục lục (TOC), callout/admonition, và mức độ định dạng mong muốn. Kích hoạt khi người dùng muốn xuất bài dạng file .md/.mdx hoặc tùy biến cách trình bày Markdown. Kế thừa quy tắc nội dung từ skill blog-foundations.
- `math-formula-authoring` — Viết công thức toán học (LaTeX/KaTeX/MathJax) hiển thị đúng và chính xác trên cả WordPress và Markdown — chọn delimiter đúng nền tảng, escape ký tự dễ vỡ ($, \, _, *, |, backslash), phân biệt inline vs display, và kiểm tra công thức trước khi đăng. Kích hoạt khi bài có công thức toán (DSA/big-O, ML metric, xác suất, system design capacity, đại số). Kế thừa quy tắc từ blog-foundations.
- `wordpress-publishing` — Định dạng và chuẩn bị bài blog để xuất bản lên WordPress — chọn giữa block editor (Gutenberg) và Classic HTML, tạo metadata (title, slug, excerpt, categories, tags), chèn code block đúng cách, featured image, cấu hình SEO (Yoast/Rank Math), và tùy chọn đăng tự động qua WordPress REST API. Kích hoạt khi người dùng muốn viết/đăng bài lên web WordPress. Kế thừa quy tắc nội dung từ skill blog-foundations.

