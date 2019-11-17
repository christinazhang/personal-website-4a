# Lecture 15

October 31, 2017

## Minimum Weight Spanning Tree

### Prim's Algorithm

![](/images/lectures/CS341/15-1.png)
Start with vertex $s$. $C$ = vertices joined to S in current tree. Pick minimum weight edge leaving C.

**Exercise:** If all edge weights are different, MST is unique.

**Correctness:** Almost the same proof as Kruskal. See CLRS for general proof!.

**Implementation:** We need to repeatedly find the minimum - so we use a priority queue (PQ) e.g. using a heap.

_Recall:_ a PQ maintains a set of weighted elements. Operations:

- Find & delete minimum weight element
- Insert
- Delete

Heap gives $\Theta(\log k)$ per operation for $k$ elements.

In our case, we make a heap of edges leaving C. When adding v to C: ![](/images/lectures/CS341/15-2.png)

Each edge enters the heap once, leaves once. So, the number of PQ operations:

- n - 1: find and delete min \* Because each time we do this, it adds an edge to the tree. And a tree has n-1 edges.
- m: insert
- m: delete

Thus, the total time for Prim: $O(n \log m)$ (find) + $O(m\log m)$ (insert and delete) = $O(m \log m)$ m is at most $n^2$, so = $O(m \log n)$.

We can use a fancier PQ called "Fibonacci heaps" that gives $O(m + n\log n)$.

Practical improvement (gives the same worst case run time) - make a heap of _vertices_, not edges. At vertex v, weight(v) = minimum weight edge from C to v

## Shortest Paths in Edge-Weighted Graphs

_Recall:_ BFS from vertex $s$ finds shortest paths (counting number of edges) from $s$ to all vertices.

There are 3 flavours to this problem:

1. Given u, v - find shortest path from u to v.
2. Given u, find shortest pass for ALL v
   - "Single source shortest paths"
3. Find shortest pass from u to v for all u, v.
   - "All pairs of shortest paths"

Solving (1) seems to involve solving (2). Today, we're looking at (2).

![](/images/lectures/CS341/15-4.png) S to D - SBD (Length 5) S to E - SBE (Length 4)

Question: Are edge weights $\geq$ 0?

- Generally, yes, we allow that. Algorithm will be covered next class.
- Non-negative weights - Dijkstra's Algorithm
- Acyclic graphs with possible negative weights - covered later.

We always assume directed graphs. If undirected, we make each edge a cycle.

## Dijkstra's Algorithm

Input: A directed graph $G = (V, E), w: E \rightarrow \mathbb{R}^{\geq 0}, s \in V$

Output: Shortest path from S to every other vertex v.

General situation: We have a tree of shortest paths to every vertex in B.

![](/images/lectures/CS341/15-5.png)

Choose edge (x, y) $x \in B, y \notin B$ and minimize $d(s, x)$ (the distance from s to x (known)) + $w(x, y)$ (the weight of the edge). Call this minimum value d.

```none
d(s, y) <- d
add edge (x, y) to the tree. (Parent(y) <- x)
add y to B.
```

**Correctness:** d is minimum distance s to y. Compare path s to x in tree + (x, y) to any other path $\Pi$ s to y. Path $\Pi$ consists:

- $\Pi_1$ initial path from s in side B
- An edge leaving B
- $\Pi_2$ - the rest of the path.

$w(\Pi) = w(\Pi_1) + w(e) + w(\Pi_2) \geq w(\Pi_1) + w(e) \geq d$ = weight of path we found to y.

**Implementing Algorithm -** use priority queue of vertices

- Keep "tentative" distance to each vertex $v \notin B$ \* (for v in B, d(v) = true distance)

```none
Initialize d(v) <- infinity, d(s) = 0, B <- empty set
while |B| < n
  y <- vertex of V - B with min d value (we have to find min in heap)
  B <- B U {y}
  for each edge (y, z), z not in B:
    if d(y) + w(y, z) < d(z):
      d(z) <- d(y) + w(y, z) (and update heap) - we could do delete(z) and insert(z) with new d value
      parent(z) <- y
  end
end
```

Heap has vertices $v \notin B$ with weight d(v)

**Total Time:** $O(n \text{ (find min)}\log n \text{ (cost of 1 heap operation)}+ m \text{ (insert and delete operations)} \log n \text{ (cost of 1 heap operation)}) = O(m\log n)$
