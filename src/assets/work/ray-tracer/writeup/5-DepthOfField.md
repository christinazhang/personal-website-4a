#

In the render function, an aperture size, $n$, and focal length can be specified. If the aperture size is greater than zero, then the ray that is cast is perturbed slightly by random numbers uniformly distributed between $(-n/2, n/2)$. The rays also converge at the focal plane, such that anything on the focal plane is in focus.

Extra things I learned from implementing this feature: basic photography concepts, and that it's spelled "aperture" and not "apeture." Clearly, I am not a photographer.

## Soft Shadows
