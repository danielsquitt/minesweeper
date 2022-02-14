# MINESWEEPER

<p align="center">
<img src="readme_assets/overview.jpg" alt="Overview" width="500"/>
</p>

## 1. Introduction

Minesweeper is a one player game created by Curt Johnson y Robert Donner in 1989. The game ends when you discover all de mines without detonating any of them. To accomplish this objective, the board gives clues about how many bombs there are around.

This game showed up, for the first time in Windows, in 1990 with Windows 3.1. Different version of these games has been included in all standard Windows until Windows 8 (2012) and later. But you can download it from the Microsoft Store

## 2. Motivation

Minesweeper is a game that is fast to play, where you have to think, deduct, and guess. I've been playing it since my childhood on all Windows versions and it's currently the only game I got install in mobile phone.

## 3. Installation

1. Downloading the project

   - Clone git repository

   ```bash
   git clone https://github.com/danielsquitt/minesweeper.git
   ```

   - Download as a zip and unzip. [Click here](https://github.com/danielsquitt/minesweeper/archive/refs/heads/main.zip)

2. Install dependencies
   ```bash
   yarn install
   ```

## 4. Play the game:

- Local:

```bash
   yarn run play
```
- [Github Pages](https://danielsquitt.github.io/minesweeper/)
- [Heroku](https://mineseewper.herokuapp.com/)

## 5. Instructions
To win you need to uncover all cells without mines. To help you, each empty cell has a number that matches the number of mines surrounding the cell.
Controls:
- **Left Click:** Discover the cell.
- **Right Click:** Flag the cell.
- **Left + Right Click:** If number of flags matches the surrounded mines, discover all surrounded cells.

## 6. Packages and dependencies

- **Typescript:** Suport for typescript
- **Lodash:** JS utility library
- **Parcel:** Fast and easy server build
- **Eslint:** Code Styling

## 7. Structure
[![](https://mermaid.ink/img/pako:eNpVkE1qw0AMha8itEohvoAXhcZOsgmk0Ow8WQiPnBmS-WEsU4Ltu3ccU2i1kt77nhAasQ2ascRbomjgUisPuT6ayiTbi6P-CkXxPh1ZwAXPzwl2m2OA3oQYrb-9rfxugaAaTwvGIMb6-7xa1St_9jxB3ZwoSojXv87lO0ywb-ynyev_OyZxTh2ajsqOipYSVJReCG7RcXJkdT59XBSFYtixwjK3mjsaHqJQ-TmjQ9QkvNdWQsJS0sBbpEHC19O3v_PK1JbyI9wqzj8k-lxH)](https://mermaid.live/edit#pako:eNpVkE1qw0AMha8itEohvoAXhcZOsgmk0Ow8WQiPnBmS-WEsU4Ltu3ccU2i1kt77nhAasQ2ascRbomjgUisPuT6ayiTbi6P-CkXxPh1ZwAXPzwl2m2OA3oQYrb-9rfxugaAaTwvGIMb6-7xa1St_9jxB3ZwoSojXv87lO0ywb-ynyev_OyZxTh2ajsqOipYSVJReCG7RcXJkdT59XBSFYtixwjK3mjsaHqJQ-TmjQ9QkvNdWQsJS0sBbpEHC19O3v_PK1JbyI9wqzj8k-lxH)