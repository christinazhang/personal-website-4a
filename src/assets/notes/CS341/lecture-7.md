# Lecture 7

September 28, 2017

Today we are going over two greedy algorithms

## Huffman codes

(might be remembered from CS240!)

- Given some symbols (e.g. a, b, ..., z) and frequency f() that each letter appears
- We want to encode in binary such that
  - Can decode - use prefix code
  - Codes are small (given frequencies)

Ex:
||Frequency|Code|
|---|---|---|
| A |.45|0|
| B |.1|110|
| C |.25|10|
| D |.2|111|

To decode 0101110 = 0 | 10 | 111 | 0 = ACDA

![](/images/lectures/CS341/7-1.png) Create codes as leaves of binary tree, we get prefix property

Average code length = .45 + .1(3) + .25(2) + .2(3) = $\sum f(z)$ (the internal nodes z) = .3 + .55 + 1.0

Huffman's greedy algorithm:

- take x, y to be the 2 least frequent letters
- construct ![](/images/lectures/CS341/7-2.png) f(z) <- f(x) + f(y)
- remove x, y, add z. Repeat.

Idea of proof that this gives the best code = min. average/expected length - Exchange proof:

Look at any solution. If it does not have x and y as children siblings at the bottom level, do an exchange and prove code length is not worse.

Average code length goes down (or stays the same), so greedy has minimum average code length.

## Optimal Caching

![](/images/lectures/CS341/7-3.png)

- Get sequence of request for blocks
- When we get a request for a block that's not in cache, remove a block from the cache

Goal: minimize # accesses to slow memory.

Example: Request 1, 2, 3, 1; k = 2

| Request | Cache | Cost |
| ------- | ----- | ---- |
| 1       | 1     | 1    |
| 2       | 1, 2  | 1    |
| 3       | 1, 3  | 1    |
| 1       | 1, 3  | 0    |

This requires prior foresight. This has less cost, versus

| Request | Cache | Cost |
| ------- | ----- | ---- |
| 1       | 1     | 1    |
| 2       | 1, 2  | 1    |
| 3       | 3, 2  | 1    |
| 1       | 3, 1  | 1    |

This is what is known as an _online_ problem.

We heuristics such as:

- LRU (Least recently used) - The best one!
- LFU (Least frequently used)
- FIFO (First in first out)

**LRU is best in practice**

How do we compare? We could compare heuristic to the optimal algorithm that sees into the future.

To solve this problem, greedy works.

Example: k=2. Consider the sequence 1, 5, 2, 3, 2, 1, 7, 3, 1

Remove the block that isn't used for the longest time (into the future)

Theorem: This minimizes cost. Use exchange proof. LRU is like this strategy, but uses past instead of the future.

## Knapsack Problem

Pack your knapsack to maximize value, keeping within a weight limit. Items 1, 2, ... n - each with weight $w_i$ and value $v_i$. We want to pick $S \subseteq \{1, ..., n\}$.

$\sum_{i \in S} w_i \leq W \max \sum_{i \in S} v_i$

There are two versions of this problem:

- 0-1 Knapsack, where the items are indivisible (like a tent or flashlight)
- Fractional knapsack, where we can use fractions of an item (flour, cheese)

Ex. W = 6

| $i$ | $v_i$ | $\frac{v_i}{w_i}$ |
| --- | ----- | ----------------- |
| 1   | 12    | 3                 |
| 2   | 7     | $2 \frac{1}{3}$   |
| 3   | 6     | 2                 |

For 0-1 case, greedy algorithm picks item 1, and no others. Value = 12. But a better solution is items 2 and 3, which gives value 13.

The 0-1 Knapsack is NP-hand (will be explained later) but dynamic programming is an OK solution.

Today, we'll be doing a greedy algorithm for fractional knapsack.

$x_i$ - weight of item i to take

free-w - W

```none
for i = 1 ... n (items ordered by v_i/w_i, max to min)
  x_i <- min{w-i, free-w}
  free-W <- free-W - x_i
end
```

Note: solution will look like

|       |             |             |     |           |                                       |     |     |
| ----- | ----------- | ----------- | --- | --------- | ------------------------------------- | --- | --- |
| item  | 1           | 2           | ... | j-1       | j                                     | j+1 | j+2 |
| $x_i$ | $x_1 = w_1$ | $x_2 = w_2$ | ... | $x_{j-1}$ | $x_j$ (which is a fraction of item j) | 0   | 0   |

Final weight: $\sum x_i = W$ so long as $\sum_{all i} w_i \geq W$

Final value: $\sum (\frac{v_i}{w_i}) x_i$

Running time: $O(n \log n)$

Proof that this algorithm gives the maximum value:

Greedy: $x_1, x_2 ...$
Optimal solution: $y_1, y_2, ...$

Choose y - optimum and matches x on as many indices as possible. If $y_i = x_i, \forall i$ then greedy = optimal. Otherwise, do exchange to make y more like x to get a contradiction.

Let k = min index where $x_k \neq y_k$, then $x_k > y_k$ because greedy took max $x_i$.

Since $\sum x_i = \sum y_i = W$, then there must be an index later on, $l > k$, where $y_l > x_l$.

Idea: replace a bit of item l by a bit of item k - we want to argue that the value does not go down by doing this, which is to say the new solution will still be an optimal solution.

$y_k' \leftarrow y_k + \Delta$

$y_l' \leftarrow y_l - \Delta$

Where $\Delta = \min\{y_l - x_l \text{ (the amount we can take from l)}, x_k - y_k \text{ (the amount we can add to k)}\}$

Change in value:

$\Delta(\frac{v_k}{w_k} - \Delta(\frac{v_l}{w_l}) = \Delta(\frac{v_k}{w_k} - \frac{v_l}{w_l}) \geq 0$ because we sorted by value/weight.

But y was optimal, therefore y' is also optimum, and y' matches x on one more index -> Contradiction.
