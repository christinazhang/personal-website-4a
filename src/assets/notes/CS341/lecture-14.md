# Lecture 14

October 26, 2017

## Minimum Spanning Trees

**Problem:** Given undirected graph $G = (V, E)$ with weights $w: E \rightarrow \mathbb{R}^{\geq 0}$ find a subset of E that connects $V$ and has minimum sum of weight.

![](/images/lectures/CS341/14-1.png)

Note: solution will be a tree (if G is connected)

The general approach to this should be by a Greedy algorithm.

- Add cheapest edges first, never make a cycle (Kruskal's algorithm)
- Grow connected graph from 1 vertex (Prim's algorithm)
- Discard edges starting from max weight

### Kruskal's Algorithm

Sort edges by weight $e_1,..., e_m$: $w(e_1) \leq w(e_w) ... \leq w(e_m)$

```none
T <- empty
for i = 1 ... m
  if e_i does not make a cycle with T, then
     T <- T U {e_i}
  end
```

We need details to find out if it makes a cycle with T - which will come later.

General situation:

![](/images/lectures/CS341/14-2.png)

Corectness: Exchange proof

Let T have edges $t_1, ... t_{n-1}$ (remember that trees have n-1 edges). Prove by induction on i that there is a minimum weight spanning tree matching T on $t_1, t_2, ... t_i$

When done, T is _a_ minimum weight spanning tree.

Induction proof:

Basis: i = 0

IH: Assume we have a MST matching up to $t_{i-1}$

General step:

$
T: t_1, t_2, ... t\_{i-1}, t_i, ... , t_n
$

$
M: m*1, m_2, ... m*{i-1}, m_i
$ where $
m_i \neq t_n
$

Let $t_i$ = (a, b)

We want to look at the path from a to b in M, it must have edge e' choosing from C to V\C

Exchange:

Consider M' = M \ {e'} U {e}

$w(e') \geq w(e)$ because greedy chose e.

$w(m') = w(M) - w(e') + w(e) \leq w(M)$ M' matches T on edges $t_1, ..., t_i$ Why does M' connect V?

Consider any $u, v \in V$ We must show that there exists any path in M' from u to v.

Start within M from u to v. Path P.

Because instead of edge e' = (a', b') we can path in M from a' to a, then e = (a, b) then path in M from b to b'.

If P does not use u', then $P \subseteq M'$. If P uses e', we will make a detour.

### Prim's Algorithm

Grow one single connected component in a greedy way.

C = component so far, Add minimum weight edge leaving C.

We will implement this using a priority queue.

Correctness of Prim's algorithm - use an exchange proof like Kruskal.

### Baruvka's Algorithm

The oldest algorithm!

The general idea: You have some connected components, but you don't have edges between these components. Baruvka works in rounds (good parallel algorithm), and in each round you add the minimum weight edge leaving each component.

### Implementing Kruskal

- Sort edges $O(m \log m) = O(m \log n^2) = O(2m \log n) = O(m \log n)$
- Next we maintain connected components and test if a new edge (a, b) makes a cycle
- We need a Union-Find data structure
- Keep disjoint sets
- Operations:
  - Find(x) - which set is x in?
  - Union - Unite 2 sets

There is a simple way to do Union Find that gives $O(m \log n)$ for Kruskal. There is a fancier and faster way to do Union Find. The algorithm is simple, analysis is hard. True run-time involves inverse Ackermann function.

Simple Union Find method:

- Keep a linked list of elements in each set
  - e.g: $C_1: v_1, v_10, v_4$
  - $C_2: v_9, v_12$ \* $C_3: v_2$
- Keep an array S indexed by vertices where $S(v_i)$ = set containing $v_i$
- Find is $O(1)$.
- Union
  - Method 1:
  - join 2 linked lists $O(1)$
  - Update S.
  - Takes $O(n)$
  - A better way:
  - Use $O(|c_j|)$ where we do $c_i \leftarrow c_i \cup c_j$ \* Always pick $c_j$ = smaller set

Each time elements set is renamed, the set size doubles, therefore $\leq \log n$ log n times.

Total work of all unions is $O(n \log n)$. For Kruskal $O(m \log n) + O(m) + O(n \log n)$
