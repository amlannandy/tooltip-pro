# TooltipPro

This app is hosted on Netlify and can be checked [here](https://tooltippro.netlify.app/).

### Using the Component

The component can be used by simply importing it from its source folder.

```
import Tooltip from './Tooltip/Tooltip';
```

While using the components, the following props have to be provided.

- `content` - The text to be displayed on the tooltip.
- `children` - The element around which the tooltip will be wrapped.
- `triggerType` - To determine whether the tooltip should open on `hover` or on `click`.
- `position` - To determine position of the tooltip relative to the element around which it is wrapped. (`top`, `bottom`, `left`, `right`).
