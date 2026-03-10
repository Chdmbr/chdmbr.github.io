import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/chdmbr",
    },
  }),
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta()],

  left: [
    Component.Flex({
      components: [
        { Component: Component.PageTitle(), grow: true },
        { Component: Component.Darkmode() },
      ],
    }),

    Component.Search(),

    Component.Explorer(),
  ],

  right: [Component.Graph(), Component.DesktopOnly(Component.TableOfContents())],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle()],

  left: [
    Component.Flex({
      components: [
        { Component: Component.PageTitle(), grow: true },
        { Component: Component.Darkmode() },
      ],
    }),

    Component.Search(),
    Component.Explorer(),
  ],

  right: [Component.Graph(), Component.DesktopOnly(Component.TableOfContents())],
}
