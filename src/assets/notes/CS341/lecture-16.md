# Lecture 16

November 2, 2017

Recall single-source shortest paths

- Dijkstra, when $w(e) \geq 0 \forall e, O(m \log n)$ \* Other special case: no directed cycle $O(m+n)$
- General case: $O(n \cdot m)$

Single source shortest paths in directed _acyclic_ graph (DAG), weights may be negative. Use topological sort.

$v_1, v_2, ... v_n$ such that $\forall$ edges $(v_i, v_j), i < j$

If $s \neq v_1$ then vertices before s have no path from s.

So suppose $s = v_i.$ Initialize $d_i = \infty \forall i, d_1 = 0$

```none
for i = 1 ... n
  for every edge (v_i, v_j)
    if d_i + w(v_i, v_j) < d_j then
      d_j <- d_i + w(v_i, v_j)
```

Correctness by induction.

$O(n+m)$ because we look at every vertex and every edge exactly once.

## Dynamic Programming for shortest paths.

![](/images/lectures/CS341/16-1.png) To get from u to v, try all possible _intermediate_ nodes X. Want shortest paths u to x and x to v.

In what way are subproblems u to x and x to v smaller?

1. Use fewer edges

- Give dynamic programming algo where we try paths of 1 edge, $\leq$ 2 edges, ..., $n-1$ edges (assuming no negative cycle)

2. Paths u to x, x to v do not use x.

Using vertices 1, ... i

i = 1, ... n

**Single Source Shortest path using (1)**

$d_i(v) \leftarrow$ length of shortest path from s to v using <= i edges

$d_i(v) = \begin{cases} w(s, v) \text{ if } (s,v) in E \\ \infty \text{ otherwise} \end{cases}$

We want $d_{n-1}(v)$ because a path of of $> n - 1$ edges would have a cycle. We assume no negative weight cycle, therefore removing the cycle would give us a better path.

$d_i(v) = \min \begin{cases} d_{i-1}(v) \text{ use } \leq i - 1 \text{ edges} \\ \min_{u \in v}(d_{i-1}(u) + w(u, v)) \text{use } i \text{ edges with vertex before v is u} \end{cases}$

Correctness: This considers all possibilities for $d_i(v)$, then by induction.

**Bellman-Ford Algorithm**

```none
initialize as above
for i = 2 ... n-1
  for each vertex v
    d_i(v) <- d_{i-1}(v)
    for each in-neighbour u of v
      d_i(v) <- min{d_i(v), d_{i-1}(u) + w(u, v)
    end
  end
end
```

Runtime: $O(n (n+m))$

Note: $d_{i-1}, d_{i-3}$ is never used. So we save space by just using $d(v)$.

Initialize $d_v = \infty \forall v, d(s) \leftarrow 0$

```none
for each i = 1 ... n
  for each edge (u, v)
    d(v) <- min{d(v), (d(u) + w(u, v))*}
  end
end
```

To find actual shortest paths: at \* update parent(v) <- u

This will give a tree of shortest paths from s.

Modify algorithm to detect negative weight cycles reachable from S. Run main loop 1 more time and see if any d value changes. (Exercise: Check this out)

To detect all negative cycles, add a new source S' and all edges (s', v) where v is an original vertex.

All pairs shortest paths:

- Find shortest u to v path $\forall u, \forall v$
- We could store path lengths in $n \times n$ matrix
- Let $V = \{1, 2, ..., n\}$ \* Set $D_i[u, v]$ = length of shortest u to v path using intermediate vertices in $\{1, 2, ..., i\}$
- Initialize $D_0[u, v] = \begin{cases} w(u, v) \text{ if } (u, v) \in E \\ \infty \text{ otherwise} \end{cases}$
- $D_i[u, v] = \min \begin{cases} D_{i-1}[u, v] \\ D_{i-1}[u, i] + D_{i-1}[i, v] \end{cases}$

Correctness: above considers all possibilities, assuming no negative weight cycle.

## Floyd-Warshall Algorithm

Initialize $D_0[u, v]$ as above

```none
for i = 1 , ..., n
  for u = 1 ... n
    for v = 1 ... n
      D_i[u, v] <- min{D_i-1[u, v], D_i-1[u, i] + D_i-1[i, v]} *
```

Time: $O(n^3)$.

Space: $O(n^3)$ We can get $O(n^2)$ space by overwriting D[u,v], but we cannot reduce time.

To recover actual paths: along with D[u, v] also store either:

1. Max[u, v] - the highest i used as intermediate vertex on u to v path (this won't give the path in order)
2. Pred[u, v] - the vertex before v on shortest u to v path

Exercise: see how to calculate this at (\*)
