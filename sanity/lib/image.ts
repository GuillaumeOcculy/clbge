import { createImageUrlBuilder } from '@sanity/image-url'
import { projectId, dataset } from '../env'

const builder = createImageUrlBuilder({ projectId: projectId || '', dataset: dataset || '' })

export const urlFor = (source: Parameters<typeof builder.image>[0]) =>
  builder.image(source)
