import LoginRegistrationService from '../LoginRegistrationService'
import { authenticate } from '../authenticate'
import { register } from '../register'
import { signJWT } from '../signJWT'

jest.mock('../authenticate')
jest.mock('../register')
jest.mock('../signJWT')

describe('LoginRegistrationService', () => {
  let service: LoginRegistrationService

  beforeEach(() => {
    service = new LoginRegistrationService('testRequestId')
  })

  it('should call authenticate with login request', async () => {
    const loginRequest = {
      username: 'testuser',
      password: 'testpassword',
    }

    await service.authenticate(loginRequest)

    expect(authenticate).toHaveBeenCalledWith(loginRequest, 'testRequestId')
  })

  it('should call register with registration information', async () => {
    const registrationInformation = {
      username: 'testuser',
      password: 'testpassword',
      email: 'testemail',
    }

    await service.register(registrationInformation)

    expect(register).toHaveBeenCalledWith(
      registrationInformation,
      'testRequestId'
    )
  })

  it('should call signJWT with login request', async () => {
    const loginRequest = {
      username: 'testuser',
      password: 'testpassword',
    }

    await service.signJWT(loginRequest)

    expect(signJWT).toHaveBeenCalledWith(loginRequest, 'testRequestId')
  })
})
