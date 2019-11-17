# Lecture 8

For each i = 1, ..., let p(i) = largest index k < i such that interval k does not overlap interval i

We will compute P(i) later.

Let M(i) = wOPT{1,...i} = maximum weight of a set of disjoint intervals in 1, ..., i

Algo:

```none
M(0) = 0
for i = 1 ... n
  M(i) = max{M(i-1), w(i) + M(p(i))}
```

Fill in array M[0,..., n]

1. Compute p(i)
2. Timing
3. What about opt. set?

4. Order 1...n - sorted by right endpoint, also sort by left endpoint $l_1, l_2, ..., l_n$

```none
j <- n
for k = n ... l
  while l_k overlaps j do j <- j - 1
  p(l_k) <- j
end
```

Takes $\Theta(n)$ to do this

2. Timing \Theta(n \log n) + \Theta (n) + \Theta(n \cdot C)\$

Algo:

```none
M(0) = 0;
for i - 1 ... n
  M(i) = max{M(i-1) ... }
end
```

3. Finding OPT set

Recursive function OPT(i)

```none
if i = 0 return empty set
else if M(i-1) >= w(i) + M(p(i))
  return OPT(i-1)
else return {i}U OPT(p(i))
```

Maximum Common Subsequence
Given 2 strings find largest common subsequence

`(TA)(R)M(A)C`

`CA(TA)MA(RA)N`, so 4 is the longest subsequence, note it doesn't need to be consecutive

Note: We can skip letters, but preserve ordering.

Strings $x_1, ..., x_m$ and $y_1, ..., y_n$

M(i, j) = length of max common substring of $x_1, ... x_i$ and $y_i, ..., y_j$

3 choices:

- $x_i = y_j$
- Discard $x_i$
- Discard $y_j$

$M(i,j) = \max \begin{cases} 1+M(i-1, j-1) if x_i = y_j // M(i-1, j) // M(i, j-1)\end{cases}$

$M(i, 0) = 0, M(0, j) =0$ and solve subproblems in order of i+j

Exercise: write the pseudocode

A picture of M and alg

Run Time: n - m (# of subproblems) \* c (time to solve one subproblem)

Exercise: Augment your pseudocode to remember p(i, j) = which of the 3 choices did we use to get M(i, j). Then use p(., .) values to get your actual match

Longest increasing subsequence:

L = 5 (2) 9 6 (3) (7) 4

S = 2 3 4 5 6 7 9

L = given list of numbers, S = sorted list

Claim: Length of longest increasing subsequence in L = length of longest common subsequence in L and S.

Runtime: $O(n^2)$. Exercise: try it without reduction. There is a better algorithm for O(n \log n) - see wikipedia.
