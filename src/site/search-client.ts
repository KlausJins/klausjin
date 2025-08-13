'use server'

import { getNoteTitleDesc } from '@/actions/backend'
import { algoliaSearchClient, algoliaWriteClient, notesIndexName } from '@/lib/algolia'

export type NoteInfoType = {
  id: string
  title: string
  description: string
  isPublished: boolean
  tags: string[]
}

// 搜索笔记索引库
export const siteSearchNotes = async (query: string) => {
  const res = await algoliaSearchClient.searchSingleIndex<NoteInfoType>({
    indexName: notesIndexName,
    searchParams: {
      hitsPerPage: 20, // 每页数量
      filters: 'isPublished:true',
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

// 新增更新笔记索引库数据
export const siteSaveNotesById = async (id: string) => {
  const noteInfo = await getNoteTitleDesc(id)

  const tagsNames = noteInfo?.tags?.map((item) => item.name)

  return await algoliaWriteClient.addOrUpdateObject({
    indexName: notesIndexName,
    objectID: id,
    body: {
      id,
      title: noteInfo?.title,
      description: noteInfo?.description,
      isPublished: noteInfo?.published,
      tags: tagsNames
    }
  })
}
