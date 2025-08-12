"use client";

import { useContext, useEffect, useRef, useState } from "react";
import * as OBC from "@thatopen/components";
import * as OBF from "@thatopen/components-front";
import * as THREE from "three";
import { initCoreSetup } from "./utils/initCoreSetup";
import { setHighlighter } from "./utils/setHighlighter";
import { ItemData, SpatialTreeItem } from "@thatopen/fragments";
import { ViewerContext } from "./context/ViewerContext";
import { ActionTip } from "./ActionTip";
import { convertModelTreeToTreeItems } from "./utils/convertModelTreeToTreeItems";
import { convertLocalIdsToModelIdMap } from "./utils/convertLocalIdsToModelIdMap";
import { highlightMaterial } from "./styles/highlight";

export function ModelViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<OBC.SimpleWorld<
    OBC.SimpleScene,
    OBC.OrthoPerspectiveCamera,
    OBF.PostproductionRenderer
  > | null>(null);
  const clipperRef = useRef<OBC.Clipper | null>(null);
  const highlighterRef = useRef<OBF.Highlighter | null>(null);
  const modelRef = useRef<OBC.FragmentsManager | null>(null);

  const zoomingRef = useRef(false);

  const [clippersCreated, setClippersCreated] = useState<OBC.SimplePlane[]>([]);

  const {
    updateSelectedElements,
    updateTreeSelection,
    updateSpatialData,
    selectedElements,
    spatialData,
    treeSelection,
    aperture,
    plansEnabled,
  } = useContext(ViewerContext);

  function onUpdateSpatialData(newSpatialData: SpatialTreeItem) {
    const treeItems = convertModelTreeToTreeItems(newSpatialData);
    if (spatialData) {
      const updatedSpatialData = [...spatialData, ...treeItems];
      updateSpatialData(updatedSpatialData);
    } else {
      updateSpatialData(treeItems);
    }
  }

  function onHighlight(elements: ItemData[] | null) {
    updateSelectedElements(elements);
    if (!elements) {
      updateTreeSelection(null);
    }
  }

  function syncClippers() {
    if (!clipperRef.current) return;
    setClippersCreated(Array.from(clipperRef.current.list.values()));
  }

  function onClippersDelete() {
    if (!clipperRef.current || !worldRef.current) return;
    for (const [id] of clipperRef.current.list) {
      clipperRef.current.delete(worldRef.current, id);
    }
    syncClippers();
  }

  async function zoomToSelection(modelIdMap: OBC.ModelIdMap) {
    const world = worldRef.current;
    const model = modelRef.current;

    if (!world || !model || !selectedElements || selectedElements.length === 0)
      return;

    const boxes = await model.getBBoxes(modelIdMap);
    if (!boxes || boxes.length === 0) return;

    const boxData = boxes[0];
    const box = new THREE.Box3(
      new THREE.Vector3(boxData.min.x, boxData.min.y, boxData.min.z),
      new THREE.Vector3(boxData.max.x, boxData.max.y, boxData.max.z)
    );

    await world.camera.controls.fitToBox(box, true);
  }

  async function updateSelection() {
    if (!modelRef.current || !treeSelection || zoomingRef.current) return;

    zoomingRef.current = true;

    await modelRef.current.resetHighlight();
    if (treeSelection && treeSelection.length > 0) {
      const modelIds = Array.from(modelRef.current.list.values()).map(
        (model) => model.modelId
      );

      // Unir todos los modelIdMap en una sola variable
      let combinedModelIdMap: OBC.ModelIdMap = {};
      for (const modelId of modelIds) {
        const modelIdMap = convertLocalIdsToModelIdMap(treeSelection, modelId);
        combinedModelIdMap = { ...combinedModelIdMap, ...modelIdMap };
      }

      await modelRef.current.highlight(highlightMaterial, combinedModelIdMap);

      const promises = [];
      for (const [id, localIds] of Object.entries(combinedModelIdMap)) {
        const model = modelRef.current.list.get(id);
        if (!model) continue;
        promises.push(model.getItemsData([...localIds]));
      }

      const selectedElements = (await Promise.all(promises)).flat();
      onHighlight(selectedElements);
      zoomToSelection(combinedModelIdMap);

      zoomingRef.current = false;
    }
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

      const { models } = await initCoreSetup({
        components,
        world,
        onUpdateSpatialData,
      });

      modelRef.current = models;

      const casters = components.get(OBC.Raycasters);
      const raycaster = casters.get(world);

      containerRef.current.addEventListener("click", async (event) => {
        const rect = containerRef.current!.getBoundingClientRect();

        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        const intersections = await raycaster.castRay({
          position: new THREE.Vector2(x, y),
        });

        if (!intersections) {
          onHighlight(null);
        }
      });

      const clipper = components.get(OBC.Clipper);
      clipperRef.current = clipper;

      containerRef.current.ondblclick = () => {
        if (
          plansEnabled &&
          clipperRef.current &&
          clipperRef.current.enabled &&
          worldRef.current
        ) {
          clipperRef.current.create(worldRef.current);
        }
      };

      const highlighter = setHighlighter({
        components,
        models,
        world,
        onHighlight,
        getPlansEnabled: () => plansEnabled,
      });

      highlighterRef.current = highlighter;

      components.init();

      world.scene.three.background = null;

      await world.camera.controls.setLookAt(68, 23, -8.5, 21.5, -5.5, 23);
      await models.core.update(true);
    }
    init();

    return function () {
      if (components) {
        components.dispose();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!clipperRef.current || !containerRef.current || !highlighterRef.current)
      return;

    highlighterRef.current.enabled = !plansEnabled;

    clipperRef.current.enabled = plansEnabled;

    for (const [, clipping] of clipperRef.current.list) {
      clipping.visible = plansEnabled;
    }

    containerRef.current.ondblclick = async () => {
      if (
        plansEnabled &&
        clipperRef.current &&
        clipperRef.current.enabled &&
        worldRef.current
      ) {
        await clipperRef.current.create(worldRef.current);
        syncClippers();
      }
    };
  }, [plansEnabled]);

  useEffect(
    function () {
      if (!worldRef.current) return;
      const selected =
        aperture === "perspective" ? "Perspective" : "Orthographic";
      worldRef.current.camera.projection.set(selected);
    },
    [aperture]
  );

  useEffect(
    function () {
      updateSelection();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [treeSelection]
  );

  return (
    <div className="h-full">
      {plansEnabled && (
        <ActionTip
          icon="CursorClick"
          message="Double-click to create a clipping plane."
        />
      )}
      {clippersCreated.length > 0 && (
        <ActionTip
          message={`There are ${clippersCreated.length} planes created.`}
          placement="bottom"
          actionButton={{
            label: "Delete",
            onClick: onClippersDelete,
            icon: "Trash",
          }}
        />
      )}
      <div id="container" ref={containerRef} className="h-full" />
    </div>
  );
}
