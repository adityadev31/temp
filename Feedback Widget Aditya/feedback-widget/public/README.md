# Feedback Widget

A lightweight, embeddable JavaScript feedback widget that allows users to submit responses to predefined questions.

## Features
- Fetches and displays feedback questions dynamically
- Supports Yes/No, Rating, and Description answer types
- Fully customizable via `window.FeedbackWidgetConfig`
- Simple integration via a script tag

## Installation
Include the script from the CDN in your HTML page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feedback Widget Demo</title>
</head>
<body>
    <h2>Test Page for Feedback Widget</h2>
    <script src="https://cdn.jsdelivr.net/gh/annuraag28/feedback-widget@latest/feedback-widget.js"></script>
</body>
</html>
```

## Usage
Simply include the script on any page where you want the feedback widget to appear. By default, it fetches questions from:

```
http://localhost:8080/api/v1/questions/published
```

and submits responses to:

```
http://localhost:8080/api/v1/feedbacks/
```

## Configuration
You can override the default configurations by defining `window.FeedbackWidgetConfig` before including the script:

```html
<script>
  window.FeedbackWidgetConfig = {
    fetchQuestionsEndpoint: "https://your-api.com/api/questions",
    submitEndpoint: "https://your-api.com/api/feedbacks",
    buttonColor: "#ff5722",
    textColor: "#fff",
    backgroundColor: "#f5f5f5",
  };
</script>
<script src="https://cdn.jsdelivr.net/gh/annuraag28/feedback-widget@latest/feedback-widget.js"></script>
```

## How It Works
1. The widget creates a floating **Feedback** button on the page.
2. Clicking the button opens a popup with dynamically loaded feedback questions.
3. Users answer the questions and submit their feedback.
4. Responses are sent via a `POST` request to the configured API endpoint.

## Question Types Supported
- **Yes/No** → Users select either "Yes" or "No".
- **Rating** → Users select a rating between 1 and 5 stars.
- **Description** → Users can type a free-text response.

## API Response Format
The widget expects the API to return questions in the following format:

```Sample json
{
  "success": true,
  "data": [
    {
      "_id": "12345",
      "questionText": "Did you find this helpful?",
      "type": "yesNo"
    },
    {
      "_id": "67890",
      "questionText": "Rate your experience:",
      "type": "rating"
    }
  ]
}
```

## Submitting Feedback
When a user submits feedback, the widget sends a `POST` request to the `submitEndpoint` with the following payload:

```Sample json
{
   "questions": [
    {
      "questionText": "Did you enjoy our experience?",
      "type": "yesNo",
      "yesNoAnswer": true,
      "published": true,
      "_id": "67cd3080ad850e41a75b3b0c",
      "createdAt": "2025-03-09T06:09:04.483Z",
      "updatedAt": "2025-03-09T06:09:04.483Z"
    }
  ]
}
```