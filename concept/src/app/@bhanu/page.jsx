import React from 'react';

const page = () => {
  return (
    <div>
      this is second parallel route from @bhanu
      <p>
        Each parallel route slot (@bhanu, @team, etc.) must have a default.js
        file. The default.js serves as the fallback component when no specific
        route is matched. This ensures the layout structure remains consistent.
      </p>
      <br />
      <br />
      <br />
      <pre>
        <code>{`
        export default function Layout({ user, admin }) {
            const role = checkUserRole();
            return role === 'admin' ? admin : user; // showing diff page
        }`}</code>
      </pre>
    </div>
  );
};

export default page;
