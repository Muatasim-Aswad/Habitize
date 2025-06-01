// utils/warmupService.js
const WARMUP_URL = `${process.env.BASE_SERVER_URL}/warmup`;

class WarmupService {
  constructor() {
    this.isWarmedUp = false;
    this.warmupPromise = null;
  }

  async warmupServer() {
    // Prevent multiple simultaneous warmup requests
    if (this.warmupPromise) {
      return this.warmupPromise;
    }

    // If already warmed up recently, don't warm up again
    if (this.isWarmedUp) {
      return Promise.resolve();
    }
    
    this.warmupPromise = fetch(WARMUP_URL, {
      method: 'GET',
      mode: 'cors',
      // Don't wait too long for warmup
      signal: AbortSignal.timeout(5000)
    })
    .then(() => {
      this.isWarmedUp = true;
    })
    .catch((error) => {
      console.log('⚠️ Server warmup failed (this is expected if server is cold):', error.message);
      // Don't throw error - warmup failing is expected behavior
    })
    .finally(() => {
      // Reset promise so it can be called again later
      this.warmupPromise = null;
    });

    return this.warmupPromise;
  }

  // Fire and forget warmup - completely non-blocking
  triggerWarmup() {
    if (!this.isWarmedUp && !this.warmupPromise) {
      this.warmupServer(); // Don't await - fire and forget
    }
  }

  // Keep server alive with periodic pings
  startKeepAlive(intervalMinutes = 12) {
    const interval = setInterval(() => {
      this.triggerWarmup();
    }, intervalMinutes * 60 * 1000);

    // Return cleanup function
    return () => clearInterval(interval);
  }
}

// Export singleton instance
export const warmupService = new WarmupService();