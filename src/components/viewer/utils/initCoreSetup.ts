import * as OBC from "@thatopen/components";
import * as OBF from "@thatopen/components-front";
import { SpatialTreeItem } from "@thatopen/fragments";

interface Props {
  components: OBC.Components;
  world: OBC.SimpleWorld<
    OBC.SimpleScene,
    OBC.OrthoPerspectiveCamera,
    OBF.PostproductionRenderer
  >;
  onUpdateSpatialData: (data: SpatialTreeItem) => void;
}

export async function initCoreSetup({
  components,
  world,
  onUpdateSpatialData,
}: Props) {
  const githubUrl =
    "https://thatopen.github.io/engine_fragment/resources/worker.mjs";
  const fetchedUrl = await fetch(githubUrl);
  const workerBlob = await fetchedUrl.blob();
  const workerFile = new File([workerBlob], "worker.mjs", {
    type: "text/javascript",
  });
  const workerUrl = URL.createObjectURL(workerFile);
  const models = components.get(OBC.FragmentsManager);
  models.init(workerUrl);

  world.camera.controls?.addEventListener("rest", () =>
    models.core.update(true)
  );

  world.onCameraChanged.add((camera) => {
    for (const [, model] of models.list) {
      model.useCamera(camera.three);
    }
    models.core.update(true);
  });

  models.list.onItemSet.add(({ value: model }) => {
    model.useCamera(world.camera.three);
    world.scene.three.add(model.object);
    models.core.update(true);
  });

  const fragPaths = [
    "https://thatopen.github.io/engine_components/resources/frags/school_arq.frag",
  ];
  await Promise.all(
    fragPaths.map(async (path) => {
      const modelId = path.split("/").pop()?.split(".").shift();
      if (!modelId) return null;
      const file = await fetch(path);
      const buffer = await file.arrayBuffer();
      const fragmentsModel = await models.core.load(buffer, { modelId });

      const spatialData = await fragmentsModel.getSpatialStructure();
      onUpdateSpatialData(spatialData);
    })
  );

  return {
    models,
  };
}
