import * as OBC from "@thatopen/components";
import * as OBF from "@thatopen/components-front";
import { ItemData } from "@thatopen/fragments";
import * as THREE from "three";

interface Props {
  components: OBC.Components;
  models: OBC.FragmentsManager;
  world: OBC.SimpleWorld<
    OBC.SimpleScene,
    OBC.OrthoPerspectiveCamera,
    OBF.PostproductionRenderer
  >;
  onHighlight: (elements: ItemData[] | null) => void;
  getPlansEnabled: () => boolean; // función para consultar el estado actual
}

export function setHighlighter({
  components,
  models,
  world,
  onHighlight,
  getPlansEnabled,
}: Props) {
  components.get(OBC.Raycasters).get(world);

  const highlighter = components.get(OBF.Highlighter);
  highlighter.setup({
    world,
    selectMaterialDefinition: {
      color: new THREE.Color("#bcf124"),
      opacity: 1,
      transparent: false,
      renderedFaces: 0,
    },
  });

  highlighter.events.select.onHighlight.add(async (modelIdMap) => {
    // Bloquear selección si planesEnabled está activo
    if (getPlansEnabled()) return;

    console.log("xd")

    const promises = [];
    for (const [modelId, localIds] of Object.entries(modelIdMap)) {
      const model = models.list.get(modelId);
      if (!model) continue;
      promises.push(model.getItemsData([...localIds]));
    }

    const selectedElements = (await Promise.all(promises)).flat();
    onHighlight(selectedElements);
  });

  // highlighter.events.select.onClear.add(() => {
  //   if (getPlansEnabled()) return;
  //   onHighlight(null);
  // });

  return highlighter;
}
