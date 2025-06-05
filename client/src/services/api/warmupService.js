const WARMUP_URL = `${process.env.BASE_SERVER_URL}/warmup`;
const WARMUP_ABORT_TIMEOUT = process.env.WARMUP_ABORT_TIMEOUT || "50000";
const WARMUP_RETRIES = 1;

class WarmupService {
  constructor() {
    this.isWarmedUp = false;
    this.warmupPromise = null;
    this.warmupRetries = 0;
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
      signal: AbortSignal.timeout(Number(WARMUP_ABORT_TIMEOUT)),
    })
      .then(() => {
        this.isWarmedUp = true;
        this.warmupRetries = 0; // Reset retry count
        console.log("✅ Warmup succeeded.");
      })
      .catch(async (error) => {
        if (error.name === 'AbortError') {
          console.warn('⏱️ Warmup request aborted after timeout.');
        } else {
          console.error('⚠️ Warmup request failed:', error.message);
        }

        if (this.warmupRetries < WARMUP_RETRIES) {
          this.warmupRetries++;
          console.log(`🔁 Retrying warmup (${this.warmupRetries}/${WARMUP_RETRIES})...`);
          await new Promise((res) => setTimeout(res, 1000)); // Optional: wait 1s before retry
          return this.warmupServer(); // Retry
        }

        console.error('❌ All warmup retries failed. Server may still be waking up or unreachable.');
      })
      .finally(() => {
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

export const warmupService = new WarmupService();
