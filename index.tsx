
import React from 'react';
import ReactDOM from 'react-dom/client';
import Auth from './Auth';

function initializeReactApp(event?: MouseEvent) {
  event?.preventDefault();
  const frontpageContainer = document.getElementById('frontpage-container');
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    throw new Error("Could not find root element to mount to");
  }

  // Hide frontpage, show app container
  if (frontpageContainer) {
    frontpageContainer.classList.add('hidden');
  }
  rootElement.classList.remove('hidden');

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Auth />
    </React.StrictMode>
  );
}

// Attach listeners to the Get Started and SignIn buttons in the static HTML
document.getElementById('get-started-btn')?.addEventListener('click', initializeReactApp as EventListener);
document.getElementById('signin-btn')?.addEventListener('click', initializeReactApp as EventListener);

// If the user is already authenticated (e.g., from a previous session),
// skip the landing page and immediately initialize the app.
if (localStorage.getItem('isAuthenticated') === 'true') {
    initializeReactApp();
}