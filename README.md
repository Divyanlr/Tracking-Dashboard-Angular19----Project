# Tracking-Dashboard-Angular19----Project

Angular-based web application for tracking individuals on a map


Overview

A sleek Angular app built to track individuals’ locations in real-time with a user-friendly and accessible interface. I designed the UI/UX in Figma to ensure a clean, intuitive experience, then brought it to life using modern Angular practices. 

The app features a Leaflet map, a sidebar for navigation, and a settings page, all powered by TypeScript and RxJS for smooth, reactive interactions. Currently, it uses mock data for individuals, with plans to add real-time API support.


Features

    • Map View: Shows individuals as circular markers on a Leaflet map, green for “safe,” red for “needs attention.” The map starts centered. Click a marker to zoom in (zoom 15), view a popup with name and status, or see a pulsing animation for the selected marker.
    
    • Sidebar: Lets you filter individuals by name, select them to zoom on the map, toggle dark mode, or jump to the settings page via a handy link.
    
    • Settings Page: A point for app customization, ready to expand with features like theme options or data settings.
    
    • Responsive Design: Works seamlessly on mobile aswell.
    
    • Mock Data: Simulates 8 individuals across German cities using mock-data.json.


Prerequisites

To run this project, you’ll need:
    
    • Node.js (version 16 or higher)
    
    • npm (version 8 or higher)
    
    • Angular CLI (version 18 or higher),  npm install -g @angular/cli


Dependencies

Here are the core tools I used please check package.json for the full list:
    
    • @angular/core: Powers the Angular framework for components and logic.
    
    • leaflet: Drives the interactive map with OpenStreetMap tiles.
    
    • rxjs: Handles reactive data updates, like marker selections.
    
    • @angular/router: Manages navigation between the dashboard and settings.
    
    • @angular/forms: Supports the sidebar’s filtering input.


Component Details

    1. AppComponent:
    
        ○ Acts as the app’s foundation, setting up the layout and routing.
    
        ○ Shows a header and a <router-outlet> to load other components like Dashboard or Settings.
    
    2. DashboardComponent:
    
        ○ Serves as the main view, bringing together the sidebar and map.
    
    3. SidebarComponent:
    
        ○ Handles navigation and individual selection.
    
        ○ Offers a dark mode toggle, a settings link with a gear icon to /settings, and a list for filtering individuals. Clicking an individual zooms the map to their spot. 
    
    4. MapComponent:
    
        ○ Displays individuals’ locations on an interactive map.
        
        ○ Plots green/red circular markers, and adds popups and a pulse animation when clicked.
    
    5. SettingsComponent:
        
        ○ Provides a placeholder for app settings.
        
        ○ Shows a simple “Settings” header, designed for future additions like theme switches or API configs. Reached via the sidebar link.

    6. Models (individual.model.ts):

        ○ Defines the structure for individual data.

        ○ An Individual interface with fields like id, name, location (latitude/longitude), status, lastUpdated, and showInSidebar.

    7. Data (mock-data.json):

        ○ Supplies mock data for testing.


Setup Instructions

    1. Clone the repo: git clone https://github.com/<your-username>/web-based-tracking-dashboard.git

    2. Install dependencies: npm install

    3. Add Leaflet: npm install leaflet @types/leaflet

    4. Start the app at http://localhost:4200 : ng serve --open 


Running the Application

    • Use ng serve --open to test locally.


Notes

    • I used Figma to design a clean, accessible UI/UX, focusing on intuitive navigation and visual cues (e.g., color-coded markers, animated pulses).
