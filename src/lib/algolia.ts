import { algoliasearch } from 'algoliasearch'

const appID = process.env.ALGOLIA_APP_ID
const apiSearchKey = process.env.ALGOLIA_SEARCH_KEY
const apiWriteKey = process.env.ALGOLIA_WRITE_KEY

export const notesIndexName = 'notes'

export const algoliaSearchClient = algoliasearch(appID, apiSearchKey)
export const algoliaWriteClient = algoliasearch(appID, apiWriteKey)
