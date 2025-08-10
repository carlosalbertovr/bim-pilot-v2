"use client";

import { useContext, useEffect, useRef } from "react";
import * as OBC from "@thatopen/components";
import * as OBF from "@thatopen/components-front";
import { initCoreSetup } from "./utils/initCoreSetup";
import { setHighlighter } from "./utils/setHighlighter";
import { ItemData } from "@thatopen/fragments";
import { ViewerContext } from "./context/ViewerContext";

export function ModelViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<OBC.SimpleWorld<
    OBC.SimpleScene,
    OBC.OrthoPerspectiveCamera,
    OBF.PostproductionRenderer
  > | null>(null);
  const { updateSelectedElements, aperture } = useContext(ViewerContext);

  function onHighlight(elements: ItemData[] | null) {
    updateSelectedElements(elements);
  }

  useEffect(function () {
    let components: OBC.Components | null = null;
    async function init() {
      if (typeof window === "undefined" || !containerRef.current) return;

      components = new OBC.Components();
      const worlds = components.get(OBC.Worlds);

      const world = worlds.create<
        OBC.SimpleScene,
        OBC.OrthoPerspectiveCamera,
        OBF.PostproductionRenderer
      >();

      world.scene = new OBC.SimpleScene(components);
      world.scene.setup();
      world.renderer = new OBF.PostproductionRenderer(
        components,
        containerRef.current
      );
      world.camera = new OBC.OrthoPerspectiveCamera(components);

      worldRef.current = world;

      components.get(OBC.Raycasters).get(world);

      const { fragments } = await initCoreSetup({ components, world });

      setHighlighter({
        components,
        fragments,
        world,
        onHighlight,
      });

      components.init();

      world.scene.three.background = null;

      await world.camera.controls.setLookAt(68, 23, -8.5, 21.5, -5.5, 23);
      await fragments.core.update(true);
    }
    init();

    return function () {
      if (components) {
        components.dispose();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    function () {
      if (!worldRef.current) return;
      const selected =
        aperture === "perspective" ? "Perspective" : "Orthographic";
      worldRef.current.camera.projection.set(selected);
    },
    [aperture]
  );

  return (
    <div className="h-full">
      <div id="container" ref={containerRef} className="h-full" />
    </div>
  );
}
