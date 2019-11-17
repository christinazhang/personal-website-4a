# Lecture 5

September 21, 2017

## Divide and Conquer continued

**Example** Finding closest pair of points

Given points in plane, find closest pair $d(p, q) = \sqrt{(p_x - q_x)^2 + (p_y - q_y)^2}$

![](/images/lectures/CS341/5-1.png)

Note: to compare $d(p, q)$ with $d(r, s)$ just compare $(d(p, q))^2$ with $(d(r, s))^2$ - no square roots.

Brute force $\Theta(n^2)$

![](/images/lectures/CS341/5-2.png)

In 1D - sort $\Theta(n \log n)$ and compare adjacent pairs

Goal: Divide and Conqure $\Theta(n \log n)$

- Divide pts into left half $Q$, and right half $R$ by vertical line $L$
- Recurse on each half
- Combine \* Beware: the closest pair might straddle L:

![](/images/lectures/CS341/5-3.png)

$\delta_Q$ - minimum distance in Q

$\delta_R$ - minimum distance in R

$\delta$ - $\min(\delta_Q, \delta_R)$ as we must check for straddling pair closer than $\delta$

![](/images/lectures/CS341/5-4.png)

Claim: Enough to look at points within $\delta$ of $L$. Call these points $S$.

We might have all the points in $S$. The secret: $S$ is "almost 1D", so Sort $S$.

First, we need to sort $S$ efficiently. DO NOT do this in every recursive call.

Sort all points by y-coordinates at the start, and "extract" sorted $S$ in linear time.

**Extracting a sorted sublist**

$$a_1, a_2, a_3, ... a_i, a_j, ..., a_{n-1}, a_n$$

To sort S, just go through the big list. $\Theta(n)$.

**Overall Algorithm:**

- $X \leftarrow$ Sort pts by x-coordinate
- $Y \leftarrow$ Sort pts by y-coordinate
- Closest(X, Y):
  - $L \leftarrow$ vertical dividing line. $\Theta(1)$
  - $X_Q, X_R, Y_Q, Y_R \leftarrow$ Sorted lists for Left/Right $\Theta(n)$
  - $\delta_Q \leftarrow$ Closest($X_Q, Y_Q$)
  - $\delta_R \leftarrow$ Closest($X_R, Y_R$)
  - $\delta \leftarrow \min(\delta_Q, \delta_R)$
  - $S \leftarrow$ points within $\delta$ of $L \Theta(n)$ \* $Y_S \leftarrow$ S sorted by y-coordinate $\Theta(n)$
- Now we find straddling points in $S$.
  - For each point $p \in S$ we can restrict search to a $2 \delta \times \delta$ rectangle
  - ![](/images/lectures/CS341/5-5.png)
  - Claim: Each rectangle has $\leq$ 8 points
  - Proof: 8 boxes - ![](/images/lectures/CS341/5-6.png)
  - So $\leq$ 1 point in each little box
  - Consider $S$ sorted by y:
  - $s_1, s_2, s_3, ... s_i, s_{i+1}, ..., s_{i+7}, s_{i+8}$ \* Any point within distance $\delta$ of $s_i$ is in here. So $\leq 7n$ comparisons (over all $S_i$)
- Total: Sort $\Theta(n \log n)$
- $+ T(n) = 2T(\frac{n}{2}) + c \cdot n \in \Theta(n \log n)$

## Multiplying Large Numbers

$$
\begin{array}{ccccccc} \\
& & & & 9 & 8 & 1 \\
\times & & & 1 & 2 & 3 & 4 \\
-& -&-&-&-&-&-&- \\
& & & 3 & 9 & 2 & 4 \\
& & 2 & 9 & 4 & 3 \\
& 1 & 9 & 6 & 2 \\
9 & 8 & 1 & & & &\\
-& -&-&-&-&-&-&- \\
1 & 2 & 1 & 0 & 5 & 5 & 4
\end{array}
$$

$\Theta(n^2)$ where n = # of digits

Divide and Conquer: Let's pad so both numbers have n digits.

$$
\begin{array}{ccccccc} \\
& & 0 & 9 & 8 & 1 \\
\times & & & 1 & 2 & 3 & 4 \\
-& -&-&-&-&-&-&- \\
& & & 3 & 9 & 2 & 4 \\
& & 2 & 9 & 4 & 3 \\
& 1 & 9 & 6 & 2 \\
9 & 8 & 1 & & & &\\
-& -&-&-&-&-&-&- \\
1 & 2 & 1 & 0 & 5 & 5 & 4
\end{array}
$$

$09 | 81 \times 12 | 34$

- $09 \times 12$ shift 4: 1 0 8 \_ \_ \_ \_
- $09 \times 34$ shift 2: \_ _ 3 0 6 _ \_
- $81 \times 12$ shift 2: \_ _ 9 7 2 _ \_
- $81 \times 34$ shift 0: \_ \_ \_ 2 7 5 4

$T(n) = 4T(\frac{n}{2}) + c \cdot n$

$a = 4, b = 2, k = 1$

Using the master theorem: $a$ vs. $b^k$ - 4 > 2

Case 3: $T(n) \Theta(n^{\log_b a}) = \Theta(n^2)$

... Which is exactly the same. Not better (so far!)

We can avoid 1 of the 4 multiplications

$09 (w) | 81 (x) \times 12 (y) | 34 (z)$

$(10^2w + x) \times (10^2y + z)$

$= 10^4wy + 10^2*(wz + xy) + xz$

We don't really need $wz$ and $xy$. We need their sum.

$(w + x)(y + z) = r$

$wy + wz + xy + xz$

We already have $wy$ and $xz$!

Compute $wy, xz, r$

Answer: $10^4wy + 10^2*(r - wy + xz) + xz$

So $T(n) = 3T(\frac{n}{2}) + c \cdot n$

$a = 3, b = 2, k = 1$

$a$ vs $b^k$ - 3 > 2

Case 3: $T(n) \Theta(n^{\log_b a}) = \Theta(n^{\log_2 3})$
$\sim \Theta(n^{1.585})$

This method is due to Karatsuba and Ofman from the 1960s!

## Multiplying Matrices

Two $n \times n$ matricies

Basic method $\Theta(n^3)$

Note: we measure in terms of n, not input size.

**Divide and Conquer**

$$
\left[ \begin{array}{cc} \\
C_{1, 1} & C_{1, 2} \\
C_{2, 1} & C_{2, 2} \\
\end{array} \right] = \left[ \begin{array}{cc} \\
A_{1, 1} & A_{1, 2} \\
A_{2, 1} & A_{2, 2} \\
\end{array} \right] \left[ \begin{array}{cc} \\
B_{1, 1} & B_{1, 2} \\
B_{2, 1} & B_{2, 2} \\
\end{array} \right]
$$

$C = A \times B$

$C_{1, 1} = A_{1, 1} \times B{1, 1} + A_{1, 2} \times B_{2, 1}$
...
$T(n) = 8T(\frac{n}{2}) + c \cdot n^2$

$a = 8, b = 2, k = 2$

$a$ vs. $b^k$: 8 > 4

$T(n) \Theta(n^{\log_2 8}) = \Theta(n^3)$

Again, no improvement.

We'll use the Strassen method - reduce 8 subproblems to 7.
$T(n) = 8T(\frac{n}{2}) + c \cdot n^2$

$a = 7, b = 2, k = 2$

$a$ vs. $b^k$: 7 > 4
$T(n) \Theta(n^{\log_2 7}) \sim \Theta(n^{2.808})$
