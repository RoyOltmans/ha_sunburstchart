class SunburstChartCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hass = null;
    this._config = null;
  }

  set hass(hass) {
    this._hass = hass;
    if (this._config && this.shadowRoot) {
      this._updateChart();
    }
  }

  setConfig(config) {
    if (!config.data) {
      throw new Error("You must define 'data' for the Sunburst chart.");
    }

    this._config = config;

    // Inject Plotly script if not already loaded
    if (!window.Plotly) {
      const script = document.createElement("script");
      script.src = "https://cdn.plot.ly/plotly-2.24.1.min.js";
      script.type = "text/javascript";
      script.onload = () => this._renderChart();
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
        }
        #chart {
          width: 100%;
          height: 100%;
        }
      </style>
      <div class="sunburst-container">
        <div id="chart"></div>
      </div>
    `;

    const chartContainer = this.shadowRoot.getElementById("chart");
    const { labels, parents, values } = this._config.data;

    const data = [
      {
        type: "sunburst",
        labels: labels,
        parents: parents,
        values: values,
        branchvalues: "total",
        textinfo: "label+value",
      },
    ];

    const layout = {
      margin: { t: 0, l: 0, r: 0, b: 0 },
    };

    Plotly.newPlot(chartContainer, data, layout);
  }

  _updateChart() {
    const chartContainer = this.shadowRoot.getElementById("chart");
    if (chartContainer) {
      Plotly.react(chartContainer, this._prepareData(), { margin: { t: 0, l: 0, r: 0, b: 0 } });
    }
  }

  _prepareData() {
    const { labels, parents, values } = this._config.data;
    return [
      {
        type: "sunburst",
        labels,
        parents,
        values,
        branchvalues: "total",
        textinfo: "label+value",
      },
    ];
  }

  getCardSize() {
    return 4;
  }
}

customElements.define("sunburst-chart-card", SunburstChartCard);
