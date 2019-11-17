# Lecture 9

## Dynamic Programming Continued

### Edit Problem

Recall: Maximum common subsequence

`(T)(A)(R)M(A)C`
`CA(T)(A)MA(R)(A)N`

More sophisticated: count # of changes

For example, if you were to google "Pythagorus" - google would respond by saying, "Did you mean _Pythagoras_?"

Another example: recurance vs. recurrence - 2 changes

This problem is known as _Edit Distance._

A change is:

- Adding a letter
- Deleting a letter
- Changing one letter - cost may depend on change
  - e.g. A to S costs 1 (they're next to each other on keyboard)
  - A to C costs 2

Application in bioinformatics:

- Sequence alignment
- DNA - sequence of chromosomes
- String over A/C/T/G

Also good for finding patterns in music!

Given two strings $x_1, ..., x_m$ and $y_1, ..., y_n$ we want to find the minimum edit distance (number of changes) to convert $X$ to $Y$

Subproblems for $x_1, ..., x_i$, $y_1, ..., y_j$

Let $M(i, j)$ = min # of changes

Our choices are:

- Match $x_i$ to $y_j$
- Delete $x_i$
- Add $y_j$

$M(i,j)$ = (\*) $\min \begin{cases} M(i-1, j-1) \text{ if } x_i = y_j \\ r + M(i-1, j-1) \text{ if } x_i \neq y_j \\ d+M(i-1, j) \\ a+M(i, j-1) \end{cases}$

where:

- r = replacement cost
- d = deletion cost
- a = addition cost

The simplest: r = d = a = 1

Order of solving suproblems:

We can think of M as a matrix:

![](/images/lectures/CS341/9-1.png)

Other possibilities:

Go along the rows

![](/images/lectures/CS341/9-2.png)

Go along the columns

![](/images/lectures/CS341/9-3.png)

Go diagonally

![](/images/lectures/CS341/9-4.png)

Array M[0 ... m, 0 ... n]

```none
for i = 0 ... m M(i, 0) = i * d
for j = 0 ... n M(0, j) = j * a
for i = 1 ... m
  for j = 1 ... n
    M(i, j) = *
```

Run time: $O(n \cdot m)$ (number of subproblems.) The time for one subproblem is constant.

Space: $O(n \cdot m)$, but we can reduce space if we just want M, which is easy. But not so easy if we want actual matching.

### Coin Changing Revisited

Coin denominations: $c_1, ..., c_k$

Value: $V$

We want to find the minimum number of coins to get $V$.

To get $V$, try each possible coin $c_i$. Then, we need change for $V - c_i$.

Subproblems: $C(v), v = 1 ... V$ Where C(v) is the minimum number of coins for value v.

$C(v) = \min_{i = 1, ..., k} \{1 + C(v - c_i)\}$

```none
C(0) = 0
for v = 1 ... V
	C(v) <- infinity
	for i = 1 ... k
		if c_i <= v and (1 + C(v - c_i) < C(v)
			then C(v) <- 1 + (v-C_i)
	end
```

Note: $C(v) = \infty$ if and only if we cannot make change for v.

Run time: $O(v \cdot k)$.

An algorithm runs in **polynomial time** if run time is $O(n^c)$, c a constant, for input size in.

Our previous algorithm is _not_ polynomial time, because the size of V is $\log V$ = # bits in V. But run time depends on V, nog $\log V.$

The above algorithm is **pseudo-polynomial** time.

### Optimum Binary Search Trees

Given items $1, ..., n$ and probabilities $p_1, ... p_n$, construct a binary search tree (items in leaves) to minimize search cost $\sum_{i = 1}^{n} p_i depth(i)$ where depth(i) is the number of probes into the tree to find item i

Suppose $p_1 = p_2 = ... p_4 = \frac{1}{4}$

![](/images/lectures/CS341/9-5.png) Search cost: $4 \cdot \frac{1}{4} \cdot 3 = 3$

Now suppose $p_1 = 0.7, p_2 = p_3 = p_4 = .1$

Search cost is $.7(3) + 3(.1) \cdot 3 = 3$

![](/images/lectures/CS341/9-6.png)

$.7(2) + (.1)3 + 2(.1)4 = 2.5$

Note: Different from Huffman because of leaf ordering.

Note: in CS240 we looked at adding & deleting items.

To construct an optimal BST, we will be using dynamic programming.

Idea: choose root = split items into $1, ..., i$ and $i+1, ..., n$ - 2 subproblems

Subproblems - build optimal tree for items i, i+1, ..., j. So $O(n^2)$ subproblems. To solve for items $i, ..., j$

![](/images/lectures/CS341/9-7.png) try all choices of k to split in two

$M(i, j)$ = minimum search cost for binary search tree on items i ... j

$M(i, j) = \min*{k = i, ..., j} \{M(i, k) + M(k+1, j)\} + \sum*{t=i}^{j} pt$, because every node is 1 deeper.

$P(i) = \sum_{t=1}^{i} p_i$

$\sum_{t=i}^{j} = P(j) = P(i-1)$

```none
for i = 1, ..., n M(i,i) = p_i
for r = 1, ..., n - 1
  for i = 1 ... n - r //find M(i, i+r)
     best <- M(i, i) + M(i+1, i + r)
     for k = 2 ... i + r - 1
       temp <- M(i, k) (the best tree I made from i to k) + M(k+1, i+r)
       if temp < best
       then best <- temp
      end
    M(i, i+r) <- best + P(i + r) - P(i - 1)
   end
end
```

Run Time: $O(n^3)$.
