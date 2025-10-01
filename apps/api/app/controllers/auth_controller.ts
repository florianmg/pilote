import type { HttpContext } from '@adonisjs/core/http';
import User from '#models/user';
import { loginValidator, registerValidator } from '#validators/auth';

export default class AuthController {
  async login({ request, response }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(loginValidator);
      const user = await User.findBy('email', email);

      if (!user) {
        return response.status(401).json({ message: 'Invalid credentials' });
      }

      const isValidUser = await user.verifyPassword(password);
      if (!isValidUser) {
        return response.status(401).json({ message: 'Invalid credentials' });
      }

      const token = await User.accessTokens.create(user);

      return response.status(200).json({ user, token });
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Internal server error', error });
    }
  }

  async register({ request, response }: HttpContext) {
    try {
      const { email, password } =
        await request.validateUsing(registerValidator);
      const user = await User.create({ email, password });
      const token = await User.accessTokens.create(user);

      return response.status(201).json({ user, token });
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Internal server error', error });
    }
  }

  async logout({ response, auth }: HttpContext) {
    try {
      const user = auth.user!;
      await User.accessTokens.delete(user, user.currentAccessToken.identifier);
      return response.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Internal server error', error });
    }
  }

  async me({ response, auth }: HttpContext) {
    try {
      await auth.check();
      return response.status(200).json({ user: auth.user });
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Internal server error', error });
    }
  }
}
