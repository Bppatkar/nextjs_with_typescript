import React from 'react';

const page = () => {
  return (
    <div>
      this is paralle route from @team
      <p>
        we can show diff page based on diff condition using @ like in
        app/page.jsx
      </p>
      <p>@team/ page.jsx </p>
      <p>@analytics/page.jsx</p>
      <p>and we have access it in layout.jsx</p>
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
