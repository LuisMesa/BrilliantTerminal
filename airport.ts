class Airplane {
  fuel: number
  fuelRate: number
  crashed: boolean
  landed: boolean
  landing: boolean
  missingLandingFrames: number

  constructor(public planeNumber: number) {
    this.planeNumber = planeNumber;
    this.fuel = Math.floor(Math.random() * 900) + 100;  // liters
    this.fuelRate = Math.floor(Math.random() * 2) + 1;  // frame tick
    this.crashed = false;

    this.landed = false;
    this.landing = false;
    this.missingLandingFrames = 80
  }

  frameTick(frameNumber: number) {
    if (!this.crashed && !this.landed) {
      this.fuel -= this.fuelRate;

      if (this.landing) {
        this.missingLandingFrames -= 1;

        if (!this.missingLandingFrames) {
          this.landed = true;
          this.landing = false;

          console.log(`Plane ${this.planeNumber} landed on frame ${frameNumber}`);
        }
      }

      if (this.fuel <= 0) {
        this.crashed = true;
        this.landing = false;
        console.log(`Plane ${this.planeNumber} crashed on frame ${frameNumber}`);
      }
    }
  }

  startLanding(frameNumber: number): void {
    console.log(`Plane ${this.planeNumber} started landing on frame ${frameNumber}: fuel: ${this.fuel}, fuelRate: ${this.fuelRate}`);
    this.landing = true;
  }

  isEligible(): boolean {
    return !this.landed && !this.landing && !this.crashed && this.fuel / this.fuelRate > 80;
  }


}

class Simulation {
  airplanes: Airplane[]
  frameNumber: number
  framerate: number
  runways: number

  constructor() {
    this.airplanes = [];
    this.frameNumber = 0;
    this.framerate = 60;  // frames per second
    this.runways = 2;
  }

  async mainLoop() {
    while (true) {
      this.frameNumber += 1;
      if (Math.floor(Math.random() * 100) < 5) {
        const nextPlaneNumber = this.airplanes.length + 1;
        const newAirplane = new Airplane(nextPlaneNumber);
        console.log(
          `Plane ${newAirplane.planeNumber} entered airspace with `
          + `${newAirplane.fuel} liters of fuel on frame ${this.frameNumber} `
          + `fuelRate: ${newAirplane.fuelRate}`
        );
        this.airplanes.push(newAirplane);
      }

      if (this.airplanes.filter((airplane) => airplane.landing).length < this.runways) {
        const eligibleAirplanes = this.airplanes.filter((airplane) => airplane.isEligible());

        if (eligibleAirplanes.length) {
          eligibleAirplanes.sort((a, b) => a.fuel / a.fuelRate - b.fuel / b.fuelRate)[0].startLanding(this.frameNumber);
        }
      }

      this.airplanes.forEach((airplane) => {
        airplane.frameTick(this.frameNumber);
      });

      await new Promise((resolve) => setTimeout(resolve, 1000 / this.framerate));
    }
  }
}

const simulation = new Simulation();
simulation.mainLoop();
