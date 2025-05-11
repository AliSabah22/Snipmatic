let workerInitialized = false;

export const initializeWorker = async () => {
  if (typeof window === 'undefined' || workerInitialized) return;

  try {
    // Force next tick to ensure window is available
    await new Promise(resolve => setTimeout(resolve, 1000));
    workerInitialized = true;
  } catch (error) {
    console.error('Worker initialization failed:', error);
  }
}; 