# Miro Day Counter

This is a web-plugin that adds a new Day Counter tool to bottom bar of a [Miro](https://miro.com/) board:

![bottom bar](https://raw.githubusercontent.com/mtreinik/miro-day-counter/main/docs/bottombar.png)

The tool can add an automatically updating day counter to stickers:

![using the tool](https://raw.githubusercontent.com/mtreinik/miro-day-counter/main/docs/day-counter.gif)

## Building

You can build the plugin with these steps:

1. Clone this repo
1. `nvm use`
1. `yarn install`
1. `yarn build`

The app files will be copied to `dist/`

## Dependencies

- `dompurify` is used to sanitize user inputs
- `prettier` is used to formatting the source code 

## Resources

Here are some resources that were used while developing this web-plugin:

- https://developers.miro.com/docs/getting-started
- https://developers.miro.com/docs/web-plugins-features
- https://developers.miro.com/docs/web-plugin-examples