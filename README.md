# P/B Viz

## Background

P/B stands for Price To Book, which is a financial ratio that shows the ratio of how much a company is being valued by the market vs how much it's total assets are actually worth. For example, say you have a company that owns one tractor. This tractor is worth $100,000 dollars if you were to sell it right now. This means your book value is $100,000 (ignoring intangible assets in this case). Now imagine that your tractor company is publicly sold in the open market and investors believe that your tractor will lead to huge revenues which will allow you to buy another tractor in 5 years. Investors are willing to pay for this potential revenue stream and as such, buy your shares in the market until your company ends up being worth $200,000. This is your market value or price. In this example, your tractor company's P/B is 2, since your market value is worth 2 times your book value.

## Overview

The purpose of this project is to visualize how much value the market is placing on companies versus how much their assets are worth. The sample companies for this project are the 500 companies listed on the Standard and Poors 500 index. The visual aspect of this project will help emphasize how large some of these companies are in comparison to their assets, such as Boeing, who has a P/B of approximately 150!

## Functionality and MVP's

- [ ] Display two orbs for every company in the S&P 500, scaled by Market Cap, with the inner orb representing book value and the outer orb representing market value.
- [ ] Have the ability to hover over every orb and be able to see the company name, ticker,industry, actual market value, book value and price to book ratio.
- [ ] Offer a consolidate toggle, which will combine all the orbs to display the entire S&P 500's aggregate book and market value in a large two orb set.
- [ ] Ability to filter out the orbs for each company so you can display only one, and the have the orbs scale to fill the canvas.

## Wireframe

![ ](https://s3-us-west-1.amazonaws.com/pbviz/pb_viz.png)


## Implemented Technologies

This project will be written in Vanilla Javascript and regular HTML5 DOM manipulation. There will be 3 files housing this project:

+ ```company.js``` - This file will have the company class which will take the P/B, market cap and scale as inputs and produce the appropriately scaled orb to be rendered on the canvas.
+ ```render.js``` - This file will hold the rendering logic and order, as well as the logic for filtering and consolidating.
+ ```S&P500_financials.js``` - Holds the financial information being used in the project in JSON format.

## Implementation Timeline

Weekend

- [x] Find source of financial Information
- [x] Write out math for scaling and producing orbs in a logical manner

Day 1
- [ ] Write Company class logic
- [ ] Design company orb for visual appeal
- [ ] Be able to render one instance of company with properly scaled orbs.

Day 2
- [ ] Write logic for rendering all Companies, including:
 * All orbs are rendered within the canvas with no overlap
 * Companies are scaled properly on browser
- [ ] Create filter logic for orbs

Day 3
- [ ] Incorporate hover logic and animations for displaying specific company info
- [ ] Animate entrance, exit and filter for every time they are triggered.

Day 4
- [ ] Write out logic for Consolidating the orbs
- [ ] Write out graphical display and animation for consolidation
- [ ] Write Overview that introduces the User to the concept and what the graphic means.
- [ ] Final touches on styling
