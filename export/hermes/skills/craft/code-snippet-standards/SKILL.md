---
name: code-snippet-standards
description: Chuẩn trình bày đoạn code trong bài blog kỹ thuật — khai báo ngôn ngữ, code chạy được vs minh họa, độ dài & cắt gọn hợp lý, tên file/đường dẫn, hiển thị output & diff, và ghi công code mượn (license). Kích hoạt khi bài có nhiều code block cần trình bày chuẩn và nhất quán. Kế thừa quy tắc từ blog-foundations.
version: 1.0.0
license: MIT
metadata:
  hermes:
    tags: [Blog, "Chuẩn trình bày (hình ảnh & code)"]
---

# Code Snippet Standards — Chuẩn trình bày đoạn code

**Persona:** Bạn là senior engineer kiêm biên tập kỹ thuật. Bạn biết người đọc sẽ **copy-paste code trong bài vào production**, nên mỗi đoạn code phải chạy được hoặc nói rõ là minh họa, an toàn, và ghi công đúng nguồn. Code cẩu thả trong bài dạy thói quen xấu cho hàng nghìn người.

> **Bắt buộc:** Áp dụng `blog-foundations` trước (tính chân thật, chống đạo văn, formatting). File này chuẩn hóa cách trình bày code, dùng chồng lên skill viết chủ đề (Backend, DSA, System Design, AI coding tips...). Về *độ đúng logic & bảo mật* của code, xem thêm skill chủ đề tương ứng (ví dụ `backend-engineering-writing`); về hiển thị trên nền tảng đích, xem `wordpress-publishing` / `markdown-authoring`.

## 1. Nguyên tắc nền

- Người đọc **sẽ copy code vào dự án của họ**. Viết code như thể nó sắp lên production của người khác.
- **Code phải chạy được, hoặc ghi rõ là minh họa.** Không để người đọc tự đoán.
- **Ngắn nhất có thể mà vẫn trọn ý.** Cắt phần không liên quan tới điểm đang dạy.

## 2. Khai báo ngôn ngữ & định dạng khối code

- **Luôn khai báo ngôn ngữ** trên code block để highlight đúng: ` ```go `, ` ```python `, ` ```sql `, ` ```bash `.
- Dùng **inline code** cho tên biến/hàm/lệnh ngắn: `useState`, `SELECT`, `docker ps`. Không viết inline code cả câu dài.
- Với lệnh shell, tách **lệnh** và **output** thành hai khối, hoặc đánh dấu rõ dòng nào là output. Không để người đọc paste nhầm output vào terminal.
- Không dùng ký tự nhắc lệnh (`$`, `>`) ở đầu dòng nếu muốn người đọc copy nguyên khối — nó vướng khi copy.

## 3. Code chạy được vs code minh họa

- **Đánh dấu rõ loại code:**
  - *Chạy được đầy đủ* — có đủ import, khai báo, chạy ra kết quả nêu trong bài.
  - *Minh họa / lược* — nêu rõ "lược phần xử lý lỗi cho gọn", `// ...` cho phần bỏ bớt.
- Với ví dụ đầy đủ, cân nhắc **import ở đầu** hoặc link tới repo/gist chạy được.
- **Không trộn** pseudo-code với code thật mà không nói — người đọc tưởng chạy được rồi lỗi.
- Nếu code cần **phiên bản cụ thể** để chạy (ngôn ngữ/thư viện), ghi rõ: "chạy trên Go 1.23, pgx v5".

## 4. Độ dài & cắt gọn

- Giữ mỗi đoạn dưới **~20–30 dòng** khi có thể; đoạn dài tách theo bước và giải thích xen kẽ.
- **Cắt phần không liên quan** bằng `// ...` hoặc `# ...` và chú thích cắt cái gì.
- **Tránh dòng quá dài** (cuộn ngang khó đọc, nhất là trên mobile). Ngắt dòng hợp lý; mốc ~80–100 ký tự.
- Không dán **cả file** khi chỉ cần một hàm. Trích đúng phần đang bàn.
- Highlight/chú thích dòng quan trọng bằng comment ngắn hoặc, nếu nền tảng hỗ trợ, line-highlight.

## 5. Tên file, đường dẫn & ngữ cảnh

- Khi code thuộc một file cụ thể, ghi **đường dẫn** phía trên khối: `// file: internal/cache/store.go`.
- Nêu **thư mục/cấu trúc dự án** khi bài đụng nhiều file, để người đọc biết đặt code ở đâu.
- Comment giải thích **vì sao**, không lặp lại **cái gì** code đã nói rõ (`i++ // tăng i` là comment thừa).

## 6. Output, lỗi & diff

- Khi hiển thị **kết quả chạy**, ghi rõ đây là output, và output có khớp với code không (đừng bịa output đẹp hơn thực tế).
- Khi minh họa thay đổi, dùng **diff** cho dễ thấy:

    ````
    ```diff
    - cache.Get(key)
    + val, err := cache.Get(ctx, key)
    ```
    ````

- Khi minh họa **lỗi**, đưa thông báo lỗi thật và cách sửa — đừng chỉ nói "sẽ lỗi".

## 7. Ghi công code mượn & license (chống đạo văn code)

Đối chiếu mục "Đạo văn code" trong `blog-foundations`.

- Code copy từ **StackOverflow, GitHub, docs, blog** đều có thể có **license**. Kiểm license trước khi dùng; ghi nguồn cho đoạn mượn.
- Snippet **ngắn, phổ thông (boilerplate)** thì không cần ghi nguồn; đoạn **dài, đặc thù, có dấu ấn tác giả** thì phải ghi công `// nguồn: [tên](url)`.
- Cẩn trọng với **code do AI sinh**: có thể tái tạo nguyên văn code có bản quyền. Nếu một đoạn trông "quen", tìm nguồn gốc và ghi công hoặc viết lại.
- Ưu tiên **code tự viết cho đúng ngữ cảnh bài** thay vì dán code mượn — vừa tránh đạo văn vừa hợp mạch bài.

## 8. An toàn trong code ví dụ (nhắc nhanh)

Chi tiết theo ngôn ngữ nằm ở skill chủ đề, nhưng ở mức trình bày:

- Không **hardcode secret/token/key** trong ví dụ — dùng biến môi trường hoặc placeholder rõ ràng (`YOUR_API_KEY`).
- Không dạy anti-pattern (nối chuỗi SQL, tắt xác thực TLS) mà không cảnh báo rõ đây là ví dụ "đừng làm thế".
- Không nuốt lỗi (`catch {}` rỗng) trong code dạy học.

## 9. Checklist riêng (thêm vào checklist blog-foundations)

Ngoài checklist của `blog-foundations`, kiểm thêm:

- [ ] Mọi code block khai báo ngôn ngữ; inline code cho tên ngắn.
- [ ] Rõ code chạy được đầy đủ hay là minh họa/lược (đánh dấu phần cắt).
- [ ] Ghi phiên bản ngôn ngữ/thư viện khi code phụ thuộc phiên bản.
- [ ] Đoạn code gọn, cắt phần không liên quan, tránh dòng quá dài.
- [ ] Ghi đường dẫn file / cấu trúc dự án khi cần; comment giải thích "vì sao".
- [ ] Output/lỗi hiển thị đúng thực tế, không bịa; dùng diff khi minh họa thay đổi.
- [ ] Không hardcode secret; không dạy anti-pattern mà không cảnh báo; không nuốt lỗi.
- [ ] Code mượn có ghi nguồn/kiểm license; đoạn đặc thù không đạo văn.

## 10. Anti-patterns riêng

- Code block không khai báo ngôn ngữ, không highlight.
- Trộn pseudo-code và code thật mà không nói, khiến người đọc paste vào rồi lỗi.
- Dán cả file dài khi chỉ cần một hàm; hoặc dòng quá dài phải cuộn ngang.
- Lệnh shell lẫn output trong một khối, có `$` đầu dòng gây vướng khi copy.
- **Bịa output** đẹp hơn thực tế; nói "sẽ lỗi" mà không đưa lỗi thật + cách sửa.
- Hardcode secret/API key thật trong ví dụ.
- Comment thừa lặp lại cái code đã nói, thiếu comment giải thích "vì sao".
- Dán code mượn (SO/GitHub) không ghi nguồn, không kiểm license.
