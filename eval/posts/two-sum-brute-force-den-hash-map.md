---
title: "Two Sum: từ O(n²) xuống O(n)"
slug: two-sum-brute-force-den-hash-map
date: 2026-09-03
description: "Giải Two Sum từ brute force đến Hash Map với trực giác, dry-run, code Python chạy được, Big-O chính xác, edge case và trade-off bộ nhớ cho phỏng vấn coding."
tags: [algorithms, dsa, two-sum, hash-map, coding-interview]
categories: [Data Structures and Algorithms]
draft: true
---

# Two Sum: từ O(n²) xuống O(n)

Two Sum là bài tập nhỏ nhưng dạy một pattern lớn: khi cần tìm một phần tử bổ sung cho phần tử hiện tại, hãy cân nhắc lưu những gì đã thấy vào Hash Map. Bài này đi từ cách thử mọi cặp đến lời giải một lượt, thay vì nhảy thẳng vào đoạn code tối ưu.

## Phát biểu bài toán

Cho mảng số nguyên `nums` và số nguyên `target`, trả về chỉ số của hai phần tử khác nhau sao cho tổng của chúng bằng `target`.

Quy ước trong bài:

- Mỗi cặp dùng hai chỉ số khác nhau.
- Nếu có nhiều cặp, trả về cặp đầu tiên mà thuật toán tìm thấy theo thứ tự duyệt.
- Nếu không có cặp, hàm trả về `[]`.
- Chỉ số bắt đầu từ `0`.
- Không được dùng cùng một phần tử hai lần.

Ví dụ:

```text
Input:  nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Giải thích: nums[0] + nums[1] = 2 + 7 = 9
```

## Trực giác: tìm “phần bù”

Khi đang ở giá trị `x`, giá trị còn thiếu là:

\[
need = target - x
\]

Thay vì thử `x` với mọi phần tử còn lại, ta có thể hỏi: “Tôi đã gặp `need` trước đó chưa?”. Hash Map biến câu hỏi này thành một lookup trung bình O(1). Điều quan trọng là lưu **giá trị → chỉ số**, vì output cần chỉ số chứ không chỉ cần biết có tồn tại giá trị.

## Cách 1: brute force thử mọi cặp

Cách trực tiếp nhất là chọn một phần tử ở vị trí `left`, rồi thử với các phần tử đứng sau nó ở vị trí `right`.

```python
from __future__ import annotations


def two_sum_bruteforce(nums: list[int], target: int) -> list[int]:
    """Return the first pair of indices whose values add up to target."""
    for left in range(len(nums)):
        for right in range(left + 1, len(nums)):
            if nums[left] + nums[right] == target:
                return [left, right]
    return []
```

Vòng lặp trong bắt đầu từ `left + 1`, nên cùng một phần tử không bị dùng hai lần. Hàm dừng ngay khi gặp cặp đầu tiên; nếu không gặp, trả về `[]`.

### Độ phức tạp của brute force

- **Thời gian:** O(n²) trong trường hợp xấu nhất. Với khoảng n phần tử, số cặp cần thử là `n(n - 1) / 2`, thuộc bậc O(n²).
- **Không gian phụ:** O(1), không tính mảng input và danh sách output có tối đa hai chỉ số.

Cách này có ưu điểm là đơn giản, không cần cấu trúc dữ liệu phụ và không phụ thuộc behavior của Hash Map. Nó phù hợp khi mảng nhỏ hoặc khi ưu tiên code tối giản hơn thời gian chạy.

## Cách 2: Hash Map một lượt

Ta duyệt từ trái sang phải. Ở mỗi index `i`:

1. Tính `need = target - nums[i]`.
2. Nếu `need` đã nằm trong `seen`, trả về index cũ và `i`.
3. Nếu chưa, lưu `nums[i] → i` rồi đi tiếp.

```python
from __future__ import annotations


def two_sum(nums: list[int], target: int) -> list[int]:
    """Return the first pair of distinct indices that reaches target."""
    seen: dict[int, int] = {}

    for index, value in enumerate(nums):
        needed = target - value
        if needed in seen:
            return [seen[needed], index]
        seen[value] = index

    return []
```

### Vì sao lưu sau khi lookup?

Xét `nums = [3, 3]`, `target = 6`:

- Ở index `0`, cần `3` nhưng map còn rỗng; lưu `3 → 0`.
- Ở index `1`, cần `3` và map đã có index `0`; trả `[0, 1]`.

Nếu lưu phần tử hiện tại trước rồi mới lookup, một triển khai bất cẩn có thể dùng chính index hiện tại hai lần. Lookup trước rồi mới lưu làm invariant “map chỉ chứa phần tử ở các index trước đó” trở nên rõ ràng.

### Dry-run

Với `nums = [2, 7, 11, 15]`, `target = 9`:

| Bước | Index | Value | Needed | `seen` trước bước | Kết quả |
| --- | ---: | ---: | ---: | --- | --- |
| 1 | 0 | 2 | 7 | `{}` | Chưa có 7, lưu `{2: 0}` |
| 2 | 1 | 7 | 2 | `{2: 0}` | Có 2, trả `[0, 1]` |

Thuật toán không cần đọc tới `11` hay `15` vì đã tìm thấy đáp án.

### Độ phức tạp của Hash Map

- **Thời gian kỳ vọng:** O(n). Mỗi phần tử được duyệt một lần; lookup và insert Hash Map của Python có chi phí kỳ vọng O(1), nên tổng là O(n).
- **Không gian phụ:** O(n) trong trường hợp không có cặp hoặc cặp xuất hiện muộn, vì map có thể giữ gần như toàn bộ mảng.
- **Trường hợp xấu nhất lý thuyết:** nếu thao tác hash bị suy biến do collision, chi phí lookup có thể lớn hơn O(1). Vì vậy cách viết chính xác là O(n) kỳ vọng cho Hash Map, không phải lời hứa tuyệt đối cho mọi implementation.

Đổi lại O(n) thời gian, ta trả thêm O(n) bộ nhớ. Đây là trade-off phổ biến khi dùng cấu trúc dữ liệu để giảm số lần so sánh.

## Chương trình chạy thử

Đoạn dưới đây là file Python hoàn chỉnh có thể chạy bằng Python 3.9+:

```python
from __future__ import annotations


def two_sum_bruteforce(nums: list[int], target: int) -> list[int]:
    for left in range(len(nums)):
        for right in range(left + 1, len(nums)):
            if nums[left] + nums[right] == target:
                return [left, right]
    return []


def two_sum(nums: list[int], target: int) -> list[int]:
    seen: dict[int, int] = {}
    for index, value in enumerate(nums):
        needed = target - value
        if needed in seen:
            return [seen[needed], index]
        seen[value] = index
    return []


def main() -> None:
    cases = [
        ([2, 7, 11, 15], 9, [0, 1]),
        ([3, 3], 6, [0, 1]),
        ([-3, 4, 7, 1], 1, [0, 1]),
        ([1], 2, []),
        ([], 0, []),
        ([1, 2, 4], 100, []),
    ]

    for nums, target, expected in cases:
        assert two_sum_bruteforce(nums, target) == expected
        assert two_sum(nums, target) == expected

    print("all cases passed")


if __name__ == "__main__":
    main()
```

Output kỳ vọng:

```text
all cases passed
```

Các case kiểm tra gồm đáp án thông thường, duplicate, số âm, một phần tử, mảng rỗng và không có đáp án. Python integer không overflow như kiểu số nguyên cố định; nếu chuyển sang Java, C++ hoặc Go, hãy chọn kiểu đủ lớn cho phép cộng theo constraint của đề.

## Edge cases cần nhớ

- **Mảng rỗng hoặc có một phần tử:** không đủ hai index, trả `[]`.
- **Hai giá trị trùng nhau:** map phải lưu index trước để `[3, 3]` trả đúng hai vị trí.
- **Số âm và target âm:** công thức `target - value` không cần thay đổi.
- **Nhiều đáp án:** kết quả phụ thuộc quy ước “cặp đầu tiên”; nếu đề yêu cầu mọi cặp, output và thuật toán phải đổi.
- **Không có đáp án:** không được truy cập phần tử ngoài mảng; trả sentinel đã thống nhất.
- **Integer overflow:** Python tránh vấn đề này, nhưng ngôn ngữ có kiểu fixed-width thì cần kiểm tra constraint hoặc dùng kiểu rộng hơn.

## Pattern áp dụng cho bài khác

Hash Map lookup phù hợp khi bài yêu cầu tìm một phần bù, đếm tần suất hoặc kiểm tra một phần tử đã xuất hiện. Một số biến thể:

- Three Sum: thường sort rồi dùng two pointers, hoặc kết hợp Hash Map với vòng lặp ngoài.
- Subarray Sum Equals K: lưu prefix sum và số lần xuất hiện prefix sum.
- Two Sum trên stream: giữ map các giá trị đã nhận khi dữ liệu đi qua một lần.

Không phải lúc nào Hash Map cũng là đáp án. Nếu mảng đã sort và cần O(1) bộ nhớ phụ, two pointers có thể là lựa chọn khác; hãy cân đối thứ tự input, output và giới hạn bộ nhớ.

## Key takeaways

- Brute force thử mọi cặp, dễ hiểu nhưng có O(n²) thời gian và O(1) không gian phụ.
- Hash Map lưu giá trị đã thấy, đạt O(n) thời gian kỳ vọng và O(n) không gian phụ.
- Lookup phần bù trước khi lưu phần tử hiện tại giúp tránh dùng cùng index hai lần.
- Luôn nêu rõ giả định về nhiều đáp án, không có đáp án, duplicate và overflow.

---

*Meta description (150–160 ký tự):* Giải Two Sum từ brute force đến Hash Map với trực giác, dry-run, code Python chạy được, Big-O chính xác, edge case và trade-off bộ nhớ cho phỏng vấn coding.
