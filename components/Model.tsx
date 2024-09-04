import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Group } from "three";

useGLTF.preload("/default.glb");

export default function Model() {
  const group = useRef<Group>(null);
  const { nodes, materials, animations, scene } = useGLTF("/default.glb");
  const { actions, clips } = useAnimations(animations, scene);
  const scroll = useScroll();

  useEffect(() => {
    console.log(actions);
    //@ts-ignore
    actions["succ"].play().paused = true;
  }, []);
  useFrame(
    () =>
      //@ts-ignore
      (actions["succ"].time =
        //@ts-ignore
        (actions["succ"].getClip().duration * scroll.offset) / 1)
  );
  return (
    <group ref={group} position={[0, -2, 0]}>
      {" "}
      <primitive object={scene} />
    </group>
  );
}
