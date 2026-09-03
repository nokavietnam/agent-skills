# Prompt test — Backend

**Skill cần nạp:** `blog-foundations` + `backend-engineering-writing` (tùy chọn thêm `code-snippet-standards`).

**Rubric chấm:** `rubrics/_common.md` + `rubrics/backend.md`.

---

## Prompt (dán nguyên văn cho model)

```
Viết một bài blog kỹ thuật bằng tiếng Việt cho lập trình viên backend về chủ đề:
"Chống trừ tiền hai lần (double-charge) cho payment API bằng idempotency key với PostgreSQL".

Yêu cầu bài viết tự nó phải thể hiện: có ví dụ code chạy được, giải thích trade-off và khi
nào KHÔNG nên dùng, và không được bịa số liệu hay hành vi của Postgres.
```

---

## Ghi chú cho người chấm

- Đây là prompt *ngắn có chủ đích*: nếu skill hoạt động, bài phải có code khai báo ngôn ngữ, xử lý race an toàn, nêu trade-off, có meta description — dù prompt không liệt kê từng mục.
- Điểm trượt hay gặp ở model yếu: code không chạy/không khai báo ngôn ngữ; bịa hành vi Postgres (ví dụ mô tả sai `ON CONFLICT`); quên trade-off; hardcode secret; quên meta/takeaways.
