import * as OBC from "@thatopen/components";
import * as OBF from "@thatopen/components-front";
import { ItemData } from "@thatopen/fragments";
import * as THREE from "three";

interface Props {
  components: OBC.Components;
  fragments: OBC.FragmentsManager;
  world: OBC.SimpleWorld<
    OBC.SimpleScene,
    OBC.OrthoPerspectiveCamera,
    OBF.PostproductionRenderer
  >;
  onHighlight: (elements: ItemData[] | null) => void;
}

export function setHighlighter({ components, fragments, world, onHighlight }: Props) {
  components.get(OBC.Raycasters).get(world);

  const highlighter = components.get(OBF.Highlighter);
  highlighter.setup({
    world,
    selectMaterialDefinition: {
      // you can change this to define the color of your highligthing
      color: new THREE.Color("#bcf124"),
      opacity: 1,
      transparent: false,
      renderedFaces: 0,
    },
  });

  highlighter.events.select.onHighlight.add(async (modelIdMap) => {
    console.log("Something was selected");

    const promises = [];
    for (const [modelId, localIds] of Object.entries(modelIdMap)) {
      const model = fragments.list.get(modelId);
      if (!model) continue;
      promises.push(model.getItemsData([...localIds]));
    }

    const selectedElements = (await Promise.all(promises)).flat();
    console.log("selectedElements", selectedElements);
    onHighlight(selectedElements);
  });

  highlighter.events.select.onClear.add(() => {
    console.log("Selection was cleared");
    onHighlight(null);
  });
}
