# Trace Library

`trace` is a lightweight debugging library that visually outlines elements on a webpage and provides a legend bar for easier inspection. It consists of `trace.css` for styling and
`trace.js` for interaction.

## Features

- **Element Tracing**: Outlines different HTML elements with distinct colors for better visibility.
- **File Indicators**: Displays file names on hovered elements with `data-file` attributes.
- **Trace Mode**: Double-click anywhere to toggle tracing on/off.
- **Advanced Mode**: Click while holding `Cmd + Shift` (Mac) or `Ctrl + Shift` (Windows) to toggle additional debugging information.
- **Local Storage Persistence**: Stores the toggle states across sessions.
- **Legend Bar**: Displays a reference for the outline colors.

## Installation

Download `trace.js` and include the following files in your project:

```html
<script src="trace.js" type="module" defer></script>
```

## Usage

1. Load `trace.js` in your HTML file.
2. Double-click to enable trace mode
3. Use `Cmd + Shift + Click` (Mac) or `Ctrl + Shift + Click` (Windows) to enable advanced mode.
4. Hover over elements with a `data-file` attribute to see file annotations

## Demo

The demo uses the demo page from a CSS classless framework comparison [repo](https://github.com/adamerose/compare-classless-css).

In order to run:

```bash
deno task demo
```

## How It Works

### `trace.css`

Defines color-coded outlines for different types of elements:

- **Blocks (div, main, section, etc.)**: Red
- **Headings (h1–h6)**: Grey
- **Images, Icons, SVGs**: Blue
- **Canvas & Video Elements**: Purple
- **File Indicators**: Dark orange with hover effects

### `trace.js`

- Automatically applies the stored trace/advanced mode from `localStorage`.
- Listens for user interactions to toggle debug modes.
- Appends a floating legend bar to the page.

## Example

To mark an element with a file reference, add a `data-file` attribute:

```html
<div data-file="example.html">Some content</div>
```

This will display `example.html` when hovered.

## License

MIT License. Free to use and modify.
