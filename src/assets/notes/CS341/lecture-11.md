# Lecture 11

October 17, 2017

## Graph Algorithms

Graph $G = (V, E)$ where $V$ = vertices (nodes) $|V| = n$ and $E \subseteq V \times V$ edges $|E| = m$

Note that $0 \leq m \leq {n \choose 2}$ for undirected graphs (for directed graphs, $\leq n(n-1)$) and edges can be directed or undirected.

We also assume no loops and multiple edges.

![](/images/lectures/CS341/11-1.png)
$V = \{a, b, c, d, e\}, E = \{(a, b), (b, c), ...\}$

![](/images/lectures/CS341/11-2.png)
$V = \{a, b, c\}, E = \{(a, b), (b, c), (a, c), (c, a)\}$

**Basic Definitions:**

- $u, v \in V$ are **adjacent** (neighbours) if $(u, v) \in E$
- $u \in V$ is **incident** to $e \in E$ if $e = (u, v)$
- $\deg(v)$ "the **degree** of v" is the number of incident edges.
- for directed graph G:
  - ![](/images/lectures/CS341/11-3.png) in degree = 2, out degree = 3
- a **path** is a sequence of verticies $v_1, v_2, ... v_k$ where $(v_i, v_i+1) \in E \forall i = 1, ..., k-1$
- a **simple path** does not repeat vertices.
- a **cycle** is a path that starts and ends with the same vertex.
- a **connected** graph has a path between every two vertices
- a **tree** is an undirected graph that is connected and has no cycles.
- a **connected component** is a maximal connected subgraph
  - ![](/images/lectures/CS341/11-4.png) 3 connected components

Some history: this was created by Euler to ruin dates and solve the [Konigsberg Bridge Problem](https://en.wikipedia.org/wiki/Seven_Bridges_of_K%C3%B6nigsberg) in 1735.

Applications of graph theory:

- Networks: transportation, wireless networks, social networks
- Web pages: game configurations,

### Storing Graphs

- adjacency matrix $A[i, j] = \begin{cases} 1 \text{ if } (i, j) \in E \\ 0 \text{ otherwise}\end{cases}$
  - $O(n^2)$ - even if the graph is _sparse_, i.e. $m << n^2$
  - for example, a tree
    - advantages - use matrix algorithms
    - you can query "is (i,j) an edge?" at $O(1)$ time
- adjacency lists
  - for each vertex $v$, store list of $u$ such that $(v, u) \in E$
  - ![](/images/lectures/CS341/11-5.png)
  - a: b, c
  - b: c
  - c: a
  - for undirected graphs G, every edge appears twice (u: v, v: u)
  - $O(n + m)$ space - linear space
  - advantage: less space \* disadvantage: to test "is $(i, j) \in E$", it takes $\Theta(n)$

### Exploring Graphs

There are two ways to search - breadth-first (BFS) and depth-first search (DFS).

### Breadth First Search

![](/images/lectures/CS341/11-6.png) "Cautious Search" - check everything 1 edge away, then 2... etc. Order of discovery: 1, {2, 3, 5, 8} (1's neighbours) {4, 5} (2's neighbours), 7 {6's neighbour}

![](/images/lectures/CS341/11-7.png)

We use a **queue** to store vertices _discovered,_ but not _explored._

**Algorithm:** Idea: Mark vertices undiscovered -> discovered.

**Explore(v)**

```none
for each neighbour u of v
  if mark(u) = undiscovered
    mark(u) <- discovered
    parent(u) <- v
    level(u) <- 1 + level(v)
    add u to queue
end
```

**BFS**

```none
initialize mark(v) <- undiscovered for all v
pick initial vertex v_o (parent of v_o is null, level(v_o) = 0)
add v_o to Queue, mark(v_o) <- discovered
while Queue is not empty
  v <- remove from Queue
  Explore(v)
end
```

**Run Time:** Will call Explore once for each vertex. Explore will take deg(v), so $O(n + \sum_{v} \deg(v))$ $\sum_{v} \deg(v) = 2m$ so $O(n + m)$

**Properties of BFS**

- Parent pointers create a tree ("BFS tree") \* By induction, each vertex becomes a leaf of the tree
- A vertex $u$ is connected to $v_0$ if and only if the BFS from $v_0$ reaches $u$. \* **Lemma:** shortest path (min # edges) from $v_0$ to $u$ has length $k$ if and only if the breadth first search from $v_o$ puts $u$ in level $k$ (see notes)

**Consequences**

1. BFS from $v_o$ finds the connected component of $v_o$. Exercise: find all the components
2. BFS finds shortest paths from $v_o$ to all other vertices

Exercise: Use BFS to find if a connected graph has a cycle.

Exercise: Every edge (u,v) has level(u), level(v) differing by $\leq$ 1.

**BFS to test if G is bipartite**

Recall that a graph is _bipartite_ if $V$ can be partitioned into $V_1 \cup V_2$ and $V_1 \cap V_2 = \emptyset$ such that every edge goes from $V_1$ to $V_2$

Run BFS: $V_1$ = odd levels, $V_2$ = even levels.

Then, test all edges.

```none
if **
  G is bipartite
else
  there exists an edge (u,v) with u, v in V_1 or V_2
```

By exercise: if u and v are 1 level apart, it means that one is in $V_1$ and one is in $V_2$

If they're in the same level, we have an odd cycle.
