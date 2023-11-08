export interface PluginIdDocument {
  pluginId: string;
  userEmail: string;
}

export interface PluginIdsResult {
  Count: number;
  Items: PluginIdDocument[];
  ScannedCount: number;
}

export const verifyPluginIDs = async (
  email?: string | null
): Promise<PluginIdsResult> => {
  const response = await fetch(`/api/pluginIds/byEmail?email=pipewebmonetization@gmail.com`);
  const data = await response.json();

  if (data) {
    return data as PluginIdsResult;
  } else {
    return { Count: 0, Items: [], ScannedCount: 0 };
  }
};