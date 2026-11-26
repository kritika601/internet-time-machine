
# Internet Time Machine

**Travel back in time and explore how websites looked in the past.**

Internet Time Machine is a web application that allows users to revisit archived versions of websites from different years. By entering a website URL and selecting a year, users can explore historical snapshots preserved by the Internet Archive's Wayback Machine.

**Live Demo:** https://kritika601.github.io/internet-time-machine/

---

## Features

- **Explore Historical Websites:** Enter any website URL and select a year to discover its archived versions.
- **Multiple Snapshots:** Retrieve multiple archived captures from the selected year instead of just the closest available snapshot.
- **Interactive Archive Timeline:** Browse available captures through a visual monthly timeline.
- **Date-Based Navigation:** Select a timeline marker to load the corresponding archived version.
- **Live Preview:** View archived websites directly within the application using an embedded iframe.
- **Direct Access:** Open the selected archived snapshot in a new browser tab.
- **Responsive Design:** Interface adapts to different screen sizes.

---

## How to Use

1. Open the [Internet Time Machine](https://kritika601.github.io/internet-time-machine/).
2. Enter the URL of the website you want to explore.
3. Select a year using the year slider.
4. Click **Travel Back in Time**.
5. Wait for the application to retrieve available archived captures.
6. Browse the interactive timeline and select a month.
7. Explore the selected archived version in the preview window.

---

## Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling, animations, and responsive layout |
| JavaScript | Application logic and dynamic UI updates |
| Fetch API | Making asynchronous API requests |
| Wayback Machine CDX API | Retrieving historical website snapshots |
| Cloudflare Workers | Proxying API requests and handling CORS |
| GitHub Pages | Hosting and deployment |

---

## API Integration

This project uses the **Internet Archive's Wayback Machine CDX Server API** to retrieve historical snapshots of websites.

### CDX Server API

The API endpoint used is:

`https://web.archive.org/cdx/search/cdx`

The request includes parameters such as:

- `url`: Website whose archived versions are requested.
- `from` and `to`: Define the year to search within.
- `output=json`: Requests the response in JSON format.
- `fl=timestamp,original,statuscode`: Specifies the fields returned.
- `filter=statuscode:200`: Filters for successful captures.
- `collapse=timestamp:6`: Groups captures by day, helping reduce duplicate entries.
- `limit=100`: Limits the number of returned records.

The API returns a list of archived captures, including their timestamps, original URLs, and HTTP status codes.

### Cloudflare Worker Proxy

To handle cross-origin restrictions (CORS) when accessing the CDX API from the browser, the project uses a Cloudflare Worker as a lightweight API proxy.

The Worker:

1. Receives the website URL and selected year from the frontend.
2. Validates the request parameters.
3. Constructs a request to the Wayback Machine CDX API.
4. Fetches the archived snapshot data.
5. Returns the response with appropriate CORS headers.

This allows the frontend to communicate with the archive API without making the CDX request directly from the browser.

---

## Application Workflow

1. The user enters a website URL and selects a year.
2. JavaScript sends a request to the Cloudflare Worker.
3. The Worker retrieves matching archived captures from the CDX API.
4. The frontend processes the returned JSON data.
5. JavaScript dynamically generates an interactive timeline using the available captures.
6. Selecting a timeline marker loads that particular archived version into the iframe.
7. The user can also open the selected snapshot directly in a new tab.

---

## Project Structure

```text
internet-time-machine/
│
├── index.html       # Application structure
├── style.css        # Styling and responsive design
├── script.js        # Application logic and API integration
└── README.md        # Project documentation
```

The Cloudflare Worker is deployed separately and acts as the backend proxy for the application. Its code is present in the ext folder for reference.

---

## Learning Outcomes

This project provided hands-on experience with:

- Building interactive web applications using HTML, CSS, and JavaScript.
- DOM manipulation and dynamic element creation.
- Handling user input and browser events.
- Asynchronous JavaScript using `async/await`.
- Making API requests using the Fetch API.
- Working with REST APIs and JSON responses.
- Understanding CORS and cross-origin requests.
- Building and deploying serverless functions using Cloudflare Workers.
- Implementing responsive layouts and CSS animations.
- Deploying a static website using GitHub Pages.
- Debugging API integration and frontend issues.

---

## Limitations

- Archived snapshots are available only when the Internet Archive has crawled and preserved the website.
- Some years may have no archived captures.
- The number of available snapshots varies depending on the website and year.
- Archived websites may not render perfectly because some resources, scripts, or images may no longer be available.
- Some websites restrict embedding in iframes, so they may not display correctly within the application.
- The application depends on the availability of the Internet Archive CDX API and the Cloudflare Worker.

---

## Future Improvements

- Allow users to explore snapshots at a more detailed level, including exact capture dates and times.
- Improve the timeline with more detailed date navigation.
- Add a random website discovery feature.
- Expand the selectable year range.
- Improve error handling for websites that cannot be displayed in an iframe.
- Allow users to compare archived versions from different years side by side.

---

## Acknowledgements

- [Internet Archive](https://archive.org/) for preserving historical versions of websites.
- [Wayback Machine](https://web.archive.org/) for providing access to archived web pages.
- [Cloudflare Workers](https://workers.cloudflare.com/) for serverless request handling.
- [GitHub Pages](https://pages.github.com/) for hosting the application.

---

**Built as a hands-on project to explore web development, APIs, and the history of the internet.**
