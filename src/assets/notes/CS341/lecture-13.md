# Lecture 13

## Depth First Search on Directed Graphs

![](https://i.imgur.com/abO3Sy9.png) Note: starting at S would give 1 tree.

DFS(v)

```none
mark(v)<-discovered
d(v)<- time /* discover time
time<- time + 1

for each edge (v, u)
  if u is undiscovered then
    DFS(u)
  else /* forward/backward/cross edges
    if u not finished then (v, u) is a back edge
    else if d(u) > d(v) then (v, u) is a forward edge
    else if d(u) < d(v) then (v, u) is a cross edge

mark(v)<-finished
f(v)<- time
time<- time + 1
```

Time: $O(n + m)$. Note: result depends on where we start, order of neighbours.

## Applications of DFS

1. Detecting directed cycles

- Lemma: A _digraph_ (directed graph) has a directed cycle if and only if DFS has a back edge.
  _ Proof:
  _ $\Leftarrow$ back edge (u, v) + path in the tree v->u gives cycle. \* $\Rightarrow$ suppose there is a directed cycle, and suppose $v_1$ is discovered first. All vertices of the cycle are discovered before $v_1$ is finished. Then we do DFS(u) before $v_1$ finished and find the back edge (u, $v_1$)

2. Topological sort (ordering of vertices) of directed _acyclic_ graph (no directed cycles)
   - ![](https://i.imgur.com/q730xOA.png) b, c, a, d or c, d, b, a
   - if edge(u,v) then u is before v
   - One solution: take vertex v with no edges in (= source). Delete v and repeat. Exercise: do this in $O(n+m)$
   - A solution using DFS:
     _ We need to use one of: discover time, finish time, or the reverse of either.
     _ Claim: For every directed edge (u, v), finish(u) > finish(v).
     _ Proof: (u -> v)
     _ Case 1: u is discovered before v
     _ Then we do DFS(v) before finish(u)
     _ Case 2: v is discovered before u \* G has no directed cycle. So DFS(v) will not find u. So we finish v before discover(u) before finish(u).
3. Strongly connected components

- A digraph is _strongly connected_ if $\forall u, v \in V$ there is a directed path from $u$ to $v$. (and a directed path from v to u)
- To test if G is strongly connected, we could do DFS from each v $O(n(n_m))$
- Better solution:
  _ Pick vertex s.
  _ Claim: G is strongly connected if and only if $\forall u \in V$ there is a directed path s to u and u to s.
  _ $\Rightarrow$ easy.
  _ $\Leftarrow$:
  _ Do DFS(s) to find directed paths S-> all
  _ Then reverse all edges and DFS(s)

## Strongly connected component C

Each piece is strongly connected: ![](https://i.imgur.com/3KXQm2x.png) these make a forest with directed edges.

![](https://i.imgur.com/yDtgiVE.png)

Finding connected components in a graph G:

```none
For vertices 1,...,n:

Run DFS using vertex ordering to pick root and pick which neighbour first

Let finish order by f1, f2, ... fn

G^R <- reverse all edges of G
Run DFS on G^R with order fn, fn-1, ..., f1
```

Claim: Trees of DFS are strongly connected components

![](https://i.imgur.com/M7icRlO.png)

Note: If vertex 1 had been in Right hand triangle, then the first DFS would find 2 trees.

Idea of proof: Wherever first DFS starts (in $c_1$ or $c_2$) largest finish in $c_1$
