import { ParsedRequest, Theme, BackgroundType, FileType } from '../api/_lib/types'
const { H, R, copee } = window as any
let timeout = -1

interface ImagePreviewProps {
  src: string
  onclick: () => void
  onload: () => void
  onerror: () => void
  loading: boolean
}

const ImagePreview = ({
  src,
  onclick,
  onload,
  onerror,
  loading,
}: ImagePreviewProps) => {
  const style = {
    filter: loading ? 'blur(5px)' : '',
    opacity: loading ? 0.1 : 1,
  }
  const title = 'Click to copy image URL to clipboard'
  return H(
    'a',
    { className: 'image-wrapper', href: src, onclick },
    H('div', {className: 'image-title'}, 'Text Here (Pending)'),
    H('img', { src, onload, onerror, style, title })
  )
}

interface DropdownOption {
  text: string
  value: string
}

interface DropdownProps {
  options: DropdownOption[]
  value: string
  onchange: (val: string) => void
  small: boolean
}

const Dropdown = ({ options, value, onchange, small }: DropdownProps) => {
  const wrapper = small ? 'select-wrapper small' : 'select-wrapper'
  const arrow = small ? 'select-arrow small' : 'select-arrow'
  return H(
    'div',
    { className: wrapper },
    H(
      'select',
      { onchange: (e: any) => onchange(e.target.value) },
      options.map((o) =>
        H('option', { value: o.value, selected: value === o.value }, o.text)
      )
    ),
    H('div', { className: arrow }, '▼')
  )
}

interface TextInputProps {
  value: string
  oninput: (val: string) => void
}

const TextInput = ({ value, oninput }: TextInputProps) => {
  return H(
    'div',
    { className: 'input-outer-wrapper' },
    H(
      'div',
      { className: 'input-inner-wrapper' },
      H('input', {
        type: 'text',
        value,
        oninput: (e: any) => oninput(e.target.value),
      })
    )
  )
}

// const TextArea = ({ value, oninput }: TextInputProps) => {
//   return H(
//     'div',
//     { className: 'input-outer-wrapper' },
//     H(
//       'div',
//       { className: 'input-inner-wrapper' },
//       H('textarea', {
//         type: 'text',
//         value,
//         oninput: (e: any) => oninput(e.target.value),
//       })
//     )
//   )
// }

interface ButtonProps {
  label: string
  onclick: () => void
}

const Button = ({ label, onclick }: ButtonProps) => {
  return H('button', { onclick }, label)
}

interface ActionsProps {
  href: string
  copyImage: () => void
  copyMetaTag: () => void
}

const ActionButtons = ({ href, copyImage, copyMetaTag }: ActionsProps) => {
  return H(
    'div',
    { className: 'action-buttons' },
    H(Button, { label: 'Copy Image Url', onclick: copyImage }),
    H(Button, { label: 'Copy Meta Tag', onclick: copyMetaTag }),
    H(
      'a',
      { className: 'download-image', href, download: 'og-image' },
      H(Button, {
        label: 'Download Image',
      })
    )
  )
}

interface FieldProps {
  label: string
  input: any
}

const Field = ({ label, input }: FieldProps) => {
  return H(
    'div',
    { className: 'field' },
    H(
      'label',
      H('div', { className: 'custom-label' }, label),
      H('div', { className: 'field-value' }, input)
    )
  )
}

interface ToastProps {
  show: boolean
  message: string
}

const Toast = ({ show, message }: ToastProps) => {
  const style = { transform: show ? 'translate3d(0,-0px,-0px) scale(1)' : '' }
  return H(
    'div',
    { className: 'toast-area' },
    H(
      'div',
      { className: 'toast-outer', style },
      H(
        'div',
        { className: 'toast-inner' },
        H('div', { className: 'toast-message' }, message)
      )
    )
  )
}

const themeOptions: DropdownOption[] = [
  { text: 'Light', value: 'light' },
  { text: 'Dark', value: 'dark' },
]

const fileTypeOptions: DropdownOption[] = [
  { text: 'PNG', value: 'png' },
  { text: 'JPEG', value: 'jpeg' },
]

const fontFamilyOptions: DropdownOption[] = [
  { text: 'Source Sans Pro', value: 'source-sans-pro'},
  { text: 'Roboto Condensed', value: 'roboto-condensed'},
]

const fontSizeOptions: DropdownOption[] = Array.from({ length: 10 })
  .map((_, i) => i * 25)
  .filter((n) => n > 0)
  .map((n) => ({ text: n + 'px', value: n + 'px' }))

const markdownOptions: DropdownOption[] = [
  { text: 'Plain Text', value: '0' },
  { text: 'Markdown', value: '1' },
]

const backgroundOptions: DropdownOption[] = [
  { text: 'Pattern', value: 'pattern' },
  { text: 'Image', value: 'image' },
]

const imageLightOptions: DropdownOption[] = [
  {
    text: 'main logomark',
    value: 'https://cc-vocabulary.netlify.app/logos/cc/logomark.svg#logomark',
  },
  {
    text: 'main lettermark',
    value:
      'https://cc-vocabulary.netlify.app/logos/cc/lettermark.svg#lettermark',
  },
  {
    text: 'letterheart',
    value:
      'https://cc-vocabulary.netlify.app/logos/cc/lettermark.svg#letterheart',
  },
  {
    text: 'certificates',
    value:
      'https://cc-vocabulary.netlify.app/logos/products/certificates.svg#certificates',
  },
  {
    text: 'chooser',
    value:
      'https://cc-vocabulary.netlify.app/logos/products/chooser.svg#chooser',
  },
  {
    text: 'globalnetwork',
    value:
      'https://cc-vocabulary.netlify.app/logos/products/global_network.svg#globalnetwork',
  },
  {
    text: 'globalsummit',
    value:
      'https://cc-vocabulary.netlify.app/logos/products/global_summit.svg#globalsummit',
  },
  {
    text: 'legaldatabase',
    value:
      'https://cc-vocabulary.netlify.app/logos/products/legal_database.svg#legaldatabase',
  },
  {
    text: 'opensource',
    value:
      'https://cc-vocabulary.netlify.app/logos/products/open_source.svg#opensource',
  },
  {
    text: 'search',
    value: 'https://cc-vocabulary.netlify.app/logos/products/search.svg#search',
  },
  {
    text: 'stateofthecommons',
    value:
      'https://cc-vocabulary.netlify.app/logos/products/state_of_the_commons.svg#stateofthecommons',
  },
  {
    text: 'vocabulary',
    value:
      'https://cc-vocabulary.netlify.app/logos/products/vocabulary.svg#vocabulary',
  },
]

const widthOptions = [
  { text: 'width', value: 'auto' },
  { text: '50', value: '50' },
  { text: '100', value: '100' },
  { text: '150', value: '150' },
  { text: '200', value: '200' },
  { text: '250', value: '250' },
  { text: '300', value: '300' },
  { text: '350', value: '350' },
]

const heightOptions = [
  { text: 'height', value: 'auto' },
  { text: '50', value: '50' },
  { text: '100', value: '100' },
  { text: '150', value: '150' },
  { text: '200', value: '200' },
  { text: '250', value: '250' },
  { text: '300', value: '300' },
  { text: '350', value: '350' },
]

interface AppState extends ParsedRequest {
  loading: boolean
  showToast: boolean
  messageToast: string
  selectedImageIndex: number
  widths: string[]
  heights: string[]
  overrideUrl: URL | null
}

type SetState = (state: Partial<AppState>) => void

const App = (_: any, state: AppState, setState: SetState) => {
  const setLoadingState = (newState: Partial<AppState>) => {
    window.clearTimeout(timeout)
    if (state.overrideUrl && state.overrideUrl !== newState.overrideUrl) {
      newState.overrideUrl = state.overrideUrl
    }
    if (newState.overrideUrl) {
      timeout = window.setTimeout(() => setState({ overrideUrl: null }), 200)
    }

    setState({ ...newState, loading: true })
  }

  const copyImageURL = (e: Event) => {
    e.preventDefault()
    const success = copee.toClipboard(url.href)
    if (success) {
      setState({
        showToast: true,
        messageToast: 'Copied image URL to clipboard',
      })
      setTimeout(() => setState({ showToast: false }), 3000)
    } else {
      window.open(url.href, '_blank')
    }
    return false
  }

  const copyMetaTag = (e: Event) => {
    e.preventDefault()
    const html = `<meta property="og:image" content="${url.href}" />`
    const success = copee.toClipboard(html)
    if (success) {
      setState({
        showToast: true,
        messageToast: 'Copied Meta tag to clipboard',
      })
      setTimeout(() => setState({ showToast: false }), 3000)
    }
    return false
  }

  const {
    fileType = 'png',
    fontFamily = 'source-sans-pro',
    imageUrl = '',
    fontSize = '100px',
    theme = 'light',
    backgroundType = 'pattern',
    md = true,
    text = 'Introducing **New** Feature',
    images = [imageLightOptions[0].value],
    widths = [],
    heights = [],
    showToast = false,
    messageToast = '',
    loading = true,
    selectedImageIndex = 0,
    overrideUrl = null,
  } = state

  const mdValue = md ? '1' : '0'
  const imageOptions = imageLightOptions
  const url = new URL(window.location.origin)
  url.pathname = `${encodeURIComponent(text)}.${fileType}`
  url.searchParams.append('theme', theme)
  url.searchParams.append('md', mdValue)
  url.searchParams.append('bgtype', backgroundType)
  url.searchParams.append('fontFamily', fontFamily)
  url.searchParams.append('imageUrl', imageUrl)
  url.searchParams.append('fontSize', fontSize)

  for (let image of images) {
    url.searchParams.append('images', image)
  }
  for (let width of widths) {
    url.searchParams.append('widths', width)
  }
  for (let height of heights) {
    url.searchParams.append('heights', height)
  }

  return H(
    'div',
    { className: 'columns is-vcentered is-variable is-8' },
    H(
      'div',
      { className: 'column is-half margin-top-large margin-bottom-large' },
      H(
        'div',
        H(Field, {
          label: 'Theme',
          input: H(Dropdown, {
            options: themeOptions,
            value: theme,
            onchange: (val: Theme) => {
              const options = imageLightOptions
              let clone = [...images]
              clone[0] = options[selectedImageIndex].value
              setLoadingState({ theme: val, images: clone })
            },
          }),
        }),
        H(Field, {
          label: 'File Type',
          input: H(Dropdown, {
            options: fileTypeOptions,
            value: fileType,
            onchange: (val: FileType) => setLoadingState({ fileType: val }),
          }),
        }),
        H(Field, {
          label: 'Font Family',
          input: H(Dropdown, {
            options: fontFamilyOptions,
            value: fontFamily,
            onchange: (val: string) => setLoadingState({ fontFamily: val }),
          }),
        }),
        H(Field, {
          label: 'Font Size',
          input: H(Dropdown, {
            options: fontSizeOptions,
            value: fontSize,
            onchange: (val: string) => setLoadingState({ fontSize: val }),
          }),
        }),
        H(Field, {
          label: 'Text Type',
          input: H(Dropdown, {
            options: markdownOptions,
            value: mdValue,
            onchange: (val: string) => setLoadingState({ md: val === '1' }),
          }),
        }),
        H(Field, {
          label: 'Text Input',
          input: H(TextInput, {
            value: text,
            oninput: (val: string) => {
              console.log('oninput ' + val)
              setLoadingState({ text: val, overrideUrl: url })
            },
          }),
        }),

        H(Field, {
          label: 'Background Type',
          input: H(Dropdown, {
            options: backgroundOptions,
            value: backgroundType,
            onchange: (val: BackgroundType) => {
              console.log(val)
              setLoadingState({ backgroundType: val})
            },
          }),
        }),

        H(Field, {
          label: 'Image Url',
          input: H(TextInput, {
            value: imageUrl,
            oninput: (val: string) => {
              console.log('oninput ' + val)
              console.log('url' + url)
              setLoadingState({ imageUrl: val, overrideUrl: url })
            },
          }),
        }),

        // H(Field, {
        //   label: 'Attribution',
        //   input: H(TextArea, {
        //     value: text,
        //     oninput: (val: string) => {
        //       console.log('oninput ' + val)
        //       console.log('url' + url)
        //       setLoadingState({ imageurl: val, overrideUrl: url })
        //     },
        //   }),
        // }),

        H(Field, {
          label: 'Image 1',
          input: H(
            'div',
            H(Dropdown, {
              options: imageOptions,
              value: imageOptions[selectedImageIndex].value,
              onchange: (val: string) => {
                let clone = [...images]
                clone[0] = val
                const selected = imageOptions.map((o) => o.value).indexOf(val)
                setLoadingState({ images: clone, selectedImageIndex: selected })
              },
            }),
            H(
              'div',
              { className: 'field-flex' },
              H(Dropdown, {
                options: widthOptions,
                value: widths[0],
                small: true,
                onchange: (val: string) => {
                  let clone = [...widths]
                  clone[0] = val
                  setLoadingState({ widths: clone })
                },
              }),
              H(Dropdown, {
                options: heightOptions,
                value: heights[0],
                small: true,
                onchange: (val: string) => {
                  let clone = [...heights]
                  clone[0] = val
                  setLoadingState({ heights: clone })
                },
              })
            )
          ),
        }),
        ...images.slice(1).map((image, i) =>
          H(Field, {
            label: `Image ${i + 2}`,
            input: H(
              'div',
              H(TextInput, {
                value: image,
                oninput: (val: string) => {
                  let clone = [...images]
                  clone[i + 1] = val
                  setLoadingState({ images: clone, overrideUrl: url })
                },
              }),
              H(
                'div',
                { className: 'field-flex' },
                H(Dropdown, {
                  options: widthOptions,
                  value: widths[i + 1],
                  small: true,
                  onchange: (val: string) => {
                    let clone = [...widths]
                    clone[i + 1] = val
                    setLoadingState({ widths: clone })
                  },
                }),
                H(Dropdown, {
                  options: heightOptions,
                  value: heights[i + 1],
                  small: true,
                  onchange: (val: string) => {
                    let clone = [...heights]
                    clone[i + 1] = val
                    setLoadingState({ heights: clone })
                  },
                })
              )
            ),
          })
        ),
        H(Field, {
          label: `Image ${images.length + 1}`,
          input: H(Button, {
            label: `Add Image ${images.length + 1}`,
            onclick: () => {
              const nextImage =
                images.length === 1
                  ? 'https://cdn.jsdelivr.net/gh/remojansen/logo.ts@master/ts.svg'
                  : ''
              setLoadingState({ images: [...images, nextImage] })
            },
          }),
        }),
        H(ActionButtons, {
          href: url.href,
          copyImage: copyImageURL,
          copyMetaTag: copyMetaTag,
        })
      )
    ),
    H(
      'div',
      { className: 'column is-half margin-top-large' },
      H(ImagePreview, {
        src: overrideUrl ? overrideUrl.href : url.href,
        loading: loading,
        onload: () => setState({ loading: false }),
        onerror: () => {
          setState({ showToast: true, messageToast: 'Oops, an error occurred' })
          setTimeout(() => setState({ showToast: false }), 2000)
        },
        onclick: (e: Event) => copyImageURL(e),
      })
    ),
    H(Toast, {
      message: messageToast,
      show: showToast,
    })
  )
}

R(H(App), document.getElementById('app'))
