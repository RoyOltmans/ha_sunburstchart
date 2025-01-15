# Sunburst Visualizer

This project provides a custom Home Assistant card that visualizes hierarchical data using a Sunburst chart created with Plotly. The visualization helps in analyzing relationships and structures.

## Features
- Dynamically generates Sunburst charts based on custom data.
- Integrates seamlessly with Home Assistant.
- Visualize hierarchical relationships effectively.

(https://raw.githubusercontent.com/RoyOltmans/ha_sunburstchart/refs/heads/main/sunburst.png))

## Requirements
- **Home Assistant** with Lovelace UI.

## Installation

1. **Add the Custom Card to Home Assistant:**
   - Copy the `sunburst-chart-card.js` file to the `www` directory in your Home Assistant configuration.
   - Add the following to your `ui-lovelace.yaml`:
     ```yaml
     resources:
       - url: /local/sunburst-chart-card.js
         type: module
     ```

2. **Configure the Card:**
   - Add the custom card to your dashboard:
     ```yaml
     type: custom:sunburst-chart-card
     data:
       labels: ["Root", "Category1", "Category2", "Item1", "Item2", "Item3"]
       parents: ["", "Root", "Root", "Category1", "Category1", "Category2"]
       values: [100, 50, 50, 20, 30, 50]
     ```

3. **Restart Home Assistant:**
   - Restart Home Assistant to apply the changes.

## Disclaimer

**Use this tool at your own risk.**

- The authors and contributors of this project are not responsible for any damage, data loss, or issues caused by using this software.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

```
MIT License

Copyright (c) 2025 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Contributions

Contributions are welcome! Please fork the repository and submit a pull request.

## Issues

If you encounter any problems or have suggestions for improvement, please open an issue in this repository.

## Acknowledgments
- [Plotly.js](https://plotly.com/javascript/) for providing the charting library.
- The Home Assistant community for inspiration and support.

