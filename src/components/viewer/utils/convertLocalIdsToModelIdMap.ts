import { ModelIdMap } from "@thatopen/components";

export function convertLocalIdsToModelIdMap(
  localIds: number[],
  modelId: string
): ModelIdMap {
  return { [modelId]: new Set(localIds) };
}
