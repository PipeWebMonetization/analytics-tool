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
  if (!email || email == null) {
    return { Count: 0, Items: [], ScannedCount: 0 };
  }
  const response = await fetch(`/api/pluginIds/byEmail?email=${email}`);
  const data = await response.json();

  if (data) {
    return data as PluginIdsResult;
  } else {
    return { Count: 0, Items: [], ScannedCount: 0 };
  }
};