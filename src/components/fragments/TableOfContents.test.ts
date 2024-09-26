import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { expect, test, describe } from 'vitest'
import { findAllByTestId, getByTestId } from '@testing-library/dom'
import TableOfContents from './TableOfContents.astro'

const renderTableOfContents = async (props: any) => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(TableOfContents, {
    props,
  })

  const renderedElement = document.createElement('div')
  renderedElement.innerHTML = result

  return renderedElement
}

describe('TableOfContents', () => {
  test('renders correctly', async () => {
    const renderedElement = await renderTableOfContents({
      post: {
        content: [
          {
            _type: 'block',
            style: 'h1',
            children: [{ text: 'Heading 1' }],
          },
          {
            _type: 'block',
            style: 'h2',
            children: [{ text: 'Heading 2' }],
          },
        ],
      },
    })

    const items = await findAllByTestId(renderedElement, 'table-of-contents-item')

    expect(items).toHaveLength(2)
  })

  test('renders correctly with no headings', async () => {
    const renderedElement = await renderTableOfContents({
      post: {
        content: [],
      },
    })

    const toc = await getByTestId(renderedElement, 'table-of-contents')

    expect(toc).toBeTruthy()
  })

  test('ignores headings that are not h1 or h2', async () => {
    const renderedElement = await renderTableOfContents({
      post: {
        content: [
          {
            _type: 'block',
            style: 'h1',
            children: [{ text: 'Heading 1' }],
          },
          {
            _type: 'block',
            style: 'h2',
            children: [{ text: 'Heading 2' }],
          },
          {
            _type: 'block',
            style: 'h3',
            children: [{ text: 'Heading 3' }],
          },
          {
            _type: 'block',
            style: 'h4',
            children: [{ text: 'Heading 4' }],
          },
        ],
      },
    })

    const items = await findAllByTestId(renderedElement, 'table-of-contents-item')

    expect(items).toHaveLength(2)
  })
})
