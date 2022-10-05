# Architecture
## Global

Head of development: Codenius and DoctorFuchs

Deployment: Docker

## Backend

Language: Typescript

Server - Framework: [NodeJS/Express](https://expressjs.com/)

Chart generation - Framework: [NodeJS/D3](https://d3js.org/)

Database: MySQL

### Jobs

#### 1. Sprint
- handle items:
  - add items
  - buy items
  - remove items
  - recover items
  - edit items
  - single item statistics
- generate charts for statistic
- save product images
- security:
  - avoid sql injections
  - external access management


## Frontend
Language: Typescript, [Svelte](https://svelte.dev/)

Framework: [Vite/Svelte](https://kit.svelte.dev/)

UI-Components - Library: [Sveltestrap](https://github.com/bestguy/sveltestrap)

Internationalization - Framework: [i18next](https://i18next.com)

Data synchronization - Framework: [Svelte-Query](https://github.com/SvelteStack/svelte-query)

### Jobs

#### Features

##### Priority
1. 
    - [ ] ##### Navigation
      
    - [ ] ##### Manage items
      
        - [ ] search items
        - [ ] sort items
        - [ ] create items
          - [ ] scan/enter item bar-code
          - [ ] load item data and image from the web
          - [ ] manually enter product information
          - [ ] **set category *?***
        - [ ] edit items
        - [ ] delete items
        
    - [ ] ##### Sell items
        - [ ] search items
        - [ ] sort items
        - [ ] **filter by category *?***
        - [ ] shopping cart
            - [ ] add items
            - [ ] remove items
            - [ ] set amount of item
        - [ ] display shopping list
        - [ ] calculate change
    
2. 
    - [ ] ##### Home screen
        - [ ] quick links
        - [ ] login
        - [ ] (latest statistics)
3. 
    - [ ] ##### Info page (About)
        - [ ] short  text, that gives information about the project
        - [ ] tutorial (intro)
        - [ ] feedback widget
---
- [ ] multi language support
- [ ] settings
    - [ ] language
    - [ ] (color scheme)
- [ ] user
    - [ ] login
    - [ ] logout
    - [ ] load personalized settings from server