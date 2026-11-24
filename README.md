
# Internet Time Machine

**Travel back in time and explore how websites looked in the past.**

Internet Time Machine is a web application that allows users to revisit archived versions of websites from different years. By entering a website URL and selecting a year, users can discover how the website appeared during that period using historical snapshots preserved by the Internet Archive's Wayback Machine.

The project combines a simple, interactive interface with the Wayback Machine Availability API to make exploring the history of the internet accessible and engaging.

**Live Demo:** https://kritika601.github.io/internet-time-machine/

---

## Features

- **Explore Historical Websites:** Visit archived versions of websites from different years.
- **Interactive Year Selector:** Choose a destination year using an interactive timeline slider.
- **Dynamic Time Machine Interface:** Watch the central year indicator update as you change your selected year.
- **Archive Discovery:** Automatically retrieves the closest available archived snapshot for the selected year.
- **Embedded Website Preview:** Explore archived websites directly within the application.
- **Direct Archive Access:** Open an archived snapshot in a separate browser tab.
- **Loading and Status Feedback:** Get feedback while searching for archived snapshots and loading websites.
- **Responsive Design:** Interface adapts to desktop, tablet, and mobile screen sizes.

## How to Use

1. Open the [Internet Time Machine](https://kritika601.github.io/internet-time-machine/).
2. Enter the URL of the website you want to explore (for example, `www.google.com`).
3. Use the year slider to select a year between 1995 and 2025.
4. Click **Initiate Time Travel**.
5. The application searches the Internet Archive for the closest available snapshot near your selected year.
6. If an archived version is found, it is displayed within the application.
7. Use the external link to open the archived website in a separate tab.

**Note:** The Wayback Machine may return the closest available snapshot rather than an exact match for the selected date. Some archived websites may not load completely because of missing resources, unavailable content, or restrictions imposed by the original website or the archive.

## Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application structure and content |
| CSS3 | Styling, layouts, animations, and responsive design |
| JavaScript (ES6+) | Application logic, event handling, and API integration |
| Wayback Machine Availability API | Finding historical website snapshots |
| Fetch API | Making asynchronous HTTP requests |
| Git & GitHub | Version control and source code hosting |
| GitHub Pages | Free static website hosting |

## API Integration

The application uses the Internet Archive's Wayback Machine Availability API.

**API Endpoint:**

```text
https://archive.org/wayback/available/
```

The application sends the website URL and selected year as query parameters.

Example:

```text
https://archive.org/wayback/available/?url=google.com&timestamp=20050101
```

The API returns information about the closest available archived snapshot, including its URL and capture timestamp.

The application then:

1. Extracts the closest available snapshot from the API response.
2. Retrieves the archived URL and capture date.
3. Displays the archived website using an HTML iframe.
4. Provides a direct link to the archived version.

No API key or paid subscription is required.

## Project Structure

```text
internet-time-machine/
│
├── index.html      # Application structure
├── style.css       # Styling and responsive layouts
├── script.js       # Application logic and API integration
└── README.md       # Project documentation
```

## Skills Demonstrated

This project provided hands-on experience with:

- **Frontend Development:** Building a complete web application using HTML, CSS, and JavaScript.
- **DOM Manipulation:** Selecting and dynamically updating HTML elements using JavaScript.
- **Event Handling:** Managing user interactions through event listeners.
- **Asynchronous JavaScript:** Using async/await and Promises to handle API requests.
- **REST API Integration:** Fetching and processing data from an external API.
- **Error Handling:** Managing unsuccessful requests, missing snapshots, and loading states.
- **Responsive Web Design:** Creating layouts that adapt to different screen sizes.
- **CSS Animations:** Implementing transitions, animated elements, and visual effects.
- **Deployment:** Publishing a static website using GitHub Pages.
- **Debugging:** Identifying and resolving issues across local and deployed environments.

## Limitations

- Archived snapshots are dependent on the availability of captures in the Internet Archive.
- The closest available snapshot may not correspond to the exact year or date selected.
- Some websites may restrict embedding or may not render correctly within an iframe.
- Archived pages may contain broken links, missing images, or unavailable scripts.
- The application currently supports searching within the configured year range of 1995–2025.

## Future Improvements

Potential enhancements include:

- Displaying multiple available snapshots for a selected year.
- Adding a timeline of available capture dates.
- Allowing users to navigate between different snapshots.
- Improving error messages when websites cannot be embedded.
- Adding a random website discovery feature.
- Supporting a wider historical date range.

## Acknowledgements

- [Internet Archive](https://archive.org/) for preserving historical web content.
- [Wayback Machine](https://web.archive.org/) for providing access to archived websites.
- [GitHub Pages](https://pages.github.com/) for free static website hosting.

---

**Built as a hands-on web development project to explore frontend development, API integration, responsive design, and the history of the internet.**
