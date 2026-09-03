# Phân tích khả năng thi hành skill trên model yếu (Executability Analysis)

> Đây là phân tích **cấu trúc/nội dung của chính các file skill** — model yếu có *tuân theo được* không — chứ không phải kết quả chạy thật (phần đó dùng harness trong `eval/`). Mục tiêu: tìm chỗ skill dễ khiến model nhỏ (~7–8B, GPT-3.5-class, ngữ cảnh ngắn, suy luận yếu, hay quên chỉ thị dài) trượt, và đề xuất cách làm skill "chống chịu" tốt hơn.

## 1. Model yếu khác model mạnh ở đâu (giả định nền)

| Đặc điểm model yếu | Hệ quả khi thi hành skill |
|---|---|
| Ngữ cảnh ngắn (4k–8k token phổ biến) | Skill dài chiếm hết ngân sách → phần chỉ thị cuối bị "đẩy ra" hoặc chú ý loãng |
| Chú ý không đều (lost-in-the-middle) | Chỉ thị ở **giữa** file dài dễ bị bỏ hơn ở đầu/cuối |
| Suy luận yếu | Bỏ bước cần tư duy (dry-run, trade-off, phân tích big-O) |
| Hallucination cao | Vi phạm đúng thứ `blog-foundations` cấm (bịa số/tên/URL) |
| Kém theo chỉ thị nhiều tầng | "Áp dụng foundations TRƯỚC rồi mới skill chuyên biệt" — dễ chỉ làm một tầng |
| Trí nhớ checklist kém | Có checklist nhưng không tự chạy lại; bỏ mục cuối |

## 2. Đo lường khách quan (số liệu từ chính file skill)

Số từ mỗi skill (đã đo bằng script):

| Nhóm | Skill | Số từ | Ghi chú executability |
|---|---|---:|---|
| Nền | **blog-foundations** | **4.069** | ⚠️ **Rủi ro lớn nhất** — dài gần gấp đôi skill kế; lại được nạp cho MỌI bài |
| Nền | blog-review | 2.084 | Dài, nhưng chỉ dùng khi review |
| Output | math-formula-authoring | 1.545 | Dài nhưng chuyên biệt, ít dùng đồng thời |
| Craft | image-diagram-authoring | 1.507 | " |
| Craft | code-snippet-standards | 1.218 | " |
| ... | (các skill viết chủ đề) | 800–960 | Độ dài hợp lý cho model yếu |
| Review | ai-news-review, ai-coding-tips-review | 577–587 | Ngắn gọn — tốt |

**Ngân sách token thực tế:** `blog-foundations` ≈ **~7.000 token** (tiếng Việt tokenize nặng hơn tiếng Anh). Ghép với một skill viết chủ đề ≈ **~8.700 token** *chỉ riêng phần system prompt*, trước khi tính prompt người dùng + bài model sinh ra.

→ Với model ngữ cảnh **4k**: **không vừa**. Với **8k**: vừa khít phần skill nhưng gần như không còn chỗ cho bài dài → model buộc phải cắt hoặc quên. Với **16k+**: ổn.

## 3. Phân tích theo từng rủi ro

### 3.1 `blog-foundations` quá dài (rủi ro nghiêm trọng nhất)

Đây là điểm nghẽn trung tâm vì nó gánh cho *mọi* skill viết.

- 4.069 từ, 11 mục (0–8), 22 mục checklist.
- Nhiều nội dung là **giải thích/lý lẽ** (tốt cho người đọc và model mạnh) nhưng model yếu không cần lý lẽ — nó cần **mệnh lệnh ngắn**.
- Ba mục 5b (E-E-A-T), 6 (trích dẫn), 6b (đạo văn) đều dài và nằm **giữa–cuối** file → vùng model yếu dễ lơ là nhất, dù chúng chứa quy tắc BẮT BUỘC.

**Nghịch lý:** thứ quan trọng nhất (chống bịa — mục 0) nằm ở **đầu** (tốt), nhưng các quy tắc BẮT BUỘC khác (đạo văn, E-E-A-T, kiểm URL) nằm ở **giữa/cuối** file dài — đúng vùng "lost in the middle".

### 3.2 Chỉ thị nhiều tầng ("foundations TRƯỚC, rồi skill chuyên biệt")

Model mạnh xâu chuỗi được. Model yếu thường **chỉ bám một tầng** — hoặc làm theo skill chủ đề mà quên checklist nền, hoặc ngược lại. Không có một "checklist hợp nhất" duy nhất để model chạy một lần.

### 3.3 Checklist đặt ở cuối, dạng giải thích dài

`blog-foundations` có 22 mục checklist ở **mục 7 (gần cuối)**. Model yếu:
- đọc tới đó thì chú ý đã loãng;
- không có thói quen "tự chấm lại checklist" trừ khi được lệnh rõ ở cuối cùng, ngay trước khi trả lời.

### 3.4 Điểm mạnh sẵn có (giúp model yếu)

Công bằng mà nói, nhiều thứ đã *tốt* cho model yếu:
- Mỗi skill chủ đề có **checklist riêng ngắn** (7–10 mục) — dễ chạy.
- Dùng nhiều **danh sách gạch đầu dòng** thay vì đoạn văn dày.
- Có mục **Anti-patterns** cụ thể (dạy bằng phản ví dụ, model yếu bắt chước tốt).
- Quy tắc quan trọng nhất (chống bịa) đặt ở **mục 0, đầu file**.
- Skill review chuyên biệt **ngắn** (đa số < 800 từ) — thi hành tốt.

## 4. Dự đoán điểm trượt theo loại bài (trên model yếu)

Dựa trên cấu trúc skill + bản chất model yếu (giả thuyết cần harness xác nhận):

| Loại bài | Rủi ro cao nhất trên model yếu | Vì sao |
|---|---|---|
| ai-news | Bịa tên model/ngày/benchmark | Hallucination + không có web search |
| backend / dsa | Code không compile; big-O sai | Suy luận yếu; không tự "chạy thử trong đầu" |
| system-design / ml | Nhảy vào giải pháp, bỏ yêu cầu/baseline | Bỏ bước cần tư duy tầng cao |
| Mọi bài | Bỏ checklist nền (E-E-A-T, kiểm URL, meta) | Checklist nền ở cuối file dài |
| Mọi bài | Bịa URL nguồn | Hallucination (đã thấy ở 2 bài mẫu thực tế) |

## 5. Khuyến nghị làm skill "chống chịu" model yếu

Xếp theo mức tác động / công sức.

### R1 (tác động cao) — Thêm "TL;DR mệnh lệnh" ở ĐẦU mỗi skill
Ngay sau Persona, thêm 5–8 dòng **mệnh lệnh trực tiếp, không giải lý lẽ** — chắt lọc điều BẮT BUỘC:

```
## Bắt buộc (đọc kỹ nếu bạn là model nhỏ)
1. KHÔNG bịa số/tên/phiên bản/URL. Không chắc → ghi "chưa kiểm chứng" hoặc bỏ.
2. Code phải khai báo ngôn ngữ và chạy được. Không chắc chạy được → nói rõ là minh họa.
3. Mọi URL nguồn phải là link thật đã kiểm tra. Không tự chế link.
4. Cuối bài: tự chạy lại CHECKLIST bên dưới trước khi trả lời.
```

Đặt **đầu file** để lọt vùng chú ý cao; lặp lại điều quan trọng ở cả đầu và cuối chống "lost in the middle".

### R2 (tác động cao) — Bản `blog-foundations` rút gọn cho model yếu
Tạo một biến thể **"lite"** (~800–1.000 từ): chỉ giữ mệnh lệnh + checklist, bỏ phần giải lý lẽ dài. Dùng khi chạy model ngữ cảnh ngắn. Bản đầy đủ giữ cho model mạnh. (Có thể sinh tự động trong `export-skills.mjs`.)

### R3 (tác động trung bình) — Đưa checklist BẮT BUỘC lên gần đầu, hoặc nhắc lại ở cuối
Hiện checklist ở mục 7. Thêm một dòng ở **cuối mỗi skill**: "Trước khi trả lời, dừng lại và tự chấm từng mục checklist ở trên." Model yếu cần lệnh rõ mới tự kiểm.

### R4 (tác động trung bình) — Nhấn mạnh "một checklist hợp nhất"
Vì model yếu khó xâu hai tầng, mỗi skill chủ đề nên nói rõ: "Checklist cuối cùng bạn phải chạy = checklist nền + checklist riêng dưới đây" và liệt kê gộp các mục cốt lõi để model không phải nhớ quay lại file nền.

### R5 (tác động thấp, dễ làm) — Rút gọn câu, bớt lý lẽ ở các mục dài
Mục 5b/6/6b của `blog-foundations` có thể cô lại ~30–40% mà không mất quy tắc. Câu ngắn, mệnh lệnh, ít văn giải thích → model yếu bám tốt hơn.

## 6. Đề xuất ưu tiên

1. **R1** (TL;DR mệnh lệnh đầu skill) — rẻ, tác động lớn nhất; làm trước cho `blog-foundations` + các skill viết code-nặng (backend, dsa, tutorial).
2. **R3** (nhắc tự-chấm checklist ở cuối) — một dòng mỗi skill.
3. **R2** (bản lite) — nếu bạn thật sự chạy production trên model ngữ cảnh ngắn.
4. **R5, R4** — dọn dần.

## 6b. Trạng thái đã xử lý (cập nhật)

Đã áp các fix nhắm 4 rủi ro chính:

- **Rủi ro #2 (chỉ thị hai tầng), #3 (checklist ở cuối), #4 (hallucination)** — ĐÃ XỬ LÝ bằng **R1 + R3**:
  - Thêm khối **`## ⚡ BẮT BUỘC`** (6 lệnh cô đọng) ở **đầu** `blog-foundations`, ngay sau đoạn mở — front-load lệnh quan trọng vào vùng chú ý cao; lệnh #6 buộc tự chạy lại checklist (R3); khối này gộp "foundations + skill loại bài" thành một chỉ dẫn (giảm rủi ro #2).
  - Thêm **"Nhắc nhanh"** 3–4 dòng ngay dưới blockquote `> Bắt buộc` của 4 skill rủi ro cao nhất: `backend-engineering-writing`, `dsa-writing`, `tutorial-writing`, `ai-news-writing` — lặp lệnh cốt lõi đúng chỗ model yếu hay trượt.
- **Rủi ro #1 (`blog-foundations` quá dài)** — ĐÃ GIẢM bằng **R2**: tạo skill `blog-foundations-lite` (~vài trăm từ, chỉ lệnh + checklist) cho model ngữ cảnh ngắn. Bản đầy đủ giữ nguyên cho model mạnh.
- **Còn lại (R4/R5 — rút gọn mục 5b/6/6b, checklist hợp nhất triệt để)** — chưa làm, ưu tiên thấp; chỉ làm nếu đo thực tế cho thấy cần.

> Các fix này là thay đổi cấu trúc/định dạng, **chưa được đo trên model yếu thật**. Bước xác nhận (mục 7) vẫn cần chạy: dùng harness `eval/`, so `B − A` trước/sau khi áp R1+R2 để biết fix có thực sự kéo model yếu lên không.

## 7. Cách xác nhận (đừng chỉ tin phân tích này)

Phân tích này là **giả thuyết dựa trên cấu trúc**, không phải số đo. Để xác nhận:
1. Chạy harness (`eval/`) trên một model yếu thật, nhánh A (không skill) vs B (có skill).
2. Áp R1+R3 cho vài skill, chạy lại, so `B − A` trước/sau.
3. Nếu `B − A` tăng sau khi rút gọn/thêm mệnh lệnh đầu → phân tích đúng, nhân rộng. Nếu không đổi → model yếu bỏ qua skill bất kể định dạng (cần R2 bản lite hoặc chấp nhận giới hạn).

> Nguyên tắc: **đo trước khi tối ưu**. Đừng viết lại toàn bộ skill dựa trên phán đoán; sửa 1–2 skill, đo, rồi mới nhân rộng.
