import { IncomingMessage } from 'http'
import { parse } from 'url'
import { ParsedRequest, Theme } from './types'

export function parseRequest(req: IncomingMessage) {
  //console.log('HTTP ' + req.url)
  const { pathname, query } = parse(req.url || '/', true)
  // @todo: Switch to param stuctucture here: https://github.com/spinks/og-image/commit/45439b73b3a5156faf9f6757fc4f208b230f5d9a
  // to bypass facebook issue (facebook strips query params that appear to be urls)
  const { fontFamily, fontSize, images, widths, heights, theme, backgroundType, imageUrl, attribution,  md } = query || {}

  if (Array.isArray(fontFamily)) {
    throw new Error('Expected a single fontFamily')
  }
  if (Array.isArray(fontSize)) {
    throw new Error('Expected a single fontSize')
  }
  if (Array.isArray(theme)) {
    throw new Error('Expected a single theme')
  }
  if (Array.isArray(backgroundType)) {
    throw new Error('Expected a single backgroundType')
  }

  const arr = (pathname || '/').slice(1).split('.')
  //console.log(arr)
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
    backgroundType: backgroundType === 'image' ? 'image' : 'pattern',
    imageUrl: imageUrl === undefined ? '': imageUrl.toString(),
    attribution: attribution === undefined ? '': attribution.toString(),
    fontSize: fontSize || '96px',
    images: getArray(images),
    widths: getArray(widths),
    heights: getArray(heights),
  }
  parsedRequest.images = getDefaultImages(
    parsedRequest.images,
    parsedRequest.theme
  )
  console.log('parsedRequest.backgroundType: ' +  parsedRequest.backgroundType)
  console.log('parsedRequest.attribution: ' +  parsedRequest.attribution)
  console.log('parsedRequest.imageUrl: ' +  parsedRequest.imageUrl)
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
