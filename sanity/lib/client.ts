import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from '../env'

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
    })
  : null
