---
title: "7 mẹo prompt để AI sinh code sạch hơn"
slug: 7-meo-prompt-ai-sinh-code-sach-hon
date: 2026-09-03
description: "7 mẹo prompt giúp Copilot, Cursor và Claude Code sinh code sạch hơn: nêu context, contract, test, giới hạn phạm vi, bảo mật và review rủi ro trước khi merge."
tags: [ai-coding, prompt-engineering, code-quality, developer-tools]
categories: [AI Coding]
draft: true
---

# 7 mẹo prompt để AI sinh code sạch hơn

AI coding tool có thể viết một hàm trong vài giây, nhưng tốc độ sinh code không đồng nghĩa với chất lượng code. Nếu prompt chỉ nói “hãy viết cho tôi một API”, bạn thường nhận được output thiếu context, khó review và dễ sai ở những nhánh không có trong ví dụ.

Bài này trình bày bảy nguyên tắc có thể dùng với Copilot, Cursor, Claude Code hoặc công cụ tương tự. Ví dụ chỉ dùng prompt dạng text, không phụ thuộc vào tên nút, agent mode hay giao diện của nhà cung cấp. Tính đến ngày 03/09/2026, giao diện và tên model có thể thay đổi; nguyên tắc về context, ràng buộc và kiểm chứng mới là phần nên giữ lại.

**TL;DR**

- Cho AI biết context, mục tiêu, invariant và tiêu chí chấp nhận trước khi yêu cầu viết code.
- Chia task thành bước nhỏ; yêu cầu AI lập kế hoạch và chỉ sửa phạm vi đã nêu.
- Luôn yêu cầu test, xử lý lỗi và tự review, nhưng xem output là bản nháp cần con người kiểm tra.

## 1. Cung cấp context trước khi yêu cầu giải pháp

Một prompt tốt không bắt đầu bằng “hãy tối ưu hàm này”. Nó nói rõ hàm nằm ở đâu, input có ý nghĩa gì, contract hiện tại ra sao và điều gì không được thay đổi.

### Prompt trước

```text
Tối ưu hàm này để chạy nhanh hơn.
```

### Prompt sau

```text
Bạn đang sửa package orders trong một service Go.

Mục tiêu: giảm số lần đọc repository trong hàm FindOpenOrders.

Context:
- Go 1.22+.
- Hàm phải giữ nguyên signature và thứ tự kết quả hiện tại.
- Repository trả về lỗi ErrNotFound khi không có order.
- Không được thay đổi schema database hoặc public API.
- Nếu chưa đủ context, hãy nêu câu hỏi trước khi sửa.

Hãy đề xuất kế hoạch ngắn, sau đó đưa diff tối thiểu và giải thích invariant được giữ nguyên.
```

**Nguyên tắc:** AI không nhìn thấy những giả định nằm trong đầu bạn. Context càng cụ thể, không gian để AI tự đoán càng nhỏ. Hãy ưu tiên contract và giới hạn thay vì dán cả codebase không có cấu trúc.

**Đầu ra cần kiểm tra:** signature có giữ nguyên không, số lần gọi repository có thực sự giảm không, và lỗi `ErrNotFound` có bị đổi nghĩa không. Đừng coi một diff ngắn là bằng chứng nó đúng.

## 2. Viết acceptance criteria và invariant thành checklist

“Code sạch” là một mục tiêu mơ hồ. Các điều kiện kiểm tra được giúp AI hướng output vào hành vi cụ thể và giúp reviewer có checklist đối chiếu.

### Prompt trước

```text
Viết hàm validate email và password cho đăng ký tài khoản.
```

### Prompt sau

```text
Viết hàm ValidateSignup trong TypeScript.

Acceptance criteria:
1. Email được trim trước khi kiểm tra và trả về lỗi nếu rỗng.
2. Password có ít nhất 12 ký tự; không log hoặc trả lại password.
3. Hàm không gọi network và không phụ thuộc framework.
4. Kết quả có dạng { valid: boolean, errors: string[] }.
5. Viết test cho input hợp lệ, email rỗng, password ngắn và khoảng trắng đầu/cuối.

Nếu có quy tắc chưa được xác định, đánh dấu TODO thay vì tự bịa.
```

**Nguyên tắc:** acceptance criteria biến yêu cầu tự nhiên thành các mệnh đề có thể test. Từ “không được” cũng quan trọng như “phải có”: không network, không log secret, không đổi public API là các invariant bảo vệ codebase.

**Đầu ra cần kiểm tra:** test có thật sự kiểm tra từng criteria không. Một test có tên `should validate` nhưng không có assertion hữu ích không đủ chứng minh behavior.

## 3. Yêu cầu AI đọc và lập kế hoạch trước khi sửa

Với task nhiều file, yêu cầu AI viết ngay dễ dẫn đến thay đổi lan sang những module không liên quan. Hãy tách pha hiểu bài khỏi pha chỉnh sửa.

### Prompt trước

```text
Thêm caching cho user service và sửa mọi file cần thiết.
```

### Prompt sau

```text
Trước khi viết code, hãy:
1. Liệt kê các file liên quan đến UserService và luồng đọc user.
2. Mô tả nơi cache nên nằm, key format và invalidation khi update.
3. Nêu hai rủi ro consistency của phương án.
4. Chờ tôi xác nhận kế hoạch.

Không sửa file và không thêm dependency ở bước này.
```

**Nguyên tắc:** plan là một điểm dừng để phát hiện hiểu sai trước khi tạo diff. Với agent có thể tự đọc repository, câu “chỉ đọc và báo cáo” cũng là một ràng buộc an toàn, không phải thao tác riêng của một IDE.

**Đầu ra cần kiểm tra:** kế hoạch phải trỏ tới file và luồng có thật. AI có thể bịa tên module nếu context không đủ; hãy mở file và kiểm tra import trước khi đồng ý.

## 4. Giới hạn phạm vi thay đổi và yêu cầu diff tối thiểu

AI thường “tiện tay” format lại, đổi tên biến hoặc nâng dependency khi bạn chỉ muốn sửa một bug. Nêu rõ vùng được phép thay đổi giúp review dễ hơn.

### Prompt trước

```text
Sửa bug timeout trong payment service.
```

### Prompt sau

```text
Sửa lỗi timeout trong hàm RetryPayment ở file src/payment/retry.ts.

Phạm vi:
- Chỉ sửa file này và thêm test ở src/payment/retry.test.ts nếu cần.
- Không đổi package.json, public API, tên error hoặc format toàn repository.
- Không thay đổi số lần retry mặc định nếu chưa giải thích lý do.
- Trả về diff và liệt kê từng file đã sửa.

Trước khi kết thúc, kiểm tra các nhánh: timeout lần đầu, thành công ở lần retry và hết số lần retry.
```

**Nguyên tắc:** scope rõ làm giảm “blast radius”. Diff nhỏ không bảo đảm đúng, nhưng diff có phạm vi dễ kiểm tra, revert và review hơn.

**Đầu ra cần kiểm tra:** xem toàn bộ diff chứ không chỉ phần AI tóm tắt. Kiểm tra dependency lockfile, file sinh tự động và config có bị đổi ngoài ý muốn không.

## 5. Bắt AI nói rõ error path, edge case và security

Happy path thường là phần AI làm tốt nhất. Bug production lại nằm ở timeout, input bất thường, quyền truy cập và dữ liệu nhạy cảm.

### Prompt trước

```text
Viết endpoint tạo invoice từ request JSON.
```

### Prompt sau

```text
Thiết kế handler POST /invoices với các trường customer_id và amount_cents.

Hãy mô tả và xử lý rõ:
- body không hợp lệ, amount bằng 0 hoặc âm;
- customer không tồn tại;
- request bị gửi lại;
- lỗi database và timeout của dependency;
- authorization: user chỉ được tạo invoice cho customer của mình;
- không ghi token, thông tin thẻ hoặc dữ liệu nhạy cảm vào log.

Dùng parameterized query. Với mỗi error path, nêu HTTP status và thông tin được phép trả ra client.
```

**Nguyên tắc:** yêu cầu “viết endpoint” không tự chứa threat model. Hãy đưa error path và security boundary vào prompt, rồi kiểm tra lại bằng hiểu biết domain của bạn.

**Đầu ra cần kiểm tra:** import có tồn tại không, query có nối chuỗi input không, validation có nằm trước side effect không, và status code có khớp contract của service không.

## 6. Yêu cầu test cho behavior, không chỉ coverage

AI có thể sinh rất nhiều test nhưng chỉ lặp lại happy path. Hãy đưa bảng case và yêu cầu test kiểm tra observable behavior.

### Prompt trước

```text
Viết unit test cho hàm calculateShipping.
```

### Prompt sau

```text
Viết unit test cho calculateShipping(order, destination).

Bảng case tối thiểu:
- giỏ hàng rỗng: trả lỗi;
- địa chỉ hợp lệ trong cùng khu vực: phí chuẩn;
- địa chỉ ngoài vùng phục vụ: lỗi rõ ràng;
- tổng trọng lượng đúng ở ngưỡng miễn phí: không tính phí;
- dependency tra bảng giá trả lỗi: propagate lỗi, không trả phí bằng 0.

Không test implementation detail. Mỗi test phải có assertion về giá trị hoặc lỗi quan sát được. Nếu behavior hiện tại không xác định, hãy nêu câu hỏi thay vì tự chọn.
```

**Nguyên tắc:** test là executable specification. Case list buộc AI đối diện với biên và lỗi; câu “không test implementation detail” tránh khóa test vào tên private method hoặc số lần gọi không thuộc contract.

**Đầu ra cần kiểm tra:** chạy test thật, đọc assertion và bổ sung case theo domain. Test xanh chỉ chứng minh test và code đồng ý với nhau, không chứng minh yêu cầu nghiệp vụ đúng.

## 7. Yêu cầu một vòng self-review có cấu trúc

Câu “hãy kiểm tra lại” quá chung. Một checklist review có thứ tự khiến AI tập trung vào những rủi ro bạn quan tâm.

### Prompt trước

```text
Review code này và sửa nếu cần.
```

### Prompt sau

```text
Review diff vừa tạo theo đúng thứ tự:
1. Có thay đổi behavior ngoài yêu cầu không?
2. Có lỗi nil/null, race condition, retry sai hoặc resource leak không?
3. Input nào chưa được validate? Có SQL injection, lộ secret hoặc log nhạy cảm không?
4. Test nào còn thiếu cho error path và edge case?
5. API/dependency nào cần xác minh bằng tài liệu chính thức?

Trả về bảng gồm: finding, mức độ, file/dòng, cách kiểm chứng. Chỉ sửa blocker sau khi nêu finding; không tự mở rộng phạm vi.
```

**Nguyên tắc:** self-review là lớp phát hiện thứ hai, không phải quyền tự phê duyệt. Yêu cầu AI trích finding và cách kiểm chứng giúp bạn phân biệt phân tích có bằng chứng với lời khẳng định chung chung.

## Rủi ro AI và trách nhiệm của con người

Prompt tốt chỉ giảm xác suất sai; nó không biến AI thành reviewer chịu trách nhiệm.

- **Hallucination:** AI có thể bịa package, option, API hoặc hiểu sai version. Kiểm tra import, signature và tài liệu chính thức; chạy compiler, linter và test.
- **Bảo mật:** không dán credential, access token, dữ liệu khách hàng hoặc source code nhạy cảm vào công cụ nếu chưa hiểu chính sách dữ liệu. Code sinh ra vẫn có thể có SQL injection, thiếu authorization hoặc validate không đủ.
- **Bản quyền và license:** code AI sinh có thể giống một đoạn code có sẵn. Với snippet dài hoặc đặc thù, tìm nguồn gốc, xem license và ghi công khi cần; đừng mặc định output là “không có bản quyền”.
- **Phụ thuộc quá mức:** nếu không đọc được code mình merge, bạn đang chuyển rủi ro sang lần debug sau. Hãy yêu cầu AI giải thích, nhưng chỉ merge phần bạn hiểu và có thể bảo trì.
- **Sai lệch domain:** AI không biết đầy đủ chính sách hoàn tiền, quyền riêng tư hay invariant tài chính của công ty nếu bạn không cung cấp. Những quyết định đó cần owner của hệ thống xác nhận.

Quy trình tối thiểu trước khi merge là: đọc diff, kiểm tra dependency/API, chạy test và kiểm tra security, sau đó một người có trách nhiệm ký duyệt. AI có thể đề xuất và tăng tốc; con người chịu trách nhiệm cuối cho code được deploy.

## Key takeaways

- Prompt sạch bắt đầu từ context, invariant và acceptance criteria, không bắt đầu từ tên framework.
- Tách plan khỏi edit và giới hạn file giúp giảm blast radius.
- Hãy bắt AI nói về error path, security và test; sau đó kiểm chứng bằng toolchain thật.
- Không có prompt nào loại bỏ hallucination. Review, test, hiểu code và quyết định merge vẫn là trách nhiệm của con người.

---

*Meta description (150–160 ký tự):* 7 mẹo prompt giúp Copilot, Cursor và Claude Code sinh code sạch hơn: nêu context, contract, test, giới hạn phạm vi, bảo mật và review rủi ro trước khi merge.
