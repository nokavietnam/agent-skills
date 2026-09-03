# Bộ đánh giá skill trên model yếu (Weak-Model Eval Harness)

Bộ này giúp bạn kiểm tra xem **bộ skill viết/review blog** có hoạt động tốt khi chạy trên **model yếu** (model nhỏ/rẻ: ~7–8B, GPT-3.5-class, Gemini Flash-Lite, Qwen/Llama nhỏ...) hay không. Nó chuẩn hóa 3 thứ để kết quả *so sánh được* giữa các model:

1. **Prompt chuẩn** (`prompts/`) — mỗi loại bài một prompt cố định.
2. **Rubric chấm điểm** (`rubrics/`) — tiêu chí 0–10 rút thẳng từ checklist của skill.
3. **Mẫu ghi kết quả** (`results/TEMPLATE.md`) — bảng điểm + tổng hợp.

> Mục tiêu: đo *model yếu có tuân theo skill được không* — chứ không chỉ đo model đó thông minh cỡ nào. Một skill tốt phải kéo được cả model yếu lên mức chấp nhận được.

## Vì sao cần đánh giá riêng cho model yếu

Model yếu hay trượt ở những chỗ khác model mạnh:

- **Ngữ cảnh ngắn / quên chỉ thị:** skill dài có thể bị bỏ giữa chừng → model quên checklist.
- **Hallucination cao hơn:** dễ bịa số liệu, API, tên phiên bản — đúng thứ `blog-foundations` cấm.
- **Suy luận yếu:** dễ bỏ bước (không dry-run, không nêu trade-off, không phân tích big-O đúng).
- **Bỏ định dạng:** quên khai báo ngôn ngữ code, quên alt text, quên meta description.
- **Tiếng Việt chuyên ngành:** dễ dịch gượng hoặc sai thuật ngữ.

Rubric ở đây soi đúng các điểm trượt này.

## Cách chạy (tổng quan)

Với **mỗi** model yếu bạn muốn đánh giá, lặp lại cho từng prompt trong `prompts/`:

1. **Nạp skill vào ngữ cảnh** (xem phần "Nạp skill" bên dưới).
2. **Dán prompt chuẩn** từ `prompts/<tên>.md`.
3. **Thu lấy output** của model (bài viết nó tạo ra).
4. **Chấm theo rubric** tương ứng trong `rubrics/<tên>.md`, ghi vào một bản sao của `results/TEMPLATE.md`.
5. Lặp lại **cùng prompt** cho model mạnh (làm mốc so sánh) nếu muốn biết khoảng cách.

Chạy mỗi prompt **ít nhất 2–3 lần** (model yếu dao động mạnh) rồi lấy điểm trung bình/tệ nhất.

## Nạp skill vào model yếu

Model yếu thường **không có cơ chế tự kích hoạt skill** như Kiro. Bạn phải tự đưa nội dung skill vào. Có 3 cách, chọn theo công cụ:

- **Cách 1 — Dán trực tiếp (đơn giản nhất):** dán toàn văn `blog-foundations/SKILL.md` (+ skill chuyên biệt tương ứng) vào **system prompt** hoặc đầu cuộc hội thoại, rồi mới dán prompt test. Đây là cách sát nhất với "model được trang bị skill".
- **Cách 2 — Dùng bản export:** các bản trong `export/` đã đóng gói sẵn theo từng agent (Claude Code, Antigravity, Hermes, Codex). Nếu bạn test qua một trong các agent đó, cài skill theo hướng dẫn trong `export/README.md`.
- **Cách 3 — Qua Ollama / API thô:** đặt nội dung skill vào trường `system`, prompt test vào trường `user`. Ví dụ khung (đổi model theo máy bạn):

```bash
# Ví dụ minh họa với Ollama; đổi 'llama3.1:8b' thành model bạn test.
# $SKILL = nội dung blog-foundations + skill chuyên biệt (đã ghép)
# $PROMPT = nội dung một file trong prompts/
ollama run llama3.1:8b "SYSTEM:\n$SKILL\n\nUSER:\n$PROMPT"
```

> Ghi rõ trong bảng kết quả bạn đã nạp skill bằng cách nào và **những skill nào** (foundations + chuyên biệt), vì đây là biến ảnh hưởng lớn tới điểm.

## Chạy 2 nhánh để tách bạch "skill có giúp không"

Để biết skill *thực sự* có tác dụng trên model yếu, chạy mỗi prompt ở **hai điều kiện**:

- **A. Không skill (baseline):** chỉ dán prompt test, không nạp skill.
- **B. Có skill:** nạp skill rồi mới dán prompt test.

Chênh lệch điểm **B − A** cho biết skill đóng góp bao nhiêu *trên chính model yếu đó*. Đây là con số giá trị nhất của bài đánh giá.

## Thang điểm & cách chấm

- Mỗi rubric có **các tiêu chí**, mỗi tiêu chí chấm theo mô tả (đạt / một phần / không đạt).
- Quy đổi ra **thang 10** theo trọng số ghi trong từng rubric.
- **Tiêu chí "chặn" (blocker):** nếu vi phạm (bịa số liệu, code sai/không chạy, sai sự thật, đạo văn) thì **trần điểm là 4/10** dù các mục khác tốt — vì đây là lỗi xuất bản không được. Rubric đánh dấu rõ mục nào là blocker.
- Chấm **khách quan theo bằng chứng trong bài**, không đoán ý model. Không có trong bài = không đạt.

## Cấu trúc thư mục

```
eval/
├── README.md              # file này
├── prompts/               # prompt chuẩn, mỗi loại bài một file
│   ├── backend.md
│   ├── dsa.md
│   ├── system-design.md
│   ├── ml-system-design.md
│   ├── low-level-design.md
│   ├── behavioral.md
│   ├── ai-coding-tips.md
│   ├── ai-news.md
│   ├── tutorial.md
│   └── comparison.md
├── rubrics/               # rubric chấm điểm, khớp từng prompt
│   ├── _common.md         # tiêu chí nền (áp cho MỌI bài, từ blog-foundations)
│   ├── backend.md
│   ├── dsa.md
│   ├── ... (mỗi loại một file)
└── results/
    └── TEMPLATE.md        # mẫu ghi điểm cho một lần chạy (copy ra rồi điền)
```

## Quy trình đề xuất (tóm tắt)

1. Chọn model yếu + cách nạp skill.
2. Với mỗi prompt: chạy nhánh A (không skill) và B (có skill), mỗi nhánh 2–3 lần.
3. Chấm từng output theo `rubrics/_common.md` + rubric loại bài.
4. Ghi vào bản sao `results/TEMPLATE.md`.
5. Tính điểm trung bình mỗi loại bài, và **B − A** để đo đóng góp của skill.
6. Đọc phần "Kết luận & khuyến nghị chỉnh skill" trong template để đề xuất sửa skill nếu model yếu trượt cùng một chỗ nhiều lần.

## Lưu ý trung thực

- Kết quả phụ thuộc mạnh vào **cách nạp skill** và **nhiệt độ (temperature)** — ghi lại cả hai.
- Model yếu **dao động lớn** giữa các lần chạy; đừng kết luận từ một lần.
- Đây là đánh giá **chất lượng nội dung theo skill**, không phải benchmark tốc độ/chi phí.
