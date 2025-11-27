🍽️ WastePlate App: The Food Waste Reduction Dashboard

A smart, data-driven mobile application designed to help restaurants, hotels, and canteens drastically reduce food waste, save costs, and minimize environmental impact.

Table of Contents

Introduction

Problem Solved

Key Features

Technology Stack

Installation & Setup

Roadmap & Contributing

1. Introduction

The WastePlate App aims to move food service management beyond anecdotal evidence and into actionable data. By providing a simple interface for staff to log discarded food items, we turn daily waste into valuable business intelligence. Our goal is to create a digital tool that makes sustainability profitable.

2. Problem Solved

Food waste is a major financial and environmental drain on the hospitality industry, particularly in Europe, where disposal costs are high and regulations are tightening.

Financial Leakage: Businesses often lose 5-15% of their food budget to preventable waste (spoilage, overproduction, plate scrapings).

Lack of Visibility: Kitchen staff usually track waste manually (if at all), resulting in inaccurate data that management cannot use to adjust purchasing or menu sizing.

WastePlate App provides:

Real-time Metrics: Pinpoint exactly what is being wasted, when, and why.

Actionable Insights: Use the data to optimize ordering, reduce labor costs, and prevent inventory spoilage.

3. Key Features

The application is structured around a simple data capture process and a powerful analytics dashboard.

A. Mobile Data Capture (For Kitchen Staff)

Quick Log Interface: Staff can log waste in under 5 seconds by selecting categories (e.g., "Prep Waste," "Spoilage," "Plate Scraps").

Volume Tracking: Input weight (grams/kilograms) or volume (containers) quickly.

Customizable Categories: Define specific waste items (e.g., "Potato Peelings," "Uneaten Rice") relevant to the restaurant's menu.

B. Management Dashboard (Web/Admin)

Cost Analysis: Translates logged waste into a clear financial cost (e.g., "We lost €500 to food waste this month").

Trend Identification: Visual charts showing waste spikes by Day of Week (Was Tuesday worse than Friday?) and Meal Period (Was lunch worse than dinner?).

Performance Benchmarking: Compare waste reduction targets across different kitchen shifts or restaurant branches.

4. Technology Stack

WastePlate is built using a modern, scalable, and cross-platform architecture.

Category

Technology

Purpose

Frontend/Mobile App

React / React Native

Single codebase for iOS, Android, and Web interfaces.

Styling

Tailwind CSS

Rapid, utility-first styling for a clean, professional look.

State Management

React Hooks (useState/useContext)

Local state management and simplified data flow.

Backend/Database

Firebase Firestore

Real-time, scalable NoSQL database for structured data logging (Waste Reports, User Authentication).

API Endpoints

Planned: Firebase Cloud Functions

To handle complex calculations and automated report generation.

5. Installation & Setup

To run this project locally, please follow these steps.

Prerequisites

Node.js (v18+)

npm (or yarn)

A Firebase Project (for the database)

Step 1: Clone the Repository

git clone [https://github.com/Maame-codes/wasteplate_app.git](https://github.com/Maame-codes/wasteplate_app.git)
cd wasteplate_app

Step 2: Install Dependencies

npm install

# or

yarn install

Step 3: Configure Firebase

Create a file named .env in the root directory.

Populate it with your Firebase configuration details:

# .env file

REACT_APP_FIREBASE_API_KEY="YOUR_API_KEY"
REACT_APP_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
REACT_APP_FIREBASE_PROJECT_ID="wasteplate-app-id"
REACT_APP_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="YOUR_SENDER_ID"
REACT_APP_FIREBASE_APP_ID="YOUR_APP_ID"

Step 4: Run the Application

npm start

# The app will open in your browser at http://localhost:3000

6. Roadmap & Contributing

This project is currently in the MVP (Minimum Viable Product) stage. We welcome all contributions!

Immediate Roadmap Goals

Advanced Analytics: Implement charting for waste-by-cost visualization.

User Roles: Differentiate views for "Staff" (Log only) and "Manager" (Dashboard view).

Offline Mode: Enable logging of data even without an internet connection (syncing when back online).

How to Contribute

Fork the repository.

Create your feature branch (git checkout -b feature/AmazingFeature).

Commit your changes (git commit -m 'Add some AmazingFeature').

Push to the branch (git push origin feature/AmazingFeature).

Open a Pull Request.

Please ensure your code adheres to standard React best practices and includes thorough comments.

License: MIT License. See LICENSE for more information.

👨‍💻 Credits
Built by: Maame Afua A.P Fordjour
