export interface PluginIdDocument {
  pluginId: string;
  userEmail: string;
}

export interface PluginIdsResult {
  Count: number;
  Items: PluginIdDocument[];
  ScannedCount: number;
}

export interface PostInfoDocument {
  pluginId: string;
  postId: number;
  postTitle: string;
}

export interface PostInfoResult {
  Count: number;
  Items: PostInfoDocument[];
  ScannedCount: number;
}

export interface TransactionsDocument {
  pluginId: string;
  postId: number;
  value: number;
}

export interface TransactionsResult {
  Count: number;
  Items: TransactionsDocument[];
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

export const getPostInfos = async (
  pluginId?: string | null
): Promise<PostInfoResult> => {
  if (!pluginId || pluginId == null) {
    return { Count: 0, Items: [], ScannedCount: 0 };
  }
  const response = await fetch(
    `/api/postInfos/byPluginId?pluginId=${pluginId}`
  );
  const data = await response.json();

  if (data) {
    return data as PostInfoResult;
  } else {
    return { Count: 0, Items: [], ScannedCount: 0 };
  }
};

export const getTransactionByPluginId = async (
  pluginId?: string | null
): Promise<TransactionsResult> => {
  if (!pluginId || pluginId == null) {
    return { Count: 0, Items: [], ScannedCount: 0 };
  }
  const response = await fetch(
    `/api/transactions/byPluginId?pluginId=${pluginId}`
  );
  const data = await response.json();

  if (data) {
    return data as TransactionsResult;
  } else {
    return { Count: 0, Items: [], ScannedCount: 0 };
  }
};
