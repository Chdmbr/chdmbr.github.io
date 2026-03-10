function toggleToc(this: HTMLElement) {
  this.classList.toggle("collapsed")
  this.setAttribute(
    "aria-expanded",
    this.getAttribute("aria-expanded") === "true" ? "false" : "true",
  )
  const content = this.nextElementSibling as HTMLElement | undefined
  if (!content) return
  content.classList.toggle("collapsed")
}

function setupToc() {
  for (const toc of document.getElementsByClassName("toc")) {
    const button = toc.querySelector(".toc-header")
    const content = toc.querySelector(".toc-content")
    if (!button || !content) continue
    button.addEventListener("click", toggleToc)
    window.addCleanup(() => button.removeEventListener("click", toggleToc))
  }
}

function expandDesktopToc() {
  for (const toc of document.querySelectorAll(".right .toc")) {
    const button = toc.querySelector(".toc-header") as HTMLElement | null
    const content = toc.querySelector(".toc-content") as HTMLElement | null
    if (button) {
      button.classList.remove("collapsed")
      button.setAttribute("aria-expanded", "true")
    }
    if (content) {
      content.classList.remove("collapsed")
    }
  }
}

function setupTocHighlighting() {
  const headers = Array.from(
    document.querySelectorAll<HTMLElement>("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]"),
  )
  const tocLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".toc a[data-for]"))

  if (headers.length === 0 || tocLinks.length === 0) {
    return () => {}
  }

  const linksBySlug = new Map<string, HTMLAnchorElement[]>()
  for (const link of tocLinks) {
    const slug = link.dataset.for
    if (!slug) continue
    const group = linksBySlug.get(slug)
    if (group) {
      group.push(link)
    } else {
      linksBySlug.set(slug, [link])
    }
  }

  const setActive = (slug: string) => {
    for (const link of tocLinks) {
      link.classList.remove("active-section")
    }
    linksBySlug.get(slug)?.forEach((link) => link.classList.add("active-section"))
  }

  const visibilityObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const slug = (entry.target as HTMLElement).id
        linksBySlug.get(slug)?.forEach((link) => link.classList.toggle("in-view", entry.isIntersecting))
      }
    },
    {
      root: null,
      rootMargin: "-12% 0px -74% 0px",
      threshold: 0,
    },
  )

  for (const header of headers) {
    visibilityObserver.observe(header)
  }

  let ticking = false
  const topOffset = 140

  const updateActiveLink = () => {
    ticking = false
    let activeSlug = headers[0].id

    for (const header of headers) {
      if (header.getBoundingClientRect().top <= topOffset) {
        activeSlug = header.id
      } else {
        break
      }
    }

    setActive(activeSlug)
  }

  const onScroll = () => {
    if (ticking) return
    ticking = true
    window.requestAnimationFrame(updateActiveLink)
  }

  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", onScroll, { passive: true })
  updateActiveLink()

  return () => {
    visibilityObserver.disconnect()
    window.removeEventListener("scroll", onScroll)
    window.removeEventListener("resize", onScroll)
  }
}

document.addEventListener("nav", () => {
  setupToc()
  expandDesktopToc()
  const cleanupHighlighting = setupTocHighlighting()
  window.addCleanup(cleanupHighlighting)
})
