import { validateSignature } from './moveo'; // Replace 'yourModule' with the path to your module file
import crypto from 'crypto';

describe('validateSignature', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        jest.resetModules(); // Reset all modules
        process.env = { ...originalEnv, MOVEO_WEBHOOK_VERIFY_TOKEN: 'test_secret' };
    });

    afterEach(() => {
        process.env = originalEnv; // Restore the original environment
    });

    it('should return false if verifyToken is not set', () => {
        process.env.MOVEO_WEBHOOK_VERIFY_TOKEN = undefined;
        const { validateSignature } = require('./moveo');
        expect(validateSignature('data', 'signature')).toBe(false);
    });

    it('should return false if signature is null', () => {
        const { validateSignature } = require('./moveo');
        expect(validateSignature('data', null)).toBe(false);
    });

    it('should return true for a valid signature', () => {
        const { validateSignature } = require('./moveo');
        const data = 'test data';
        const secret = `${process.env.MOVEO_WEBHOOK_VERIFY_TOKEN}`
        const signature = crypto.createHmac('sha256', `${secret}`).update(data).digest('hex');

        expect(validateSignature(data, signature)).toBe(true);
    });

    it('should return false for an invalid signature', () => {
        const { validateSignature } = require('./moveo');
        const data = 'test data';
        const invalidSignature = 'invalid_signature';

        expect(validateSignature(data, invalidSignature)).toBe(false);
    });
});