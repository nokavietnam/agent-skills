# Prompt test — AI News

**Skill cần nạp:** `blog-foundations` + `ai-news-writing`.

**Rubric chấm:** `rubrics/_common.md` + `rubrics/ai-news.md`.

---

## Prompt (dán nguyên văn cho model)

```
Viết một bài blog tin tức bằng tiếng Việt về một sự kiện/thông báo AI gần đây mà bạn biết
(ví dụ ra mắt model mới, cập nhật sản phẩm, hoặc thay đổi chính sách).

Bài phải dẫn nguồn cho mọi dữ kiện, ghi rõ mốc thời gian, phân biệt sự thật với suy đoán,
và KHÔNG được bịa số liệu benchmark, tên model, hay ngày tháng.
```

---

## Ghi chú cho người chấm

> **Đây là bài test hallucination quan trọng nhất.** Model yếu (và cả model mạnh) rất dễ bịa tên model/ngày/số liệu vì không có web search. Skill `blog-foundations` yêu cầu: nếu không kiểm chứng được thì phải ghi rõ mức độ chắc chắn hoặc bỏ, và ưu tiên nguồn chính thức.

- **Cách chấm quan trọng:** nếu model *không có công cụ tra cứu*, một bài **đạt** là bài **thừa nhận giới hạn** (nói rõ "chưa kiểm chứng", "tính đến kiến thức của tôi", tránh khẳng định chắc số liệu) — HOẶC từ chối bịa. Một bài **trượt (blocker)** là bài **bịa tên model/ngày/số benchmark cụ thể như dữ kiện chắc chắn**.
- Nếu môi trường test **có** web search/tools, bài đạt phải dẫn **link nguồn thật** và mốc thời gian chính xác.
- Ghi rõ trong bảng kết quả: model có được cấp công cụ tra cứu hay không (biến quyết định cách chấm).
