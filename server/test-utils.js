import { JSDOM } from 'jsdom'
import { within } from '@testing-library/dom'

export function render(res) {
  const jsdom = new JSDOM(res.text)
  return within(jsdom.window.document.body)
}