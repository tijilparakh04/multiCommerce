# multiCommerce
BarGain Bot

Project Overview
![Screenshot 2024-07-28 at 19-36-57 BargainBot](https://github.com/user-attachments/assets/1c0f0a41-db96-4c51-8bd1-58674961a09a)


The goal of this project is to create a unified platform for comparing and displaying products from multiple e-commerce websites, specifically Amazon, Flipkart, Reliance Digital and Vijay Sales. The platform aims to enhance the shopping experience by consolidating product information from different sources, allowing users to see all available options for a particular product in one place.

Key Features
![Screenshot 2024-07-28 at 19-38-28 BargainBot](https://github.com/user-attachments/assets/5520d080-e68a-4f36-bc63-c8022f835bd3)

Web Scraping

The platform uses Puppeteer, a Node.js library, to scrape product data from Amazon, Flipkart, and Vijay Sales. The data includes product URLs, titles, prices, and images.

Data Aggregation

Products from different websites are aggregated and displayed under a single title if they match. This prevents duplication and provides a comprehensive view of all available options.

User Interface 

 A React-based frontend allows users to search for products and view the aggregated results. Each product is displayed with links to its respective pages on the different e-commerce websites, along with their prices.
 
![Screenshot 2024-07-28 at 19-37-07 BargainBot](https://github.com/user-attachments/assets/4d52294f-6eb1-438b-bf52-b86c89fee298)

Technical Components

Backend (Node.js with puppeteer)

Web Scraping Functions: Functions to scrape product data from Amazon, Flipkart, Reliance Digital and Vijay Sales.

Data Handling: Aggregates the data to group identical products from different sources.

 API Endpoint: Provides an endpoint to serve the aggregated product data to the frontend.

Frontend (React)

Search Functionality: Allows users to input a search term to find products.

 Display Products: Shows aggregated products with links and prices from different websites.

 Grouped Display: Ensures that identical products are grouped together under a single title with multiple links.

Detailed Description

Web Scraping

Amazon: The scraper navigates to the search results page on Amazon and extracts the product title, price, URL, and image.

Flipkart: Similarly, the scraper collects product data from Flipkart.

Vijay Sales: The scraper gathers product information from Vijay Sales.

Data Aggregation

- Products are grouped based on their titles to ensure that identical products are displayed together.

- For each unique product title, the platform lists links and prices from all available websites.

User Interface

- Users enter a search term to look for products.

- The platform displays a list of products, each with multiple links to the respective e-commerce websites.

- Each product shows the platform name (Amazon, Flipkart, Vijay Sales) and the respective price.

Example Workflow

1. User Search: A user searches for "iPhone 15 128GB".

2. Backend Processing: The backend scrapes Amazon, Flipkart, and Vijay Sales for the search term.

3. Data Aggregation: The backend aggregates the data and groups identical products.

4. Frontend Display: The frontend displays the grouped products, with each group containing links to Amazon, Flipkart, and Vijay Sales along with their prices.

Challenges and Solutions

- Inconsistent Data: Different websites might have slightly different titles for the same product. The aggregation logic should handle such inconsistencies.

- Dynamic Content Loading: Websites like Amazon and Flipkart load content dynamically, requiring the scraper to wait for the content to fully load before extracting data.

- Error Handling: Robust error handling is essential to manage network issues, changes in website structure, and other potential problems during scraping.

Future Enhancements

- Additional Websites: Expand the platform to include more e-commerce websites.

- Price Tracking: Implement price tracking and alerts to notify users when prices drop.

- User Accounts: Allow users to save their favorite products and receive personalized recommendations.

This project aims to simplify online shopping by providing a one-stop solution for product comparison, making it easier for users to find the best deals across multiple e-commerce platforms
