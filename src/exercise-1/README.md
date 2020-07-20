# SpeedLegal - Tech Interview Coding Test

![preview](./preview.jpg)

1. Create a list of text-areas, with relative labels, one for each of the following sections:

   - Examination
   - Clinical History
   - Technique
   - Impressions

   Add a "Submit" button at the bottom of the page, on click it will `console.log` the text of each of the above fields (`{ examination: 'text', clinicalHistory: 'text', etc... }`);

2. Add a little gray outlined circle near each text-area's label:

   - When a text-area is focused, make the outline white together with its label;
   - When the user proceeds to a different text-area, fill it blue with a check symbol in it and reset the label color;

3. If the user enters a new line in any of the text-areas, the text-area will grow to make all the lines visible. If the user removes a line, the text-area will shrink with it to fit its content;

4. (BONUS POINT) When the "Submit" button is pressed, a little toast notification should appear on the upper-right corner of the page:

   - The text should read _"Your report has been successfully submitted"_;
   - The notification should fade away after 3 seconds;
