class LocalStorageService {
  static get(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (err) {
      console.log(`Error retrieving '${key}' from localStorage: `, err);
      return null;
    }
  }

  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.log(`Error storing '${key}' in localStorage: `, err);
    }
  }
}

export default LocalStorageService;
