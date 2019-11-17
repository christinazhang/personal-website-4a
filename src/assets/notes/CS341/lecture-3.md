# Lecture 3

September 14, 2017

## Algorithmic Paradigms

We will be covering the paradigms in this order: (This goes up until the midterm!)

1. Reductions
2. Divide-and-conquer
3. Greedy
4. Dynamic Programming

## Reductions

- Use known algorithms to solve new problems

**Example:** 2-sum and 3-sum

### 2-sum:

Input: $A[1, ... ,n]$ of numbers and target number m.

Find $i, j$ such that $A[i] + A[j] = m$. (Find two things within the array that add up to m.) We allow $i = j$.

e.g. [1, 3, 9, 12] m = 10 is possible, m = 8 is not.

**Algo 1:**

```none
for i = 1 ... n
  for j = i ... n
    if A[i] + A[j] = m SUCCESS
  end
end FAIL
```

$\Theta(n^2)$ is worst case running time

**Algo 2:** Sort $A$

```none
for each i = 1 ... n, do a binary search for m-A[i]
```

Total: $\Theta(n \log n)$ (sort) $+ \Theta(n \text{ (loop)}\cdot \log n \text{ (binary search)})$

**Algo 3:** Improve second $\Theta(n \log n).$

Sorted array

![](/images/lectures/CS341/3-1.png)

```none
i <- 1, j <- n

while i <= j
  S <- A[i] + A[j]
  if S > m
    j <- j-1
  else if S < m
    i <- i+1
  else SUCCESS
end
FAIL
```

Proof is left as an exercise. Correctness Invariant: if there is a solution $i^*, j^*$ then $i^* \geq i, j^* \leq j$

Worst case run time: $\Theta(n)$

### 3-sum

(there are 'applications')

Given array $A[1, ..., n]$ of numbers, target $m$, find $i, j, k$ such that $A[i] + A[j] + A[k] = m$

First: m = 0

Want $A[i] + A[j] + A[k]$ = 0. Try each $k = 1...n$.

- - Use 2-sum algorithm to find i, j such that $A[i] + A[j] = -A[k]$.

Takes $\Theta(n^2 \log n)$

BUT we can save some time! We only need to sort A once.

Then this is $O(n \log n) + O(n^2) = O(n^2)$.

Are there algorithms better than $\Theta(n^2)$ for 3-sum? Only recently in 2014 and 2017 (from Machine Learning)

## Divide and Conquer

- Divide - break the problem up
- Recurse - solve subproblems
- Conquer - put solutions together

- Binary search: 1 subproblem, 1 step
  - $T(n) = T(\frac{n}{2}) + 1$
- Mergesort: $T(n) = 2T(\frac{n}{2}c \cdot n)$

### Solving recurrence relations

2 basic approaches

- Recursion tree method
- Guess solution and prove by induction

Recursion tree method: for mergesort recurrence:

$T(n) = 2T(\frac{n}{2} + c \cdot n)$, n even $T(1) = 0$

For n a power of 2:

![](/images/lectures/CS341/3-2.png)

Total: $(log n + 1 levels) \times (c \cdot n) = c \cdot n\log n + c \cdot n$

For general n, this gets more complicated.

$T(n) = T(\lfloor \frac{n}{2} \rfloor) + T(\lceil \frac{n}{2} \rceil) + n -1$

Solution:

$T(n) = n\lceil log n \rceil - 2^{\lceil \log n \rceil} + 1$ but this is not trivial.

In this course, we only want rate of growth.

Often, worst-case runtime is monotonic, so $T(n) \leq T(n'), n' > n$
Then use $n'$ a power of 2 - easier analysis and $n' < 2n$

Merge sort recurrence is $T(n) \in \Theta(n \log n)$

### Guess + induction

Prove b induction on $n$ that $T(n) = T(\lfloor \frac{n}{2} \rfloor) + T(\lceil \frac{n}{2} \rceil) + n -1$ gives $O(n \log n)$ bound, i.e. $T(n) \leq c \cdot n \log n$

Base Case: n=2

$T(2) = 2T(1) + 1 = 1$

$c \cdot n \log n = 2c$ So $T(n) \leq c n \log n$ when n = 2 for $4c > \frac{1}{2}$

**Inductive Hypothesis:**

Assume $T(n) \leq c \cdot n \log n$ for $n' < n$. Prove for $n$.

**Inductive Step:**

_Case 1:_ $n$ is even

$T(n) = 2T(\frac{n}{2}) + n-1$

$\leq 2c \cdot \frac{n}{2} \log \frac{n}{2} _ n - 1$ by induction

$= cn ( \log n - 1) + n -1$

$= c \cdot n \log n - cn + n -1$

$\leq c \cdot n \log n$ if $c > 1$

_Case 2:_ $n$ is odd

$T(n) = T(\frac{n-1}{2}) + T(\frac{n+1}{2}) + n - 1$

$\leq$ by induction ... manipulate to get $\leq c \cdot n \log n$

**Example:** $T(n) = 2T(\frac{n}{2}) + n$

Claim?! $T(n) \in O(n)$

"Proof" Prove $T(n) \leq c \cdot n$

Assume by induction: $T(n') \leq c \cdots n', n' < n$

$T(n) = 2T(\frac{n}{2}) + n \leq 2c\frac{n}{2} + n = (c + 1)n$

So $T(n) \in O(n)$?! Not really. c is a growing constant.

## More Techniques

**Example**

$T(n) = T(\lfloor \frac{n}{2} \rfloor) + T(\lceil \frac{n}{2} \rceil) +1$

$T(1) = 1$

Prove $T(n) \in O(n)$

Prove by induction $T(n) \leq c \cdot n$ for some c

$T(n) \leq c \cdot \lfloor \frac{n}{2} \rfloor + c \cdot \lceil \frac{n}{2} \rceil + 1 = cn + 1$ oops!

But try proving $T(n) \leq c \cdot n - 1$ instead!

$T(n) \leq c \cdot \lfloor \frac{n}{2} \rfloor - 1 + c \cdot \lceil \frac{n}{2} \rceil - 1 = cn + 1$

$= c \cdot - 1$

Sometimes lowering the bound helps!
