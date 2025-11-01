export default function AboutLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
         <footer>Made by Bhanu Pratap © {new Date().getFullYear()}</footer>
      </body>
    </html>
  );
}
