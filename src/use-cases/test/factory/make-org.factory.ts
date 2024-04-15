import { faker } from '@faker-js/faker'
import crypto from 'node:crypto'

type Overwrite = {
  phone?: string,
  address?: string,
  city?: string,
  password?: string,
  cep?: string,
  email?: string,
}

export function makeOrg(overwrite?: Overwrite) {
  return {
    id: crypto.randomUUID(),
    name: faker.commerce.productName(),
    created_at: faker.date.anytime(),
    phone: faker.phone.number(),
    address: overwrite?.address ?? faker.location.street(),
    city:
      overwrite?.city ??
      faker.location.city(),
    cep: faker.location.zipCode(),
    email: overwrite?.email ?? faker.internet.email(),
    password_hash: overwrite?.password ?? faker.internet.password(),
  }
}