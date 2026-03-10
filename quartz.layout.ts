import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/Chdmbr/chdmbr.github.io",
      Home: "/",
      Notes: "/index",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ArticleTitle(),
  ],
  left: [
    Component.Flex({
      components: [
        { Component: Component.PageTitle(), grow: true },
        { Component: Component.Darkmode() }
      ]
    }),
    Component.Search(),
    Component.Explorer({ folderDefaultState: "open" })
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle()],
  left: [
    Component.Flex({
      components: [
        { Component: Component.PageTitle(), grow: true },
        { Component: Component.Darkmode() }
      ]
    }),
    Component.Search(),
    Component.Explorer({ folderDefaultState: "open" })
  ],
  right: [],
}
