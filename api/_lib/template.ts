import { readFileSync } from 'fs'
import marked from 'marked'
import { sanitizeHtml } from './sanitizer'
import { ParsedRequest } from './types'
const twemoji = require('twemoji')
const twOptions = { folder: 'svg', ext: '.svg' }
const emojify = (text: string) => twemoji.parse(text, twOptions)

const sourceRglr = readFileSync(
  `${__dirname}/../_fonts/SourceSansPro-Regular.woff2`
).toString('base64')
const sourceBold = readFileSync(
  `${__dirname}/../_fonts/SourceSansPro-Bold.woff2`
).toString('base64')
const robotoRglr = readFileSync(
  `${__dirname}/../_fonts/RobotoCondensed-Regular.woff2`
).toString('base64')
const robotoBold = readFileSync(
  `${__dirname}/../_fonts/RobotoCondensed-Bold.woff2`
).toString('base64')

function getCss(theme: string, fontFamily: string, fontSize: string) {
  let background = 'white'
  let foreground = 'black'
  let bgImage =
    'data:image/png;base64,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'

  if (theme === 'dark') {
    background = 'black'
    foreground = 'white'
    bgImage =
      'data:image/png;base64,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'
  }

  let headingStyles = `
        font-weight: normal;
        text-transform: none;`

  if (fontFamily === 'Roboto Condensed') {
    headingStyles = `
        font-weight: bold;
        text-transform: uppercase;`
  }

  return `
    @font-face {
        font-family: 'Source Sans Pro';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${sourceRglr}) format('woff2');
    }

    @font-face {
        font-family: 'Source Sans Pro';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${sourceBold}) format('woff2');
    }

    @font-face {
        font-family: 'Roboto Condensed';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${robotoRglr}) format('woff2');
    }

    @font-face {
        font-family: 'Roboto Condensed';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${robotoBold}) format('woff2');
    }

    body {
        background: ${background};
        background-image: url(${bgImage});
        background-size: 100px 100px;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }

    .logo {
        margin: 0 75px;
        max-width: 100%;
    }

    .dark-svg {
        filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(12deg) brightness(103%) contrast(103%);
    }

    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }

    .spacer {
        margin: 150px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }

    .heading {
        font-family: '${sanitizeHtml(fontFamily)}', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        color: ${foreground};
        ${headingStyles}
        line-height: 1.3;
        letter-spacing: 0.02rem;
    }`
}

export function getHtml(parsedReq: ParsedRequest) {
  const {
    text,
    theme,
    md,
    fontFamily,
    fontSize,
    images,
    widths,
    heights,
  } = parsedReq
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, fontFamily, fontSize)}
    </style>
    <body>
        <div>
            <div class="spacer">
            <div class="logo-wrapper">
                ${images
                  .map(
                    (img, i) =>
                      getPlusSign(i) +
                      getImage(img, theme, widths[i], heights[i])
                  )
                  .join('')}
            </div>
            <div class="spacer">
            <div class="heading">${emojify(
              md ? marked(text) : sanitizeHtml(text)
            )}
            </div>
        </div>
    </body>
</html>`
}

function getImage(src: string, theme: string, width = 'auto', height = '225') {
  return `<img
        class="logo ${theme === 'dark' ? 'dark-svg' : ''}"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`
}

function getPlusSign(i: number) {
  return i === 0 ? '' : '<div class="plus">+</div>'
}
