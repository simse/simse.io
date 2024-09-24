import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { expect, test } from 'vitest'
import Button from './Button.astro'

test('Button with text', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Button, {
    slots: {
      default: 'Button content',
    },
  })

  expect(result).toContain('Button content')
})

test('Button with icon', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Button, {
    slots: {
      default: 'Button content',
    },
    props: {
      icon: 'tabler:rss',
    },
  })

  expect(result).toContain('data-icon="tabler:rss"')
})

test('Button with shortcut', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Button, {
    props: {
      shortcut: 's',
    },
  })

  expect(result).toContain('shortcut-key="s"')
})
