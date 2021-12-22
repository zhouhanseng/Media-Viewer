import type { ViewerOptions } from './types'
import { onError, onRejection } from './error'
import { onView } from './viewer'

document.currentScript?.remove()

const { searchParams } = new URL(location.href)

if (searchParams.get('url')) {
  const options: ViewerOptions = {
    url: searchParams.get('url')!,
    type: searchParams.get('type'),
    source: searchParams.get('source'),
    controls: Boolean(searchParams.get('controls') ?? true),
    autoPlay: Boolean(searchParams.get('autoplay') ?? true),
    playsInline: Boolean(searchParams.get('playsInline') ?? false),
    loop: Boolean(searchParams.get('loop') ?? true),
    muted: Boolean(searchParams.get('muted') ?? true)
  }
  onView(options).then(inject)
} else {
  window.iFrameResizer = {
    onMessage,
  }
  window.addEventListener('error', onError, false)
  window.addEventListener('unhandledrejection', onRejection, false)
  window.addEventListener('rejectionhandled', onRejection, false)
}

function onMessage(data: ViewerOptions) {
  if (!data.url) {
    return
  }
  const options: ViewerOptions = {
    url: data.url,
    type: data.type ?? null,
    source: data.source,
    controls: Boolean(data.controls ?? true),
    autoPlay: Boolean(data.autoPlay ?? true),
    playsInline: Boolean(data.playsInline ?? false),
    loop: Boolean(data.loop ?? true),
    muted: Boolean(data.muted ?? true)
  }
  onView(options).then(inject)
}

function inject(element: Element | null) {
  if (!element) {
    return
  }
  document.body = document.createElement('body')
  document.body.appendChild(element)
}
