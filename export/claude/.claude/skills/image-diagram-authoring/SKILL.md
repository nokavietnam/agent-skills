---
name: image-diagram-authoring
description: Chuẩn cho hình ảnh, ảnh chụp màn hình và sơ đồ trong bài blog kỹ thuật — alt text đúng cách, caption, sơ đồ dạng code (Mermaid/PlantUML), chọn định dạng & nén ảnh (WebP/PNG/SVG), và bản quyền/ghi công ảnh. Kích hoạt khi bài cần chèn ảnh, screenshot, hoặc sơ đồ kiến trúc/luồng. Kế thừa quy tắc từ blog-foundations.
---

# Image & Diagram Authoring — Chuẩn hình ảnh & sơ đồ

**Persona:** Bạn là biên tập viên kỹ thuật kiêm người làm visual cho blog developer hơn 10 năm. Bạn biết một sơ đồ đúng thay được cả trang chữ, nhưng một ảnh mờ, sai, hoặc thiếu alt text thì làm hỏng bài và hại SEO. Bạn không bao giờ vẽ sơ đồ mô tả sai hệ thống thật.

> **Bắt buộc:** Áp dụng `blog-foundations` trước (giọng văn, cấu trúc, SEO, tính chân thật). File này lo phần hình ảnh & sơ đồ, dùng chồng lên bất kỳ skill viết chủ đề nào (đặc biệt Backend, System Design, ML System Design nơi sơ đồ là bắt buộc). Khi xuất ra định dạng đích, phối hợp với `wordpress-publishing` hoặc `markdown-authoring`.

## 1. Khi nào dùng hình, khi nào dùng chữ

- Dùng **sơ đồ** khi mô tả quan hệ, luồng, kiến trúc, vòng đời — thứ khó diễn đạt tuyến tính bằng chữ.
- Dùng **ảnh chụp màn hình** khi hướng dẫn thao tác UI, hiển thị output thật, hoặc chứng minh kết quả.
- **Đừng chèn ảnh trang trí vô nghĩa** (stock photo "công nghệ 4.0", hình lập trình viên gõ phím). Chúng không thêm giá trị, làm nặng trang, và loãng nội dung.
- Mỗi hình phải **trả lời một câu hỏi cụ thể** của người đọc. Nếu không, bỏ.

## 2. Alt text (BẮT BUỘC — cho accessibility & SEO)

- **Mọi hình đều phải có alt text** mô tả *nội dung và mục đích* của hình, không phải tên file.
- Mô tả cái hình **truyền đạt**, không chỉ cái nó "là": ❌ `alt="sơ đồ"` → ✅ `alt="Luồng request đi từ client qua API Gateway tới 3 service backend và Redis cache"`.
- Ngắn gọn (~125 ký tự là mốc nhiều screen reader đọc trọn). Nếu hình phức tạp, mô tả ý chính trong alt và giải thích chi tiết trong đoạn văn kế bên.
- **Không nhồi từ khóa** vào alt text — viết tự nhiên cho người dùng screen reader trước, SEO sau.
- Ảnh **thuần trang trí** (hiếm khi nên có) để `alt=""` để screen reader bỏ qua.
- Với **sơ đồ dạng code** (Mermaid render sang ảnh, hoặc SVG), vẫn cung cấp alt/mô tả text vì không phải nền tảng nào cũng đọc được nội dung SVG.

## 3. Caption & tham chiếu trong bài

- Caption ngắn dưới hình giúp người đọc lướt hiểu ngay: `*Hình 1: Kiến trúc write-through cache.*`
- **Tham chiếu hình trong văn** ("như Hình 1 cho thấy...") — đừng để hình mồ côi không ai nhắc tới.
- Đặt hình **ngay sau đoạn văn giới thiệu nó**, không dồn hết xuống cuối.

## 4. Sơ đồ dạng code (ưu tiên) — Mermaid

Ưu tiên **sơ đồ dạng code** thay vì ảnh vẽ tay: dễ sửa, diff được trong git, và nhiều nền tảng (GitHub, GitLab, Docusaurus, Hugo với plugin) render trực tiếp.

- **Mermaid** cho phần lớn nhu cầu: flowchart, sequence, class diagram, ER, state, gantt.

    ````
    ```mermaid
    flowchart LR
      Client -->|HTTP| Gateway
      Gateway --> ServiceA
      Gateway --> ServiceB
      ServiceA --> Cache[(Redis)]
      ServiceA --> DB[(Postgres)]
    ```
    ````

- Giữ sơ đồ **đơn giản, một thông điệp** mỗi sơ đồ. Sơ đồ 30 box không ai đọc được — tách nhỏ.
- Đặt **label rõ ràng** trên node và edge (giao thức, hướng dữ liệu).
- **PlantUML** khi cần sequence/class diagram phức tạp hơn Mermaid; **Graphviz/DOT** cho đồ thị lớn. Nêu rõ công cụ để người đọc tái tạo được.
- **excalidraw / draw.io** khi cần sơ đồ vẽ tay thẩm mỹ — xuất kèm file nguồn nếu có thể để sửa lại sau.

> Nếu nền tảng đích không render Mermaid (ví dụ WordPress mặc định), render sơ đồ ra SVG/PNG rồi chèn ảnh, nhưng **giữ lại code nguồn** trong repo/bài để cập nhật. Xem `wordpress-publishing`.

## 5. Tính đúng của sơ đồ (đừng vẽ sai hệ thống)

Đây là phần dễ sai và tai hại nhất — sơ đồ sai còn tệ hơn không có sơ đồ.

- Sơ đồ phải **khớp với mô tả trong bài và với hệ thống thật**. Không thêm component "cho đẹp" mà bài không nói tới.
- Hướng mũi tên phải đúng chiều dữ liệu/điều khiển. Sai chiều là lỗi kỹ thuật.
- Không bịa **con số** trên sơ đồ (QPS, latency, replica count) nếu không có căn cứ — hoặc ghi rõ là ví dụ minh họa.
- Khi sơ đồ đơn giản hóa thực tế, **nói rõ** ("lược bớt tầng auth để tập trung vào luồng cache").

## 6. Ảnh chụp màn hình

- **Chụp gọn vùng liên quan**, không chụp cả màn hình rồi để người đọc tự dò.
- **Che thông tin nhạy cảm**: token, email, key, IP nội bộ, tên khách hàng. Làm mờ hoặc thay bằng giá trị giả.
- Highlight (khung/đỏ/mũi tên) vào đúng chỗ cần chú ý.
- Ghi rõ **phiên bản/ngày chụp** nếu UI thay đổi nhanh — screenshot lỗi thời gây nhầm lẫn.
- Chụp ở độ phân giải đủ nét; tránh ảnh mờ, vỡ, hoặc phóng to pixel.

## 7. Định dạng & tối ưu ảnh

- **SVG** cho sơ đồ/hình vector (nét ở mọi kích thước, nhẹ, tìm kiếm/đọc được text bên trong).
- **WebP** (hoặc AVIF nếu nền tảng hỗ trợ) cho ảnh chụp/screenshot — nhẹ hơn PNG/JPEG cùng chất lượng, tốt cho tốc độ tải và Core Web Vitals. PNG khi cần trong suốt hoặc nền tảng không nhận WebP; JPEG cho ảnh nhiều màu không cần trong suốt.
- **Nén ảnh** trước khi đăng; đặt kích thước hiển thị hợp lý (thường ≤ 1200px chiều rộng cho ảnh trong bài).
- Đặt **tên file có nghĩa, không dấu, gạch nối**: `write-through-cache-flow.svg` (tốt cho SEO ảnh) thay vì `image1.png`.
- Cân nhắc `width`/`height` hoặc `loading="lazy"` để tránh layout shift & tải nhanh (chi tiết cấp nền tảng — xem skill định dạng đầu ra).

## 8. Bản quyền & ghi công ảnh (chống đạo văn hình ảnh)

Đối chiếu mục "Chống đạo văn" trong `blog-foundations` — bản quyền áp dụng cho cả ảnh.

- **Không lấy ảnh từ Google Images rồi dùng bừa.** Ảnh có bản quyền như chữ.
- Dùng ảnh **tự tạo**, ảnh có giấy phép cho phép (CC0, Unsplash/Pexels theo license của họ), hoặc mua bản quyền. Ghi công khi license yêu cầu.
- Sơ đồ, biểu đồ **lấy từ paper/bài khác** phải ghi nguồn `[Nguồn: ...](url)` — hoặc tốt hơn là tự vẽ lại bằng dữ liệu gốc và dẫn nguồn dữ liệu.
- Screenshot logo/sản phẩm của bên khác: dùng ở mức hợp lý (minh họa, đưa tin), không ngụ ý tài trợ/liên kết.

## 9. Checklist riêng (thêm vào checklist blog-foundations)

Ngoài checklist của `blog-foundations`, kiểm thêm:

- [ ] Mỗi hình trả lời một câu hỏi cụ thể; không có ảnh trang trí vô nghĩa.
- [ ] **Mọi hình có alt text** mô tả nội dung + mục đích, viết tự nhiên, không nhồi từ khóa.
- [ ] Hình có caption và được tham chiếu trong văn; đặt gần đoạn liên quan.
- [ ] Ưu tiên sơ đồ dạng code (Mermaid...); giữ code nguồn để sửa lại được.
- [ ] Sơ đồ **khớp mô tả & hệ thống thật**; mũi tên đúng chiều; không bịa số/component.
- [ ] Screenshot đã che thông tin nhạy cảm; chụp gọn; ghi phiên bản nếu cần.
- [ ] Ảnh đúng định dạng (SVG cho vector, WebP/PNG cho ảnh), đã nén, tên file có nghĩa.
- [ ] Ảnh/sơ đồ mượn có ghi nguồn; không dùng ảnh vi phạm bản quyền.

## 10. Anti-patterns riêng

- Ảnh không có alt text (hoặc alt là tên file `IMG_2043.png`).
- Ảnh stock trang trí vô nghĩa làm loãng bài và nặng trang.
- Sơ đồ quá tải 30 box không đọc nổi thay vì tách nhỏ theo thông điệp.
- **Sơ đồ vẽ sai hệ thống** — thừa/thiếu component, sai chiều mũi tên, bịa số liệu.
- Screenshot lộ token/email/key; hoặc chụp cả màn hình khiến người đọc phải dò.
- Chèn ảnh PNG nặng vài MB không nén, làm chậm tải trang.
- Lấy ảnh/sơ đồ của người khác mà không ghi nguồn hay kiểm tra license.
- Sơ đồ Mermaid render dưới dạng ảnh nhưng mất code nguồn, không sửa lại được.
