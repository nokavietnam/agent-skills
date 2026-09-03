# Kết quả đánh giá — [Tên model] — [Ngày]

> Copy file này ra `results/<model>-<ngày>.md` rồi điền. Một file cho một model.

## Thông tin lần chạy (điền trước)

| Mục | Giá trị |
|-----|---------|
| Model | (vd `llama3.1:8b`, `gpt-3.5-turbo`, `qwen2.5-7b`) |
| Cách chạy | (Ollama / API / agent nào) |
| Temperature | (vd 0.7) |
| Có web search/tools? | (Có / Không — ảnh hưởng cách chấm bài AI News) |
| Cách nạp skill | (dán vào system prompt / export / khác) |
| Skill đã nạp | (vd `blog-foundations` + skill chuyên biệt) |
| Số lần chạy mỗi prompt | (khuyến nghị 2–3) |
| Người chấm | (tên) |

## Cách tính điểm mỗi bài

1. Chấm **rubric nền** (`rubrics/_common.md`) → điểm nền (thang 10).
2. Chấm **rubric loại bài** → điểm loại bài (thang 10).
3. **Điểm cuối = 0.4 × nền + 0.6 × loại bài.**
4. Nếu vi phạm bất kỳ mục 🔴 (blocker) → **áp trần điểm cuối = 4.0** và ghi rõ mục vi phạm.
5. Nếu chạy nhiều lần: ghi cả **trung bình** và **thấp nhất** (model yếu dao động mạnh).

---

## Bảng điểm — Nhánh B (CÓ skill)

| Loại bài | Điểm nền /10 | Điểm loại /10 | Blocker vi phạm | Điểm cuối /10 | Ghi chú ngắn |
|----------|:---:|:---:|:---:|:---:|---|
| backend | | | | | |
| dsa | | | | | |
| system-design | | | | | |
| ml-system-design | | | | | |
| low-level-design | | | | | |
| behavioral | | | | | |
| ai-coding-tips | | | | | |
| ai-news | | | | | |
| tutorial | | | | | |
| comparison | | | | | |
| **Trung bình** | | | | **__ /10** | |

## Bảng điểm — Nhánh A (KHÔNG skill, baseline)

> Chạy cùng prompt nhưng **không nạp skill**, để đo đóng góp của skill.

| Loại bài | Điểm cuối /10 | Blocker vi phạm | Ghi chú |
|----------|:---:|:---:|---|
| backend | | | |
| dsa | | | |
| system-design | | | |
| ml-system-design | | | |
| low-level-design | | | |
| behavioral | | | |
| ai-coding-tips | | | |
| ai-news | | | |
| tutorial | | | |
| comparison | | | |
| **Trung bình** | **__ /10** | | |

## Đóng góp của skill (B − A)

| Loại bài | B (có skill) | A (không skill) | **B − A** |
|----------|:---:|:---:|:---:|
| backend | | | |
| dsa | | | |
| system-design | | | |
| ml-system-design | | | |
| low-level-design | | | |
| behavioral | | | |
| ai-coding-tips | | | |
| ai-news | | | |
| tutorial | | | |
| comparison | | | |
| **Trung bình** | | | **+__** |

> **B − A dương và lớn** = skill kéo model yếu lên tốt (mục tiêu). **B − A ≈ 0** = skill không giúp được model này (có thể do skill quá dài/model bỏ qua). **B < A** = skill làm rối model yếu (cần đơn giản hóa skill).

---

## Ghi chép chi tiết theo bài (điền khi cần soi kỹ)

### [loại bài] — lần chạy #_

- **Điểm nền:** C1__ C2__ C3__ C4__ C5__ C6__ C7__ C8__ C9__ C10__ = __ /10
- **Điểm loại bài:** (liệt kê mã tiêu chí + điểm) = __ /10
- **Blocker:** (có/không — nếu có, mục nào + trích bằng chứng)
- **Bằng chứng đáng chú ý:** (trích 1–2 câu trong output làm bằng)
- **Điểm cuối:** __ /10

(Lặp block trên cho mỗi bài / mỗi lần chạy cần ghi chi tiết.)

---

## Kết luận & khuyến nghị chỉnh skill

Điền sau khi chạy xong. Mục tiêu: biến kết quả thành hành động sửa skill.

### Tổng quan
- Điểm trung bình có skill (B): __ /10
- Điểm trung bình không skill (A): __ /10
- Đóng góp skill trung bình (B − A): +__
- Số bài dính blocker: __ / 10

### Điểm trượt lặp lại (soi để sửa skill)
Liệt kê tiêu chí bị trượt ở **nhiều bài / nhiều lần chạy** — đây là tín hiệu cần sửa skill, không phải lỗi ngẫu nhiên của model.

| Tiêu chí hay trượt | Số bài trượt | Giả thuyết nguyên nhân | Hướng sửa skill |
|---|:---:|---|---|
| (vd A4 — quên phần rủi ro AI) | | (skill để phần rủi ro ở cuối, model yếu quên) | (đưa "rủi ro AI" lên checklist đầu + câu mệnh lệnh ngắn) |
| | | | |

### Đề xuất cho model yếu
- [ ] Skill nào cần **rút gọn / đưa chỉ thị quan trọng lên đầu** để model yếu không bỏ sót?
- [ ] Có cần một bản skill "rút gọn cho model yếu" (chỉ giữ checklist + mệnh lệnh trực tiếp) không?
- [ ] Blocker nào model yếu hay vi phạm nhất (thường là bịa số/tên — C1/N1)? Cần nhấn mạnh thêm ở đâu?

> Nếu một điểm trượt lặp lại ≥ 2 model hoặc ≥ 3 bài, coi đó là **bằng chứng đủ để sửa skill**. Sửa skill gốc trong `.kiro/skills/`, chạy lại `node scripts/export-skills.mjs`, rồi chạy lại eval để xác nhận cải thiện.
