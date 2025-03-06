import { LayoutData } from "rc-dock";

export function dockHasTabById(layout: LayoutData, tabId: string, isFloating: boolean): boolean {
  if (isFloating) {
    if (!layout.floatbox || layout.floatbox.children.length == 0)
      return false
    if (layout.floatbox.children[0].tabs.length == 0)
      return false

    return layout.floatbox.children[0].tabs.find(t => t.id === tabId)
  } else {
    // @TODO: complete for non-floating windows
  }
}
