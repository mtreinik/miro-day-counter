# Miro Day Counter

Day Counter allows you to add an automatically updating day counter to stickers on a [Miro](https://miro.com/) board.

It is a web-plugin that adds a new Day Counter tool to bottom bar:

![bottom bar](https://raw.githubusercontent.com/mtreinik/miro-day-counter/main/docs/bottombar.png)

The plugin can add an automatically updating day counter to stickers:

![using the tool](https://raw.githubusercontent.com/mtreinik/miro-day-counter/main/docs/day-counter.gif)

## Usage

### How to use Day Counter

1. Click on the Day Counter tool at the bottom bar of a Miro board. A dialog opens at the left side of the screen.
1. Select one or multiple stickers on the board
1. Enter a start date for the counter.
1. Optionally add text to show before or after the counter.
1. Click "Insert day counter to selected stickers".

### Key features

- Count days passed since chosen date.
- Show optional message on sticker before or after the counter.
- Select and edit multiple stickers having a day counter.

## Developing the plugin

### Authorization link

The following link is used to ask the user to authorize the plugin to have scopes `board:read` and `board:write`: 

https://miro.com/oauth/authorize/?response_type=token&client_id=3074457351323246950&redirect_uri=https://mikkoreinikainen.fi/2020/miro-day-counter/auth-success.html

### Building

You can build the plugin with these steps:

1. Clone this repo
1. `nvm use`
1. `yarn install`
1. `yarn build`

The app files will be copied to `dist/`

### Dependencies

- `dompurify` is used to sanitize user inputs
- `prettier` is used to formatting the source code 

### Resources

Here are some resources that were used while developing this web-plugin:

- https://developers.miro.com/docs/getting-started
- https://developers.miro.com/docs/web-plugins-features
- https://developers.miro.com/docs/web-plugin-examples
- https://github.com/miroapp/app-examples/tree/master/implicit-flow-example