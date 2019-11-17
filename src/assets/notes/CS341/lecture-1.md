# Lecture 1

September 7, 2017

## Grading Scheme

- 35% Assignments
- 25% Midterm - October 24 7 - 8:50 PM
- 40% Final

## Outline

How to find the _best_ algorithmic solutions to problems.

1. How to design algorithms, e.g:
   - general paradigms
     - divide-and-conquer, greedy, dynamic programming, reductions
   - basic repertoire
     - sorting, string algorithms, graph algorithms, linear programming (not covered in this course, it's in CO), numerical algorithms
2. How to analyze algorithms
   - how much time, space, goodness of approximation
   - O notation, worst/average case analysis
   - model of computation
3. Lower bounds
   - Do we have the _best_ algorithm?
   - basic lower bounds
   - NP-completeness, undecidability

### Case Study for 1, 2, 3: Convex Hull

![](/images/lectures/CS341/1-1.png)

Given n points in plane, find a **convex hull** - smallest convex set containing the points. (Like an elastic band around points)
Equivalently, a convex hull is determined by the lines l that go through (at least) 2 points and have no points to one side.

**Algorithm 1**

- for every pair of points, construct line through them, test all other points. $O(n^3)$

**Algorithm 2**

![](/images/lectures/CS341/1-2.png)

- go from one line to the next:
  - for line l through point s, turn line through s to next point
  - $O(n)$ time, like finding min/max.
- We do that n times, thus $O(n^2)$

**Algorithm 3**

![](/images/lectures/CS341/1-3.png)

- try for $O(n \log n)$ using sorting (by x-coordinate)
  - reduction
  - exercise: after sorting, show how to find upper convex hull in O(n) (hint: be greedy!)
- $O(n \log n)$ total

**Algorithm 4**

![](/images/lectures/CS341/1-4.png)

- O(nlogn) using divide and conquer
  1. Divide in half by x-coordinate
  2. recurse
  3. find the bridges (this can be done in O(n))
- runtime $T(n) = 2T(\frac{n}{2}) + O(n)$. This is the same recurrence relation as for mergesort.
- $T(n)$ is $O(n \log n)$

Can we do better than $O(n \log n)$? No, if we limit ourselves a bit - only arithmetic, comparisons.

We rely on sorting lower bound \* use a reduction
Given n numbers to sort, construct a convex hull problem that sorts

![](/images/lectures/CS341/1-5.png)

Convex hull of points has _all_ points, in sorted order. So convex hull takes $\Omega(n \log n)$

**Ultimate Convex Hull Algorithm**
$O(n \log(h))$ - where h is # points on convex hull, done by Timothy Chan

## Analyzing Algorithms

**Def'n**: an algorithm is a finite answer to an infinite question.
Problem - specify infinite set of inputs, specify corresponding outputs

**Algorithm** - a well defined computational procedure to go from any input to corresponding output, given as pseudocode.

**Analyze Algorithm** - measure _time_ and _space_ used by algorithm as a function of _input size_ - using some model of computation.

**Models of Computation**

- Specify elementary steps
- Specify measures of time, space, input size
- Model should reflect reality
