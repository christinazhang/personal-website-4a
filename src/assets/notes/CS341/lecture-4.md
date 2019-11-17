# Lecture 4

September 19, 2017

## Recurrences continued

**Example** - changing variables (in text)

$T(n) = 2T(\lfloor \sqrt{n} \rfloor ) + \log n$

Let $n = 2^m$

$\sqrt{n} = 2^{\frac{1}{2}} = 2^{\frac{m}{2}}$

$m = \log{n}$

$T(2^m) = 2T(2^{\frac{m}{2}} ) + m$

Let $S(m) = T(2^m)$

$S(m) = 2S(\frac{m}{2}) + m$ merge-sort

$S(m) \in O(m \log m)$

& Plugging back in

$T(2^m) \in O(m \log m)$

$T(n) \in O(\log n \log (\log n))$

### The Master Theorem

We often get recurrences like

$T(n) = aT(\frac{n}{b}) + c \cdot n^k$

(a) subproblems of size $\frac{n}{b}$ with $c \cdot n^k$ extra work

---

Case $k = 1$ example:

- $a = 2 = b$ \* $T(n) = 2T(\frac{n}{2}) + c \cdot n$ - the mergesort recurrence!
- $a = 1, b = 2$
  _ $T(n) = T(\frac{n}{2}) + c \cdot n$
  _ $T(n) \in O(n)$
- $a = 4, b = 2$
  _ $T(n) = 4(\frac{n}{2}) + c \cdot n$
  _ Exercise: $T(n) \in O(n^2)$

**Theorem: ("Master Theorem")**

$T(n) = aT(\frac{n}{b}) + c \cdot n^k \log^l n, a \geq 1, b > 1, c > 0, k \geq 1$

Then

$$T(n) \in \begin{cases} \Theta(n^k) \text{ if } a < b^k \text{ i.e. } \log_b a < k \\ \Theta(n^k \log n) \text{ if } a = b^k  \\ \Theta(n^{\log_b a}) \text{ if } a > b^k \text{ i.e. } \log_b a > k \end{cases}$$

Formal proof is done by induction.

**Informal proof:**

$T(n) = aT(\frac{n}{b}) + c \cdot n^k$

$= aT[aT(\frac{n}{b^2}) + c \cdot (\frac{n}{b})^k] + c \cdot n^k$

$= a^2T(\frac{n}{b^2}) + a \cdot c (\frac{n}{b})^k + c \cdot n^k$

$= a^3T(\frac{n}{b^3}) + a^2c \cdot (\frac{n}{b})^k + c \cdot n^k$

$=...$

$a^{\log_b n} T(1) + \sum_{j=0}^{\log_b n - 1} a^j \cdot c \cdot (\frac{n}{b^j})^k$

$a^{\log_b n} = n^{log_b a} c \cdot n^k \sum (\frac{a}{b^k})^j$

_Case 1:_ $a < b^k$ then $n^k$ dominates $n^{\log_b a}$

$\log_b a < k$

and $\sum$ is constant

so $\Theta(n^k)$

_Case 2:_ $a = b^k$

$n^k = n^{log_b a}$

and $\sum$ is $\Theta(\log_b n) = \Theta (\log n)$

So $T(n) \in \Theta(n^k \log n)$

_Case 3:_ $a > b^k$

Show $n^{\log_b a}$ dominates other term

## Divide and Conquer Algorithms

### Counting Inversions

How do we compare two ordered preference lists?

**Example:**

We have Songs A, B, C, D

- A : Sibelius' 5th Symphony (Prof Lubiw seems to really like this one)
- B : Waving through a Window from Dear Evan Hansen
- C : Naruto OP 16
- D : Beethoven's 5th Symphony

I like: B, D, C, A

You like: A, D, B, C

One way to measure the difference: number of pairs ordered differently.

In this example, there are 4 pairs in different order: BD, BA, AC, AD

(# pairs ordered the same: BC, DC for a total of $4 \choose 2$ = 6 pairs)

Equivalently:

1, 2, 3, 4 (the first list is 1, ..., n)

4, 2, 1, 3

And count the # pairs in the 2nd list that are out of order, called the _number of inversions_

Given a list $a_1, ..., a_n$ of numbers, count the # of inversions.

**Brute force** check all pairs $i < j$, $a_i$ versus $a_j$

Takes $\Theta(n^2)$

We will get $\Theta(n \log n)$ with divide-and-conquer.

- Divide list in two
  _ $m = \lceil \frac{n}{2} \rceil$
  _ $A = a_1, ... a_m$ \* $B = a_{m + 1}, ... a_n$
- Recurse to count
  _ $r_a$ = # inversions in A
  _ $r_b$ = # inversions in B

Return $r_a + r_b + r$, where r = # inversions with $a_i \in A, a_j \in B$

How to compute r? $a_i > a_j$

Want to count, for each $a_j in B$, $r_j = \# a_i \in A$ with $a_i > a_j$

$r = \sum_{a_j \in B} r_j$

This would be easier if A and B are sorted. (We will do this as part of recursion)

Like mergesort: Sort A, Sort B, merge

![](/images/lectures/CS341/4-1.png)

When $a_j$ goes to final sorted list: $r_j \leftarrow r_j + k$

**Whole algorithm:**

Sort-and-Count(L) - return sorted L and # inversions

- Divide L into A, B
- $(A, r_a) \leftarrow$ Sort-and-Count(A)
- $(B, r_b) \leftarrow$ Sort-and-Count(B)
- $r \leftarrow 0$
- merge A and B
  _ when element is moved from B to output,
  _ $r \leftarrow r +$ # of elements left in A
- return (Sorted list, $r_a + r_b + r$)

Analysis

$T(n) = 2T(\frac{n}{2}) + c \cdot n$ Same as mergesort! $T(n) \in \Theta(n \log n)$.
