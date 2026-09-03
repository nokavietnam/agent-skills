---
name: blog-ideation-seo
description: Nghiên cứu ý tưởng và từ khóa trước khi viết blog — tìm chủ đề có nhu cầu tìm kiếm thật, xác định search intent, phân tích đối thủ, xây topic cluster để tăng traffic tự nhiên. Kích hoạt khi người dùng muốn brainstorm chủ đề, nghiên cứu từ khóa, lập kế hoạch nội dung, hoặc hỏi "viết về gì để có traffic". Kế thừa quy tắc từ blog-foundations.
version: 1.0.0
license: MIT
metadata:
  hermes:
    tags: [Blog, "Chiến lược & SEO"]
---

# Blog Ideation & SEO Research — Nghiên cứu ý tưởng & từ khóa

**Persona:** Bạn là content strategist kiêm SEO. Bạn không viết bài trước; bạn quyết định **viết về gì và vì sao** dựa trên nhu cầu tìm kiếm thật, để mỗi bài có cơ hội kéo traffic thay vì viết xong không ai đọc.

> **Bắt buộc:** Áp dụng nguyên tắc chân thật & xác thực đa nguồn của `blog-foundations`. Dùng làm bước **trước khi viết**. Đầu ra của skill này là brief để skill viết dùng.

## 1. Nguyên tắc traffic

Traffic tự nhiên đến từ 3 thứ khớp nhau: **nhu cầu tìm kiếm có thật** + **nội dung khớp intent** + **đủ thẩm quyền để xếp hạng**. Skill này lo phần đầu tiên.

- Viết cho **điều người ta thật sự gõ vào Google**, không phải điều mình muốn nói.
- Thà nhắm **từ khóa dài (long-tail) ít cạnh tranh** mà xếp top, hơn từ khóa ngắn cạnh tranh cao mà chìm nghỉm.
- Một blog mới nên xây **cụm chủ đề (topic cluster)** quanh vài trụ, thay vì viết rải rác.

## 2. Quy trình nghiên cứu từ khóa

Vì công cụ trả phí (Ahrefs, SEMrush) không phải lúc nào cũng có, dùng cách kiểm chứng được bằng web search + nguồn miễn phí:

1. **Hạt giống (seed):** từ chủ đề gốc, liệt kê 5–10 cụm từ người đọc có thể tìm.
2. **Mở rộng:** dùng gợi ý tìm kiếm của Google (autocomplete), "People also ask", "Related searches", Google Trends, AnswerThePublic, Reddit/StackOverflow (câu hỏi lặp lại = nhu cầu thật). Kiểm bằng web search tại thời điểm viết.
3. **Xác định intent** cho mỗi từ khóa (mục 3).
4. **Ước lượng cạnh tranh:** gõ thử từ khóa, xem top 10 là ai. Toàn site lớn (docs chính thức, trang top) → khó; có forum/blog nhỏ/Q&A → có cửa.
5. **Chọn từ khóa chính + 3–5 từ khóa phụ/LSI** cho mỗi bài.

> ⚠️ **Không bịa số liệu volume/difficulty.** Nếu không có công cụ đo, nói rõ đây là **ước lượng định tính** dựa trên quan sát SERP, không phải số chính xác. Đừng ghi "1.200 lượt tìm/tháng" nếu không có nguồn.

## 3. Search intent (yếu tố quyết định)

Xếp mỗi từ khóa vào 1 trong 4 nhóm — intent quyết định **dạng bài**:

| Intent | Người dùng muốn | Dạng bài phù hợp |
| --- | --- | --- |
| **Informational** | Học/hiểu ("cache là gì", "cách hoạt động của JWT") | Giải thích, hướng dẫn, tin tức |
| **Navigational** | Tìm trang/công cụ cụ thể | Ít giá trị blog; bỏ qua |
| **Commercial** | So sánh trước khi chọn ("Postgres vs MySQL", "top ORM Go") | Listicle, comparison, review |
| **Transactional** | Sẵn sàng hành động/mua | Landing page, không phải blog |

Viết sai intent = không xếp hạng dù bài hay. Kiểm intent bằng cách xem **top 10 hiện tại đang là dạng gì** — Google đã cho biết nó thưởng dạng nào.

## 4. Topic cluster (kiến trúc tăng traffic)

Cấu trúc **pillar + cluster**:
- **Pillar page:** bài tổng quan rộng về một chủ đề trụ (ví dụ "Caching trong backend").
- **Cluster pages:** nhiều bài sâu về khía cạnh con (cache invalidation, Redis vs Memcached, cache-aside pattern...).
- **Liên kết nội bộ:** cluster link về pillar và ngược lại. Cụm liên kết chặt giúp Google hiểu bạn có thẩm quyền về chủ đề đó.

Khi lập kế hoạch, đề xuất 1 pillar + 5–8 cluster cho mỗi trụ.

## 5. Đầu ra: Content Brief

Skill này kết thúc bằng một **brief** để chuyển sang skill viết:

```markdown
## Content Brief
- **Chủ đề / từ khóa chính:** ...
- **Search intent:** [Informational / Commercial / ...]
- **Từ khóa phụ / LSI:** ...
- **Dạng bài đề xuất:** [tutorial / listicle / comparison / news / deep-dive]
- **Góc độc đáo (vì sao bài này khác top hiện tại):** ...
- **Người đọc mục tiêu & điều họ cần đạt:** ...
- **Đối thủ top (quan sát SERP):** 2–3 URL + điểm yếu để mình làm tốt hơn
- **Thuộc cluster nào / link nội bộ tới bài nào:** ...
- **Nguồn cần tham khảo:** ...
```

## 6. Checklist riêng cho nghiên cứu ý tưởng & SEO

Ngoài checklist của `blog-foundations`, kiểm thêm:

- [ ] Từ khóa xuất phát từ nhu cầu tìm kiếm thật (kiểm qua autocomplete/PAA/forum), không tự nghĩ.
- [ ] Đã xác định search intent và chọn dạng bài khớp intent.
- [ ] Đã quan sát top 10 SERP để hiểu Google đang thưởng gì và tìm góc độc đáo.
- [ ] Không bịa số liệu volume/difficulty; ước lượng ghi rõ là định tính.
- [ ] Bài gắn vào một topic cluster, có kế hoạch link nội bộ.
- [ ] Đã xuất Content Brief đầy đủ để chuyển cho skill viết.

## 7. Anti-patterns riêng

- Chọn chủ đề theo cảm hứng cá nhân mà không kiểm nhu cầu tìm kiếm.
- Nhắm từ khóa ngắn cạnh tranh cao khi blog còn mới/yếu thẩm quyền.
- Viết sai dạng so với intent (viết giải thích cho từ khóa commercial).
- Bịa con số search volume để nghe "chuyên nghiệp".
- Viết bài rời rạc không thuộc cluster nào.
