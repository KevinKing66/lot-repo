export class ValidationUtils {
  static hasMinLength(value: string, min: number): boolean {
    return value.length >= min;
  }

  static hasMaxLength(value: string, max: number): boolean {
    return value.length <= max;
  }
  /**
   * Validates that a password meets common complexity rules.
   * At least min characters, with uppercase, lowercase, number and special character.
   */
  static isStrongPassword(password: string, minLength: number = 8): boolean {
    const regex = new RegExp(
      `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{${minLength},}$`
    );
    return regex.test(password);
  }

  static isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.toLowerCase());
  }

  static isNotEmpty(value: string): boolean {
    return value.trim().length > 0;
  }

  static isAlpha(value: string): boolean {
    return /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(value);
  }

  static isNumeric(value: string): boolean {
    return /^\d+$/.test(value);
  }

  static areEqual(a: string, b: string): boolean {
    return a === b;
  }
}
