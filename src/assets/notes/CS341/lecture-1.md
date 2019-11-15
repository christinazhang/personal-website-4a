# Lecture 1
September 7, 2017

## Grading Scheme
* 35% Assignments
* 25% Midterm - October 24 7 - 8:50 PM
* 40% Final

## Outline
How to find the *best* algorithmic solutions to problems.
1. How to design algorithms, e.g:
    * general paradigms
      * divide-and-conquer, greedy, dynamic programming, reductions
    * basic repertoire
      * sorting, string algorithms, graph algorithms, linear programming (not covered in this course, it's in CO), numerical algorithms
2. How to analyze algorithms
    * how much time, space, goodness of approximation
    * O notation, worst/average case analysis
    * model of computation
3. Lower bounds
    * Do we have the *best* algorithm?
    * basic lower bounds
    * NP-completeness, undecidability

### Case Study for 1, 2, 3: Convex Hull

![](https://i.imgur.com/O7zoZa3.png)

Given n points in plane, find a **convex hull** - smallest convex set containing the points. (Like an elastic band around points)
Equivalently, a convex hull is determined by the lines l that go through (at least) 2 points and have no points to one side.

**Algorithm 1**
* for every pair of points, construct line through them, test all other points. $O(n^3)$

**Algorithm 2**

![](https://i.imgur.com/Me20MW8.png)

* go from one line to the next:
    * for line l through point s, turn line through s to next point
    * $O(n)$ time, like finding min/max.
* We do that n times, thus $O(n^2)$

**Algorithm 3**

![](https://i.imgur.com/U3ihMan.png)

* try for $O(n \log n)$ using sorting (by x-coordinate)
    * reduction
    * exercise: after sorting, show how to find upper convex hull in O(n) (hint: be greedy!)
* $O(n \log n)$ total

**Algorithm 4**

![](https://i.imgur.com/2KBU4TY.png)

* O(nlogn) using divide and conquer
    1. Divide in half by x-coordinate
    2. recurse
    3. find the bridges (this can be done in O(n))
* runtime $T(n) = 2T(\frac{n}{2}) + O(n)$. This is the same recurrence relation as for mergesort.
* $T(n)$ is $O(n \log n)$

Can we do better than $O(n \log n)$? No, if we limit ourselves a bit - only arithmetic, comparisons.

We rely on sorting lower bound
    * use a reduction
Given n numbers to sort, construct a convex hull problem that sorts

![](https://i.imgur.com/hgMQ6Ok.png)

Convex hull of points has *all* points, in sorted order. So convex hull takes $\Omega(n \log n)$

**Ultimate Convex Hull Algorithm**
$O(n \log(h))$ - where h is # points on convex hull, done by Timothy Chan

## Analyzing Algorithms
**Def'n**: an algorithm is a finite answer to an infinite question.
Problem - specify infinite set of inputs, specify corresponding outputs

**Algorithm** - a well defined computational procedure to go from any input to corresponding output, given as pseudocode.

**Analyze Algorithm** - measure *time* and *space* used by algorithm as a function of *input size* - using some model of computation.

**Models of Computation**
* Specify elementary steps
* Specify measures of time, space, input size
* Model should reflect reality
