import Image from 'next/image';

export default function Home() {
  return (
    <div>
      Homepage
      <p>layout.jsx: Defines the shared UI for a segment.</p>
      <p>
        page.jsx: The unique UI of a route, making the folder publicly
        accessible.
      </p>
      <p>loading.jsx: Shows a skeleton UI while a segment loads.</p>
      <p>error.jsx: Defines an error boundary for a segment.</p>
      <p>not-found.jsx: Renders when a segment cannot be found.</p>
      <p>
        route.jsx: Defines an API endpoint (for handling HTTP methods like
        GET/POST).
      </p>
      <p>
        template.jsx: Similar to a layout, but its state is destroyed and
        re-created upon navigation, enabling transition effects.
      </p>
      <p>
        default.jsx: Used with Parallel Routes to render fallback content when a
        slot isn't active or fails to load.
      </p>
    </div>
  );
}
