export class OrgNameAlreadyExistsError extends Error {
  constructor() {
    super('Org name already exists!')
  }
}
