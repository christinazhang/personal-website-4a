# Lecture 12

October 19, 2017

## Depth First Search

![](https://i.imgur.com/dBHUqmi.png) "bold" search - go as far as you can.

**DFS Tree:**

![](https://i.imgur.com/I8mQn4P.png) Order of discovery: a, b, e, f, g, d, c 

We implement DFS using an (implicit) stack.

**Algorithm:**

**DFS(v)** (Like Explore from BFS)
```
mark(v) <- discovered
for each neighbour u of v
  if u is undiscovered
    DFS(u)
end
```

**DFS**
```
mark all vertices undiscovered
for all vertices v (handles multiple connected components)
  if v undiscovered
    DFS(v)
```

**Exercise:** Enhance code to find connected components.

### Enhance the code to find tree and tree edges.

```
mark(v) <- discovered
for each neighbour u of v
  if u is undiscovered
    DFS(u)
    parent(u)<-v // (v, u) is a tree edge
  else (v, u) is a non-tree edge
end
mark(v) <- finished
```

**DFS**
```
mark all vertices undiscovered
for all vertices v (handles multiple connected components)
  if v undiscovered
    DFS(v)
    parent(v) <- null
```

![](https://i.imgur.com/I8mQn4P.png) Order of finishing: f, g, e, c, d, b, a
 
**Run Time:** $O(n + \sum \deg(v)) = O(n+m)$

**Lemma:** DFS from root note $v_0$ discovers all vertices connected to $v_0$.

**Proof:** Let path = $v_o, v_1, ... v_f$.

Look at first vertex on the path that is *not* discovered, $v_i, i > 0$.

Look at $v_{i-1}$ - it is discovered. If we look at all neighbours of $v_{i-1}$, all will be discovered when $v_{i-1}$ is finished.

**Lemma:** All non-tree edges go from ancestor to descendant.

![](https://i.imgur.com/3kJGoCa.png) u is *ancestor* of v, v is a *descendant* of u.

no edge(x, y): Suppose x is discovered before y. The DFS(x) will discover y before finishing x. So y will be in the subtree (a descendant) of x.

### Enhancing DFS to find discover & finish times:

**DFS(v)**
```
mark(v)<-discovered
discover(v)<- time, time <- time + 1
for each neighbour u of v:
  if u is undiscovered then DFS(u)
end
finish(v) <- time, time <- time + 1
```

Let $d(v)$ = discover(v), let $f(v)$ = finish(v).

$d(\cdot)$ and $f(\cdot)$ form a parenthesis system:
![](https://i.imgur.com/uciw52s.png)

Suppose $d(v) < d(u)$:
![](https://i.imgur.com/tfN6xBo.png)

We will never have 
![](https://i.imgur.com/EZ9SeDB.png)
Because $[d(v), f(v)]$ is the time when v is on a stack.

### DFS to find 2-connected components of G

Vertex v is a *cut vertex* if removing v disconnects G. 

![](https://i.imgur.com/hVt8XFt.png) b and e are cut vertices.

2-connected/biconnected components: ![](https://i.imgur.com/I3pD9pA.png)

**Lemma:** A non-root vertex $v$ is a cut vertex if and only if $v$ has a subtree $T$ with no non-tree edge going to an ancestor of $v$.

![](https://i.imgur.com/3vqCVJX.png)

$\Leftarrow$ removing $v$ cuts subtree $T$ off from the rest.

$\Rightarrow$ if $v$ is a cut vertex, some subtree must get disconnected when $v$ is removed.

**Claim:** root vertex $v$ is a cut vertex if and only if it has > 1 child.

Define $low(u) = \min\{d(w): (x, w) \text{ an edge and } x = u \text{ or } x = \text{descendant of }u\}$

Then non-root $v$ is a cut vertex if and only if $v$ has child $u$ with $low(u) \geq d(v)$

We can compute $low$ recursively.

$low(u) = \min \begin{cases} \min \{d(w): (u, w) \in E\} \\ min\{low(x): x \text{ is child of } u\} \end{cases}$

**Final Algorithm to find cut vertices:**
* Enhance DFS to compute low (exercise)
* OR:
	* Run DFS
	* for every vertex v in fished order, compute low recursively as mentioned above
	* for every v
		* if v has child with $low(v) \geq d(v)$
			* then v is a cut node