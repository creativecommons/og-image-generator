import { IncomingMessage } from 'http'
import { parse } from 'url'
import { ParsedRequest, Theme } from './types'

export function parseRequest(req: IncomingMessage) {
  console.log('HTTP ' + req.url)
  const { pathname, query } = parse(req.url || '/', true)
  const { fontFamily, fontSize, images, widths, heights, theme, md, imageObj } = query || {}

  if (Array.isArray(imageObj)) {
    throw new Error('Expected a single image Object');
  }
  if (Array.isArray(fontFamily)) {
    throw new Error('Expected a single fontFamily')
  }
  if (Array.isArray(fontSize)) {
    throw new Error('Expected a single fontSize')
  }
  if (Array.isArray(theme)) {
    throw new Error('Expected a single theme')
  }

  let parsedImages = JSON.parse(imageObj || '{}');
  if (Object.keys(parsedImages).length === 0) {
    console.log('Legacy image format');
    parsedImages.images = getArray(images);
    parsedImages.widths = getArray(widths);
    parsedImages.heights = getArray(heights);
  }

  const arr = (pathname || '/').slice(1).split('.')
  let extension = ''
  let text = ''
  if (arr.length === 0) {
    text = ''
  } else if (arr.length === 1) {
    text = arr[0]
  } else {
    extension = arr.pop() as string
    text = arr.join('.')
  }

  const parsedRequest: ParsedRequest = {
    fileType: extension === 'jpeg' ? extension : 'png',
    text: decodeURIComponent(text),
    theme: theme === 'dark' ? 'dark' : 'light',
    md: md === '1' || md === 'true',
    fontFamily: fontFamily === 'roboto-condensed' ? 'Roboto Condensed' : 'Source Sans Pro',
    fontSize: fontSize || '96px',
    images: parsedImages.images,
    widths: parsedImages.widths,
    heights: parsedImages.heights,
  }
  parsedRequest.images = getDefaultImages(
    parsedRequest.images,
    parsedRequest.theme
  )
  return parsedRequest
}

function getArray(stringOrArray: string[] | string | undefined): string[] {
  if (typeof stringOrArray === 'undefined') {
    return []
  } else if (Array.isArray(stringOrArray)) {
    return stringOrArray
  } else {
    return [stringOrArray]
  }
}

function getDefaultImages(images: string[], theme: Theme): string[] {
  const defaultImage =
    theme === 'light'
      ? 'https://cc-vocabulary.netlify.app/logos/cc/lettermark.svg#lettermark'
      : 'https://cc-vocabulary.netlify.app/logos/cc/lettermark.svg#lettermark'

  if (!images || !images[0]) {
    return [defaultImage]
  }

  return images
}
