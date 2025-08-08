import { Page } from "playwright";

// Introduce a descriptive type for locator descriptors sourced from JSON
export type AriaRole =
  | "alert"
  | "alertdialog"
  | "application"
  | "article"
  | "banner"
  | "blockquote"
  | "button"
  | "caption"
  | "cell"
  | "checkbox"
  | "code"
  | "columnheader"
  | "combobox"
  | "complementary"
  | "contentinfo"
  | "definition"
  | "deletion"
  | "dialog"
  | "directory"
  | "document"
  | "emphasis"
  | "feed"
  | "figure"
  | "form"
  | "generic"
  | "grid"
  | "gridcell"
  | "group"
  | "heading"
  | "img"
  | "insertion"
  | "link"
  | "list"
  | "listbox"
  | "listitem"
  | "log"
  | "main"
  | "marquee"
  | "math"
  | "meter"
  | "menu"
  | "menubar"
  | "menuitem"
  | "menuitemcheckbox"
  | "menuitemradio"
  | "navigation"
  | "none"
  | "note"
  | "option"
  | "paragraph"
  | "presentation"
  | "progressbar"
  | "radio"
  | "radiogroup"
  | "region"
  | "row"
  | "rowgroup"
  | "rowheader"
  | "scrollbar"
  | "search"
  | "searchbox"
  | "separator"
  | "slider"
  | "spinbutton"
  | "status"
  | "strong"
  | "subscript"
  | "superscript"
  | "switch"
  | "tab"
  | "table"
  | "tablist"
  | "tabpanel"
  | "term"
  | "textbox"
  | "time"
  | "timer"
  | "toolbar"
  | "tooltip"
  | "tree"
  | "treegrid"
  | "treeitem";

export interface LocatorDescriptor {
  locator: string; // selector like "css=…" | "xpath=…" or an aria role name
  locatorOptions?: Record<string, unknown>; // getByRole/locator options
  description?: string; // human-readable description for logs
  actionOptions?: Record<string, unknown>; // Playwright action options e.g., { timeout: 5000 }
  by?: "role" | "selector"; // optional explicit hint to resolve ambiguities
}

function isAriaRole(value: unknown): value is AriaRole {
  const roles: Set<string> = new Set([
    "alert",
    "alertdialog",
    "application",
    "article",
    "banner",
    "blockquote",
    "button",
    "caption",
    "cell",
    "checkbox",
    "code",
    "columnheader",
    "combobox",
    "complementary",
    "contentinfo",
    "definition",
    "deletion",
    "dialog",
    "directory",
    "document",
    "emphasis",
    "feed",
    "figure",
    "form",
    "generic",
    "grid",
    "gridcell",
    "group",
    "heading",
    "img",
    "insertion",
    "link",
    "list",
    "listbox",
    "listitem",
    "log",
    "main",
    "marquee",
    "math",
    "meter",
    "menu",
    "menubar",
    "menuitem",
    "menuitemcheckbox",
    "menuitemradio",
    "navigation",
    "none",
    "note",
    "option",
    "paragraph",
    "presentation",
    "progressbar",
    "radio",
    "radiogroup",
    "region",
    "row",
    "rowgroup",
    "rowheader",
    "scrollbar",
    "search",
    "searchbox",
    "separator",
    "slider",
    "spinbutton",
    "status",
    "strong",
    "subscript",
    "superscript",
    "switch",
    "tab",
    "table",
    "tablist",
    "tabpanel",
    "term",
    "textbox",
    "time",
    "timer",
    "toolbar",
    "tooltip",
    "tree",
    "treegrid",
    "treeitem",
  ]);
  return typeof value === "string" && roles.has(value);
}

export default class basePage {
  protected page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async enter(object: LocatorDescriptor, data: string) {
    await this.resolveLocator(object).fill(data, object.actionOptions as any);
    this.logAction("entered", object);
  }

  async click(object: LocatorDescriptor) {
    await this.resolveLocator(object).click(object.actionOptions as any);
    this.logAction("clicked", object);
  }

  async scroll() {}

  //===============================================================================================

  private resolveLocator(object: LocatorDescriptor) {
    if (object.by === "role") {
      return this.getLocatorByRole(object);
    }

    // Heuristic: if the locator field itself is a valid ARIA role, use getByRole
    if (isAriaRole(object.locator)) {
      return this.getLocatorByRole(object);
    }

    // Otherwise treat it as a selector
    return this.page.locator(object.locator, object.locatorOptions as any);
  }

  private logAction(action: string, object: LocatorDescriptor) {
    const desc = this.getLocatorDescription(object);
    console.log(`${action} ${desc ?? object.locator}`);
  }

  getLocatorDescription(object: LocatorDescriptor): string | undefined {
    return object.description;
  }

  private getLocatorByRole(object: LocatorDescriptor) {
    const role = (object.locator as unknown) as AriaRole;
    return this.page.getByRole(role, object.locatorOptions as any);
  }
}
