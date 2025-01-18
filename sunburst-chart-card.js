class SunburstChartCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hass = null;
    this._config = null;
    this._lastPreparedData = null;
  }

  set hass(hass) {
    if (this._hass !== hass) {
      this._hass = hass;
      if (this._config && this.shadowRoot) {
        if (this.shadowRoot.getElementById("chart")) {
          this._updateChart();
        }
      }
    }
  }

  setConfig(config) {
    if (!config.data) {
      throw new Error("You must define 'data' for the Sunburst chart.");
    }

    this._config = config;

    if (!window.Plotly) {
      const script = document.createElement("script");
      script.src = "/local/plotly.min.js"; // Use locally hosted Plotly
      script.type = "text/javascript";
      script.onload = () => this._renderChart();
      script.onerror = () => console.error("Failed to load Plotly.js");
      document.head.appendChild(script);
    } else {
      this._renderChart();
    }
  }

  _renderChart() {
    if (!this._config) return;

    this.shadowRoot.innerHTML = `
      <style>
        .sunburst-container {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
        #chart {
          width: 100%;
          height: 100%;
        }
        .version-label {
          position: absolute;
          bottom: 10px;
          right: 10px;
          font-size: 12px;
          color: gray;
          font-family: Arial, sans-serif;
        }
      </style>
      <div class="sunburst-container">
        <div id="chart"></div>
        <div class="version-label">Version 0.1.0</div>
      </div>
    `;

    const chartContainer = this.shadowRoot.getElementById("chart");
    const data = this._prepareData();

    const layout = {
      margin: { t: 0, l: 0, r: 0, b: 0 },
      uniformtext: { minsize: 10, mode: "hide" },
      transition: {
        duration: 500, // Smooth animation for interactions
        easing: "cubic-in-out", // Smooth easing function
      },
    };

    const config = {
      staticPlot: false,
      scrollZoom: true,
      editable: true,
    };

    Plotly.newPlot(chartContainer, data, layout, config);
  }

  _updateChart() {
    console.log("Updating chart...");
    const chartContainer = this.shadowRoot.getElementById("chart");
    if (chartContainer) {
      const newData = this._prepareData();
      const layout = {
        margin: { t: 0, l: 0, r: 0, b: 0 },
        uniformtext: { minsize: 10, mode: "hide" },
        transition: {
          duration: 10500, // Smooth animation for updates
          easing: "cubic-in-out", // Smooth easing function
        },
      };

      Plotly.react(chartContainer, newData, layout); // Ensure animations during updates
    }
  }

  _prepareData() {
    if (!this._lastPreparedData) {
      const { labels, parents, values } = this._config.data;
      this._lastPreparedData = [
        {
          type: "sunburst",
          labels,
          parents,
          values,
          branchvalues: "total",
          textinfo: "label+value+percent",
          insidetextorientation: "horizontal", // Fixed horizontal orientation
        },
      ];
    }
    return this._lastPreparedData;
  }

  getCardSize() {
    return 4;
  }
}

customElements.define("sunburst-chart-card", SunburstChartCard);

// Version 0.0.3: Updated to use locally hosted Plotly library to ensure compatibility with mobile apps.
// Version 0.0.4: Addressed floating labels by adding uniformtext and auto text orientation.
// Version 0.0.5: Improved text display with percentages and refined label alignment.
// Version 0.0.6: Removed all text labels to resolve floating label issues.
// Version 0.0.7: Merged animations, text alignment, and reactive updates with persistent data.
// Version 0.1.0: Incremented version to reflect stable updates and label improvements.
