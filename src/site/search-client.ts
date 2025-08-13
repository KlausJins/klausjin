'use server'

import { algoliaSearchClient, algoliaWriteClient, notesIndexName } from '@/lib/algolia'

export type NoteInfoType = {
  id: string
  title: string
  description: string
  tags: string[]
}

// 搜索笔记索引库
export const siteSearchNotes = async (query: string) => {
  const res = await algoliaSearchClient.searchSingleIndex<NoteInfoType>({
    indexName: notesIndexName,
    searchParams: {
      hitsPerPage: 20, // 每页数量
      query
    }
  })

  return res
}

// 新增更新笔记索引库数据
export const siteSaveNotes = async (noteInfo: NoteInfoType) => {
  return await algoliaWriteClient.addOrUpdateObject({
    indexName: notesIndexName,
    objectID: noteInfo.id,
    body: noteInfo
  })
}
