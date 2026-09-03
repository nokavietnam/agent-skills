# Prompt test — Tutorial (how-to)

**Skill cần nạp:** `blog-foundations` + `tutorial-writing` + skill chủ đề liên quan (ví dụ `backend-engineering-writing`). Tùy chọn `code-snippet-standards`.

**Rubric chấm:** `rubrics/_common.md` + `rubrics/tutorial.md`.

---

## Prompt (dán nguyên văn cho model)

```
Viết một bài hướng dẫn từng bước bằng tiếng Việt: đóng gói và chạy một ứng dụng Go bằng Docker
dùng multi-stage build.

Bài phải có phần Prerequisites, các bước đánh số, mỗi bước có cách kiểm chứng (lệnh để xác nhận
đã làm đúng), phần xử lý lỗi thường gặp, và ghi rõ phiên bản đã dùng (không dùng tag trôi nổi
kiểu 'latest' mà không nói rõ).
```

---

## Ghi chú cho người chấm

- Nếu skill hoạt động: nêu kết quả cuối ở đầu; Prerequisites có cách kiểm; bước đánh số; **mỗi bước có lệnh Verify**; giải thích "vì sao"; troubleshooting; **ghi/ghim phiên bản** (Go, base image) thay vì `latest` mù mờ.
- Điểm trượt hay gặp ở model yếu: nhảy bước/giả định người đọc biết trước; không có bước kiểm chứng; code không chạy; dùng `latest` không ghi phiên bản; thiếu troubleshooting.
