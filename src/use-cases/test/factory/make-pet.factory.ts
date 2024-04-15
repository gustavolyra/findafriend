import { faker } from '@faker-js/faker'
import crypto from 'node:crypto'
import { create } from 'node:domain'

type Overwrite = {
  orgId?: string
  age?: number
  breed?: string
}

export function makePet(overwrite?: Overwrite) {
  return {
    id: crypto.randomUUID(),
    name: faker.person.firstName(),
    age: overwrite?.age ?? faker.number.int(),
    create_at: faker.date.anytime(),
    breed:
      overwrite?.breed ??
      faker.animal.dog(),
    isAvailable: true,
    orgId: overwrite?.orgId ?? crypto.randomUUID(),
  }
}