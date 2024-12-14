import { useLayoutEffect, useState } from 'preact/hooks'
import type { CollectionEntry } from 'astro:content'

import TopBar from './TopBar'
import BiographyWindow from './windows/Biography'
import BlogList from './windows/BlogList'
import BlogPost from './windows/BlogPost'
import RadioWindow from './windows/Radio'
import Desktop from './Desktop'
import type { InitialStateAction, WindowType } from './types'

import BiographyIcon from '@assets/desktop_icons/msagent-3.png'
import BlogIcon from '@assets/desktop_icons/address_book_pad.png'
import RadioIcon from '@assets/desktop_icons/cd_audio_cd_a-4.png'
import useSize from '@utils/useSize'

interface ComputerProps {
  blogPosts: CollectionEntry<'blog'>[]
  initialStateAction?: InitialStateAction
}

const Computer = ({ blogPosts, initialStateAction }: ComputerProps) => {
  const BiographyWindowDefinition: WindowType = {
    title: 'Biography',
    component: BiographyWindow,
    id: 'biography',
    type: 'biography',
    meta: {
      title: 'Biography',
      description: "Simon's biography",
      path: '/',
    },
  }

  const BlogWindowDefinition: WindowType = {
    title: 'Blog',
    component: BlogList,
    id: 'blog',
    type: 'blogList',
    posts: blogPosts,
    meta: {
      title: 'Blog',
      description: "Simon's blog",
      path: '/blog',
    },
  }

  const RadioWindowDefinition: WindowType = {
    title: 'Radio',
    component: RadioWindow,
    id: 'radio',
    type: 'radio',
    meta: {
      title: 'Radio',
      description: "Simon's radio",
      path: '/',
    },
  }

  const [windowWidth, setWindowWidth] = useState(0)

  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const initialStateWindow = (): WindowType | undefined => {
    if (initialStateAction?.type === 'openBlogPost') {
      return {
        title: 'Blog Post',
        component: BlogPost,
        postSlug: initialStateAction.postSlug,
        type: 'blogPost',
        id: `blog-${initialStateAction.postSlug}`,
        associatedPath: `/blog/${initialStateAction.postSlug}`,
        prefetchedPost: initialStateAction.prefetchedPost,
      }
    }
  }

  const [windows, setWindows] = useState<WindowType[]>(
    [
      BiographyWindowDefinition,
      BlogWindowDefinition,
      RadioWindowDefinition,
      initialStateWindow(),
    ].filter(Boolean) as WindowType[],
  )
  const [windowStack, setWindowStack] = useState<string[]>(
    [
      // "radio",
      'blog',
      'biography',
      initialStateWindow()?.id,
    ].filter(Boolean) as string[],
  )

  const getWindow = (id: string) => windows.find((window) => window.id === id)

  const closeWindow = (id: string) => {
    setWindows((prevWindows) =>
      prevWindows.filter((prevWindow) => prevWindow.id !== id),
    )
    setWindowStack((prevStack) => prevStack.filter((stackId) => stackId !== id))

    const newTopWindow = getWindow(windowStack[windowStack.length - 2])
    if (newTopWindow) {
      updateMeta(newTopWindow)
    } else {
      history.pushState({}, '', '/')
    }
  }

  const touchWindow = (id: string) => {
    if (windowWidth <= 640) {
      const windowElement = document.getElementById(id)
      if (windowElement) {
        windowElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    } else {
      setWindowStack((prevStack) => {
        const newStack = prevStack.filter((stackId) => stackId !== id)
        newStack.push(id)
        return newStack
      })
    }

    const window = getWindow(id)
    if (window) {
      updateMeta(window)
    }
  }

  const updateMeta = (window: WindowType) => {
    /*if (window.meta) {
      //history.pushState({}, '', window.meta.path)
      //document.title = window.meta.title + '—simonOS'

      const description = document.querySelector('meta[name="description"]')
      if (description) {
        description.setAttribute('content', window.meta.description)
      }
    } else {
      history.pushState({}, '', '/')
    }*/
  }

  const openWindow = (newWindow: WindowType) => {
    // if on mobile, navigate to path instead
    if (windowWidth <= 640) {
      window.location.href = newWindow.meta?.path || '/'
    }

    if (windows.find((prevWindow) => prevWindow.id === newWindow.id)) {
      touchWindow(newWindow.id)
      return
    }

    setWindows((prevWindows) => [...prevWindows, newWindow])
    setWindowStack((prevStack) => {
      const newStack = prevStack.filter((stackId) => stackId !== newWindow.id)
      newStack.push(newWindow.id)
      return newStack
    })
    updateMeta(newWindow)
  }

  return (
    <div class="sm:max-h-screen sm:overflow-hidden pb-4 sm:pb-0 sm:h-screen">
      <TopBar />

      <div class="relative w-full h-full flex flex-col-reverse gap-4 p-2 sm:block sm:p-0">
        {windows.map((window) => {
          const WindowComponent = window.component

          return (
            <WindowComponent
              key={window.id}
              order={windowStack.indexOf(window.id)}
              onClose={() => closeWindow(window.id)}
              onTouch={() => {
                // if on desktop
                if (windowWidth > 640) {
                  touchWindow(window.id)
                }
              }}
              openWindow={openWindow}
              {...window}
            />
          )
        })}

        <Desktop
          icons={[
            {
              name: 'Biography',
              icon: BiographyIcon,
              onDoubleClick: () => openWindow(BiographyWindowDefinition),
            },
            {
              name: 'Blog',
              icon: BlogIcon,
              onDoubleClick: () => openWindow(BlogWindowDefinition),
            },
            /*{
              name: "Radio",
              icon: RadioIcon,
              onDoubleClick: () => openWindow(RadioWindowDefinition),
            },*/
          ]}
        />
      </div>
    </div>
  )
}

export default Computer
