import { test, expect } from 'vitest'
import { JSDOM } from 'jsdom'
import request from 'supertest'
import { render } from '../server/test-utils.js'
import art from '../server/data/art.js'

import server from '../server/server.js'

test('/ should display the header in the page ', async () => {
    const res = await request(server).get('/')
    const screen = render(res)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading.textContent).toBe('Gallery')
  })

  test('/ should have all the artworks ', async () => {
    const res = await request(server).get('/')
    const dom = new JSDOM(res.text)
    const images = dom.window.document.getElementsByTagName('img')
    expect(art.length).toBe(images.length)
  })

  test('/artworks/2 should display comments', async () => {
    const res = await request(server).get('/artworks/2')
    const screen = render(res)
    const commentYellow = screen.getByText('Yellow.')
    expect(commentYellow).not.toBeNull()
    
    const commentSoYellow = screen.getByText('So yellow.')
    expect(commentSoYellow).not.toBeNull()
  })

  test('Serves static assets with correct content-type', async () => {
    const res = await request(server).get('/images/kea.jpg')
    expect(res.statusCode).toBe(200)
    expect(res.headers['content-type']).toBe("image/jpeg")
  })
  
  test('/test should return 404', async () => {
    const res = await request(server).get('/test')
    expect(res.statusCode).toBe(404)
  })

