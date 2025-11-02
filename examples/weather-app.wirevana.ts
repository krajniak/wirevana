import { defineWireframe, render as runtimeRender } from "@wirevana/runtime";

const weatherApp = defineWireframe({
  $schema: "https://wirevana.dev/schemas/v1",
  name: "WeatherDashboard",
  description: "A simple weather dashboard showcasing cards, icons, and basic data display patterns.",
  imports: [
    {
      namespace: "http://schemas.microsoft.com/dotnet/2021/maui",
      description: "MAUI controls for mobile weather app.",
      docUrl: "https://learn.microsoft.com/dotnet/maui/user-interface/controls/",
    },
  ],
  metadata: {
    platforms: ["ios", "android"],
    targetHost: "chatgpt-canvas",
  },
  styleLibrary: {
    styles: {
      "weather-card": {
        surface: "level2",
        colorRole: "primary",
        variant: "elevated",
        platform: "auto"
      },
      "forecast-card": {
        surface: "level1",
        colorRole: "surface",
        platform: "auto"
      },
      "temperature-text": {
        textStyle: "display-large",
        colorRole: "primary",
        platform: "auto"
      },
      "location-text": {
        textStyle: "headline-medium",
        colorRole: "surface",
        platform: "auto"
      },
      "weather-description": {
        textStyle: "body-large",
        colorRole: "surface",
        platform: "auto"
      }
    },
    platform: "auto",
    theme: "light",
    brandColors: {
      primary: "#0ea5e9",
      secondary: "#06b6d4",
      accent: "#0284c7"
    }
  },
  sampleData: {
    currentWeather: {
      location: "San Francisco",
      temperature: 72,
      condition: "Partly Cloudy",
      icon: "cloud-sun",
      humidity: 65,
      windSpeed: 8,
      feelsLike: 75
    },
    forecast: [
      { day: "Today", high: 75, low: 62, condition: "Sunny", icon: "sun" },
      { day: "Tomorrow", high: 73, low: 60, condition: "Cloudy", icon: "cloud" },
      { day: "Wednesday", high: 69, low: 58, condition: "Rain", icon: "cloud-rain" },
      { day: "Thursday", high: 71, low: 59, condition: "Partly Cloudy", icon: "cloud-sun" },
      { day: "Friday", high: 74, low: 61, condition: "Sunny", icon: "sun" },
    ]
  },
  actions: {
    refreshWeather: { type: "command", command: "weather.refresh" },
    changeLocation: { type: "popup", target: "LocationSelector" },
  },
  shell: {
    type: "Shell",
    title: "Weather",
    style: "surface-primary",
  },
  pages: {
    WeatherPage: {
      type: "ContentPage",
      title: "Weather",
      style: "surface-primary",
      layout: {
        type: "VerticalStack",
        spacing: "standard",
        style: "surface-primary",
        children: [
          { component: "CurrentWeatherCard" },
          { component: "WeatherDetailsCard" },
          { component: "ForecastSection" },
        ],
      },
    },
  },
  components: {
    CurrentWeatherCard: {
      type: "Border",
      style: "weather-card",
      props: {
        padding: "loose",
        margin: "standard"
      },
      layout: {
        type: "VerticalStack",
        spacing: "standard",
        children: [
          {
            type: "HorizontalStack",
            spacing: "standard",
            children: [
              {
                type: "VerticalStack",
                spacing: "tight",
                props: { flex: 1 },
                children: [
                  {
                    type: "Label",
                    props: {
                      text: "@sampleData.currentWeather.location",
                      style: "location-text"
                    }
                  },
                  {
                    type: "Label",
                    props: {
                      text: "@sampleData.currentWeather.temperature°F",
                      style: "temperature-text"
                    }
                  },
                  {
                    type: "Label",
                    props: {
                      text: "@sampleData.currentWeather.condition",
                      style: "weather-description"
                    }
                  }
                ]
              },
              {
                type: "Icon",
                props: {
                  name: "@sampleData.currentWeather.icon",
                  size: "xlarge"
                }
              }
            ]
          },
          {
            type: "Button",
            props: {
              text: "Refresh",
              icon: "refresh",
              variant: "tonal"
            },
            interactions: { Clicked: "actions.refreshWeather" }
          }
        ]
      }
    },

    WeatherDetailsCard: {
      type: "Border",
      style: "forecast-card",
      props: {
        variant: "outlined",
        padding: "standard",
        margin: "standard"
      },
      layout: {
        type: "Grid",
        props: { columns: 3, gap: "standard" },
        children: [
          {
            type: "VerticalStack",
            spacing: "tight",
            children: [
              { type: "Label", props: { text: "Feels Like", style: "caption-large" } },
              { type: "Label", props: { text: "@sampleData.currentWeather.feelsLike°F", style: "title-medium" } }
            ]
          },
          {
            type: "VerticalStack",
            spacing: "tight",
            children: [
              { type: "Label", props: { text: "Humidity", style: "caption-large" } },
              { type: "Label", props: { text: "@sampleData.currentWeather.humidity%", style: "title-medium" } }
            ]
          },
          {
            type: "VerticalStack",
            spacing: "tight",
            children: [
              { type: "Label", props: { text: "Wind", style: "caption-large" } },
              { type: "Label", props: { text: "@sampleData.currentWeather.windSpeed mph", style: "title-medium" } }
            ]
          }
        ]
      }
    },

    ForecastSection: {
      type: "VerticalStack",
      spacing: "standard",
      children: [
        {
          type: "Label",
          props: {
            text: "5-Day Forecast",
            style: "headline-small",
            padding: { horizontal: "standard" }
          }
        },
        { component: "ForecastList" }
      ]
    },

    ForecastList: {
      type: "CollectionView",
      props: {
        items: "@sampleData.forecast",
        orientation: "horizontal"
      },
      template: { type: "DataTemplate", component: "ForecastItem" }
    },

    ForecastItem: {
      type: "Border",
      style: "forecast-card",
      props: {
        variant: "outlined",
        padding: "standard",
        margin: { horizontal: "tight" },
        width: 120
      },
      layout: {
        type: "VerticalStack",
        spacing: "tight",
        props: { alignment: "center" },
        children: [
          {
            type: "Label",
            props: {
              text: "{binding day}",
              style: "label-medium"
            }
          },
          {
            type: "Icon",
            props: {
              name: "{binding icon}",
              size: "large"
            }
          },
          {
            type: "Label",
            props: {
              text: "{binding high}°",
              style: "title-medium"
            }
          },
          {
            type: "Label",
            props: {
              text: "{binding low}°",
              style: "body-small",
              opacity: 0.7
            }
          }
        ]
      }
    }
  },
  state: {
    currentLocation: "San Francisco",
    isRefreshing: false
  },
  render: "shell",
  rootComponents: {
    shell: {
      type: "Shell",
      content: "WeatherPage",
      style: "surface-primary"
    }
  },
});

export function renderToCanvas(canvasEl: HTMLElement, context?: any): any {
  runtimeRender(weatherApp);
  console.log("Weather app rendered:", weatherApp.name);
  return weatherApp;
}

export const render = renderToCanvas;

export function renderDebug(canvasEl: HTMLElement) {
  console.log("[wirevana] Debug mode for weather app");
  return weatherApp;
}

export default weatherApp;