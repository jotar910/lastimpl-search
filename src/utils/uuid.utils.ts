import { v4 as uuidv4 } from 'uuid';

/**
 * An adapter class to stand between reseller app and uuid lib.
 */
export class UUID {
  /**
   * Generates a random UUID v4.
   */
  static v4(): string {
    return uuidv4();
  }
}
