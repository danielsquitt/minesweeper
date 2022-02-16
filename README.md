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
To win you need to uncover all cells without mines. If you uncover a cell with a mine this will explete and you will lose. To help you, each empty cell has a number that matches the number of mines surrounding the cell.
Controls:
- **Left Click:** Discover the cell.
- **Right Click:** Flag the cell.
- **Left + Right Click:** If number of flags matches the surrounded mines, discover all surrounded cells.

## 6. Packages and dependencies

- **Typescript:** Suport for typescript
- **Lodash:** JS utility library
- **Parcel:** Fast and easy server build
- **Eslint:** Code Styling
- **rimraf:** Execute UNIX cmd "rm -rf" with node.

## 7. Structure
![](https://mermaid.ink/img/pako:eNqVld1O2zAUx18lyhUIuNguuwqJfiAqtaVaJnYTaXLt09TCsSPbaWEdvM4eZC82x3GMHcKkFanBv3Pa8z9f7inFgkA6SjFDSs0oKiQqc55ze05usBbylPPEvMZjyjXIHcJwfd2ii40wLKmEopoKHkFFf4IDdUWQhrNzdyQSHf2hFLWC-QG4Pjv_8zvnL13oKTCWuNAXEyEYIJ7sGCp6aCvKbQ-JA8geIuLYyVvX5RZkwu2j70YVbj4NxBlupETPr42W1wSbd-W44DPnmtVSipoTn9GbySMF-r53nhlBS9jpkN2a7MLzxKTmz5RjCUhBK7_BvlS3m-yBwhG6TvkKe48lHIBlwCDopy_EinJQMdsKJMl3SvR-gN8BLbxhwSuqM0aJsVJe1Tozff_ykXFtY3XmSa21MB20jxuModJDlinipvRDw9MbrHCWguQXVpZV0aXuNCn76JiWlBcJQ1tga1RCnPkBsRoGPB8Cblq2bFgUvU3l9F8jGgaIERZMSD9oU0bxYxQtTtNtomU_qk-D9HOcp8Nhuh9p5ijU3Paijb8RKlK1QtXp3eWweRpAzab9YzzDdSxR5ai9KprtvH9TWAAHaQSZ0H4-JJgOhQDvAT-GQPB5u8leeqtiIp76WzPdoy7W3bfVclGiAuYMSjN9CS2LuG1D5aTcqNX-pqmrmZFrxymY75mbb6_na5NDPFMuhtLG9_0FkHN7iSfjX1dXbhgj1FY8AP42iWiwRBFfNV0Izr5eER34YHQl5dxtvDUFOebuL71MS5AlosT8VtnE81TvTbXzdGT-JbBDNdN5alI2ru0szgk1X52OdogpuExRrUX2zHE60rKGzsn95Dmvl781pVlV)

![](https://mermaid.ink/img/pako:eNqVVt9vmzAQ_lcQT5vWPmyP6V7aJF0rJW1Upu4FqXLgQqwaGxmTtEPt376zMY7t0UkLUuC-O-zvzveDPi1ECeksLRhp2wUllSR1zo2U1ITyPucJ_r5cb7JHCkeQCT5Z7KpTSvCEwQHY8GwVd129BXklXpKacphz9ReuaA3Sog_QIjisJfFZjWu9jUR-kBrWhJMK5MhnTRrk11hppSlkwKBQQg6ERslaZIqocY2k1cLohBAMCNeYVBEGvIyQIw19THaEVW0IFXspuAgxCTqYJeXV0xpDMr6xFl0Lg7utYZjUGrHarikR-vTZiqUkRycYu-UBuHKQiZ0OlUNQzrRbPnDNSBUZeHsMW-pFHO5OYQ6MJX0UkB0uF0FbUW8jSBzcaY9QKY5RKLm5xWa0LfTbMJ7EpZTk9V1zeU8K_B9DKfjCmmadlKLjpXPqpPIdv4_kBRJawe6fwbpC15xMeSGBtDDQD0LlqqWPzs5ZBBnbR4HwU8RiW0Fk-YuWaj-B3wCtnOKWN1RljJaopbzpVEZ_w8VHyjuz10VY0VtzuywKaNSUZk44hn4qLaOUDbPUOX9raBkWo-uWU2turmYlFkzCyBbYHaZk6PmBsA4mLB89HI9spbFg98GV_r9S1N8ghArBXJPByDBaPAe7hW5uBOXKevnUfJ1Ev4V-Wth39yPOnPich7MY9t-INmCF7TOihEmyeZmAdKX9Iz39cjz1Y9MqdHXenxhWwEGaJtyELcsHij0Uzz4g-HKoZEfdDZG4auZ7Mu5183O9uq2x1y8Z1Jh9Ca2r8Nimwkk5slWu03TNAumadPLyexG3xYfTyOrDPfwx4zUAfXkVkHw_P7dZkvNwkGmNZzmlHmelnodaHo5LX3rgJIh4w9OC2s51KA8b13KAC7WHPfgTOufe6ka91jkQg6twIOc8PUtx_uOaJX56mKjlqdrjUeXpDB9L2JGOqTzFeKHpkMjLkuLb6QwnbgtnKemUyF55kc6U7GA0sl8w1urtD7Vw8wQ)