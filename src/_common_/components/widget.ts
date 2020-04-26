export interface Widget {
    element(...children: HTMLElement[]): HTMLElement;
}

export function element(html: string): HTMLElement {
    const d: HTMLElement = document.createElement("div");
    d.innerHTML = html.trim();
    const f: DocumentFragment = document.createDocumentFragment();
    return f.appendChild(d.removeChild(d.firstChild)) as HTMLElement;
}
