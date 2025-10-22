// src/App.jsx
import React from 'react';
import {
    BrowserRouter as Router, // Use this once at the root
    Routes,
    Route,
    Link, // Used for navigation links
} from 'react-router-dom';
import {Members, Events} from './dist/react_form.js';

const NavBar = () => {
    return (
        <nav style={{ padding: '10px', backgroundColor: '#333' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex' }}>
                <li style={{ marginRight: '20px' }}>
                    {/* Link to the root path, which we'll set as MembersScreen */}
                    <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                        Members
                    </Link>
                </li>
                <li>
                    {/* Link to the /events path */}
                    <Link to="/events" style={{ color: 'white', textDecoration: 'none' }}>
                        Events
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

const App = () => {
    return (
        <Router>
            <NavBar />
            <main style={{ padding: '20px' }}>
                {/* The <Routes> component looks at the current URL and renders
          the first <Route> that matches the path.
        */}
                <Routes>
                    {/* Default path '/' renders the MembersScreen */}
                    <Route path="/" element={<Members />} />

                    {/* Path '/events' renders the EventsScreen */}
                    <Route path="/events" element={<Events />} />

                    {/* Optional: Add a 404/Not Found page */}
                    <Route path="*" element={<h1>404 - Page Not Found</h1>} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;