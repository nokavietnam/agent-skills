# Skills

Bộ skill viết & review blog kỹ thuật. Agent nạp skill phù hợp theo mô tả bên dưới.

## Nền tảng (dùng trước tiên)

- **blog-foundations** (`skills/blog-foundations/SKILL.md`) — Nền tảng dùng chung cho mọi bài blog kỹ thuật — giọng văn, cấu trúc bài, chuẩn SEO, quy tắc trích dẫn nguồn, và formatting Markdown. Kích hoạt skill này TRƯỚC khi viết bất kỳ bài blog nào (tin tức AI, kỹ thuật Backend, tips lập trình với AI). Các skill viết chuyên biệt đều kế thừa các quy tắc ở đây.
- **blog-review** (`skills/blog-review/SKILL.md`) — Nền tảng review bài blog kỹ thuật trước khi xuất bản — quy trình review, tiêu chí chấm, phân loại mức độ nghiêm trọng của lỗi, và format báo cáo review chuẩn. Kích hoạt khi người dùng muốn review, biên tập, kiểm tra, hoặc góp ý một bài blog. Mọi skill review chuyên biệt (tin tức AI, Backend, tips AI, System Design, LLD, DSA, ML System Design, behavioral) kế thừa từ đây.

## Chiến lược & SEO

- **blog-ideation-seo** (`skills/blog-ideation-seo/SKILL.md`) — Nghiên cứu ý tưởng và từ khóa trước khi viết blog — tìm chủ đề có nhu cầu tìm kiếm thật, xác định search intent, phân tích đối thủ, xây topic cluster để tăng traffic tự nhiên. Kích hoạt khi người dùng muốn brainstorm chủ đề, nghiên cứu từ khóa, lập kế hoạch nội dung, hoặc hỏi "viết về gì để có traffic". Kế thừa quy tắc từ blog-foundations.
- **content-optimization-distribution** (`skills/content-optimization-distribution/SKILL.md`) — Tăng traffic cho blog sau khi xuất bản — cập nhật/làm mới bài cũ (content refresh), tối ưu internal linking và topic cluster, cải thiện bài đang tụt hạng, và phân phối bài qua các kênh. Kích hoạt khi người dùng muốn tăng traffic, tối ưu bài đã có, làm mới nội dung cũ, hoặc lập kế hoạch phân phối. Kế thừa quy tắc từ blog-foundations.
- **title-headline-writing** (`skills/title-headline-writing/SKILL.md`) — Viết tiêu đề và meta title cho blog để tăng tỷ lệ nhấp (CTR) trên Google và mạng xã hội mà không clickbait — công thức tiêu đề, tối ưu độ dài, đặt từ khóa, và tạo nhiều biến thể để chọn. Kích hoạt khi người dùng muốn đặt/tối ưu tiêu đề, headline, hoặc meta title. Kế thừa quy tắc từ blog-foundations.

## Viết theo chủ đề

- **ai-coding-tips-writing** (`skills/ai-coding-tips-writing/SKILL.md`) — Viết bài blog về tips & tricks lập trình với sự hỗ trợ của AI — prompt engineering cho code, workflow với AI coding agent (Copilot, Cursor, Kiro, Claude Code...), review code do AI sinh, và tăng năng suất khi pair-programming với AI. Kích hoạt khi người dùng muốn viết bài mẹo, hướng dẫn, hoặc chia sẻ workflow lập trình bằng AI. Kế thừa quy tắc từ skill blog-foundations.
- **ai-news-writing** (`skills/ai-news-writing/SKILL.md`) — Viết bài blog tin tức về AI — cập nhật model mới, sản phẩm, nghiên cứu, sự kiện ngành AI. Kích hoạt khi người dùng muốn viết bài tin tức, tổng hợp, hoặc phân tích một sự kiện/thông báo liên quan tới AI. Kế thừa quy tắc từ skill blog-foundations và bổ sung quy trình kiểm chứng nguồn cho tin tức.
- **backend-engineering-writing** (`skills/backend-engineering-writing/SKILL.md`) — Viết bài blog kỹ thuật về lập trình Backend — API design, database, caching, message queue, kiến trúc hệ thống, concurrency, performance, observability. Kích hoạt khi người dùng muốn viết bài hướng dẫn, phân tích, hoặc chia sẻ kinh nghiệm kỹ thuật Backend. Kế thừa quy tắc từ skill blog-foundations và bổ sung chuẩn về code example, sơ đồ kiến trúc, và giải thích trade-offs.

## Viết phỏng vấn & thiết kế

- **behavioral-interview-writing** (`skills/behavioral-interview-writing/SKILL.md`) — Viết bài về phỏng vấn hành vi (Behavioral Interview) — chuẩn bị câu trả lời theo phương pháp STAR, các câu hỏi thường gặp (leadership, conflict, failure), cách kể chuyện chân thật và thuyết phục cho phỏng vấn kỹ thuật. Kích hoạt khi người dùng muốn viết bài về behavioral interview, STAR method, hoặc soft skills phỏng vấn. Kế thừa quy tắc từ blog-foundations.
- **dsa-writing** (`skills/dsa-writing/SKILL.md`) — Viết bài về cấu trúc dữ liệu & giải thuật (DSA) — giải thích thuật toán, lời giải bài toán coding (LeetCode-style), phân tích độ phức tạp, luyện phỏng vấn coding. Kích hoạt khi người dùng muốn viết bài về data structures, algorithms, lời giải bài toán, hoặc big-O. Kế thừa quy tắc từ blog-foundations.
- **low-level-design-writing** (`skills/low-level-design-writing/SKILL.md`) — Viết bài về thiết kế cấp thấp (Low-Level Design / LLD) — thiết kế hướng đối tượng, class diagram, design pattern, SOLID, thiết kế API/class cho một chức năng (ví dụ: parking lot, thang máy, splitwise). Kích hoạt khi người dùng muốn viết bài LLD, OOP design, design pattern, hoặc luyện phỏng vấn LLD. Kế thừa quy tắc từ blog-foundations.
- **ml-system-design-writing** (`skills/ml-system-design-writing/SKILL.md`) — Viết bài về thiết kế hệ thống ML (ML System Design) — thiết kế hệ thống machine learning end-to-end (recommendation, search ranking, feed, fraud detection), chuẩn bị phỏng vấn ML system design. Kích hoạt khi người dùng muốn viết bài ML system design, MLOps, pipeline dữ liệu/mô hình, hoặc thiết kế hệ thống ML. Kế thừa quy tắc từ blog-foundations.
- **system-design-writing** (`skills/system-design-writing/SKILL.md`) — Viết bài về thiết kế hệ thống (System Design) — thiết kế hệ thống quy mô lớn, chuẩn bị phỏng vấn system design, phân tích kiến trúc (URL shortener, news feed, chat, rate limiter...). Kích hoạt khi người dùng muốn viết bài system design, kiến trúc phân tán, scalability, hoặc luyện phỏng vấn SD. Kế thừa quy tắc từ blog-foundations.

## Review theo chủ đề

- **ai-coding-tips-review** (`skills/ai-coding-tips-review/SKILL.md`) — Review bài blog tips & tricks lập trình với AI trước khi xuất bản — tập trung tính kiểm chứng được của mẹo, ví dụ prompt trước/sau, việc nêu rủi ro của AI (hallucination, bảo mật, review), và tính trung lập với công cụ. Kích hoạt khi người dùng muốn review/kiểm tra một bài tips lập trình với AI. Kế thừa quy trình từ skill blog-review.
- **ai-news-review** (`skills/ai-news-review/SKILL.md`) — Review bài blog tin tức AI trước khi xuất bản — tập trung kiểm chứng nguồn chính thức, tính chính xác của benchmark/số liệu, mốc thời gian, và phát hiện clickbait. Kích hoạt khi người dùng muốn review/kiểm tra một bài tin tức AI. Kế thừa quy trình từ skill blog-review.
- **backend-engineering-review** (`skills/backend-engineering-review/SKILL.md`) — Review bài blog kỹ thuật Backend trước khi xuất bản — tập trung tính đúng đắn và an toàn của code example, độ chính xác kỹ thuật, sự đầy đủ của trade-offs, và điều kiện đo của benchmark. Kích hoạt khi người dùng muốn review/kiểm tra một bài kỹ thuật Backend. Kế thừa quy trình từ skill blog-review.

## Review phỏng vấn & thiết kế

- **behavioral-interview-review** (`skills/behavioral-interview-review/SKILL.md`) — Review bài blog phỏng vấn hành vi (Behavioral Interview) trước khi xuất bản — soi tính chân thật (không khuyến khích bịa thành tích), cấu trúc STAR đầy đủ, ví dụ mẫu được đánh dấu rõ, câu trả lời cụ thể tập trung ngôi "tôi", và lời khuyên có tính hành động. Kích hoạt khi người dùng muốn review/kiểm tra một bài behavioral interview hoặc kỹ năng mềm phỏng vấn. Kế thừa quy trình từ skill blog-review.
- **dsa-review** (`skills/dsa-review/SKILL.md`) — Review bài blog cấu trúc dữ liệu & giải thuật (DSA) trước khi xuất bản — soi tính đúng và chạy được của code, độ chính xác của phân tích độ phức tạp, sự đầy đủ của edge cases, có trực giác và dry-run, và đi từ brute-force đến tối ưu. Kích hoạt khi người dùng muốn review/kiểm tra một bài DSA hoặc lời giải bài toán coding. Kế thừa quy trình từ skill blog-review.
- **low-level-design-review** (`skills/low-level-design-review/SKILL.md`) — Review bài blog thiết kế cấp thấp (Low-Level Design / LLD) trước khi xuất bản — soi việc bắt đầu từ yêu cầu, chất lượng class diagram, dùng design pattern đúng chỗ, tuân SOLID, code minh họa chạy được, và khả năng mở rộng. Kích hoạt khi người dùng muốn review/kiểm tra một bài LLD hoặc OOP design. Kế thừa quy trình từ skill blog-review.
- **ml-system-design-review** (`skills/ml-system-design-review/SKILL.md`) — Review bài blog thiết kế hệ thống ML (ML System Design) trước khi xuất bản — soi việc bắt đầu từ bài toán nghiệp vụ, đóng khung ML, chống data leakage và training–serving skew, chọn metric đúng (offline/online, A/B test), giám sát drift, và độ chính xác khái niệm ML. Kích hoạt khi người dùng muốn review/kiểm tra một bài ML System Design. Kế thừa quy trình từ skill blog-review.
- **system-design-review** (`skills/system-design-review/SKILL.md`) — Review bài blog thiết kế hệ thống (System Design) trước khi xuất bản — soi tính đúng của yêu cầu, capacity estimation, sơ đồ kiến trúc, độ đầy đủ của trade-offs, và độ chính xác của khái niệm lý thuyết (CAP, consistency). Kích hoạt khi người dùng muốn review/kiểm tra một bài System Design. Kế thừa quy trình từ skill blog-review.

## Dạng bài

- **listicle-comparison-writing** (`skills/listicle-comparison-writing/SKILL.md`) — Viết bài dạng danh sách (listicle "N cách/công cụ/mẹo...") và bài so sánh (comparison "X vs Y") cho blog kỹ thuật — cấu trúc mỗi mục nhất quán, tiêu chí so sánh khách quan, bảng so sánh, và khuyến nghị theo ngữ cảnh. Kích hoạt khi người dùng muốn viết listicle, roundup, hoặc so sánh công nghệ/công cụ. Kế thừa quy tắc từ blog-foundations.
- **tutorial-writing** (`skills/tutorial-writing/SKILL.md`) — Viết bài hướng dẫn từng bước (how-to / tutorial) cho blog kỹ thuật — cấu trúc theo bước, phần prerequisites, code chạy được và kiểm chứng, xử lý lỗi thường gặp, và tối ưu để xếp hạng cho từ khóa "cách/how to". Kích hoạt khi người dùng muốn viết hướng dẫn, tutorial, hoặc bài how-to. Kế thừa quy tắc từ blog-foundations.

## Chuẩn trình bày (hình ảnh & code)

- **code-snippet-standards** (`skills/code-snippet-standards/SKILL.md`) — Chuẩn trình bày đoạn code trong bài blog kỹ thuật — khai báo ngôn ngữ, code chạy được vs minh họa, độ dài & cắt gọn hợp lý, tên file/đường dẫn, hiển thị output & diff, và ghi công code mượn (license). Kích hoạt khi bài có nhiều code block cần trình bày chuẩn và nhất quán. Kế thừa quy tắc từ blog-foundations.
- **image-diagram-authoring** (`skills/image-diagram-authoring/SKILL.md`) — Chuẩn cho hình ảnh, ảnh chụp màn hình và sơ đồ trong bài blog kỹ thuật — alt text đúng cách, caption, sơ đồ dạng code (Mermaid/PlantUML), chọn định dạng & nén ảnh (WebP/PNG/SVG), và bản quyền/ghi công ảnh. Kích hoạt khi bài cần chèn ảnh, screenshot, hoặc sơ đồ kiến trúc/luồng. Kế thừa quy tắc từ blog-foundations.

## Review trình bày (hình ảnh & code)

- **code-snippet-review** (`skills/code-snippet-review/SKILL.md`) — Review cách trình bày đoạn code trong bài blog kỹ thuật trước khi xuất bản — soi khai báo ngôn ngữ, code chạy được vs minh họa, độ dài & dòng quá dài, output/diff đúng thực tế, secret hardcode, và ghi công code mượn (license). Kích hoạt khi người dùng muốn review phần code block trình bày của một bài. Kế thừa quy trình từ skill blog-review.
- **image-diagram-review** (`skills/image-diagram-review/SKILL.md`) — Review hình ảnh, ảnh chụp màn hình và sơ đồ trong bài blog kỹ thuật trước khi xuất bản — soi alt text, tính đúng của sơ đồ so với hệ thống thật, che thông tin nhạy cảm trong screenshot, định dạng/nén ảnh, và bản quyền/ghi công. Kích hoạt khi người dùng muốn review phần hình ảnh/sơ đồ của một bài. Kế thừa quy trình từ skill blog-review.

## Định dạng đầu ra

- **markdown-authoring** (`skills/markdown-authoring/SKILL.md`) — Xuất bài blog ra file Markdown theo tùy chỉnh của người dùng — chọn flavor (GitHub Flavored Markdown, MDX, Hugo, Docusaurus, Jekyll, Obsidian), cấu hình front-matter, mục lục (TOC), callout/admonition, và mức độ định dạng mong muốn. Kích hoạt khi người dùng muốn xuất bài dạng file .md/.mdx hoặc tùy biến cách trình bày Markdown. Kế thừa quy tắc nội dung từ skill blog-foundations.
- **math-formula-authoring** (`skills/math-formula-authoring/SKILL.md`) — Viết công thức toán học (LaTeX/KaTeX/MathJax) hiển thị đúng và chính xác trên cả WordPress và Markdown — chọn delimiter đúng nền tảng, escape ký tự dễ vỡ ($, \, _, *, |, backslash), phân biệt inline vs display, và kiểm tra công thức trước khi đăng. Kích hoạt khi bài có công thức toán (DSA/big-O, ML metric, xác suất, system design capacity, đại số). Kế thừa quy tắc từ blog-foundations.
- **wordpress-publishing** (`skills/wordpress-publishing/SKILL.md`) — Định dạng và chuẩn bị bài blog để xuất bản lên WordPress — chọn giữa block editor (Gutenberg) và Classic HTML, tạo metadata (title, slug, excerpt, categories, tags), chèn code block đúng cách, featured image, cấu hình SEO (Yoast/Rank Math), và tùy chọn đăng tự động qua WordPress REST API. Kích hoạt khi người dùng muốn viết/đăng bài lên web WordPress. Kế thừa quy tắc nội dung từ skill blog-foundations.

