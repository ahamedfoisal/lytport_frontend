
# Lytport Frontend

### Description
This project is a implementation of the dashboard interface of LytPort, designed to provide insights and analytics of Instagram accounts. It includes key features like displaying important metrics, categorizing post types, and an chat feature to interect with the data. The goal is to enable users to access and analyze their social media performance efficiently and in a easy manner.

### Figma Wireframe 

here is the Figma Wireframe that will our guiding design for this project: https://www.figma.com/design/xPeumwLqvDZixjztKeKrE4/Dashboard-(Community)?node-id=141-204&t=wZyrI3ShDgtxxxa1-1 

We are still working on both the wireframe and the front end to make the users are the best experience. 

### Implemented Components So far
Below is an overview of each main component used in the dashboard:

- **NavBar** (`navBar.js`): Displays navigation links for sections such as Dashboard, Analytics, Content, and Suggestions. It also includes a notifications icon and user profile menu.
- **Metrics** (`metrics.js`): Shows key social media metrics, including Followers, Reach, Impressions, and Posts, along with their numerics and change percentages from the last month.
- **PostTypes** (`postType.js`): Provides a breakdown of different post types (Images, Videos, Carousels, Text, and Stories) with counts for each type of it.
- **ChatWithData** (`chatWithData.js`): An interactive chat box where users can input queries to interact with data, enhancing user engagement with insights.
- **Dashboard** (`dashboard.js`): Serves as the main layout, integrating all components in a well structured format. It displays metrics at the top, arranges post types on right and chat on the left side by side.

### Setup Instructions
1. Clone this repository.
   ```bash
   git clone https://github.com/Danjari/lytport_frontend.git
   ```
2. Install Next.js:
   ```bash
   npm install next react react-dom 
   ```
3. Run the server on your machine:
   ```bash
   npm run dev
   ```
4. Go to `http://localhost:3000` to see the output on your machine.

### Design Decisions
The design emphasizes simplicity and clarity. A navigation bar provides easy access to various sections needed for the users for better experience and understanding. The metrics, post types, and chat sections are on the dashboard page as a group for easier accessibility.
To be implemented: Some infographics that helps visualize the most used and important data.

### Wireframing
Click on the link to view the wireframing of the frontend: [Figma](https://www.figma.com/design/xPeumwLqvDZixjztKeKrE4/Dashboard-(Community)?node-id=0-1&t=KT2NRFHy0y9gE25K-1)

### Technical Choices
- **React**: React was choosen for its component-based architecture, which makes reusability across the application a bit easier.
- **Tailwind CSS**: Tailwind CSS was used for styling due to its utility-first approach that makes it easy to apply consistent design more efficiently and easily.
- **JavaScript**: JavaScrpt enables dynamic interactions within components, such as chat input handling and rendering lists of metrics and post types.

### AI Usage
- Chat GPT : it was used to debug some of the codes and to gather ideas.
- Claude: To generate some parts of the README.

