# SheRyhs: Menstrual Cycle Tracking and Wellness Application

CycleSage is a comprehensive, user-friendly web application designed to help users track their menstrual cycles, gain insights into their bodies, and receive personalized wellness recommendations. This application is built with a modern tech stack and offers a range of features to support users throughout their cycle.

## Features

  * **Personalized Cycle Tracking**: After an initial setup, the application provides a personalized dashboard showing the current day and phase of the user's cycle.
  * **Interactive Cycle Visualization**: A dedicated page with a cycle wheel and calendar to visualize the different phases of the menstrual cycle.
  * **Daily Journaling**: Users can log their mood, symptoms, and personal notes for each day, with a calendar view to track their entries over time.
  * **Phase-Based Recommendations**: The application offers tailored recommendations for nutrition, exercise, and meditation based on the user's current cycle phase.
  * **Hormonal Horoscope**: A unique feature that provides daily insights into how hormones may be affecting the user's mood and energy levels.
  * **Community Forum**: A space for users to connect, share experiences, and support each other. Users can post in different categories related to mental health, wellness, and cycle support.
  * **User Authentication**: Secure user authentication with login and signup functionality.
  * **Interactive Workout App**: An integrated workout feature with guided exercises, timers, and progress tracking.

## Tech Stack

  * **Frontend**:
      * React
      * Vite
      * TypeScript
      * Tailwind CSS
      * React Router for routing
      * Lucide React for icons
  * **Backend**:
      * Supabase (for database and authentication)

## Project Structure

The project is organized into the following main directories:

  * `src/`: Contains the main source code for the application.
      * `components/`: Reusable UI components.
      * `context/`: React context for managing global state (e.g., user data).
      * `data/`: Static data used in the application (e.g., phase information, recommendations).
      * `hooks/`: Custom React hooks.
      * `lib/`: Supabase client configuration.
      * `pages/`: The main pages of the application.
      * `types/`: TypeScript type definitions.
      * `utils/`: Utility functions.
  * `supabase/`: Supabase configuration and database migrations.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

  * Node.js and npm (or yarn) installed on your machine.
  * A Supabase account and a new project created.

### Installation

1.  **Clone the repo**

    ```sh
    git clone https://github.com/your_username/cyclesage-tracker.git
    ```

2.  **Install NPM packages**

    ```sh
    npm install
    ```

3.  **Set up environment variables**

    Create a `.env` file in the root of the project and add your Supabase project URL and anon key:

    ```env
    VITE_SUPABASE_URL=YOUR_SUPABASE_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

4.  **Run the Supabase migrations**

    Apply the database schema located in `supabase/migrations/` to your Supabase project.

5.  **Run the development server**

    ```sh
    npm run dev
    ```

## Backend

This project uses Supabase for its backend services, including:

  * **Authentication**: Managing user sign-up and login.
  * **Database**: Storing community posts and potentially other user data.

The database schema for the community posts feature is defined in the SQL migration file `supabase/migrations/20250603103305_morning_king.sql`. This schema includes a `community_posts` table with columns for user ID, category, content, phase, and timestamps. Row Level Security (RLS) is enabled to ensure that users can only manage their own posts.
