import confetti, { Options } from 'canvas-confetti'

const count = 200

const defaults: Options = {
  origin: { y: 0.7 }
}

const fire = (particleRatio: number, opts: Options): void => {
  confetti({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio)
  })
}

export const firework = () => {
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    origin: { y: 0.8 }
  })

  fire(0.2, {
    spread: 60,
    origin: { y: 0.8 }
  })

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    origin: { y: 0.8 }
  })

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    origin: { y: 0.8 }
  })

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    origin: { y: 0.8 }
  })
}
