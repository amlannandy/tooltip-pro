# TooltipPro

TooltipPro is a web-based tooltip component that provides contextual information on hover or click interactions.

## Table of Contents

1. [Overview](#overview)
2. [Setup Instructions](#setup-instructions)
3. [Using the Component](#using-the-component)
4. [Technologies Used](#technologies-used)
5. [Component Architecture](#component-architecture)
6. [Demonstration](#demonstration)

## Overview

TooltipPro is a flexible UI element that displays additional information when a user hovers over or clicks on a specified element. Key features include:

- `Trigger Type` - The tooltip can be shown based on either "hover" or "click" interactions, determined by the triggerType prop.
  For accessibility, the tooltip can also be closed with the Escape key or by clicking outside when triggerType is set to "click."

- `Positioning and Edge Detection` - The tooltip appears relative to the triggering element and can be positioned on any side (top, bottom, left, right) as specified by the position prop. It dynamically adjusts to stay within the viewport, automatically switching to the opposite side if it’s too close to the edge of the screen. This ensures the tooltip content is always fully visible.

- `Content Customization` - It accepts any content (text, HTML, or React elements) via the content prop, allowing for flexible, custom tooltip messages or elements. A close button is displayed when the tooltip is shown on click, providing users with an intuitive way to dismiss it.

- `Styling and Accessibility` - The component is styled with a smooth opacity transition and includes a close button for easy dismissal.
  It uses appropriate ARIA attributes to ensure the tooltip is screen-reader-friendly and accessible for all users.

## Setup Instructions

- Clone the git repository.

```
git clone https://github.com/amlannandy/tooltip-pro.git
```

- Navigate into the project directory.

```
cd tooltip-pro
```

- Install project dependencies.

```
yarn
```

- Start the project.

```
yarn dev
```

## Using the Component

The component can be used by simply importing it from its source folder.

```
import Tooltip from './Tooltip/Tooltip';
```

While using the components, the following props have to be provided.

- `content` - The text to be displayed on the tooltip.
- `children` - The element around which the tooltip will be wrapped.
- `triggerType` - To determine whether the tooltip should open on `hover` or on `click`.
- `position` - To determine position of the tooltip relative to the element around which it is wrapped. (`top`, `bottom`, `left`, `right`).

## Technologies Used

- `Vite` - A fast, modern build tool optimized for front-end development with React.
- `React` - A JavaScript library for building interactive and dynamic user interfaces, primarily focused on creating reusable UI components.
- `TypeScript` - A strongly-typed superset of JavaScript used to improve development experience and catch errors during compile time.
- `CSS` - A styling language used to define the visual appearance and layout of HTML elements on web pages.

## Component Architecture

The component folder consists of 3 files -

- `Tooltip.tsx` - Containing the main React component.
- `styles.css` - Containing the styling for the component.
- `types.ts` - Containing the types used in the component.

### Structure

The Tooltip component has a straightforward structure:

- `Main Wrapper` - A div with class `tooltip-wrapper` holds both the tooltip trigger and the tooltip content.
- `Trigger Element` - The `tooltip-trigger` div acts as the interactive element that users focus on or hover over to display the tooltip. It contains the children prop, allowing it to render any nested content (like text or icons).
- `Tooltip Content` - Another div with class `tooltip-content` renders the actual tooltip text (`content` prop). It also has dynamic classes and attributes, including an id, a role for screen readers, and dynamic styling based on the tooltip’s position.

### Patterns and Logic

The architecture follows a functional component pattern:

- React Hooks - It leverages useState, useRef, useEffect, and useCallback hooks:
  - `useState` - Manages `isTooltipVisible` and `adjustedPosition`.
  - `useRef` - Holds references to the tooltip and trigger elements to handle DOM interactions.
  - `useEffect` - Handles event listeners for interactions outside the component and updates the tooltip’s position dynamically.
  - `useCallback` - Optimizes event handlers to prevent unnecessary re-renders.
- `Conditional Rendering` - Renders tooltip-content only when `isTooltipVisible` is true.
- `Position Adjustment` - The tooltip’s position (top, bottom, left, or right) is recalculated based on screen boundaries to ensure it doesn’t overflow beyond the viewport.

The component also handles several events to control the tooltip display:

- Mouse and Focus Events:

  - `onMouseEnter`/`onMouseLeave` - for hover-based tooltips.
  - `onFocus`/`onBlur` - to support keyboard navigation in hover mode.
  - `onClick` - for click-based tooltips.

- Keyboard Events:
  - `onKeyDown` allows toggling the tooltip with Enter/Space keys in click mode and hides it on pressing Escape.
- Outside Click Detection:
  - An event listener for mousedown is added/removed based on tooltip visibility, allowing the tooltip to close when clicking outside it.

### Accessibility

To improve accessibility of the component, the following attributes are added -

- `aria-haspopup` - To indicate that the element has a pop-up.
- `aria-expanded` - To show the tooltip's visibility status whenever toggled.
- `aria-describedby` - Links the tooltip trigger to the tooltip content for screen readers.
- `aria-hidden` - To hide the tooltip from screen readers when it is not visible, to prevent it from getting read.
- `aria-live="polite"` - To announce the tooltip content without distrupting other announcements.

`tabIndex={0}` on the trigger element allows keyboard useers to focus on it.

Additionally, extra handlers have been added to toggle the tooltip on `Enter`/`Space` key presses and close it on `Escape` key presses.

## Demonstration

This app is hosted on Netlify and can be checked [here](https://tooltippro.netlify.app/).

https://github.com/user-attachments/assets/933f96cc-46a0-4609-b2a1-d024196f407c
