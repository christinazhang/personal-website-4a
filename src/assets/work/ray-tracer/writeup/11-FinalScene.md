#

My motivation for this scene was the fact that the last major release of Animal Crossing was for the Nintendo 3DS, which has a resolution of 240p. It's so long since I played Animal Crossing: New Leaf that I forgot that the desk that Isabelle sits at is actually the Mayor's (the player character) and not her own. Hence, the idea for the scene came from Isabelle having to take over the mayor's duties while the mayor is away.

In the middle of the project, a trailer for Animal Crossing: New Horizons was finally released at E3 2019! And to my horror, Isabelle was nowhere to be seen. Subsequent reports say that she is an unlockable character who moves in after you've made some progress on the deserted island. So I left a screenshot from the trailer as the picture frame in the background.

While doing a sketch of the scene for my proposal, I was having trouble dealing with the perspective. The beauty of setting up the scene in Blender afterwards was that I could easily find the camera angle I was envisioning. All the models in the scene and most of the textures were made by myself in Blender.

Every mesh that needs a different material needs a different OBJ file. This was a nightmare for my Isabelle model, who, in total, was 23 different OBJ files to export. To expedite the process I wrote a Python script to split a single OBJ into the 23 files I needed, and then a Lua script that would return the assembled model with textures as a single node.
