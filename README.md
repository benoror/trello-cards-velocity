# Trello Cards Velocity Tracker

At [Nimbo X](http://www.nimbo-x.com/) we use Trello to keep track of our kanban development pipeline.

We needed a way to track the card velocity/cadence of our development team. Unfortunately most existing products weren't free and offered much more functionality. The ones free were outdated or mediocre at best.

I created this glitch to quickly calculate our team's card velocity during the week (last 7 days).

![](https://cdn.glitch.com/698f4d93-8ea2-4036-b703-79e6bc581591%2FScreen%20Shot%202017-04-10%20at%2021.13.29.png?1491877411759)

## Getting Started
The app works by fetching the contents of cards on the lists with the word `DONE` in its title, and consolidating them in a counter list on the web page. 

To get started:
- Remix this project.
- in `.env`, add:
    - A [Trello application key](https://trello.com/app-key) 
    - A [Board ID](https://developers.trello.com/get-started/start-building) (look under _Finding a List ID_ but instead look for `idBoard` value)
    - click "Show" when your project is live (make sure your broser allows pop-ups).
    
## References

Demo: https://trello-cards-velocity.glitch.me/

Glitch: https://glitch.com/edit/#!/trello-cards-velocity

Medium Post: [Hacking a Trello card velocity tracker with Glitch](https://medium.com/the-backlog-by-nimbo-x/hacking-a-trello-card-velocity-tracker-with-glitch-1a4d34878dd0)

Repo: https://github.com/benoror/trello-cards-velocity

Trello API: https://developers.trello.com/advanced-reference/list#get-1-lists-idlist-cards-filter

## To Do

I would like to implement a better UI and other metrics (like Throughtput)
