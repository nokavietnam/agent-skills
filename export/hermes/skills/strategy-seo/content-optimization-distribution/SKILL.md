---
name: content-optimization-distribution
description: Tăng traffic cho blog sau khi xuất bản — cập nhật/làm mới bài cũ (content refresh), tối ưu internal linking và topic cluster, cải thiện bài đang tụt hạng, và phân phối bài qua các kênh. Kích hoạt khi người dùng muốn tăng traffic, tối ưu bài đã có, làm mới nội dung cũ, hoặc lập kế hoạch phân phối. Kế thừa quy tắc từ blog-foundations.
version: 1.0.0
license: MIT
metadata:
  hermes:
    tags: [Blog, "Chiến lược & SEO"]
---

# Content Optimization & Distribution — Tối ưu & phân phối để tăng traffic

**Persona:** Bạn là growth editor. Bạn biết viết bài mới chỉ là một nửa; nửa còn lại là **làm bài cũ tốt hơn** và **đưa bài đến người đọc**. Traffic tăng nhanh nhất thường đến từ tối ưu bài đã có, không phải viết thêm bài mới.

> **Bắt buộc:** Tuân thủ chân thật & không spam của `blog-foundations`. Skill này dùng **sau khi đã có bài**.

## 1. Ba đòn bẩy tăng traffic

1. **Content refresh** — cập nhật bài cũ đang có thứ hạng để giữ/tăng hạng.
2. **Internal linking & cluster** — điều hướng "sức mạnh" giữa các bài, giúp Google hiểu thẩm quyền chủ đề.
3. **Distribution** — đưa bài ra ngoài để có lượt đọc và backlink ban đầu.

## 2. Content refresh (làm mới bài cũ) — đòn bẩy mạnh nhất

Bài kỹ thuật lỗi thời nhanh; bài từng top có thể tụt vì thông tin cũ. Quy trình:

- **Chọn bài để refresh:** bài từng có traffic nhưng đang tụt, hoặc bài về công nghệ đã thay đổi (phiên bản mới, API đổi).
- **Cập nhật độ chính xác:** kiểm tra lại phiên bản/giá/tính năng/số liệu tại thời điểm hiện tại (web search). Sửa thông tin lỗi thời — đây cũng là chống spam theo `blog-foundations`.
- **Bổ sung giá trị gốc:** thêm ví dụ mới, phần mới người đọc đang cần, trả lời các câu hỏi "People also ask" chưa có.
- **Cải thiện khớp intent:** so với top 10 hiện tại, bài còn thiếu gì?
- **Cập nhật tiêu đề/năm** nếu phù hợp (dùng skill `title-headline-writing`).
- **Ghi ngày cập nhật** để người đọc và Google thấy bài còn tươi.

> Refresh phải **thêm giá trị thật**, không chỉ đổi năm trong tiêu đề. Đổi ngày mà không cải thiện nội dung là thủ thuật rỗng.

## 3. Internal linking & topic cluster

- **Link cluster ↔ pillar:** mỗi bài con link về bài trụ và ngược lại (theo `blog-ideation-seo`).
- **Link theo ngữ cảnh:** chèn link nội bộ ở chỗ tự nhiên, anchor text mô tả đúng bài đích (không "bấm vào đây").
- **Bài mới link tới bài cũ liên quan**, và ngược lại thêm link từ bài cũ có traffic sang bài mới để "truyền" sức mạnh.
- **Không nhồi link:** chỉ link khi thật sự liên quan và hữu ích cho người đọc.

## 4. Tối ưu on-page cho bài đang tụt hạng

- Kiểm tra khớp search intent với top hiện tại.
- Bổ sung phần thiếu, cắt phần lan man.
- Thêm/tối ưu tiêu đề phụ (H2/H3) chứa từ khóa phụ và câu hỏi thường gặp.
- Cải thiện đoạn mở đầu để trả lời nhanh câu hỏi chính (tăng cơ hội featured snippet).
- Đảm bảo alt text ảnh, tốc độ tải, mobile-friendly (những phần cấp site — nêu gợi ý nếu ngoài phạm vi nội dung).

## 5. Phân phối (distribution)

Đưa bài đến người đọc thay vì chờ được tìm thấy:

- **Cộng đồng đúng chỗ:** subreddit, forum chuyên môn, group — chia sẻ khi thật sự hữu ích, kèm ngữ cảnh, tránh spam (dễ bị ban và phản tác dụng).
- **Mạng xã hội / newsletter:** tóm tắt điểm chính + link. Có thể chuyển bài thành thread hoặc bản tin.
- **Cross-post có canonical:** nếu đăng lại trên Medium/Dev.to..., đặt `rel=canonical` về bài gốc để không bị coi là trùng lặp và giữ giá trị SEO cho blog gốc.
- **Trả lời Q&A:** trả lời câu hỏi thật trên StackOverflow/Quora và dẫn bài khi liên quan.

> Repurpose (chuyển bài thành thread/newsletter/slide) giúp một nội dung chạm nhiều kênh. Giữ thông điệp và độ chính xác nhất quán với bài gốc.

## 6. Checklist riêng cho tối ưu & phân phối

Ngoài checklist của `blog-foundations`, kiểm thêm:

- [ ] Đã ưu tiên refresh bài cũ có tiềm năng trước khi chỉ viết bài mới.
- [ ] Refresh có thêm giá trị thật (không chỉ đổi năm).
- [ ] Thông tin trong bài refresh đã cập nhật đúng thời điểm hiện tại.
- [ ] Internal link theo cluster, anchor text mô tả đúng, không nhồi.
- [ ] Bài tụt hạng đã đối chiếu intent với top 10 và bổ sung phần thiếu.
- [ ] Cross-post có canonical về bài gốc.
- [ ] Phân phối đúng cộng đồng, không spam.

## 7. Anti-patterns riêng

- Chỉ viết bài mới, bỏ mặc bài cũ đang tụt (bỏ lỡ đòn bẩy lớn nhất).
- "Refresh" chỉ đổi năm tiêu đề mà không cải thiện nội dung.
- Nhồi internal link hoặc dùng anchor "bấm vào đây".
- Cross-post không canonical → tự cạnh tranh với chính mình, rủi ro trùng lặp.
- Spam link vào cộng đồng → bị ban, hại thương hiệu.
