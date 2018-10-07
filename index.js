let driverId = 0;
let tripId = 0;
let passengerId = 0;

const store = {
	drivers: [],
	trips: [],
	passengers: []
};

class Driver {
	constructor(name) {
		this.id = ++driverId;
		this.name = name;
		store.drivers.push(this);
	}

	trips() {
		return store.trips.filter(trip => trip.driverId === this.id);
	}

	passengers() {
		let driverTrips = this.trips(); // [{id, driverId, passengerId}, {id, driverId, passengerId}, ...]
		let passengers = [];
		driverTrips.forEach(
			function(dt) {
				let a = store.passengers.find(p => p.id === dt.passengerId);
				passengers.push(a);
			}
		)

		return passengers;
	}
}

class Passenger {
	constructor(name) {
		this.id = ++passengerId;
		this.name = name;
		store.passengers.push(this);
	}

	trips() {
		return store.trips.filter(trip => trip.passengerId === this.id);
	}

	drivers() {
		let passengerTrips = this.trips(); // [{id, driverId, passengerId}, {id, driverId, passengerId}, ...]
		let drivers = [];
		passengerTrips.forEach(
			function(dt) {
				let a = store.drivers.find(p => p.id === dt.driverId);
				drivers.push(a);
			}
		)

		return drivers;
	}
}

class Trip {
	constructor(driver, passenger) {
		this.id = ++tripId;
		this.driverId = driver.id;
		this.passengerId = passenger.id;
		store.trips.push(this);
	}

	driver() {
		return store.drivers.find(driver => driver.id === this.driverId);
	}

	passenger() {
		return store.passengers.find(passenger => passenger.id === this.passengerId);
	}
}
