# Different routes

## User routes

- GET | show a specific package that has been orderd by the user
- GET | Show all orders that are in transit
- POST | Make an order / where the user sends their info to sender

## Sender routes

- POST | login into your sender account
- POST | make a paket and post it to the warehouse
- GET | show all orders
- GET | Show all orders in transit with sensor data
- DELETE | delete an order when the order is fulfilled/sent

## Driver routes

- POST | login into your driver account
- POST | Register to a truck-brocker to begin transit
- POST | Register individuall order to the truck-brocker

## Tracking routes

- GET | Show order(all orders) in transit, AS USER ID/name(that the paket is connected to via sender order)
- GET | Show all orders in transit AS SENDER
