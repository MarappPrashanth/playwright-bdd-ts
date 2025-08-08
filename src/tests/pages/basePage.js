"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isAriaRole(value) {
    const roles = new Set([
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
class basePage {
    constructor(page) {
        this.page = page;
    }
    async enter(object, data) {
        await this.resolveLocator(object).fill(data, object.actionOptions);
        this.logAction("entered", object);
    }
    async click(object) {
        await this.resolveLocator(object).click(object.actionOptions);
        this.logAction("clicked", object);
    }
    async scroll() { }
    //===============================================================================================
    resolveLocator(object) {
        if (object.by === "role") {
            return this.getLocatorByRole(object);
        }
        // Heuristic: if the locator field itself is a valid ARIA role, use getByRole
        if (isAriaRole(object.locator)) {
            return this.getLocatorByRole(object);
        }
        // Otherwise treat it as a selector
        return this.page.locator(object.locator, object.locatorOptions);
    }
    logAction(action, object) {
        const desc = this.getLocatorDescription(object);
        console.log(`${action} ${desc ?? object.locator}`);
    }
    getLocatorDescription(object) {
        return object.description;
    }
    getLocatorByRole(object) {
        const role = object.locator;
        return this.page.getByRole(role, object.locatorOptions);
    }
}
exports.default = basePage;
