# Lecture 10

October 12, 2017

## Dynamic Programming cont'd

### Knapsack Problem

Given items 1, 2, ..., n, where $W$ - weight limit, item $i$ has weight $w_i$, and value $\sqrt{i}$, choose subset $S \subseteq \{1, ..., n\}$ such that $\sum_{i \in S} w_i \leq W$ and $\sum_{i \in S} v_i$ is maximum.

Previously, we did a greedy algorithm for a _fractional_ knapsack, which means we could choose 1/2 of an item if needed.

This will be a 0-1 knapsack, so there are no fractions. Greedy does not always work in this case.

Idea: is item n _in_ or _out_? If $n \notin S$ then look at items 1, ..., n-1

If $n \in S$ then look at items 1, ..., n-1 with weight limit $W - w_n$.

**Subproblems:** for each $i = 0, 1, ..., n$, for each $w = 0, ..., W$, find subset S of $\{0, ..., i\}$ with $\sum_{j \in S} w_j \leq w$ and $\max \sum_{j \in S} v_j$.

Let matrix $M(i, w) = \max \sum_{j \in S} \sqrt{j}$

**Pseudocode:**

```none
initialize M(0, w) <- 0 for all w = 0, .., W
for i = 1 ... n:
  for w = 0 ... W:
    if w_i > w:
      M(i, w) <- M(i-1, w)
    else:
      M(i, w) <- max(M(i-1, w), v_i + w-w_i))
```

_Note:_ $W$ and $w_i$'s are natural numbers.

**Analysis:** $O(n \cdot W)$. This is _not_ polynomial time. It is _pseudo-polynomial._ Because run time depends on value W, not its size, which is $\Theta(\log W)$

To find the set S, we have two general techniques:

1. backtracking

- Recommended for our assignments and in general

2. store solutions in dynamic programming code

- Downside: uses extra space

**Backtracking pseudocode:**

```none
i <-n, w <- W
while i > 0:
  if M(i, w) = M(i-1, w): //i.e., we didn't use i
    i <- i-1
  else:
    output i
    i <- i-1
    w <- w-1
end
```

**Analysis:** $O(n)$

A simpler, related problem (relevant for NP hardness): the **Subset Sum problem**

Given n natural numbers $a_1, a_2, ..., a_n$ and target $k$, is there a subset $S \subseteq \{ 1, ..., n \}$ such that $\sum_{i \in S} a_i = K$, in other words, can we pick a subset of numbers that add up to $k$? Sort of like the knapsack. It's a decision question, not optimization, so this makes it easier.

This is a pseudo-polynomial time dynamic programming algorithm.

**Ex:** Find algorithm

Use M(i, k) where k = 0, 1, 2, ..., k = YES or NO, is there a subset of $\{a_1, ..., a_i\}$ that adds up to k?

### Common subproblems in dynamic programming

1. $x_1, ..., x_n$ - subproblems $x_1, ..., x_i$, so n subproblems.
   e.g. weighted interval scheduling

2. input $x_1, ... x_n$ - subproblems $x_i, ..., x_j$
   e.g. optimum binary search tree

3. input $x_1, ..., x_n$ and $y_1, ..., ym$ with subproblems $x_1, ..., x_i$ and $y_1, ... y_j$, so $n \cdot m$ subproblems
   e.g. maximum common subsequence, edit distance

4. See notes
5. e.g. 0-1 Knapsack, Subset Sum, where the subproblems are $n \cdot W$

### Chain Matrix Multiplication

Compute the matrix product $M_1 \cdot M_2 \cdot ... \cdot M_n$. Our objective will be to choose an order such that we minimize the cost.

Let's first look at $C = A \cdot B$. Then, if A is a $d_1 \times d_2$ matrix, B must be a $d_2 \times d_3$ matrix.

Then, C will be $d_1 \times d_3$. The cost of computing this is $d_1 \cdot d_2 \cdot d_3$, the number of scalar multiplications.

**Example:** $A_1 = 2 \times 10, A_2 = 10 \times 1, A_3 = 1 \times 4$.

Which do we do?

- $(A_1 \cdot A_2) \cdot A_3$ \* The cost of this is $(2 \cdot 10 \cdot 1) + (2 \cdot 1 \cdot 4) = 28$.
- $A_1 \cdot (A_2 \cdot A_3)$ \* Cost = $(10 \cdot 1 \cdot 4) + (2 \cdot 10 \cdot 4) = 120$

Deciding the order to multiply:

- parenthesizing the expression $M_1 \cdot M_2 \cdot ... \cdot M_n$
- build a binary (expression) tree
  - compare $(M_1 \cdot M_2) \cdot (M_3 \cdot M_4)$ vs. $((M_1 \cdot M_2) \cdot M_3) \cdot  M_4$

Recall the problem we did earlier on constructing an optimum binary search tree.

**Subproblem:** Choose order for $M_i \cdot M_{i+1} \cdot ... \cdot M_j$ where $M_i$ is $d_i \times d_{i+1}$

$C(i, j)$ = min. cost to compute. Then we have $n^2$ subproblems.

$C(i, i) = 0$
$C(i, j) = \min_{k = i,...j-1} \{C(i, k) + C(k + 1, j) + d_{i-1} \cdot d_k \cdot d_j\}$

**Exercise:** pseudocode.

**Runtime:** $O(n^2 \text{ (number of subproblems)} \cdot n \text{ (time per subproblem)})$

**Memoization** - allows a recursive solution by storing subproblem solutions already encountered.
