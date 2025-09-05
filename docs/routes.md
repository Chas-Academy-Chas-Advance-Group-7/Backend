# Different routes

## User routes

- POST | Account registration
- POST | Login
- GET | show a specific package that has been orderd by the user
- GET | Show all orders that are in transit
- POST | Make an order / where the user sends their info to sender

// - GET | Show all orders by user (filter by status)
// - GET | Show history (temperature/humidity/location) for a package
// - POST | Subscribe to alerts for a package
// - DELETE | Unsubscribe from alerts for a package

// ## Reciever routes ???

## Sender routes

- POST | Account registration
- POST | login into your sender account
- POST | make a paket and post it to the warehouse
- GET | show all orders
- GET | Show all orders in transit with sensor data
- DELETE | delete an order when the order is fulfilled/sent

// - PUT | Update package info (recipient, thresholds, notes)
// - POST | Generate QR/Barcode label for a package
// - GET | Show sensor history for a package
// - PATCH | Cancel an order before pickup
// - POST | Set/update thresholds for a package

## Driver routes

- POST | Account registration
- POST | login into your driver account
- POST | Register to a truck-brocker to begin transit
- POST | Register individuall order to the truck-brocker

// - POST | Scan QR/barcode to load package onto truck
// - GET | Show all packages on a truck
// - GET | Show all active alerts for packages on a truck

## Tracking routes

- GET | Show order(all orders) in transit, AS USER ID/name(that the paket is connected to via sender order)
- GET | Show all orders in transit AS SENDER

// - GET | Show live tracking snapshot for a package
// - GET | Show real-time tracking stream (SSE/WebSocket)

//|Alternative layout|//

// ## User routes

// - POST | Create a user account
// - POST | Login to your user account
// - GET | Show profile and linked sender/reciever roles
// - PUT | Update user account info
// - DELETE | Delete user account

// ## Sender routes (linked to user)

// - POST | Make a package and post it to the warehouse
// - GET | Show all orders made by this sender
// - GET | Show all orders in transit with sensor data
// - GET | Show history (temperature/humidity/location) for a package
// - POST | Generate QR/barcode label for a package
// - DELETE | Cancel an order before pickup or fullfilled

// ## Receiver routes (linked to user)

// - Show all packages for this reciever
// - Show live status for a specific package
// - Scan and confirm delivery of a package (stop logging)
// - Get delievery receipt with temperature/humidity summary
// - Acknowledge condition of package at arrival
